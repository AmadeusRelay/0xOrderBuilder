import { ZeroEx } from "0x.js";
import { BigNumber } from "bignumber.js";
import * as chai from "chai";
import * as etherUtil from "ethereumjs-util";
import { Constants } from "../../src/Constants";
import { SignService } from "../../src/services/SignService";
import { Constants as ConstantsTest } from "../Constants";

const mocha = require("mocha");
const describe = mocha.describe;
const it = mocha.it;

const expect = chai.expect;

describe("SignService", () => {
    describe("signOrder", () => {
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
                const signOrder = SignService.signOrder(order, ConstantsTest.DEFAULT_MAKER_PRIVATE_KEY);
                const hash = ZeroEx.getOrderHashHex(order);
                const a = expect(ZeroEx.isValidSignature(hash, signOrder.ecSignature, order.maker)).to.be.ok;
            });
        });
        describe("When private key doesn't start with '0x", () => {
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
                const signOrder = SignService.signOrder(order, ConstantsTest.DEFAULT_MAKER_PRIVATE_KEY.substr(2));
                const hash = ZeroEx.getOrderHashHex(order);
                const a = expect(ZeroEx.isValidSignature(hash, signOrder.ecSignature, order.maker)).to.be.ok;
            });
        });
        describe("When private key doesn't match maker address", () => {
            it("should not verify signature", () => {
                const order = {
                    exchangeContractAddress: Constants.KOVAN_EXCHANGE_ADDRESS,
                    expirationUnixTimestampSec: new BigNumber(100000),
                    feeRecipient: etherUtil.zeroAddress(),
                    maker: ConstantsTest.OTHER_MAKER_ADDRESS,
                    makerFee: new BigNumber(0),
                    makerTokenAddress: etherUtil.zeroAddress(),
                    makerTokenAmount: new BigNumber(10),
                    salt: ZeroEx.generatePseudoRandomSalt(),
                    taker: etherUtil.zeroAddress(),
                    takerFee: new BigNumber(0),
                    takerTokenAddress: etherUtil.zeroAddress(),
                    takerTokenAmount: new BigNumber(20),
                };
                const signOrder = SignService.signOrder(order, ConstantsTest.DEFAULT_MAKER_PRIVATE_KEY.substr(2));
                const hash = ZeroEx.getOrderHashHex(order);
                const a = expect(ZeroEx.isValidSignature(hash, signOrder.ecSignature, order.maker)).to.be.not.ok;
            });
        });
        describe("When maker address is not lower case", () => {
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
                const signOrder = SignService.signOrder(order, ConstantsTest.DEFAULT_MAKER_PRIVATE_KEY);
                const hash = ZeroEx.getOrderHashHex(order);
                const a = expect(ZeroEx.isValidSignature(hash, signOrder.ecSignature, order.maker)).to.be.ok;
            });
        });
    });
});
