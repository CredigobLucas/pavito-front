"use server";
import { cookies } from "next/headers";
interface CookieOptions {
    name: string;
    value: string;
    expiration: number;
}

export const setCookie = async ({ name, value, expiration }: CookieOptions) => {
    await cookies().set(name, value, {
        maxAge: expiration
    });
};

export const getCookie = async (name: string): Promise<string | undefined> => {
    const cookie = await cookies().get(name);
    return cookie?.value;
};
