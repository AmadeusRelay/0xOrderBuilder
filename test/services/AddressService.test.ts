import * as chai from "chai";
import { Constants } from "../../src/Constants";
import { EthNetwork } from "../../src/models/EthNetwork";
import { AddressService } from "../../src/services/AddressService";

const mocha = require("mocha");
const describe = mocha.describe;
const it = mocha.it;

const expect = chai.expect;

describe("AddressService", () => {
    describe("getExchangekAddress", () => {
        describe("When EthNetwork.Kovan is informed", () => {
            it("should return Kovan address", () => {
                expect(AddressService.getExchangekAddress(EthNetwork.Kovan)).to.equal(Constants.KOVAN_EXCHANGE_ADDRESS);
            });
        });
        describe("When EthNetwork.Mainnet is informed", () => {
            it("should return Mainnet address", () => {
                expect(AddressService.getExchangekAddress(EthNetwork.Mainnet)).to.equal(Constants.MAINNET_EXCHANGE_ADDRESS);
            });
        });
        describe("When null is informed", () => {
            it("should return Mainnet address", () => {
                const a = expect(AddressService.getExchangekAddress(null)).to.not.exist;
            });
        });
    });
});
