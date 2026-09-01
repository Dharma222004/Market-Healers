import json
import os
import sys
from datetime import datetime, timezone
from typing import Any, Dict, Optional

import pandas as pd
import yfinance as yf

# ============================================================
# MARKET HEALERS
# GOLD + SILVER MARKET DATA
# Yahoo Finance → USD/oz → USD/g → INR/g
# ============================================================

GOLD_SYMBOL = "GC=F"
SILVER_SYMBOL = "SI=F"
USD_INR_SYMBOL = "INR=X"

TROY_OUNCE_TO_GRAMS = 31.1034768


def safe_float(value) -> Optional[float]:
    try:
        if value is None or pd.isna(value):
            return None
        return float(value)
    except (TypeError, ValueError):
        return None


def get_latest_price(symbol: str) -> Dict[str, Any]:
    ticker = yf.Ticker(symbol)
    data = ticker.history(
        period="1d",
        interval="15m",
        auto_adjust=False,
        prepost=False
    )

    if data.empty:
        # Fallback to 5d daily if outside market trading hours
        data = ticker.history(period="5d", interval="1d", auto_adjust=False)
        if data.empty:
            raise RuntimeError(f"No data returned from Yahoo Finance for {symbol}")

    data = data.dropna(subset=["Close"])
    if data.empty:
        raise RuntimeError(f"No valid price data returned for {symbol}")

    latest = data.iloc[-1]
    return {
        "symbol": symbol,
        "price": safe_float(latest["Close"]),
        "open": safe_float(latest["Open"]),
        "high": safe_float(latest["High"]),
        "low": safe_float(latest["Low"]),
        "volume": safe_float(latest["Volume"]),
        "timestamp": data.index[-1].isoformat(),
    }


def get_previous_close(symbol: str) -> Optional[float]:
    ticker = yf.Ticker(symbol)
    data = ticker.history(
        period="5d",
        interval="1d",
        auto_adjust=False
    )
    if data.empty:
        return None

    data = data.dropna(subset=["Close"])
    if len(data) < 2:
        return None

    return safe_float(data["Close"].iloc[-2])


def calculate_change(
    current_price: Optional[float],
    previous_close: Optional[float]
):
    if current_price is None or previous_close is None:
        return None, None

    change = current_price - previous_close
    if previous_close == 0:
        return change, None

    change_percent = (change / previous_close) * 100
    return change, change_percent


def get_gold():
    quote = get_latest_price(GOLD_SYMBOL)
    previous_close = get_previous_close(GOLD_SYMBOL)
    usd_per_ounce = quote["price"]

    change_usd_ounce, change_percent = calculate_change(
        usd_per_ounce,
        previous_close
    )

    usd_per_gram = None
    if usd_per_ounce is not None:
        usd_per_gram = usd_per_ounce / TROY_OUNCE_TO_GRAMS

    usd_inr_quote = get_latest_price(USD_INR_SYMBOL)
    usd_inr = usd_inr_quote["price"]

    inr_per_gram = None
    if usd_per_gram is not None and usd_inr is not None:
        inr_per_gram = usd_per_gram * usd_inr

    inr_per_10_grams = None
    if inr_per_gram is not None:
        inr_per_10_grams = inr_per_gram * 10

    return {
        "name": "Gold",
        "symbol": GOLD_SYMBOL,
        "type": "commodity",
        "source": "Yahoo Finance",
        "contract": "COMEX Gold Futures",
        "currency": "INR",
        "unit": "gram",
        "price": round(inr_per_gram, 2) if inr_per_gram is not None else None,
        "price_inr_per_gram": round(inr_per_gram, 2) if inr_per_gram is not None else None,
        "price_inr_per_10g": round(inr_per_10_grams, 2) if inr_per_10_grams is not None else None,
        "price_usd_per_gram": round(usd_per_gram, 4) if usd_per_gram is not None else None,
        "price_usd_per_troy_ounce": round(usd_per_ounce, 2) if usd_per_ounce is not None else None,
        "previous_close_usd_per_troy_ounce": round(previous_close, 2) if previous_close is not None else None,
        "change_usd_per_troy_ounce": round(change_usd_ounce, 2) if change_usd_ounce is not None else None,
        "change_percent": round(change_percent, 4) if change_percent is not None else None,
        "usd_inr": round(usd_inr, 4) if usd_inr is not None else None,
        "timestamp": quote["timestamp"],
        "interval": "15m",
        "conversion": {
            "troy_ounce_to_grams": TROY_OUNCE_TO_GRAMS,
            "formula": "USD/oz ÷ 31.1034768 × USD/INR"
        },
    }


def get_silver():
    quote = get_latest_price(SILVER_SYMBOL)
    previous_close = get_previous_close(SILVER_SYMBOL)
    usd_per_ounce = quote["price"]

    change_usd_ounce, change_percent = calculate_change(
        usd_per_ounce,
        previous_close
    )

    usd_per_gram = None
    if usd_per_ounce is not None:
        usd_per_gram = usd_per_ounce / TROY_OUNCE_TO_GRAMS

    usd_inr_quote = get_latest_price(USD_INR_SYMBOL)
    usd_inr = usd_inr_quote["price"]

    inr_per_gram = None
    if usd_per_gram is not None and usd_inr is not None:
        inr_per_gram = usd_per_gram * usd_inr

    inr_per_10_grams = None
    if inr_per_gram is not None:
        inr_per_10_grams = inr_per_gram * 10

    return {
        "name": "Silver",
        "symbol": SILVER_SYMBOL,
        "type": "commodity",
        "source": "Yahoo Finance",
        "contract": "COMEX Silver Futures",
        "currency": "INR",
        "unit": "gram",
        "price": round(inr_per_gram, 2) if inr_per_gram is not None else None,
        "price_inr_per_gram": round(inr_per_gram, 2) if inr_per_gram is not None else None,
        "price_inr_per_10g": round(inr_per_10_grams, 2) if inr_per_10_grams is not None else None,
        "price_usd_per_gram": round(usd_per_gram, 4) if usd_per_gram is not None else None,
        "price_usd_per_troy_ounce": round(usd_per_ounce, 2) if usd_per_ounce is not None else None,
        "previous_close_usd_per_troy_ounce": round(previous_close, 2) if previous_close is not None else None,
        "change_usd_per_troy_ounce": round(change_usd_ounce, 2) if change_usd_ounce is not None else None,
        "change_percent": round(change_percent, 4) if change_percent is not None else None,
        "usd_inr": round(usd_inr, 4) if usd_inr is not None else None,
        "timestamp": quote["timestamp"],
        "interval": "15m",
        "conversion": {
            "troy_ounce_to_grams": TROY_OUNCE_TO_GRAMS,
            "formula": "USD/oz ÷ 31.1034768 × USD/INR"
        },
    }


def get_precious_metals():
    results = {
        "updated_at": datetime.now(timezone.utc).isoformat(),
    }
    try:
        results["gold"] = get_gold()
    except Exception as e:
        results["gold"] = {
            "name": "Gold",
            "error": str(e)
        }

    try:
        results["silver"] = get_silver()
    except Exception as e:
        results["silver"] = {
            "name": "Silver",
            "error": str(e)
        }

    return results


if __name__ == "__main__":
    is_json = "--json" in sys.argv
    export_path = None

    for i, arg in enumerate(sys.argv):
        if arg == "--export" and i + 1 < len(sys.argv):
            export_path = sys.argv[i + 1]

    metals = get_precious_metals()

    if export_path:
        os.makedirs(os.path.dirname(os.path.abspath(export_path)), exist_ok=True)
        with open(export_path, "w", encoding="utf-8") as f:
            json.dump(metals, f, indent=2)
        print(f"Exported precious metals data to {export_path}")

    if is_json:
        print(json.dumps(metals))
    elif not export_path:
        print("=" * 70)
        print("MARKET HEALERS - PRECIOUS METALS")
        print("=" * 70)

        gold = metals.get("gold", {})
        print("\nGOLD")
        print("Yahoo Symbol:", gold.get("symbol"))
        print("USD / Troy Ounce:", gold.get("price_usd_per_troy_ounce"))
        print("USD / Gram:", gold.get("price_usd_per_gram"))
        print("INR / Gram:", gold.get("price_inr_per_gram"))
        print("INR / 10 Gram:", gold.get("price_inr_per_10g"))
        print("Change:", gold.get("change_percent"), "%")
        print("USD/INR:", gold.get("usd_inr"))

        silver = metals.get("silver", {})
        print("\nSILVER")
        print("Yahoo Symbol:", silver.get("symbol"))
        print("USD / Troy Ounce:", silver.get("price_usd_per_troy_ounce"))
        print("USD / Gram:", silver.get("price_usd_per_gram"))
        print("INR / Gram:", silver.get("price_inr_per_gram"))
        print("INR / 10 Gram:", silver.get("price_inr_per_10g"))
        print("Change:", silver.get("change_percent"), "%")
        print("USD/INR:", silver.get("usd_inr"))
