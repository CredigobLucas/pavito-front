"use server";
import { cookies } from "next/headers";
import { ResponseCookie } from "next/dist/compiled/@edge-runtime/cookies";
interface CookieOptions {
    name: string;
    value: string;
    expiration: number;
}

export const setCookie = ({ name, value, expiration }: CookieOptions) => {
    cookies().set(name, value, {
        maxAge: expiration
    });
};
