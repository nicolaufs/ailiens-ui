import { Metaplex } from '@metaplex-foundation/js';
import { createContext, useContext } from 'react';

export interface MetaplexContextState {
    metaplex: null | Metaplex;
}

export const MetaplexContext = createContext<MetaplexContextState>({} as MetaplexContextState);

export function useMetaplex(): MetaplexContextState {
    return useContext(MetaplexContext);
}
