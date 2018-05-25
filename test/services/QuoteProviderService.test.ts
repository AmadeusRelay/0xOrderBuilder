import { ZeroEx } from "0x.js";
import { BigNumber } from "bignumber.js";
import * as chai from "chai";
import * as etherUtil from "ethereumjs-util";
import { EthNetwork } from "../../src/models/EthNetwork";
import { RelayerConnectionFactory } from "../../src/relayer/RelayerConnectionFactory";
import { QuoteProviderService } from "../../src/services/QuoteProviderService";
import { Constants } from "../Constants";
import { MockRelayerConnection } from "../relayer/MockRelayerConnection";

const mocha = require("mocha");
const describe = mocha.describe;
const it = mocha.it;

const expect = chai.expect;

describe("QuoteProviderService", () => {
    RelayerConnectionFactory.register((url) => new MockRelayerConnection());
    describe("buildOrder", () => {
        describe("When parameter is correct, high amount", () => {
            it("should return order", async () => {
                const order = await QuoteProviderService.buildOrder(Constants.DEFAULT_MAKER_ADDRESS,
                    Constants.ZRX_ADDRESS, Constants.WETH_ADDRESS, new BigNumber(1000000000000000000),
                    10000, Constants.REALYER_URL, EthNetwork.Kovan);
                let a = expect(order).to.be.exist;
                a = expect(order.makerFee.greaterThan(0)).to.be.true;
            }).timeout(10000);
        });
        describe("When parameter is correct, low amount", () => {
            it("should return order", async () => {
                const order = await QuoteProviderService.buildOrder(Constants.DEFAULT_MAKER_ADDRESS,
                    Constants.ZRX_ADDRESS, Constants.WETH_ADDRESS, new BigNumber(1000000000),
                    10000, Constants.REALYER_URL, EthNetwork.Kovan);
                let a = expect(order).to.be.exist;
                a = expect(order.makerFee.greaterThan(0)).to.be.true;
            }).timeout(10000);
        });
        describe("When price is zero", () => {
            it("should return order with takerTokeAmount equals zero", async () => {
                const order = await QuoteProviderService.buildOrder(Constants.DEFAULT_MAKER_ADDRESS,
                    Constants.ZRX_ADDRESS, Constants.REP_ADDRESS, new BigNumber(1000000000),
                    10000, Constants.REALYER_URL, EthNetwork.Kovan);
                let a = expect(order).to.be.exist;
                a = expect(order.takerTokenAmount.equals(0)).to.be.true;
            }).timeout(10000);
        });
        describe("When maker token is invalid", () => {
            it("should not return order", async () => {
                const order = await QuoteProviderService.buildOrder(Constants.DEFAULT_MAKER_ADDRESS,
                    etherUtil.zeroAddress(), Constants.WETH_ADDRESS, new BigNumber(100000000000000000000),
                    10000, Constants.REALYER_URL, EthNetwork.Kovan);
                const a = expect(order).to.be.not.exist;
            }).timeout(10000);
        });
    });
});
