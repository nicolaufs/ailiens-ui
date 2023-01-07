import { CandyMachineV2, Metadata } from '@metaplex-foundation/js';
import { createContext, useContext } from 'react';

export interface CandyMachineContextState {
    candyMachine: CandyMachineV2 | undefined;
    owned: Metadata[] | undefined;
}

export const CandyMachineContext = createContext<CandyMachineContextState>({} as CandyMachineContextState);

export function useCandyMachine(): CandyMachineContextState {
    return useContext(CandyMachineContext);
}
