import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { userMe } from "./services/pavito_back/user/get";

export function middleware(request: NextRequest) {
    const token = request.cookies.get("token");
    if (!token) {
        return NextResponse.redirect(new URL("/auth/login", request.nextUrl));
    }

    if (request.nextUrl.pathname === "/") {
        return NextResponse.redirect(new URL("/dashboard", request.nextUrl));
    }

    return NextResponse.next();
}

export const config = {
    matcher: ["/((?!api|_next/static|_next/image|favicon.ico|auth/*).*)"]
};
