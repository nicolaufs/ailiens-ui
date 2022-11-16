import { FC, MouseEventHandler, useCallback, useEffect, useState } from "react"
import {
    Button,
    Heading,
    HStack,
    Text,
    VStack,
    Image,
    SimpleGrid,
} from "@chakra-ui/react"
import styles from "../../../styles/Home.module.css"
import { useMetaplex } from "../../../hooks/useMetaplex"
import { CandyMachineV2, PublicKey } from "@metaplex-foundation/js"
import { useConnection, useWallet } from "@solana/wallet-adapter-react"
import { useRouter } from "next/router"
import { LinkIcon } from "@chakra-ui/icons"

const Connected: FC = () => {
    const { connection } = useConnection()
    const { publicKey, connected } = useWallet()
    const [candyMachine, setCandyMachine] = useState<CandyMachineV2>()
    const [isMinting, setIsMinting] = useState(false)
    const { metaplex } = useMetaplex()

    useEffect(() => {
        if (!metaplex) return

        metaplex
            .candyMachinesV2()
            .findByAddress({
                address: new PublicKey("EhixWqzrr6EzoHUfsgUmiFah1LNMoYoJU2KktaKGPfdu"),
            })
            .then((candyMachine) => {
                console.log(candyMachine)
                setCandyMachine(candyMachine)
            })
            .catch((error: any) => {
                alert(error)

            })

        console.log(candyMachine)

    }, [metaplex])

    const router = useRouter()

    const handleClick: MouseEventHandler<HTMLButtonElement> = useCallback(
        async (event) => {
            event.preventDefault();
            if (!connected || !candyMachine) {
                return;
            }
            try {
                setIsMinting(true)
                const nft = await metaplex?.candyMachinesV2().mint({ candyMachine })
                console.log(nft)
                router.push(`/newMint?mint=${nft!.nft.address.toBase58()}`)
            } catch (error) {

                alert(error)
            } finally {
                setIsMinting(false)
            }
        },
        [metaplex, publicKey, candyMachine]
    )

    return (
        <VStack spacing={20}>
            <VStack spacing={0}>
                <Heading
                    color="bodyText"
                    as="h1"
                    size="xl"
                    noOfLines={1}
                    textAlign="center"
                    letterSpacing={5}
                >
                    AILIENS
                </Heading>
                <Text color="bodyText" fontSize="l" maxW={1000} p={'10px'} textAlign="center">
                    Genesis Generation of the Ailiens Collection.
                </Text>
                <Text color="bodyText" fontSize="l" maxW={800} p={'20px 50px'} textAlign="justify">
                    333 fully AI generated druid aliens that belong to the Solana most valuable Community
                    members, the developers. Stake them to receive the <Text as="b">Parallax </Text>
                    token. $PAX is the governance token for the AiliensDAO, where you will become
                    a partner of the project that will help and contribute in the development of the final
                    <Text as="b"> Ad Astra Generation</Text> of the Ailiens Collection.
                </Text>
            </VStack>

            <SimpleGrid columns={3} spacing='33px' maxW={700} w={{ sm: "calc(80vw)", lg: "calc(50vw)" }}>
                <Image src="assets/ailiens/4.png" pointerEvents={'none'} className={styles.nftCard} alt="" />
                <Image src="assets/ailiens/7.png" pointerEvents={'none'} className={styles.nftCard} alt="" />
                <Image src="assets/ailiens/93.png" pointerEvents={'none'} className={styles.nftCard} alt="" />
                <Image src="assets/ailiens/142.png" pointerEvents={'none'} className={styles.nftCard} alt="" />
                <Image src="assets/ailiens/23.png" pointerEvents={'none'} className={styles.nftCard} alt="" />
                <Image src="assets/ailiens/170.png" pointerEvents={'none'} className={styles.nftCard} alt="" />
            </SimpleGrid>

            <Button
                bgColor="accent"
                colorScheme='black'
                size='lg'
                color="bodyText"
                maxW="380px"
                onClick={handleClick}
                isLoading={isMinting}
            >
                <HStack>
                    <Text>MINT AILIEN</Text>
                    <LinkIcon />
                </HStack>
            </Button>

        </VStack>

    )
}

export default Connected