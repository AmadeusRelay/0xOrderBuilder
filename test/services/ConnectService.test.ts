import { ZeroEx } from "0x.js";
import { BigNumber } from "bignumber.js";
import * as chai from "chai";
import * as etherUtil from "ethereumjs-util";
import { EthNetwork } from "../../src/models/EthNetwork";
import { RelayerConnectionFactory } from "../../src/relayer/RelayerConnectionFactory";
import { ConnectService } from "../../src/services/ConnectService";
import { Constants } from "../Constants";
import { MockRelayerConnection } from "../relayer/MockRelayerConnection";

const mocha = require("mocha");
const describe = mocha.describe;
const it = mocha.it;

const expect = chai.expect;

describe("ConnectService", () => {
    RelayerConnectionFactory.register((url) => new MockRelayerConnection());
    describe("getTokenPairs", () => {
        describe("When get valid pairs", () => {
            it("should return 1 pair", async () => {
                const service = new ConnectService(Constants.REALYER_URL, EthNetwork.Kovan);
                const pairs = await service.getTokenPairs(Constants.WETH_ADDRESS, Constants.ZRX_ADDRESS);
                const len = expect(pairs.length === 1).to.be.ok;
                const taker = expect(pairs[0].tokenA.address).to.be.equal(Constants.ZRX_ADDRESS);
                const maker = expect(pairs[0].tokenB.address).to.be.equal(Constants.WETH_ADDRESS);
            }).timeout(10000);
        });
        describe("When get invalid pairs", () => {
            it("should return 0 pairs", async () => {
                const service = new ConnectService(Constants.REALYER_URL, EthNetwork.Kovan);
                const pairs = await service.getTokenPairs(etherUtil.zeroAddress(), Constants.ZRX_ADDRESS);
                const a = expect(pairs.length === 0).to.be.ok;
            }).timeout(10000);
        });
        describe("When get null maker token address", () => {
            it("should throw error", async () => {
                const service = new ConnectService(Constants.REALYER_URL, EthNetwork.Kovan);
                const a = expect(() => service.getTokenPairs(null, Constants.ZRX_ADDRESS)).to.throw(Error, "MakerTokenAddress is not a valid address.");
            }).timeout(10000);
        });
        describe("When get invalid maker token address", () => {
            it("should throw error", async () => {
                const service = new ConnectService(Constants.REALYER_URL, EthNetwork.Kovan);

                const a = expect(() => service.getTokenPairs("0x1234567890", Constants.ZRX_ADDRESS)).to.throw(Error, "MakerTokenAddress is not a valid address.");
            }).timeout(10000);
        });
        describe("When get null taker token address", () => {
            it("should throw error", async () => {
                const service = new ConnectService(Constants.REALYER_URL, EthNetwork.Kovan);
                const a = expect(() => service.getTokenPairs(Constants.ZRX_ADDRESS, null)).to.throw(Error, "TakerTokenAddress is not a valid address.");
            }).timeout(10000);
        });
        describe("When get invalid taker token address", () => {
            it("should throw error", async () => {
                const service = new ConnectService(Constants.REALYER_URL, EthNetwork.Kovan);

                const a = expect(() => service.getTokenPairs(Constants.ZRX_ADDRESS, "0x1234567890")).to.throw(Error, "TakerTokenAddress is not a valid address.");
            }).timeout(10000);
        });
    });
    describe("getOrderWithFee", () => {
        describe("When parameter is correct", () => {
            it("should return order", async () => {
                const service = new ConnectService(Constants.REALYER_URL, EthNetwork.Kovan);
                const order = await service.getOrderWithFee(Constants.DEFAULT_MAKER_ADDRESS,
                    Constants.ZRX_ADDRESS, Constants.WETH_ADDRESS, new BigNumber(100000000000000000000),
                    new BigNumber(1000000000000000000), 10000);
                const a = expect(order).to.be.exist;
            }).timeout(10000);
        });
        describe("When maker address is not lower case", () => {
            it("should return order", async () => {
                const service = new ConnectService(Constants.REALYER_URL, EthNetwork.Kovan);
                const order = await service.getOrderWithFee(Constants.MAKER_ADDRESS_INVALID_CASE,
                    Constants.ZRX_ADDRESS, Constants.WETH_ADDRESS, new BigNumber(100000000000000000000),
                    new BigNumber(1000000000000000000), 10000);
                const a = expect(order).to.be.exist;
            }).timeout(10000);
        });
        describe("When get null maker address", () => {
            it("should throw error", async () => {
                const service = new ConnectService(Constants.REALYER_URL, EthNetwork.Kovan);
                const a = expect(() => service.getOrderWithFee(null,
                    null, Constants.WETH_ADDRESS, new BigNumber(100000000000000000000),
                    new BigNumber(1000000000000000000), 10000)).to.throw(Error, "Maker is not a valid address.");
            }).timeout(10000);
        });
        describe("When get invalid maker address", () => {
            it("should throw error", async () => {
                const service = new ConnectService(Constants.REALYER_URL, EthNetwork.Kovan);

                const a = expect(() => service.getOrderWithFee("0x1234567890",
                    Constants.ZRX_ADDRESS, Constants.WETH_ADDRESS, new BigNumber(100000000000000000000),
                    new BigNumber(1000000000000000000), 10000)).to.throw(Error, "Maker is not a valid address.");
            }).timeout(10000);
        });
        describe("When get null maker token address", () => {
            it("should throw error", async () => {
                const service = new ConnectService(Constants.REALYER_URL, EthNetwork.Kovan);
                const a = expect(() => service.getOrderWithFee(Constants.MAKER_ADDRESS_INVALID_CASE,
                    null, Constants.WETH_ADDRESS, new BigNumber(100000000000000000000),
                    new BigNumber(1000000000000000000), 10000)).to.throw(Error, "MakerTokenAddress is not a valid address.");
            }).timeout(10000);
        });
        describe("When get invalid maker token address", () => {
            it("should throw error", async () => {
                const service = new ConnectService(Constants.REALYER_URL, EthNetwork.Kovan);

                const a = expect(() => service.getOrderWithFee(Constants.MAKER_ADDRESS_INVALID_CASE,
                    "0x1234567890", Constants.WETH_ADDRESS, new BigNumber(100000000000000000000),
                    new BigNumber(1000000000000000000), 10000)).to.throw(Error, "MakerTokenAddress is not a valid address.");
            }).timeout(10000);
        });
        describe("When get null taker token address", () => {
            it("should throw error", async () => {
                const service = new ConnectService(Constants.REALYER_URL, EthNetwork.Kovan);
                const a = expect(() => service.getOrderWithFee(Constants.MAKER_ADDRESS_INVALID_CASE,
                    Constants.ZRX_ADDRESS, null, new BigNumber(100000000000000000000),
                    new BigNumber(1000000000000000000), 10000)).to.throw(Error, "TakerTokenAddress is not a valid address.");
            }).timeout(10000);
        });
        describe("When get invalid taker token address", () => {
            it("should throw error", async () => {
                const service = new ConnectService(Constants.REALYER_URL, EthNetwork.Kovan);

                const a = expect(() => service.getOrderWithFee(Constants.MAKER_ADDRESS_INVALID_CASE,
                    Constants.ZRX_ADDRESS, "0x1234567890", new BigNumber(100000000000000000000),
                    new BigNumber(1000000000000000000), 10000)).to.throw(Error, "TakerTokenAddress is not a valid address.");
            }).timeout(10000);
        });

    });
});
