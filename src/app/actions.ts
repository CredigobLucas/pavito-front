"use server";
import { cookies } from "next/headers";
import { CognitoJwtVerifier } from "aws-jwt-verify";
import { SimpleJwksCache } from "aws-jwt-verify/jwk";
import { SimpleJsonFetcher } from "aws-jwt-verify/https";

interface CookieOptions {
    name: string;
    value: string;
    expiration: number;
}


export const validateJWT = async (token: string): Promise<boolean> => {
    try {
        const maxTimeout = 1e6;
        const [idToken, accessToken] = token.split(' ');
        const userPoolId: string = process.env.USER_POOL_ID || "";
        const clientId: string = process.env.CLIENT_ID || "";

        const tokenVerifier = CognitoJwtVerifier.create({
            userPoolId: userPoolId,
            clientId: clientId,
            timeOut: maxTimeout,
            jwksCache: new SimpleJwksCache({
                fetcher: new SimpleJsonFetcher({
                    defaultRequestOptions: {
                        maxTimeout: maxTimeout,
                    }
                })
            })
        });
        await tokenVerifier.verify(idToken, {
            tokenUse: "id",
        });
        await tokenVerifier.verify(accessToken, {
            tokenUse: "access",
        });

        return true;
    } catch (error) {
        // console.error('Error validating JWT:', error);
        return false;
    }
};


export const setCookie = async ({ name, value, expiration }: CookieOptions): Promise<void> => {
    await cookies().set(name, value, {
        maxAge: expiration
    });
};

export const getCookie = async (name: string): Promise<string | undefined> => {
    const cookie = await cookies().get(name);
    if (!cookie) 
        return undefined;
    const validated = await validateJWT(cookie.value);
    if (validated)
        return cookie.value;
    removeCookie(name);
    return undefined;
};

export const removeCookie = async (name: string): Promise<void> => {
    await cookies().set(name, "", {
        maxAge: 0
    });
}