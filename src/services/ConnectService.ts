import { ZeroEx } from "0x.js";
import { HttpClient, TokenPairsItem } from "@0xproject/connect";
import { Order } from "@0xproject/types";
import { BigNumber } from "bignumber.js";
import * as etherUtil from "ethereumjs-util";
import { Constants } from "../Constants";
import { EthNetwork } from "../models/EthNetwork";
import { AddressService } from "./AddressService";
import { TimeService } from "./TimeService";

export class ConnectService {
    private httpClient: HttpClient;
    private exchangeContractAddress: string;

    constructor(relayerUrl: string, network: EthNetwork) {
        this.httpClient = new HttpClient(relayerUrl);
        this.exchangeContractAddress = AddressService.getExchangekAddress(network);
    }

    public getTokenPairs(makerTokenAddress: string, takerTokenAddress: string): Promise<TokenPairsItem[]> {
        return this.httpClient.getTokenPairsAsync({
            tokenA: makerTokenAddress,
            tokenB: takerTokenAddress,
        }).then((tokenPairs) => {
            const filteredPairs = this.filterBothPairs(tokenPairs, makerTokenAddress, takerTokenAddress);
            return this.organizePairs(filteredPairs, makerTokenAddress);
        });
    }

    public getOrderWithFee(maker: string, makerTokenAddress: string, takerTokenAddress: string, makerTokenAmount: BigNumber, takerTokenAmount: BigNumber, milisecondsToExpire: BigNumber): Promise<Order> {
        const getFeeRequest = {
            exchangeContractAddress: this.exchangeContractAddress,
            expirationUnixTimestampSec: TimeService.getTimeFromNow(milisecondsToExpire),
            maker: maker,
            makerTokenAddress: makerTokenAddress,
            makerTokenAmount: makerTokenAmount,
            salt: ZeroEx.generatePseudoRandomSalt(),
            taker: etherUtil.zeroAddress(),
            takerTokenAddress: takerTokenAddress,
            takerTokenAmount: takerTokenAmount,
          };
        return this.httpClient.getFeesAsync(getFeeRequest).then((fee) => {
            return {
                exchangeContractAddress: getFeeRequest.exchangeContractAddress,
                expirationUnixTimestampSec: getFeeRequest.expirationUnixTimestampSec,
                feeRecipient: fee.feeRecipient,
                maker: getFeeRequest.maker,
                makerFee: fee.makerFee,
                makerTokenAddress: getFeeRequest.makerTokenAddress,
                makerTokenAmount: getFeeRequest.makerTokenAmount,
                salt: getFeeRequest.salt,
                taker: getFeeRequest.taker,
                takerFee: fee.takerFee,
                takerTokenAddress: getFeeRequest.takerTokenAddress,
                takerTokenAmount: getFeeRequest.takerTokenAmount,
            };
        });
    }

    private filterBothPairs(tokenPairs: TokenPairsItem[], makerTokenAddress: string, takerTokenAddress: string): TokenPairsItem[] {
        return tokenPairs.filter((pair) => {
            if (pair.tokenA.address === makerTokenAddress && pair.tokenB.address === takerTokenAddress) {
                return true;
            }
            if (pair.tokenB.address === makerTokenAddress && pair.tokenA.address === takerTokenAddress) {
                return true;
            }
            return false;
        });
    }

    private organizePairs(tokenPairs: TokenPairsItem[], makerTokenAddress: string): TokenPairsItem[] {
        return tokenPairs.map((pair) => {
            if (pair.tokenA.address === makerTokenAddress) {
                return pair;
            }
            return {
                tokenA: pair.tokenB,
                tokenB: pair.tokenA,
            };
        });
    }

}
