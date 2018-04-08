import { ZeroEx } from "0x.js";
import { Order, SignedOrder } from "@0xproject/types";
import { BigNumber } from "bignumber.js";
import { EthNetwork } from "./models/EthNetwork";
import { QuoteProviderService } from "./services/QuoteProviderService";
import { SignService } from "./services/SignService";

export class ZeroExOrderBuilder {

    public static buildQuoteProviderOrder(maker: string, makerTokenAddress: string, takerTokenAddress: string, makerTokenAmount: BigNumber, milisecondsToExpire: BigNumber, relayerUrl: string, network: EthNetwork): Promise<Order> {
        return QuoteProviderService.buildOrder(maker, makerTokenAddress, takerTokenAddress, makerTokenAmount, milisecondsToExpire, relayerUrl, network);
    }

    public static buildSignedOrder(order: Order, privateKey: string): SignedOrder {
        return SignService.signOrder(order, privateKey);
    }

}
