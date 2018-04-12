import { ZeroEx } from "0x.js";
import { Order, SignedOrder } from "@0xproject/types";
import * as etherUtil from "ethereumjs-util";

export class SignService {
    public static signOrder(order: Order, privateKey: string): SignedOrder {
        const orderHash = ZeroEx.getOrderHashHex(order);
        privateKey = privateKey.startsWith("0x") ? privateKey : "0x" + privateKey;
        const signature = etherUtil.ecsign(etherUtil.hashPersonalMessage(etherUtil.toBuffer(orderHash)), etherUtil.toBuffer(privateKey));
        return {
            ecSignature: {
                r: etherUtil.bufferToHex(signature.r),
                s: etherUtil.bufferToHex(signature.s),
                v: signature.v,
            },
            exchangeContractAddress: order.exchangeContractAddress.toLocaleLowerCase(),
            expirationUnixTimestampSec: order.expirationUnixTimestampSec,
            feeRecipient: order.feeRecipient,
            maker: order.maker.toLocaleLowerCase(),
            makerFee: order.makerFee,
            makerTokenAddress: order.makerTokenAddress.toLocaleLowerCase(),
            makerTokenAmount: order.makerTokenAmount,
            salt: order.salt,
            taker: order.taker,
            takerFee: order.takerFee,
            takerTokenAddress: order.takerTokenAddress.toLocaleLowerCase(),
            takerTokenAmount: order.takerTokenAmount,
        };
    }
}
