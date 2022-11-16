import { FC, MouseEventHandler, useCallback } from 'react'
import {
  Button,
  Container,
  Heading,
  HStack,
  Text,
  VStack,
} from '@chakra-ui/react'
import { useWalletModal } from '@solana/wallet-adapter-react-ui'
import { useWallet } from '@solana/wallet-adapter-react'
import { findMetadataPda, PublicKey } from '@metaplex-foundation/js'

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

  async function getPDA() {
    const a = await findMetadataPda(new PublicKey('6RJ6BkAWkDPy7sN1nfcq3YEULFihL8QSRRKCZLfsLcbA'))
    console.log(a.toBase58())

  }

  return (
    <Container>
      <VStack spacing={20}>
        <Heading
          color="white"
          as="h1"
          size="3xl"
          noOfLines={2}
          textAlign="center"
        >
          Mint your Ailien. Earn $PAX. Level up.
        </Heading>
        <Button
          bgColor="accent"
          colorScheme='black'
          size='lg'
          color="bodyText"
          maxW="380px"
          onClick={handleClick}
        >
          <HStack>
            <Text>Join the Ailien World</Text>
          </HStack>
        </Button>
      </VStack>
    </Container>
  )
}

export default Disconnected
