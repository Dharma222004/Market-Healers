export const GOOGLE_CLIENT_ID = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID || "";

export interface GoogleJwtPayload {
  iss?: string;
  nbf?: number;
  aud?: string;
  sub: string;
  email: string;
  email_verified?: boolean;
  name: string;
  picture?: string;
  given_name?: string;
  family_name?: string;
}

export function decodeGoogleCredential(credential: string): GoogleJwtPayload | null {
  try {
    const base64Url = credential.split(".")[1];
    const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split("")
        .map((c) => "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2))
        .join("")
    );
    return JSON.parse(jsonPayload);
  } catch (error) {
    console.error("Failed to decode Google credential JWT:", error);
    return null;
  }
}

export function loadGoogleScript(): Promise<void> {
  return new Promise((resolve, reject) => {
    if (typeof window === "undefined") return resolve();
    if ((window as any).google?.accounts) return resolve();

    const existingScript = document.getElementById("google-gsi-client");
    if (existingScript) {
      existingScript.addEventListener("load", () => resolve());
      existingScript.addEventListener("error", (e) => reject(e));
      return;
    }

    const script = document.createElement("script");
    script.id = "google-gsi-client";
    script.src = "https://accounts.google.com/gsi/client";
    script.async = true;
    script.defer = true;
    script.onload = () => resolve();
    script.onerror = (err) => reject(err);
    document.head.appendChild(script);
  });
}

/**
 * Triggers Google's official OAuth2 popup token flow.
 * Upon successful authentication, fetches the user's profile from Google's UserInfo API.
 */
export async function triggerGooglePopupOAuth(
  onSuccess: (profile: { name: string; email: string; picture?: string; id: string }) => void,
  onError: (error: string) => void
) {
  try {
    await loadGoogleScript();
    const google = (window as any).google;

    if (!google?.accounts?.oauth2) {
      onError("Google Identity SDK is not available. Please check your internet connection.");
      return;
    }

    const client = google.accounts.oauth2.initTokenClient({
      client_id: GOOGLE_CLIENT_ID,
      scope: "email profile openid",
      callback: async (tokenResponse: any) => {
        if (tokenResponse.error) {
          onError(tokenResponse.error_description || tokenResponse.error || "Google authentication failed");
          return;
        }

        if (tokenResponse.access_token) {
          try {
            const userInfoRes = await fetch("https://www.googleapis.com/oauth2/v3/userinfo", {
              headers: { Authorization: `Bearer ${tokenResponse.access_token}` },
            });
            const userInfo = await userInfoRes.json();

            if (userInfo && userInfo.email) {
              onSuccess({
                id: userInfo.sub,
                name: userInfo.name || userInfo.given_name || "Google User",
                email: userInfo.email,
                picture: userInfo.picture,
              });
            } else {
              onError("Could not retrieve profile from Google UserInfo.");
            }
          } catch (e: any) {
            onError("Failed to fetch Google profile: " + e.message);
          }
        }
      },
      error_callback: (err: any) => {
        console.error("Google popup error:", err);
        onError(err?.message || "Google sign-in popup was closed or origin was not permitted.");
      },
    });

    client.requestAccessToken({ prompt: "select_account" });
  } catch (err: any) {
    console.error("Error triggering Google OAuth:", err);
    onError(err.message || "Failed to launch Google authentication.");
  }
}
