import { FC, useEffect } from "react"
import {
    Heading,
    Text,
    VStack,
    Image,
    SimpleGrid,
} from "@chakra-ui/react"
import styles from "../../../styles/Home.module.css"
import MintModal from "./MintModal"
import { CustomImageFrame } from "../../../components/CustomImageFrame"
import StakingModal from "./StakingModal"
import { useCandyMachine } from "../../../hooks/useCandyMachine"
import { notify } from "../../../utils/notifications"

const Connected: FC = () => {
    const { candyMachine, owned } = useCandyMachine()

    useEffect(() => {
        notify({ type: 'success', message: 'Wallet Connected' });
    }, [])


    return (
        <VStack spacing={12}>
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
                <Text color="bodyText" fontSize={'md'} maxW={700} p={'10px'} textAlign="center">
                    Genesis Generation of the Ailiens Collection. 333 fully AI generated aliens that belong to the Solana most valuable Community
                    members, the developers. Stake them to receive <Text as="b">Parallax</Text>,
                    the governance token for the AiliensDAO. {/* Use it to participate in the
                    creation of the<Text as="b"> Ad Astra Generation</Text> Ailiens: the final version
                    of the Ailiens Collection. */}
                </Text>
            </VStack>

            <SimpleGrid columns={3} spacing='20px' maxW={700} w={{ sm: "calc(85vw)", lg: "calc(60vw)" }}>
                <CustomImageFrame h='100%' w='100%' >
                    <Image src="assets/ailiens/4.png" pointerEvents={'none'} className={styles.nftImage} alt="" />
                </CustomImageFrame>
                <CustomImageFrame h='100%' w='100%' >
                    <Image src="assets/ailiens/7.png" pointerEvents={'none'} className={styles.nftImage} alt="" />
                </CustomImageFrame>
                <CustomImageFrame h='100%' w='100%' >
                    <Image src="assets/ailiens/93.png" pointerEvents={'none'} className={styles.nftImage} alt="" />
                </CustomImageFrame>
                <CustomImageFrame h='100%' w='100%' >
                    <Image src="assets/ailiens/142.png" pointerEvents={'none'} className={styles.nftImage} alt="" />
                </CustomImageFrame>
                <CustomImageFrame h='100%' w='100%' >
                    <Image src="assets/ailiens/23.png" pointerEvents={'none'} className={styles.nftImage} alt="" />
                </CustomImageFrame>
                <CustomImageFrame h='100%' w='100%' >
                    <Image src="assets/ailiens/170.png" pointerEvents={'none'} className={styles.nftImage} alt="" />
                </CustomImageFrame>
            </SimpleGrid>
            <SimpleGrid columns={{ sm: 1, md: 2 }} spacing='20px' >
                <MintModal candyMachine={candyMachine} owned={owned} />
                <StakingModal candyMachine={candyMachine} owned={owned} />
            </SimpleGrid>


            {/* <Button
                onClick={() => {
                    notify({ type: 'info', message: 'Notification Message', description: 'This is a more detailed description' })
                }}
            >Notify</Button> */}


        </VStack >

    )
}

export default Connected