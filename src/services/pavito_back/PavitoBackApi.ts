import { Api } from "../Api";

let singleton: PavitoBackApi | null = null;

export class PavitoBackApi extends Api {
    constructor() {
        if (!singleton) {
            super("https://admin.back.pavito.credigob.pe/api/v1/");
            singleton = this;
        }
        //get culqiToken from localStorage
        const token = localStorage.getItem("token");
        if (token) {
            singleton.setHeader("Authorization", `Bearer ${token}`);
        }
        return singleton;
    }
}

export const setToken = (token: string) => {
    const api = new PavitoBackApi();
    api.setHeader("Authorization", `Bearer ${token}`);
};
