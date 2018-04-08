import { ZeroEx } from "0x.js";
import { BigNumber } from "bignumber.js";
import * as chai from "chai";
import * as etherUtil from "ethereumjs-util";
import { ZeroExOrderBuilder } from "../src/0xOrderBuilder";
import { Constants } from "../src/Constants";
import { EthNetwork } from "../src/models/EthNetwork";
import { Constants as ConstantsTest } from "./Constants";

const mocha = require("mocha");
const describe = mocha.describe;
const it = mocha.it;

const expect = chai.expect;

describe("ZeroExOrderBuilder", () => {
    describe("buildSignedOrder", () => {
            describe("When order is signed", () => {
            it("should verify signature", () => {
                const order = {
                    exchangeContractAddress: Constants.KOVAN_EXCHANGE_ADDRESS,
                    expirationUnixTimestampSec: new BigNumber(100000),
                    feeRecipient: etherUtil.zeroAddress(),
                    maker: ConstantsTest.DEFAULT_MAKER_ADDRESS,
                    makerFee: new BigNumber(0),
                    makerTokenAddress: etherUtil.zeroAddress(),
                    makerTokenAmount: new BigNumber(10),
                    salt: ZeroEx.generatePseudoRandomSalt(),
                    taker: etherUtil.zeroAddress(),
                    takerFee: new BigNumber(0),
                    takerTokenAddress: etherUtil.zeroAddress(),
                    takerTokenAmount: new BigNumber(20),
                };
                const signOrder = ZeroExOrderBuilder.buildSignedOrder(order, ConstantsTest.DEFAULT_MAKER_PRIVATE_KEY);
                const hash = ZeroEx.getOrderHashHex(order);
                const a = expect(ZeroEx.isValidSignature(hash, signOrder.ecSignature, order.maker)).to.be.ok;
            });
        });
    });
    describe("buildQuoteProviderOrder", () => {
        describe("When parameter is correct", () => {
            it("should return order", async () => {
                const order = await ZeroExOrderBuilder.buildQuoteProviderOrder(ConstantsTest.DEFAULT_MAKER_ADDRESS,
                    ConstantsTest.ZRX_ADDRESS, ConstantsTest.WETH_ADDRESS, new BigNumber(1000000000000000000),
                    new BigNumber(1000), ConstantsTest.REALYER_URL, EthNetwork.Kovan);
                let a = expect(order).to.be.exist;
                a = expect(order.makerFee.greaterThan(0)).to.be.ok;
            }).timeout(10000);
        });
    });
    describe("complete flow", () => {
        describe("When parameter is correct", () => {
            it("should return signedOrder", async () => {
                const order = await ZeroExOrderBuilder.buildQuoteProviderOrder(ConstantsTest.DEFAULT_MAKER_ADDRESS,
                    ConstantsTest.ZRX_ADDRESS, ConstantsTest.WETH_ADDRESS, new BigNumber(1000000000000000000),
                    new BigNumber(1000), ConstantsTest.REALYER_URL, EthNetwork.Kovan);
                let a = expect(order).to.be.exist;
                const signOrder = ZeroExOrderBuilder.buildSignedOrder(order, ConstantsTest.DEFAULT_MAKER_PRIVATE_KEY);
                const hash = ZeroEx.getOrderHashHex(order);
                a = expect(ZeroEx.isValidSignature(hash, signOrder.ecSignature, order.maker)).to.be.ok;
            }).timeout(10000);
        });
    });
});
