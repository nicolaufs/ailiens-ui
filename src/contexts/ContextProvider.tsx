
import { FC, ReactNode } from 'react';
import { AutoConnectProvider } from './AutoConnectProvider';
import { NetworkConfigurationProvider } from './NetworkConfigurationProvider';
import { MetaplexProvider } from './MetaplexProvider';
import WalletContextProvider from './WalletContextProvider';
import { CandyMachineProvider } from './CandyMachineProvider';

export const ContextProvider: FC<{ children: ReactNode }> = ({ children }) => {
    return (
        <>
            <NetworkConfigurationProvider>
                <AutoConnectProvider>
                    <WalletContextProvider>
                        <MetaplexProvider>
                            <CandyMachineProvider>
                                {children}
                            </CandyMachineProvider>
                        </MetaplexProvider>
                    </WalletContextProvider>
                </AutoConnectProvider>
            </NetworkConfigurationProvider>
        </>
    );
};
