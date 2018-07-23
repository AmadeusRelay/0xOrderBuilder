import { TokenPairsItem } from "@0xproject/connect";
import { Order } from "@0xproject/types";
import { BigNumber } from "bignumber.js";
import "rxjs/add/observable/fromPromise";
import "rxjs/add/operator/mergeMap";
import { Observable } from "rxjs/Observable";
import { EthNetwork } from "../models/EthNetwork";
import { ConnectService } from "./ConnectService";

export class QuoteProviderService {
    public static buildOrder(maker: string, makerTokenAddress: string, takerTokenAddress: string, makerTokenAmount: BigNumber, milisecondsToExpire: number, relayerUrl: string, network: EthNetwork): Promise<Order> {
        const connectService = new ConnectService(relayerUrl, network);
        const promisePrice = connectService.getPrice(makerTokenAddress, takerTokenAddress, maker);
        return Observable.fromPromise(promisePrice).mergeMap((price) => {
            if (price === undefined) {
                return new Promise<Order>((resolve) => { resolve(null); });
            }
            const takerTokenAmount = new BigNumber(price.price).mul(makerTokenAmount).dividedToIntegerBy(1);

            return connectService.getOrderWithFee(maker, makerTokenAddress, takerTokenAddress, makerTokenAmount, takerTokenAmount, milisecondsToExpire).then((order) => {
                return order;
            });
        }).toPromise();
    }
}
