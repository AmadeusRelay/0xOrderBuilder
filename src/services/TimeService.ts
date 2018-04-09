import { BigNumber } from "bignumber.js";
import * as moment from "moment";

export class TimeService {
    public static getTimeFromNow(milisecondsToAdd: number): BigNumber {
        return new BigNumber(moment().utc().add(milisecondsToAdd, "ms").unix());
    }
}
