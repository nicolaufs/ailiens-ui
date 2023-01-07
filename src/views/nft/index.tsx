import { Box, Flex, Heading, Image, SimpleGrid, Skeleton, Spacer, Text, VStack } from "@chakra-ui/react"
import { JsonMetadata, Metadata } from "@metaplex-foundation/js"
import { useConnection, useWallet } from "@solana/wallet-adapter-react"
import { PublicKey } from "@solana/web3.js"
import { FC, useEffect, useState } from "react"
import { CustomImageFrame } from "../../components/CustomImageFrame"
import { NftCard } from "../../components/NftCard"
import { useCandyMachine } from "../../hooks/useCandyMachine"
import { useMetaplex } from "../../hooks/useMetaplex"
import { NftProps } from "../../pages/nft"
import { getNftMetadata } from "../../utils/nfts"
import styles from "../../styles/Home.module.css"

export const NftView: FC<NftProps> = ({ mintAddress/* , imageSrc */ }) => {

    const [metadata, setMetadata] = useState<JsonMetadata>()
    const [display, setDisplay] = useState(false)

    const { connection } = useConnection()
    const { owned } = useCandyMachine()

    const fetchNft = async () => {
        try {
            const m: JsonMetadata = await getNftMetadata(mintAddress, owned!)
            setMetadata(m)

        } catch (error) {
            console.log("error getting nft:", error)
        }
    }

    useEffect(() => {
        if (owned)
            fetchNft()
    }, [connection, owned, mintAddress])


    return <>
        <SimpleGrid w={'90vw'} maxW={'1000'} p={8} columns={{ sm: 1, md: 2 }} spacing={{ sm: 5, md: 10 }} mb={{ sm: 12, md: 2 }}>
            <CustomImageFrame isLoaded={metadata && true}>
                <Image flex={1} src={metadata?.image} pointerEvents={'none'} w={'100%'} className={styles.nftImage} alt="" onLoad={() => {
                    setDisplay(true)
                }} />
            </CustomImageFrame>
            <VStack justify={'center'} spacing={2} pt={2}>
                <Skeleton h={{ sm: '24px', md: '36px' }} minW={150} startColor='#222' endColor='#111' isLoaded={display}>
                    <Heading size={{ sm: 'md', md: 'lg' }} textAlign="center" >
                        {metadata?.name}
                    </Heading>
                </Skeleton>
                <Skeleton h='24px' minW={100} startColor='#222' endColor='#111' isLoaded={display}>
                    <Text fontSize={{ sm: 'sm', md: 'md' }} color={''} textAlign="center">{metadata?.attributes![1].value}</Text>
                </Skeleton>
                <Skeleton h='350px' w='100%' overflow='scroll' startColor='#222' endColor='#111' px={5} py={3} isLoaded={display} style={{ border: '1px solid #222', borderRadius: 8, background: '#0a0a0a' }}>
                    <Text className="nftCardDesc" textAlign="justify">{metadata?.description}</Text>
                </Skeleton>

            </VStack>
        </SimpleGrid >
    </>
}