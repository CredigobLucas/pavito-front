import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
export function middleware(request: NextRequest) {
    const token = request.cookies.get("token");
    if (!token) {
        return NextResponse.redirect(new URL("/auth/login", request.nextUrl));
    }
    //TODO: validate token, redirect to login if invalid
    return NextResponse.next();
}
export const config = {
    matcher: ["/((?!api|_next/static|_next/image|favicon.ico|auth/*).*)"]
};
