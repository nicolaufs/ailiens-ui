import { Metaplex, walletAdapterIdentity, bundlrStorage } from '@metaplex-foundation/js';
import { MetaplexContext } from '../hooks/useMetaplex';
import { useConnection, useWallet } from '@solana/wallet-adapter-react';
import { FC, ReactNode, useMemo } from 'react';
import { useNetworkConfiguration } from './NetworkConfigurationProvider';
import { WalletAdapterNetwork } from '@solana/wallet-adapter-base';
import { clusterApiUrl } from '@solana/web3.js';


export const MetaplexProvider: FC<{ children?: ReactNode }> = ({ children }) => {
    const { connection } = useConnection();
    const wallet = useWallet();
    const { networkConfiguration } = useNetworkConfiguration();
    const network = networkConfiguration as WalletAdapterNetwork;
    const endpoint = useMemo(() => clusterApiUrl(network), [network]);

    const metaplex = useMemo(
        () => Metaplex.make(connection)
            .use(walletAdapterIdentity(wallet)).use(bundlrStorage(
                {
                    address: 'https://devnet.bundlr.network',
                    providerUrl: endpoint,
                    timeout: 60000,
                }
            )),
        [connection, wallet]
    );

    return (
        <MetaplexContext.Provider value={{ metaplex }}>
            {children}
        </MetaplexContext.Provider>
    )
}
