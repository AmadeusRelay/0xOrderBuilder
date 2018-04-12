import { FeesRequest, FeesResponse, HttpClient, TokenPairsItem, TokenPairsRequestOpts } from "@0xproject/connect";
import { RelayerConnection } from "./RelayerConnection";

export class ZeroExConnectRelayerConnection implements RelayerConnection {
    private httpClient: HttpClient;

    constructor(relayerUrl: string) {
        this.httpClient = new HttpClient(relayerUrl);
    }

    public getTokenPairsAsync(requestOpts?: TokenPairsRequestOpts): Promise<TokenPairsItem[]> {
        return this.httpClient.getTokenPairsAsync(requestOpts);
    }

    public getFeesAsync(request: FeesRequest): Promise<FeesResponse> {
        return this.httpClient.getFeesAsync(request);
    }

}