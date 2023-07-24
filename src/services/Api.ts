import axios, { AxiosInstance } from "axios";
import { Payload } from "./Payload";

export class Api {
  protected instance: AxiosInstance;
  constructor(url: string) {
    this.instance = axios.create({
      baseURL: url,
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
    });
  }

  public setHeader(name: string, value: string): void {
    this.instance.defaults.headers.common[name] = value;
  }

  public async get<T>(url: string, payload?: Payload): Promise<T> {
    const response = await this.instance.get<T>(url, { params: payload });
    return response.data;
  }

  public async post<T>(url: string, data: Payload): Promise<T> {
    const response = await this.instance.post<T>(url, data);
    return response.data;
  }

  public async put<T>(url: string, data: Payload): Promise<T> {
    const response = await this.instance.put<T>(url, data);
    return response.data;
  }

  public async delete<T>(url: string): Promise<T> {
    const response = await this.instance.delete<T>(url);
    return response.data;
  }
}
