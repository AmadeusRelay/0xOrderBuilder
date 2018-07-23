import { FeesRequest, FeesResponse, TokenPairsItem, TokenPairsRequestOpts } from "@0xproject/connect";
import { Price } from "../models/Price";

export interface RelayerConnection {
    getFeesAsync(request: FeesRequest): Promise<FeesResponse>;
    getPrice(tokenFromAddress: string, tokenToAddress: string, trader: string): Promise<Price>;
}
