import { FeesRequest, FeesResponse, HttpClient, TokenPairsItem, TokenPairsRequestOpts } from "@0xproject/connect";
import { BigNumber } from "bignumber.js";
import { Price } from "../../src/models/Price";
import { RelayerConnection } from "../../src/relayer/RelayerConnection";
import { Constants } from "../Constants";

export class MockRelayerConnection implements RelayerConnection​​ {
    public getFeesAsync(request: FeesRequest): Promise<FeesResponse> {
        return Promise.resolve({
            feeRecipient: "0x23d4fe8c00ae3b267ea349eed18ed32b71c93f4d",
            makerFee: new BigNumber("000000000000000001"),
            takerFee: new BigNumber("0"),
          });
    }

    public getPrice(tokenFromAddress: string, tokenToAddress: string, trader: string): Promise<Price> {
      if (tokenFromAddress !== Constants.REP_ADDRESS && tokenFromAddress !== Constants.WETH_ADDRESS && tokenFromAddress !== Constants.ZRX_ADDRESS) {
        return new Promise<Price>((resolve) => { resolve(undefined); });
      }
      if (tokenToAddress !== Constants.REP_ADDRESS && tokenToAddress !== Constants.WETH_ADDRESS && tokenToAddress !== Constants.ZRX_ADDRESS) {
        return new Promise<Price>((resolve) => { resolve(undefined); });
      }

      if (tokenFromAddress === Constants.ZRX_ADDRESS && tokenToAddress === Constants.REP_ADDRESS) {
        return Promise.resolve({
          maxAmountFrom: new BigNumber("1010633440000000000"),
          maxAmountTo: new BigNumber("1730290000000000"),
          minAmountFrom: new BigNumber("58400000000000"),
          minAmountTo: new BigNumber("100000000000"),
          price: new BigNumber("0"),
          tokenFrom: Constants.ZRX_ADDRESS,
          tokenTo: Constants.REP_ADDRESS,
        });
      }

      return Promise.resolve({
          maxAmountFrom: new BigNumber("1010633440000000000"),
          maxAmountTo: new BigNumber("1730290000000000"),
          minAmountFrom: new BigNumber("58400000000000"),
          minAmountTo: new BigNumber("100000000000"),
          price: new BigNumber("584"),
          tokenFrom: "0x6ff6c0ff1d68b964901f986d4c9fa3ac68346570",
          tokenTo: "0xef7fff64389b814a946f3e92105513705ca6b990",
        });
    }
}
