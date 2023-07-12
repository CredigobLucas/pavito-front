"use server";
import { cookies } from "next/headers";

interface CookieOptions {
    name: string;
    value: string;
}

export const setCookie = async ({ name, value }: CookieOptions) => {
    cookies().set(name, value);
};
