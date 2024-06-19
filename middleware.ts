
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';


export function middleware(req: NextRequest) {

    if (req.nextUrl.pathname === '/') {
        // Redirect to /login
        return NextResponse.redirect(new URL('/login', req.url));
    }

    // const refreshToken = req.cookies.get('refresh-istad-lms');
    // console.log("rt from middleware",refreshToken)
    //
    // if (!refreshToken) {
    //     // Redirect to login page if refreshToken is not found in the cookies
    //     return NextResponse.redirect(new URL('/login', req.url));
    // }
    //
    // // If refreshToken is found, continue with the request
    // return NextResponse.next();

}
// export const config = {
//     matcher: ['/admin/:path*', '/student/:path*', '/instructor/:path*'], // List of routes to apply the middleware to
// };

