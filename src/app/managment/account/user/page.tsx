"use client";
import { useGlobalContext } from "@/app/context";
import { useEffect } from "react";

export default function Account() {
    const { setSectionTitle } = useGlobalContext();
    useEffect(() => {
        setSectionTitle("Perfil");
    }, []);
    return (
        <div>
            <h1>Account</h1>
        </div>
    );
}
