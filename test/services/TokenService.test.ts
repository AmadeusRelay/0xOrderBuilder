import { BigNumber } from "bignumber.js";
import * as chai from "chai";
import { TokenService } from "../../src/services/TokenService";

const mocha = require("mocha");
const describe = mocha.describe;
const it = mocha.it;

const expect = chai.expect;

describe("TokenService", () => {
    describe("getRoundedAmount", () => {
        describe("When precision equals 18 is informed", () => {
            it("should not round",  () => {
                expect(TokenService.getRoundedAmount(new BigNumber("12123456789012345678"), 18).toFormat()).to.equal(new BigNumber("12123456789012345678").toFormat());
            });
        });
        describe("When precision equals 10 is informed", () => {
            it("should round correctly", () => {
                expect(TokenService.getRoundedAmount(new BigNumber("12123456789012345678"), 10).toFormat()).to.equal(new BigNumber("12123456789000000000").toFormat());
            });
        });
    });
});
