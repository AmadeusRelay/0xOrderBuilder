import { TokenPairsItem } from "@0xproject/connect";
import { Order } from "@0xproject/types";
import { BigNumber } from "bignumber.js";
import "rxjs/add/observable/fromPromise";
import "rxjs/add/operator/mergeMap";
import { Observable } from "rxjs/Observable";
import { EthNetwork } from "../models/EthNetwork";
import { ConnectService } from "./ConnectService";
import { TokenService } from "./TokenService";

export class QuoteProviderService {
    public static buildOrder(maker: string, makerTokenAddress: string, takerTokenAddress: string, makerTokenAmount: BigNumber, milisecondsToExpire: number, relayerUrl: string, network: EthNetwork): Promise<Order> {
        const connectService = new ConnectService(relayerUrl, network);
        const promiseTokenPairs = connectService.getTokenPairs(makerTokenAddress, takerTokenAddress);

        return Observable.fromPromise(promiseTokenPairs).mergeMap((tokenPairs) => {
            const tokenPair = this.filterByAmount(tokenPairs, makerTokenAmount);
            if (tokenPair == null) {
                return new Promise<Order>((resolve) => { resolve(null); });
            }
            const price = QuoteProviderService.calculatePrice(tokenPair);
            const takerTokenAmount = TokenService.getRoundedAmount(price.mul(makerTokenAmount), tokenPair.tokenA.precision);

            return connectService.getOrderWithFee(maker, makerTokenAddress, takerTokenAddress, makerTokenAmount, takerTokenAmount, milisecondsToExpire).then((order) => {
                return order;
            });
        }).toPromise();
    }

    private static calculatePrice(tokenPair: TokenPairsItem): BigNumber {
        const priceByMax = tokenPair.tokenB.maxAmount.greaterThan(0) ? tokenPair.tokenA.maxAmount.dividedBy(tokenPair.tokenB.maxAmount) : new BigNumber(0);
        const priceByMin = tokenPair.tokenB.minAmount.greaterThan(0) ? tokenPair.tokenA.minAmount.dividedBy(tokenPair.tokenB.minAmount) : new BigNumber(0);
        return priceByMax.lessThanOrEqualTo(priceByMin) ? priceByMax : priceByMin;
    }

    private static filterByAmount(tokenPairs: TokenPairsItem[], makerTokenAmount: BigNumber): TokenPairsItem {
        if (!tokenPairs || tokenPairs.length === 0) {
            return null;
        }
        const filteredAmount = tokenPairs.filter((pair) => {
            const roudedAmount = TokenService.getRoundedAmount(makerTokenAmount, pair.tokenB.precision);
            return pair.tokenB.minAmount.lessThanOrEqualTo(roudedAmount) && pair.tokenB.maxAmount.greaterThanOrEqualTo(roudedAmount);
        });
        return filteredAmount.length > 0 ? filteredAmount[0] : tokenPairs[0];
    }
}
