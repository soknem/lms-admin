
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import {MiddlewareAPI} from "@reduxjs/toolkit";


export async function middleware(req: NextRequest,api: MiddlewareAPI) {

    if (req.nextUrl.pathname === '/') {
        return NextResponse.redirect(new URL('/login', req.url));
    }

    const refreshToken = req.cookies.get('refresh-istad-lms');

    if (!refreshToken) {
        return NextResponse.redirect(new URL('/login', req.url));
    }

    return NextResponse.next();

}
export const config = {
    matcher: ['/','/admin/:path*', '/student/:path*', '/instructor/:path*'], // List of routes to apply the CustomMiddleware to
};

