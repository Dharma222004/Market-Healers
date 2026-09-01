import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const code = searchParams.get("code");
  const error = searchParams.get("error");
  const state = searchParams.get("state");

  const appUrl = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:5000";

  let redirectUrl = "/onboarding";
  if (state) {
    try {
      const parsed = JSON.parse(Buffer.from(state, "base64").toString("utf-8"));
      if (parsed.redirectUrl) redirectUrl = parsed.redirectUrl;
    } catch {
      // default
    }
  }

  if (error || !code) {
    return NextResponse.redirect(`${appUrl}/login?error=${encodeURIComponent(error || "Google authorization was cancelled")}`);
  }

  try {
    const clientId = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID || "";
    const clientSecret = process.env.GOOGLE_CLIENT_SECRET || "";
    const callbackUrl = `${appUrl}/api/auth/google/callback`;

    // 1. Exchange code for tokens
    const tokenResponse = await fetch("https://oauth2.googleapis.com/token", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({
        code,
        client_id: clientId,
        client_secret: clientSecret,
        redirect_uri: callbackUrl,
        grant_type: "authorization_code",
      }),
    });

    const tokenData = await tokenResponse.json();

    if (!tokenResponse.ok || !tokenData.access_token) {
      console.error("Token exchange failed:", tokenData);
      return NextResponse.redirect(`${appUrl}/login?error=${encodeURIComponent(tokenData.error_description || "Token exchange failed")}`);
    }

    // 2. Fetch user profile from Google UserInfo
    const userInfoResponse = await fetch("https://www.googleapis.com/oauth2/v3/userinfo", {
      headers: {
        Authorization: `Bearer ${tokenData.access_token}`,
      },
    });

    const profile = await userInfoResponse.json();

    if (!userInfoResponse.ok || !profile.email) {
      return NextResponse.redirect(`${appUrl}/login?error=${encodeURIComponent("Could not retrieve Google profile")}`);
    }

    // 3. Construct user session payload
    const userPayload = {
      id: "usr_g_" + (profile.sub || Math.random().toString(36).substring(2, 9)),
      name: profile.name || profile.given_name || "Google User",
      email: profile.email,
      role: "FREE_USER",
      experienceLevel: "Beginner",
      primaryGoal: "Learn investing",
      subscriptionStatus: "active",
      createdAt: new Date().toISOString(),
      avatarUrl: profile.picture,
    };

    const encodedUser = Buffer.from(JSON.stringify(userPayload)).toString("base64");

    // Redirect to onboarding with user payload in query and cookie
    const response = NextResponse.redirect(`${appUrl}${redirectUrl}?auth_success=google&session=${encodeURIComponent(encodedUser)}`);

    response.cookies.set("mh_google_session", encodedUser, {
      path: "/",
      maxAge: 60 * 60 * 24 * 30, // 30 days
      sameSite: "lax",
    });

    return response;
  } catch (err: any) {
    console.error("OAuth callback exception:", err);
    return NextResponse.redirect(`${appUrl}/login?error=${encodeURIComponent(err.message || "Authentication error occurred")}`);
  }
}
