import { FeesRequest, FeesResponse, HttpClient, TokenPairsItem, TokenPairsRequestOpts } from "@0xproject/connect";
import { BigNumber } from "bignumber.js";
import { RelayerConnection } from "../../src/relayer/RelayerConnection";

export class MockRelayerConnection implements RelayerConnection​​ {
    private static TOKEN_PAIRS = [
        {
          tokenA: {
            address: "0xd0a1e359811322d97991e03f863a0c30c2cf029c",
            maxAmount: new BigNumber("2002000000000000"),
            minAmount: new BigNumber("100000000000"),
            precision: 8,
          },
          tokenB: {
            address: "0xef7fff64389b814a946f3e92105513705ca6b990",
            maxAmount: new BigNumber("3152261120000000000"),
            minAmount: new BigNumber("157450000000000"),
            precision: 8,
          },
        },
        {
          tokenA: {
            address: "0xd0a1e359811322d97991e03f863a0c30c2cf029c",
            maxAmount: new BigNumber("2002000000000000"),
            minAmount: new BigNumber("100000000000"),
            precision: 8,
          },
          tokenB: {
            address: "0xb18845c260f680d5b9d84649638813e342e4f8c9",
            maxAmount: new BigNumber("28328800000000000"),
            minAmount: new BigNumber("1410000000000"),
            precision: 8,
          },
        },
        {
          tokenA: {
            address: "0xd0a1e359811322d97991e03f863a0c30c2cf029c",
            maxAmount: new BigNumber("2002000000000000"),
            minAmount: new BigNumber("100000000000"),
            precision: 8,
          },
          tokenB: {
            address: "0x6ff6c0ff1d68b964901f986d4c9fa3ac68346570",
            maxAmount: new BigNumber("1353584690000000000"),
            minAmount: new BigNumber("67610000000000"),
            precision: 8,
          },
        },
        {
          tokenA: {
            address: "0xef7fff64389b814a946f3e92105513705ca6b990",
            maxAmount: new BigNumber("1222807560000000000"),
            minAmount: new BigNumber("157450000000000"),
            precision: 8,
          },
          tokenB: {
            address: "0xd0a1e359811322d97991e03f863a0c30c2cf029c",
            maxAmount: new BigNumber("776600000000000"),
            minAmount: new BigNumber("100000000000"),
            precision: 8,
          },
        },
        {
          tokenA: {
            address: "0xef7fff64389b814a946f3e92105513705ca6b990",
            maxAmount: new BigNumber("1222807560000000000"),
            minAmount: new BigNumber("9220000000000"),
            precision: 8,
          },
          tokenB: {
            address: "0xb18845c260f680d5b9d84649638813e342e4f8c9",
            maxAmount: new BigNumber("13249350000000000"),
            minAmount: new BigNumber("100000000000"),
            precision: 8,
          },
        },
        {
          tokenA: {
            address: "0xef7fff64389b814a946f3e92105513705ca6b990",
            maxAmount: new BigNumber("1222807560000000000"),
            minAmount: new BigNumber("220000000000"),
            precision: 8,
          },
          tokenB: {
            address: "0x6ff6c0ff1d68b964901f986d4c9fa3ac68346570",
            maxAmount: new BigNumber("555172270000000000"),
            minAmount: new BigNumber("100000000000"),
            precision: 8,
          },
        },
        {
          tokenA: {
            address: "0xb18845c260f680d5b9d84649638813e342e4f8c9",
            maxAmount: new BigNumber("1373380000000000"),
            minAmount: new BigNumber("1330000000000"),
            precision: 8,
          },
          tokenB: {
            address: "0xd0a1e359811322d97991e03f863a0c30c2cf029c",
            maxAmount: new BigNumber("102910000000000"),
            minAmount: new BigNumber("100000000000"),
            precision: 8,
          },
        },
        {
          tokenA: {
            address: "0xb18845c260f680d5b9d84649638813e342e4f8c9",
            maxAmount: new BigNumber("1373380000000000"),
            minAmount: new BigNumber("100000000000"),
            precision: 8,
          },
          tokenB: {
            address: "0xef7fff64389b814a946f3e92105513705ca6b990",
            maxAmount: new BigNumber("126751810000000000"),
            minAmount: new BigNumber("9220000000000"),
            precision: 8,
          },
        },
        {
          tokenA: {
            address: "0xb18845c260f680d5b9d84649638813e342e4f8c9",
            maxAmount: new BigNumber("1373380000000000"),
            minAmount: new BigNumber("100000000000"),
            precision: 8,
          },
          tokenB: {
            address: "0x6ff6c0ff1d68b964901f986d4c9fa3ac68346570",
            maxAmount: new BigNumber("0"),
            minAmount: new BigNumber("0"),
            precision: 8,
          },
        },
        {
          tokenA: {
            address: "0x6ff6c0ff1d68b964901f986d4c9fa3ac68346570",
            maxAmount: new BigNumber("1010633440000000000"),
            minAmount: new BigNumber("58400000000000"),
            precision: 8,
          },
          tokenB: {
            address: "0xd0a1e359811322d97991e03f863a0c30c2cf029c",
            maxAmount: new BigNumber("1730290000000000"),
            minAmount: new BigNumber("100000000000"),
            precision: 8,
          },
        },
        {
          tokenA: {
            address: "0x6ff6c0ff1d68b964901f986d4c9fa3ac68346570",
            maxAmount: new BigNumber("1010633440000000000"),
            minAmount: new BigNumber("100000000000"),
            precision: 8,
          },
          tokenB: {
            address: "0xef7fff64389b814a946f3e92105513705ca6b990",
            maxAmount: new BigNumber("2225994080000000000"),
            minAmount: new BigNumber("220000000000"),
            precision: 8,
          },
        },
        {
          tokenA: {
            address: "0x6ff6c0ff1d68b964901f986d4c9fa3ac68346570",
            maxAmount: new BigNumber("0"),
            minAmount: new BigNumber("0"),
            precision: 8,
          },
          tokenB: {
            address: "0xb18845c260f680d5b9d84649638813e342e4f8c9",
            maxAmount: new BigNumber("24119060000000000"),
            minAmount: new BigNumber("100000000000"),
            precision: 8,
          },
        },
      ];

    public getTokenPairsAsync(requestOpts?: TokenPairsRequestOpts): Promise<TokenPairsItem[]> {
        return Promise.resolve(MockRelayerConnection.TOKEN_PAIRS.filter((pair) =>
            pair.tokenA.address === requestOpts.tokenA
            || pair.tokenA.address === requestOpts.tokenB
            || pair.tokenB.address === requestOpts.tokenA
            || pair.tokenB.address === requestOpts.tokenB));
    }

    public getFeesAsync(request: FeesRequest): Promise<FeesResponse> {
        return Promise.resolve({
            feeRecipient: "0x23d4fe8c00ae3b267ea349eed18ed32b71c93f4d",
            makerFee: new BigNumber("000000000000000001"),
            takerFee: new BigNumber("0")
          });
    }

}