import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(req: NextRequest) {

    if (req.nextUrl.pathname === '/') {
        // Redirect to /login
        return NextResponse.redirect(new URL('/login', req.url));
    }

    return NextResponse.next();
}
