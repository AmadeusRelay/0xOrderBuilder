import { FeesRequest, FeesResponse, HttpClient, TokenPairsItem, TokenPairsRequestOpts } from "@0xproject/connect";
import axios from "axios";
import { AxiosInstance } from "axios";
import { Price } from "../models/Price";
import { RelayerConnection } from "./RelayerConnection";

export class AmadeusRelayerConnection implements RelayerConnection {
    private httpClient: HttpClient;
    private axiosInstance: AxiosInstance;

    constructor(relayerUrl: string) {
        this.httpClient = new HttpClient(relayerUrl);
        this.axiosInstance = axios.create({
            baseURL: relayerUrl,
        });
    }

    public getFeesAsync(request: FeesRequest): Promise<FeesResponse> {
        return this.httpClient.getFeesAsync(request);
    }

    public async getPrice(tokenFromAddress: string, tokenToAddress: string, trader: string): Promise<Price> {
        try
        {
            const response = await this.axiosInstance.get("/prices", {
                params: {
                    tokenFrom: tokenFromAddress,
                    tokenTo: tokenToAddress,
                    trader: trader,
                }});
            return response.data;
        } catch (e) {
            console.log(e);
        }
    }
}
