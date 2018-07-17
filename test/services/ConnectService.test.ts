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
    describe("getPrice", () => {
        describe("When get valid parameters", () => {
            it("should return price", async () => {
                const service = new ConnectService(Constants.REALYER_URL, EthNetwork.Kovan);
                const price = await service.getPrice(Constants.WETH_ADDRESS, Constants.ZRX_ADDRESS, Constants.DEFAULT_MAKER_ADDRESS);
                const len = expect(price).to.be.exist;
            }).timeout(10000);
        });
        describe("When get invalid maker token", () => {
            it("should throw error", async () => {
                const service = new ConnectService(Constants.REALYER_URL, EthNetwork.Kovan);
                const a = expect(() => service.getPrice("0x1234567890", Constants.ZRX_ADDRESS, Constants.DEFAULT_MAKER_ADDRESS)).to.throw(Error, "MakerTokenAddress is not a valid address.");
            }).timeout(10000);
        });
        describe("When get invalid taker token", () => {
            it("should throw error", async () => {
                const service = new ConnectService(Constants.REALYER_URL, EthNetwork.Kovan);
                const a = expect(() => service.getPrice(Constants.WETH_ADDRESS, "0x1234567890", Constants.DEFAULT_MAKER_ADDRESS)).to.throw(Error, "TakerTokenAddress is not a valid address.");
            }).timeout(10000);
        });
        describe("When get null maker token", () => {
            it("should throw error", async () => {
                const service = new ConnectService(Constants.REALYER_URL, EthNetwork.Kovan);
                const a = expect(() => service.getPrice(null, Constants.ZRX_ADDRESS, Constants.DEFAULT_MAKER_ADDRESS)).to.throw(Error, "MakerTokenAddress is not a valid address.");
            }).timeout(10000);
        });
        describe("When get null taker token", () => {
            it("should throw error", async () => {
                const service = new ConnectService(Constants.REALYER_URL, EthNetwork.Kovan);
                const a = expect(() => service.getPrice(Constants.WETH_ADDRESS, null, Constants.DEFAULT_MAKER_ADDRESS)).to.throw(Error, "TakerTokenAddress is not a valid address.");
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
