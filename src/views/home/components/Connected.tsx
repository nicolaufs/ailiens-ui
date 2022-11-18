import { FC, MouseEventHandler, useCallback, useEffect, useState } from "react"
import {
    Button,
    Heading,
    HStack,
    Text,
    VStack,
    Image,
    SimpleGrid,
    Spacer,
} from "@chakra-ui/react"
import styles from "../../../styles/Home.module.css"
import { useMetaplex } from "../../../hooks/useMetaplex"
import { CandyMachineV2, PublicKey } from "@metaplex-foundation/js"
import { useConnection, useWallet } from "@solana/wallet-adapter-react"
import { useRouter } from "next/router"
import { LinkIcon } from "@chakra-ui/icons"
import MintModal from "./MintModal"
import { notify } from "../../../utils/notifications"
import { CustomImageFrame } from "../../../components/CustomImageFrame"
import StakingModal from "./StakingModal"

const Connected: FC = () => {
    const [candyMachine, setCandyMachine] = useState<CandyMachineV2>()
    const { metaplex } = useMetaplex()


    useEffect(() => {
        notify({ type: 'success', message: 'Wallet Connected' });

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
                notify({ type: 'error', message: 'Error', description: 'Error finding Candy Machine!' });
                console.log(error)
            })

        console.log(candyMachine)

    }, [metaplex])

    return (
        <VStack spacing={10}>
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
                <Text color="bodyText" fontSize="l" maxW={800} p={'10px 0px'} textAlign="center">
                    333 fully AI generated aliens that belong to the Solana most valuable Community
                    members, the developers. Stake them to receive <Text as="b">Parallax</Text>,
                    the governance token for the AiliensDAO. {/* Use it to participate in the
                    creation of the<Text as="b"> Ad Astra Generation</Text> Ailiens: the final version
                    of the Ailiens Collection. */}
                </Text>
            </VStack>

            <SimpleGrid columns={3} spacing='20px' maxW={700} w={{ sm: "calc(85vw)", lg: "calc(60vw)" }}>
                <CustomImageFrame>
                    <Image src="assets/ailiens/4.png" pointerEvents={'none'} className={styles.nftImage} alt="" />
                </CustomImageFrame>
                <CustomImageFrame>
                    <Image src="assets/ailiens/7.png" pointerEvents={'none'} className={styles.nftImage} alt="" />
                </CustomImageFrame>
                <CustomImageFrame>
                    <Image src="assets/ailiens/93.png" pointerEvents={'none'} className={styles.nftImage} alt="" />
                </CustomImageFrame>
                <CustomImageFrame>
                    <Image src="assets/ailiens/142.png" pointerEvents={'none'} className={styles.nftImage} alt="" />
                </CustomImageFrame>
                <CustomImageFrame>
                    <Image src="assets/ailiens/23.png" pointerEvents={'none'} className={styles.nftImage} alt="" />
                </CustomImageFrame>
                <CustomImageFrame>
                    <Image src="assets/ailiens/170.png" pointerEvents={'none'} className={styles.nftImage} alt="" />
                </CustomImageFrame>
            </SimpleGrid>
            <SimpleGrid columns={{ sm: 1, md: 2 }} spacing='20px'>
                <MintModal candyMachine={candyMachine} />
                <StakingModal />
            </SimpleGrid>



            {/* <Button
                onClick={() => {
                    notify({ type: 'info', message: 'Notification Message', description: 'This is a more detailed description' })
                }}
            >Notify</Button> */}


        </VStack>

    )
}

export default Connected