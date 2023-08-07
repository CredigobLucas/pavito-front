import { Api } from "../Api";

let singleton: PavitoBackApi | null = null;

export class PavitoBackApi extends Api {
    constructor() {
        if (!singleton) {
            super(process.env.NEXT_PUBLIC_PAVITO_API_URL || "");
            singleton = this;
        }
        return singleton;
    }
}

export const setToken = (token: string): void => {
    const api = new PavitoBackApi();
    api.setHeader("Authorization", `Bearer ${token}`);
};
