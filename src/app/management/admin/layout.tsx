"use client";
import { useLayoutEffect, useState } from "react";
import { useGlobalContext } from "../../context";
import { useRouter } from "next/navigation";

export default function ManagmentLayout({
    children
}: {
    children: React.ReactNode;
}): JSX.Element {
    const { user, openAlertMessage } = useGlobalContext();
    const router = useRouter();
    const [authorized, setAuthorized] = useState<boolean>(false);
    useLayoutEffect(() => {
        if (user?.id) {
            if (user.is_admin) {
                setAuthorized(true);
            } else {
                openAlertMessage({
                    horizontal: "center",
                    vertical: "top",
                    severity: "error",
                    message: "No tienes permisos para acceder a esta página"
                });
                router.push("/");
            }
        }
    }, [user]);
    return <>{authorized ? <>{children}</> : <></>}</>;
}
