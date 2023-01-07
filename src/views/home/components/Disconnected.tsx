import { FC, MouseEventHandler, useCallback, useState } from 'react'
import {
  Button,
  Container,
  Heading,
  HStack,
  Image,
  Skeleton,
  SkeletonCircle,
  Text,
  VStack,
} from '@chakra-ui/react'
import styles from "../../../styles/Home.module.css"
import { useWalletModal } from '@solana/wallet-adapter-react-ui'
import { useWallet } from '@solana/wallet-adapter-react'

const Disconnected: FC = () => {
  const modalState = useWalletModal()
  const { wallet, connect } = useWallet()

  const handleClick: MouseEventHandler<HTMLButtonElement> = useCallback(
    (event) => {
      if (event.defaultPrevented) {
        return
      }

      if (!wallet) {
        modalState.setVisible(true)
      } else {
        connect().catch(() => { })
      }
    },
    [wallet, connect, modalState],
  )

  return (
    <VStack spacing={20}>
      <Image src="assets/ailiensround-md.png" maxW={140} pointerEvents={'none'} alt="" />
      <Heading
        color="white"
        as="h1"
        size="3xl"
        noOfLines={2}
        textAlign="center"
      >
        Mint your Ailien. Earn $PAX.<br />Join the AiliensDAO.
      </Heading>
      <Button
        variant={'outline'}
        size='lg'
        maxW="380px"
        onClick={handleClick}
        rightIcon={<Text fontSize={'3xl'}>&#128760;</Text>}
      >
        <Text >Come Onboard </Text>

      </Button>
    </VStack>
  )
}

export default Disconnected
