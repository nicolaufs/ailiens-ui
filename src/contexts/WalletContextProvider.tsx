import { FC, ReactNode, useCallback } from "react"
import {
    ConnectionProvider,
    WalletProvider,
} from "@solana/wallet-adapter-react"
import { WalletModalProvider } from "@solana/wallet-adapter-react-ui"
import { clusterApiUrl } from "@solana/web3.js"
import { LedgerWalletAdapter, PhantomWalletAdapter, SolflareWalletAdapter, TorusWalletAdapter } from "@solana/wallet-adapter-wallets"
import { useMemo } from "react"
import { WalletAdapterNetwork, WalletError } from "@solana/wallet-adapter-base"
import { notify } from "../utils/notifications"
import { useAutoConnect } from "./AutoConnectProvider"
import { useNetworkConfiguration } from "./NetworkConfigurationProvider"
require("@solana/wallet-adapter-react-ui/styles.css")

const WalletContextProvider: FC<{ children: ReactNode }> = ({ children }) => {
    const { autoConnect } = useAutoConnect();
    const { networkConfiguration } = useNetworkConfiguration();
    const network = networkConfiguration as WalletAdapterNetwork;
    const endpoint = useMemo(() => clusterApiUrl(network), [network]);

    const url = useMemo(() => clusterApiUrl("devnet"), [])

    const wallets = useMemo(
        () => [
            new PhantomWalletAdapter(),
            new SolflareWalletAdapter(),
            new TorusWalletAdapter(),
            new LedgerWalletAdapter(),
            // new SlopeWalletAdapter(),
        ],
        []
    );
    const onError: any = useCallback(
        (error: WalletError) => {
            //notify({ type: 'error', message: error.message ? `${error.name}: ${error.message}` : error.name });
            console.error(error);
        },
        []
    );

    return (
        <ConnectionProvider endpoint={endpoint}>
            <WalletProvider wallets={wallets} onError={onError} autoConnect={autoConnect}>
                <WalletModalProvider>{children}</WalletModalProvider>
            </WalletProvider>
        </ConnectionProvider>
    )
}

export default WalletContextProvider