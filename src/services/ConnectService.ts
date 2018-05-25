import { ZeroEx } from "0x.js";
import { TokenPairsItem } from "@0xproject/connect";
import { Order } from "@0xproject/types";
import { BigNumber } from "bignumber.js";
import * as etherUtil from "ethereumjs-util";
import { Constants } from "../Constants";
import { EthNetwork } from "../models/EthNetwork";
import { RelayerConnection } from "../relayer/RelayerConnection";
import { RelayerConnectionFactory } from "../relayer/RelayerConnectionFactory";
import { AddressService } from "./AddressService";
import { TimeService } from "./TimeService";

export class ConnectService {
    private relayerConnection: RelayerConnection;
    private exchangeContractAddress: string;

    constructor(relayerUrl: string, network: EthNetwork) {
        this.relayerConnection = RelayerConnectionFactory.create(relayerUrl);
        this.exchangeContractAddress = AddressService.getExchangekAddress(network);
    }

    public getTokenPairs(makerTokenAddress: string, takerTokenAddress: string): Promise<TokenPairsItem[]> {
        if (!etherUtil.isValidAddress(makerTokenAddress)) {
            throw new Error("MakerTokenAddress is not a valid address.");
        }
        if (!etherUtil.isValidAddress(takerTokenAddress)) {
            throw new Error("TakerTokenAddress is not a valid address.");
        }
        return this.relayerConnection.getTokenPairsAsync({
            tokenA: makerTokenAddress,
            tokenB: takerTokenAddress,
        }).then((tokenPairs) => {
            return this.filterExactPair(tokenPairs, makerTokenAddress, takerTokenAddress);
        });
    }

    public getOrderWithFee(maker: string, makerTokenAddress: string, takerTokenAddress: string, makerTokenAmount: BigNumber, takerTokenAmount: BigNumber, milisecondsToExpire: number): Promise<Order> {
        if (!etherUtil.isValidAddress(maker)) {
            throw new Error("Maker is not a valid address.");
        }
        if (!etherUtil.isValidAddress(makerTokenAddress)) {
            throw new Error("MakerTokenAddress is not a valid address.");
        }
        if (!etherUtil.isValidAddress(takerTokenAddress)) {
            throw new Error("TakerTokenAddress is not a valid address.");
        }
        const getFeeRequest = {
            exchangeContractAddress: this.exchangeContractAddress.toLocaleLowerCase(),
            expirationUnixTimestampSec: TimeService.getTimeFromNow(milisecondsToExpire),
            maker: maker.toLocaleLowerCase(),
            makerTokenAddress: makerTokenAddress.toLocaleLowerCase(),
            makerTokenAmount: makerTokenAmount,
            salt: ZeroEx.generatePseudoRandomSalt(),
            taker: etherUtil.zeroAddress(),
            takerTokenAddress: takerTokenAddress.toLocaleLowerCase(),
            takerTokenAmount: takerTokenAmount,
          };
        return this.relayerConnection.getFeesAsync(getFeeRequest).then((fee) => {
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

    private filterExactPair(tokenPairs: TokenPairsItem[], makerTokenAddress: string, takerTokenAddress: string): TokenPairsItem[] {
        return tokenPairs.filter((pair) => {
            if (pair.tokenB.address === makerTokenAddress && pair.tokenA.address === takerTokenAddress) {
                return true;
            }
            return false;
        });
    }

}
