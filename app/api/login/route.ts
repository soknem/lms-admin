import { serialize } from "cookie";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function POST(req: NextRequest) {
    try {
        // Parse the request body to get the email and password
        const body = await req.json();
        const { emailOrUsername, password } = body;


        // Make a POST request to the Our API
        const response = await fetch(
            `${process.env.ISTAD_LMS_API_URL}/auth/login`,
            {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ emailOrUsername, password }),
            }
        );

        // Parse the response body once
        const data = await response.json();

        // If the request fails, return an error message to the client-side
        if (!response.ok) {
            return NextResponse.json(
                {
                    message: data.message || "Failed to login",
                },
                {
                    status: response.status,
                }
            );
        }

        // If the request is successful, parse the response body to get the data
        const user = data?.user || null;
        const accessToken = data?.accessToken || null;
        const refreshToken = data?.refreshToken || null;


        // Serialize the refresh token and set it as a cookie
        const cookieName = process.env.COOKIE_REFRESH_TOKEN_NAME || "refresh";
        const serialized = serialize(cookieName, refreshToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            path: "/",
            sameSite: "lax", // or "strict" or "none"
        });

        // Return the access token and user data to the client-side with the serialized refresh token as a cookie
        return NextResponse.json(
            {
                accessToken: accessToken,
                user: user,
            },
            {
                status: 200,
                headers: {
                    "Set-Cookie": serialized,
                },
            }
        );
    } catch (error) {
        // Handle any errors that occurred during processing
        console.error('Error in login handler:', error);
        return NextResponse.json(
            {
                message: 'Internal Server Error',
            },
            {
                status: 500,
            }
        );
    }
}
