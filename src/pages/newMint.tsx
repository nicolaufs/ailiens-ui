import type { NextPage } from "next"
import { useConnection, useWallet } from "@solana/wallet-adapter-react"
import {
    Container,
    Heading,
    VStack,
    Text,
    Image,
    Button,
    HStack,
} from "@chakra-ui/react"
import {
    MouseEventHandler,
    useCallback,
    useEffect,
    useState,
} from "react"
import { ArrowForwardIcon } from "@chakra-ui/icons"
import { PublicKey } from "@solana/web3.js"
import { useMetaplex } from "../hooks/useMetaplex"
import styles from "../styles/Home.module.css"

interface NewMintProps {
    mint: PublicKey
}

const NewMint: NextPage<NewMintProps> = ({ mint }) => {
    const [metadata, setMetadata] = useState<any>()
    const wallet = useWallet()
    const { metaplex } = useMetaplex()


    useEffect(() => {
        metaplex!.nfts()
            .findByMint({ mintAddress: mint })
            .then((nft) => {
                fetch(nft.uri)
                    .then((res) => res.json())
                    .then((metadata) => {
                        setMetadata(metadata)
                    })
            })
    }, [mint, metaplex, wallet])

    const handleClick: MouseEventHandler<HTMLButtonElement> = useCallback(
        async (event) => { },
        []
    )

    return (
        <VStack spacing={20}>
            {metadata && (
                <>
                    <Container>
                        <VStack spacing={8}>
                            <Heading color="white" as="h1" size="2xl" textAlign="center">
                                &#128125;
                            </Heading>
                            <Heading color="white" as="h1" size="2xl" textAlign="center">
                                {metadata.name} - {metadata.attributes[1].value}
                            </Heading>

                            <Text color="bodyText" fontSize="xl" textAlign="center">
                                Congratulations, you minted a Genesis Ailien! <br />
                                Time to stake your character to earn rewards and be part of the AiliensDAO.
                            </Text>
                        </VStack>
                    </Container>

                    <Image src={metadata?.image ?? ""}
                        pointerEvents={'none'}
                        className={styles.nftCard}
                        maxH={'calc(40vh)'} alt="" />

                    <Button
                        bgColor="accent"
                        color="white"
                        maxW="380px"
                        onClick={handleClick}
                    >
                        <HStack>
                            <Text>stake my buildoor</Text>
                            <ArrowForwardIcon />
                        </HStack>
                    </Button>
                </>)}
        </VStack>
    )
}


NewMint.getInitialProps = async ({ query }) => {
    const { mint } = query

    if (!mint) throw { error: "no mint" }

    try {
        const mintPubkey = new PublicKey(mint)
        return { mint: mintPubkey }
    } catch {
        throw { error: "invalid mint" }
    }
}

export default NewMint