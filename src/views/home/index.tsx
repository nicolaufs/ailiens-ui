// Next, React
import { Box, Center, Spacer, Stack } from '@chakra-ui/react';
import { useWallet } from '@solana/wallet-adapter-react';
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui';
import { FC, useEffect, useState } from 'react';
import Connected from './components/Connected';
import Disconnected from './components/Disconnected';
import NavBar from '../../components/NavBar';
import styles from "../../styles/Home.module.css"


export const HomeView: FC = ({ }) => {
  const { connected } = useWallet()

  return (
    <>
      { /* If connected, the second view, otherwise the first */}
      {!connected ? <Disconnected /> : <Connected />}
    </>
  )
};