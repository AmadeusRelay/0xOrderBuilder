import { ZeroEx } from "0x.js";
import { BigNumber } from "bignumber.js";
import * as chai from "chai";
import * as etherUtil from "ethereumjs-util";
import { EthNetwork } from "../../src/models/EthNetwork";
import { ConnectService } from "../../src/services/ConnectService";
import { Constants } from "../Constants";

const mocha = require("mocha");
const describe = mocha.describe;
const it = mocha.it;

const expect = chai.expect;

describe("ConnectService", () => {
    describe("getTokenPairs", () => {
        describe("When get valid pairs", () => {
            it("should return 2 pairs", async () => {
                const service = new ConnectService(Constants.REALYER_URL, EthNetwork.Kovan);
                const pairs = await service.getTokenPairs(Constants.WETH_ADDRESS, Constants.ZRX_ADDRESS);
                const a = expect(pairs.length === 2).to.be.ok;
            }).timeout(10000);
        });
        describe("When get invalid pairs", () => {
            it("should return 0 pairs", async () => {
                const service = new ConnectService(Constants.REALYER_URL, EthNetwork.Kovan);
                const pairs = await service.getTokenPairs(etherUtil.zeroAddress(), Constants.ZRX_ADDRESS);
                const a = expect(pairs.length === 0).to.be.ok;
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
    });
});
