import { ZeroExConnectRelayerConnection } from "./0xConnectRelayerConnection";
import { RelayerConnection } from "./RelayerConnection";

export class RelayerConnectionFactory {
    public static create(relayerUrl: string): RelayerConnection {
        return RelayerConnectionFactory.creationMethod(relayerUrl);
    }

    public static register(creationMethod: (relayerUrl: string) => RelayerConnection) {
        RelayerConnectionFactory.creationMethod = creationMethod;
    }

    private static creationMethod: (relayerUrl: string) => RelayerConnection =
        (relayerUrl) => {
            return new ZeroExConnectRelayerConnection(relayerUrl);
        }

}
