# 0xOrderBuilder
Llibrary for building orders to use the 0x protocol.

## Types

* ZeroExOrderBuilder: main class with the static methods:
  * buildQuoteProviderOrder: creating a order to use in Quote Provider relayer strategy. A relayer will be called to get conversion rate and fees.
  * buildSignedOrder: signing a order. You can use the order returned in previous method.
* EthNetwork: enum, used to inform the desired Ethereum network.

## Installation

```bash
npm install 0xorderbuilder --save
```

## Use

**Import**
```typescript
import { ZeroExOrderBuilder, EthNetwork } from "0xorderbuilder";
import { BigNumber } from "bignumber.js"; // used as parameter in buildQuoteProviderOrder method
```
**buildQuoteProviderOrder** 
```typescript
    static buildQuoteProviderOrder(maker: string, makerTokenAddress: string, takerTokenAddress: string, makerTokenAmount: BigNumber, 
        milisecondsToExpire: BigNumber, relayerUrl: string, network: EthNetwork): Promise<Order>;
```
* maker: yours eth wallet address;
* makerTokenAddress: the token address you wish to sell;
* takerTokenAddress: the token address you wish to buy;
* makerTokenAmount: the amount you wish to sell (in base units  e.g.: 1 ZRX => new BigNumber(1000000000000000000));
* milisecondsToExpire: used to calculate the returned order expiration date;
* relayerUrl: the relayer addres used to get conversion rate and fee;
* network: the desired Ethereum network
* return: a promise that will be return a JSon represinting the order.

**buildSignedOrder**
```typescript
    static buildSignedOrder(order: Order, privateKey: string): SignedOrder;
```
* order: the unsigned order;
* privateKey: the private key of the maker wallet. Note: this private WILL NOT be transfer to relayer or any other;
* return: the signed order.

**Example**
```typescript
import { ZeroExOrderBuilder, EthNetwork } from "0xorderbuilder";
import { BigNumber } from "bignumber.js";

function testZeroExOrderBuilder() {
    ZeroExOrderBuilder.buildQuoteProviderOrder("0xf60345bcff9feedb98bbdfc996b33cba00ee2c75", "0x6ff6c0ff1d68b964901f986d4c9fa3ac68346570", 
        "0xd0a1e359811322d97991e03f863a0c30c2cf029c", new BigNumber(1000000000000000000), new BigNumber(10000), 
        "http://localhost:3000/api/v0", EthNetwork.Kovan).then((order) =>
    {
        const signedOrder = ZeroExOrderBuilder.buildSignedOrder(order, "0x5edd9d13a5d62821bbda8ac6da7d7ca69a1b540dc99ac9232fefc04d09e28055");
        console.log(JSON.stringify(signedOrder));
    });
        
}

testZeroExOrderBuilder();
```
