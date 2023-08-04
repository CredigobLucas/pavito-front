"use server";
import { cookies } from "next/headers";
import { CognitoJwtVerifier } from "aws-jwt-verify";

interface CookieOptions {
    name: string;
    value: string;
    expiration: number;
}

export const validateJWT = async (token: string): Promise<boolean> => {
    try {
        const [idToken, accessToken] = token.split(' ');
        const userPoolId = process.env.USER_POOL_ID || "";
        const clientId = process.env.CLIENT_ID || "";
        const idTokenVerifier = CognitoJwtVerifier.create({
            userPoolId: userPoolId,
            tokenUse: "id",
            clientId: clientId,
        });
        await idTokenVerifier.verify(idToken);
        const accessTokenVerifier = CognitoJwtVerifier.create({
            userPoolId: userPoolId,
            tokenUse: "access",
            clientId: clientId,
        });
        await accessTokenVerifier.verify(accessToken);
        return true;
    } catch (error) {
        console.error('Error validating JWT:', error);
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