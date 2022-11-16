
import { FC, ReactNode } from 'react';
import { AutoConnectProvider } from './AutoConnectProvider';
import { NetworkConfigurationProvider } from './NetworkConfigurationProvider';
import { MetaplexProvider } from './MetaplexProvider';
import WalletContextProvider from './WalletContextProvider';




export const ContextProvider: FC<{ children: ReactNode }> = ({ children }) => {
    return (
        <>
            <NetworkConfigurationProvider>
                <AutoConnectProvider>
                    <WalletContextProvider>
                        <MetaplexProvider>
                            {children}
                        </MetaplexProvider>
                    </WalletContextProvider>
                </AutoConnectProvider>
            </NetworkConfigurationProvider>
        </>
    );
};
