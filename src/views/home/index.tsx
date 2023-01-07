// Next, React
import { useWallet } from '@solana/wallet-adapter-react';
import { FC } from 'react';
import Connected from './components/Connected';
import Disconnected from './components/Disconnected';

export const HomeView: FC = ({ }) => {
  const { connected } = useWallet()
  // notify({ type: 'success', message: 'Wallet Connected' });
  return (
    <>
      { /* If connected, the second view, otherwise the first */}
      {!connected ? <Disconnected /> : <Connected />}
    </>
  )
};