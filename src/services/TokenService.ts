import { BigNumber } from "bignumber.js";

export class TokenService {
    public static getRoundedAmount(baseUnitAmount: BigNumber, precision: number): BigNumber {
        return baseUnitAmount.dividedBy("1000000000000000000").round(precision).mul("1000000000000000000");
    }
}
