"use client";
import { useGlobalContext } from "@/app/context";
import Image from "next/image";
import Link from "next/link";
export const CredigobLogo = () => {
    const { theme } = useGlobalContext();

    return (
        <Link href={"/dashboard"}>
            <Image
                className="logo"
                src={
                    theme.palette.mode === "dark"
                        ? "/logo_black.png"
                        : "/logo_white.png"
                }
                alt="logo"
                width={100}
                height={40}
            />
        </Link>
    );
};
