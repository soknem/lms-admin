import { serialize } from "cookie";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function POST(req: NextRequest) {
    try {
        const body = await req.json();
        const { emailOrUsername, password } = body;

        const response = await fetch(
            `${process.env.NEXT_PUBLIC_ISTAD_LMS_API_URL}/auth/login`,
            {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ emailOrUsername, password }),
            }
        );

        const data = await response.json();

        if (!response.ok) {
            return NextResponse.json(
                { message: data.message || "Failed to login" },
                { status: response.status }
            );
        }

        const accessToken = data?.accessToken || null;
        const refreshToken = data?.refreshToken || null;

        console.log('Setting access token:', accessToken);

        const cookieName = process.env.COOKIE_REFRESH_TOKEN_NAME || "refresh";
        const serialized = serialize(cookieName, refreshToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            path: "/",
            sameSite: "lax",
        });

        return NextResponse.json(
            {
                accessToken: accessToken,
                user: data.user || null,
            },
            {
                status: 200,
                headers: {
                    "Set-Cookie": serialized,
                },
            }
        );
    } catch (error) {
        console.error('Error in login handler:', error);
        return NextResponse.json(
            { message: 'Internal Server Error' },
            { status: 500 }
        );
    }
}
