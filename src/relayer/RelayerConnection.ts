import { FeesRequest, FeesResponse, TokenPairsItem, TokenPairsRequestOpts } from "@0xproject/connect";

export interface RelayerConnection {
    getTokenPairsAsync(requestOpts?: TokenPairsRequestOpts): Promise<TokenPairsItem[]>;
    getFeesAsync(request: FeesRequest): Promise<FeesResponse>;
}
