import json
import os
import sys
import time
from datetime import datetime, timezone
from typing import Dict, List, Optional

import pandas as pd
import yfinance as yf

# ============================================================
# MARKET HEALERS - YAHOO FINANCE MARKET DATA SERVICE
# ============================================================

INDICES = {
    "NIFTY 50": "^NSEI",
    "BANK NIFTY": "^NSEBANK",
    "SENSEX": "^BSESN",
    "NIFTY IT": "^CNXIT",
    "NIFTY AUTO": "^CNXAUTO",
    "NIFTY PHARMA": "^CNXPHARMA",
    "NIFTY FMCG": "^CNXFMCG",
    "NIFTY METAL": "^CNXMETAL",
    "NIFTY REALTY": "^CNXREALTY",
}

TOP_COMPANIES = {
    "RELIANCE": "RELIANCE.NS",
    "TCS": "TCS.NS",
    "HDFC BANK": "HDFCBANK.NS",
    "ICICI BANK": "ICICIBANK.NS",
    "INFOSYS": "INFY.NS",
    "SBI": "SBIN.NS",
    "ITC": "ITC.NS",
    "LARSEN & TOUBRO": "LT.NS",
    "BHARTI AIRTEL": "BHARTIARTL.NS",
    "AXIS BANK": "AXISBANK.NS",
    "KOTAK BANK": "KOTAKBANK.NS",
    "HINDUSTAN UNILEVER": "HINDUNILVR.NS",
    "MARUTI SUZUKI": "MARUTI.NS",
    "SUN PHARMA": "SUNPHARMA.NS",
    "BAJAJ FINANCE": "BAJFINANCE.NS",
}


# ------------------------------------------------------------
# Helper
# ------------------------------------------------------------

def safe_float(value) -> Optional[float]:
    """
    Convert Yahoo/pandas values safely to float.
    """
    try:
        if pd.isna(value):
            return None
        return float(value)
    except (TypeError, ValueError):
        return None


# ------------------------------------------------------------
# Fetch latest quote
# ------------------------------------------------------------

def get_quote(symbol: str) -> Dict:
    ticker = yf.Ticker(symbol)

    # 15-minute interval. Fetch recent data only.
    df = ticker.history(
        period="1d",
        interval="15m",
        auto_adjust=False,
        prepost=False
    )

    if df.empty:
        # Fallback to 1d period if 15m is outside trading hours
        df = ticker.history(period="5d", interval="1d", auto_adjust=False)
        if df.empty:
            raise RuntimeError(f"No market data returned for {symbol}")

    # Remove rows without a close price
    df = df.dropna(subset=["Close"])

    if df.empty:
        raise RuntimeError(f"No valid closing data returned for {symbol}")

    latest = df.iloc[-1]
    current_price = safe_float(latest["Close"])

    # Previous close from daily data
    daily = ticker.history(
        period="5d",
        interval="1d",
        auto_adjust=False
    )

    if daily.empty:
        previous_close = None
    else:
        daily = daily.dropna(subset=["Close"])
        if len(daily) >= 2:
            previous_close = safe_float(daily["Close"].iloc[-2])
        else:
            previous_close = None

    change = None
    change_percent = None

    if current_price is not None and previous_close is not None:
        change = current_price - previous_close
        if previous_close != 0:
            change_percent = (change / previous_close) * 100

    # Timestamp from Yahoo
    timestamp = df.index[-1]

    # Sparkline prices
    sparkline = [safe_float(p) for p in df["Close"].tail(8).tolist() if safe_float(p) is not None]

    return {
        "symbol": symbol,
        "price": current_price,
        "previous_close": previous_close,
        "change": change,
        "change_percent": change_percent,
        "open": safe_float(latest["Open"]),
        "high": safe_float(latest["High"]),
        "low": safe_float(latest["Low"]),
        "volume": safe_float(latest["Volume"]),
        "timestamp": timestamp.isoformat(),
        "interval": "15m",
        "source": "Yahoo Finance",
        "sparkline": sparkline,
    }


from concurrent.futures import ThreadPoolExecutor, as_completed

# ------------------------------------------------------------
# Fetch index data in parallel
# ------------------------------------------------------------

def _fetch_single_index(name: str, symbol: str) -> Dict:
    try:
        data = get_quote(symbol)
        data["name"] = name
        data["type"] = "index"
        return data
    except Exception as e:
        return {
            "name": name,
            "symbol": symbol,
            "type": "index",
            "error": str(e)
        }

def get_indices() -> List[Dict]:
    results = []
    order_map = {name: i for i, name in enumerate(INDICES.keys())}
    with ThreadPoolExecutor(max_workers=8) as executor:
        futures = [executor.submit(_fetch_single_index, name, symbol) for name, symbol in INDICES.items()]
        for future in as_completed(futures):
            results.append(future.result())
    results.sort(key=lambda x: order_map.get(x["name"], 999))
    return results


# ------------------------------------------------------------
# Fetch top companies in parallel
# ------------------------------------------------------------

def _fetch_single_company(name: str, symbol: str) -> Dict:
    try:
        data = get_quote(symbol)
        data["name"] = name
        data["type"] = "equity"
        return data
    except Exception as e:
        return {
            "name": name,
            "symbol": symbol,
            "type": "equity",
            "error": str(e)
        }

def get_top_companies() -> List[Dict]:
    results = []
    order_map = {name: i for i, name in enumerate(TOP_COMPANIES.keys())}
    with ThreadPoolExecutor(max_workers=8) as executor:
        futures = [executor.submit(_fetch_single_company, name, symbol) for name, symbol in TOP_COMPANIES.items()]
        for future in as_completed(futures):
            results.append(future.result())
    results.sort(key=lambda x: order_map.get(x["name"], 999))
    return results


# ------------------------------------------------------------
# Fetch everything
# ------------------------------------------------------------

def get_market_overview():
    return {
        "updated_at": datetime.now(timezone.utc).isoformat(),
        "indices": get_indices(),
        "top_companies": get_top_companies(),
    }


# ------------------------------------------------------------
# CLI & Export Handler
# ------------------------------------------------------------

if __name__ == "__main__":
    is_json = "--json" in sys.argv
    export_path = None

    for i, arg in enumerate(sys.argv):
        if arg == "--export" and i + 1 < len(sys.argv):
            export_path = sys.argv[i + 1]

    market = get_market_overview()

    if export_path:
        os.makedirs(os.path.dirname(os.path.abspath(export_path)), exist_ok=True)
        with open(export_path, "w", encoding="utf-8") as f:
            json.dump(market, f, indent=2)
        print(f"Exported market data to {export_path}")

    if is_json:
        print(json.dumps(market))
    elif not export_path:
        print("\n" + "=" * 70)
        print("MARKET HEALERS MARKET DATA")
        print("=" * 70)

        print("\nINDICES")
        print("-" * 70)
        for item in market["indices"]:
            if "error" in item:
                print(item["name"], "ERROR:", item["error"])
                continue
            print(
                f"{item['name']:20} "
                f"{item['price']:>12.2f} "
                f"{item['change_percent']:>8.2f}%"
            )

        print("\nTOP COMPANIES")
        print("-" * 70)
        for item in market["top_companies"]:
            if "error" in item:
                print(item["name"], "ERROR:", item["error"])
                continue
            print(
                f"{item['name']:20} "
                f"{item['price']:>12.2f} "
                f"{item['change_percent']:>8.2f}%"
            )
