import { useWallet } from "@solana/wallet-adapter-react"
import {
    Container,
    Heading,
    VStack,
    Text,
    Image,
    Button,
    useDisclosure,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalBody,
    ModalCloseButton,
} from "@chakra-ui/react"
import {
    FC,
    MouseEventHandler,
    useCallback,
    useState,
} from "react"
import { PublicKey } from "@solana/web3.js"
import { useMetaplex } from "../../../hooks/useMetaplex"
import styles from "../../../styles/Home.module.css"
import { CandyMachineV2, MintCandyMachineV2Output } from "@metaplex-foundation/js"
import { MintButton } from "./MintButton"
import { notify } from "../../../utils/notifications"
import { CustomImageFrame } from "./CustomImageFrame"

interface MintModalProps {
    candyMachine?: CandyMachineV2,
}

const MintModal: FC<MintModalProps> = ({ candyMachine }) => {
    const [metadata, setMetadata] = useState<any>()
    const [loadingMachine, setLoadingMachine] = useState(false)
    const [isMinting, setIsMinting] = useState(false)
    const [mint, setMint] = useState<PublicKey>()
    const [displayNFT, setDisplayNFT] = useState(false)

    const { metaplex } = useMetaplex()
    const { publicKey, connected } = useWallet()

    const { isOpen, onOpen, onClose } = useDisclosure()

    const handleMintClick: MouseEventHandler<HTMLButtonElement> = useCallback(
        async (event) => {
            event.preventDefault();
            if (!connected || !candyMachine) {
                if (!connected) {
                    notify({ type: 'error', message: 'Error', description: 'Wallet not connected!' });
                } else {
                    notify({ type: 'error', message: 'Error', description: 'Candy Machine not available.' });
                }
                return;
            }

            setLoadingMachine(false)
            setMint(undefined)
            setIsMinting(false)
            setMetadata(undefined)


            let nft: MintCandyMachineV2Output | undefined;
            try {
                console.log('STARTED MINTING!!!')
                setIsMinting(true)
                nft = await metaplex?.candyMachinesV2().mint({ candyMachine })
                console.log(nft)
                setMint(new PublicKey(nft!.nft.address.toBase58()))
            } catch (error: any) {
                setIsMinting(false)
                notify({ type: 'error', message: 'Error while minting', description: error?.message });
                // notification
                console.log(error)
                return;
            }

            try {
                /* metaplex!.nfts()
                    .findByMint({ mintAddress: mint! })
                    .then((nft) => {
                         */
                console.log('FETCHING METADATA!!!')

                fetch(nft!.nft.uri)
                    .then((res) => res.json())
                    .then((metadata) => {
                        setMetadata(metadata)
                        notify({ type: 'success', message: "Ailien Minted!", txid: nft?.response.signature });
                    })


            } catch (error: any) {
                // notification
                notify({ type: 'error', message: "Couldn't fetch NFT", description: error?.message });
            }
            finally {
                setIsMinting(false)
            }
        },
        [metaplex, publicKey, candyMachine]
    )

    return (
        <>
            <Button onClick={onOpen}
                variant={'outline'}
                size='lg'
                maxW="380px"
                rightIcon={<Text fontSize={'2xl'}>&#128434;</Text>}
            >
                <Text>Launch Minting Machine</Text>
            </Button>

            <Modal closeOnOverlayClick={false} isOpen={isOpen} colorScheme='blackAlpha' onClose={onClose} size={'xl'} isCentered>
                <ModalOverlay backdropFilter='blur(10px)' />
                <ModalContent borderRadius={10} className={isMinting && !metadata?.image ? styles.mintModalMinting : styles.mintModal} boxShadow='0 0 20px #000' border={'2px solid #222'}>
                    <ModalBody pb={20} pt={10}>
                        <VStack spacing={12}>

                            {!metadata?.image ?

                                (<>
                                    <VStack >
                                        <Heading as="h1" size="xl" textAlign="center" className={styles.coolTitle}>
                                            Minting Machine
                                        </Heading>

                                        <Text color={loadingMachine ? '#22f' : isMinting ? "#f22" : "#555"} fontWeight={700} fontSize="md" textAlign="center" >
                                            {loadingMachine ? 'ACTIVATING MACHINE...' : isMinting ? 'WOOOOAAH! MINTOOOOR!' : 'USE WITH CAUTION'}
                                        </Text>
                                    </VStack>
                                    <CustomImageFrame>
                                        <Image src={isMinting ? "assets/loadmint.gif" : "assets/ailiens/blendblur.png"}
                                            pointerEvents={'none'} className={isMinting ? [styles.nftImage, styles.mintingCard].join(' ') : styles.nftImage}
                                            maxH={'calc(35vh)'} alt="" />
                                    </CustomImageFrame>
                                    <MintButton onClick={(e) => {
                                        setLoadingMachine(true)
                                        setTimeout(handleMintClick, 3000, e);
                                    }}
                                        isMinting={isMinting} loadingMachine={loadingMachine} disabled={!candyMachine} />
                                </>) : (<>

                                    {loadingMachine ?
                                        <VStack >
                                            <Heading as="h1" size="xl" textAlign="center" className={styles.coolTitle}>
                                                Minting Machine
                                            </Heading>

                                            <Text color={loadingMachine ? '#22f' : isMinting ? "#f22" : "#555"} fontWeight={700} fontSize="md" textAlign="center" >
                                                {loadingMachine ? 'ACTIVATING MACHINE...' : isMinting ? 'WOOOOAAH! MINTOOOOR!' : 'USE WITH CAUTION'}
                                            </Text>
                                        </VStack>
                                        : <Container>
                                            <VStack spacing={0}>
                                                <Heading color="white" as="h1" size="xl" textAlign="center">
                                                    {metadata.name}
                                                </Heading>
                                                <Text color={'white'}>{metadata.attributes[1].value}</Text>

                                            </VStack>
                                        </Container>}

                                    <CustomImageFrame>
                                        <Image src={'assets/loadmint.gif'}
                                            style={!displayNFT ? {} : { display: 'none' }}
                                            pointerEvents={'none'}
                                            className={[styles.nftImage, styles.mintingCard].join(' ')}
                                            maxH={'calc(35vh)'} alt="" />
                                        <Image src={metadata?.image}
                                            style={displayNFT ? {} : { display: 'none' }}
                                            onLoad={() => {
                                                setDisplayNFT(true)
                                            }}
                                            pointerEvents={'none'}
                                            className={styles.nftImage}
                                            maxH={'calc(35vh)'} alt="" />
                                    </CustomImageFrame>

                                    <MintButton onClick={(e) => {
                                        setLoadingMachine(true)
                                        setTimeout(handleMintClick, 3000, e);
                                    }}
                                        loadingMachine={loadingMachine}
                                        isMinting={isMinting}
                                        disabled={!candyMachine}
                                    />

                                    <Button
                                        variant={'outline'}
                                        size='lg'
                                        color="bodyText"
                                        maxW="380px"
                                        onClick={handleMintClick}
                                        rightIcon={<Text fontSize="2xl">&#128377;</Text>}
                                    >
                                        <Text>Launch Staking Machine</Text>
                                    </Button>
                                </>)
                            }
                        </VStack >
                        <ModalCloseButton color={'#333'} onClick={() => {
                            setIsMinting(false)
                            setMetadata(undefined)
                            setLoadingMachine(false)
                        }
                        } />
                    </ModalBody>
                </ModalContent>
            </Modal>
        </>
    )
}

export default MintModal