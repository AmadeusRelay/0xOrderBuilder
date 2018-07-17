import { BigNumber } from "bignumber.js";

export interface Price {
    maxAmountFrom: BigNumber;
    maxAmountTo: BigNumber;
    minAmountFrom: BigNumber;
    minAmountTo: BigNumber;
    price: BigNumber;
    tokenFrom: string;
    tokenTo: string;
}
