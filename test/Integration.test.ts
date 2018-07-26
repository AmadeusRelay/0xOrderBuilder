import { ZeroEx } from "0x.js";
import { BigNumber } from "bignumber.js";
import * as chai from "chai";
import * as etherUtil from "ethereumjs-util";
import { ZeroExOrderBuilder } from "../src/0xOrderBuilder";
import { Constants } from "../src/Constants";
import { EthNetwork } from "../src/models/EthNetwork";
import { AmadeusRelayerConnection } from "../src/relayer/AmadeusRelayerConnection";
import { RelayerConnectionFactory } from "../src/relayer/RelayerConnectionFactory";
import { Constants as ConstantsTest } from "./Constants";
import { MockRelayerConnection } from "./relayer/MockRelayerConnection";

const mocha = require("mocha");
const describe = mocha.describe;
const beforeEach = mocha.beforeEach;
const it = mocha.it;

const expect = chai.expect;

describe("Integration", () => {
    beforeEach((done) => {
        RelayerConnectionFactory.register((url) => new AmadeusRelayerConnection("http://localhost:3000/api/v0"));
        done();
    });
    describe("complete flow", () => {
        describe("When parameter is correct", () => {
            it("should return signedOrder", async () => {
                const order = await ZeroExOrderBuilder.buildQuoteProviderOrder(ConstantsTest.DEFAULT_MAKER_ADDRESS,
                    ConstantsTest.ZRX_ADDRESS, ConstantsTest.WETH_ADDRESS, new BigNumber(1000000000000000000),
                    10000, ConstantsTest.REALYER_URL, EthNetwork.Kovan);
                let a = expect(order).to.be.exist;
                const signOrder = ZeroExOrderBuilder.buildSignedOrder(order, ConstantsTest.DEFAULT_MAKER_PRIVATE_KEY);
                const hash = ZeroEx.getOrderHashHex(order);
                a = expect(ZeroEx.isValidSignature(hash, signOrder.ecSignature, order.maker)).to.be.ok;
            }).timeout(10000);
        });
    });
});
