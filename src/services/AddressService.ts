import { Constants } from "../Constants";
import { EthNetwork } from "../models/EthNetwork";

export class AddressService {
    public static getExchangekAddress(network: EthNetwork): string {
        switch (network) {
            case EthNetwork.Kovan:
                return Constants.KOVAN_EXCHANGE_ADDRESS;
            case EthNetwork.Mainnet:
                return Constants.MAINNET_EXCHANGE_ADDRESS;
        }
        return null;
    }
}
