import { BigNumber } from "bignumber.js";
import * as chai from "chai";
import * as moment from "moment";
import { TimeService } from "../../src/services/TimeService";

const mocha = require("mocha");
const describe = mocha.describe;
const it = mocha.it;

const expect = chai.expect;

describe("TimeService", () => {
    describe("getTimeFromNow", () => {
        describe("When inform 60000 ms", () => {
            it("should return 1 minute in future", () => {
                const now = new BigNumber(moment().utc().unix());
                const r = expect(TimeService.getTimeFromNow(60000).greaterThanOrEqualTo(now.plus(60))).to.be.true;
            });
        });
    });
});
