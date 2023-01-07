import { CandyMachineV2, Metadata } from '@metaplex-foundation/js';
import { useConnection, useWallet } from '@solana/wallet-adapter-react';
import { PublicKey } from '@solana/web3.js';
import { FC, ReactNode, useCallback, useEffect, useState } from 'react';
import { CandyMachineContext } from '../hooks/useCandyMachine';
import { useMetaplex } from '../hooks/useMetaplex';
import { notify } from '../utils/notifications';

export const CandyMachineProvider: FC<{ children?: ReactNode }> = ({ children }) => {
    const [candyMachine, setCandyMachine] = useState<CandyMachineV2>()
    const [owned, setOwned] = useState<Metadata[]>()
    const { metaplex } = useMetaplex()
    const { publicKey } = useWallet()

    const fetchOwned = async (candyMachine: CandyMachineV2) => {
        if (!metaplex) return

        metaplex.nfts().findAllByOwner({ owner: publicKey! })
            .then(async (all) => {
                const collectionNfts = all.filter((n) => n.collection!.address !== candyMachine!.collectionMintAddress)
                setOwned(collectionNfts as Metadata[])
            })
            .catch((error: any) => {
                notify({ type: 'error', message: 'Error fetching owned nfts', description: error?.message });
                console.log(error)
            })
    }

    const init = useCallback(async () => {
        if (publicKey) {
            if (metaplex) {
                if (candyMachine) {
                    fetchOwned(candyMachine)
                }
                else
                    metaplex
                        .candyMachinesV2()
                        .findByAddress({
                            address: new PublicKey(process.env.NEXT_PUBLIC_CANDY_MACHINE_ADDRESS!),
                        })
                        .then((candyMachine) => {
                            //console.log(candyMachine)
                            setCandyMachine(candyMachine)
                            fetchOwned(candyMachine)
                        })
                        .catch((error: any) => {
                            notify({ type: 'error', message: "Can't find Candy Machine" });
                            console.log(error)
                        })

            }
        }
    }, [publicKey]);

    useEffect(() => {
        const interval = setInterval(() => {
            if (publicKey) {

                init()
            }
        }, 2000);

        return () => clearInterval(interval);

    }, [init, metaplex, publicKey]);

    // afegir clearInterval en cas de que lusuari canvii de wallet

    return (
        <CandyMachineContext.Provider value={{ candyMachine, owned }}>
            {children}
        </CandyMachineContext.Provider>
    )
};