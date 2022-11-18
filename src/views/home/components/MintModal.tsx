import { useWallet } from "@solana/wallet-adapter-react"
import {
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
    Skeleton,
    Spacer,
} from "@chakra-ui/react"
import {
    FC,
    MouseEventHandler,
    useCallback,
    useState,
} from "react"
import { useMetaplex } from "../../../hooks/useMetaplex"
import styles from "../../../styles/Home.module.css"
import { CandyMachineV2, MintCandyMachineV2Output } from "@metaplex-foundation/js"
import { MintButton } from "./MintButton"
import { notify } from "../../../utils/notifications"
import { CustomImageFrame } from "../../../components/CustomImageFrame"

interface MintModalProps {
    candyMachine?: CandyMachineV2,
}

const MintModal: FC<MintModalProps> = ({ candyMachine }) => {
    const [metadata, setMetadata] = useState<any>()
    const [loadingMachine, setLoadingMachine] = useState(false)
    const [isMinting, setIsMinting] = useState(false)
    const [isCompleted, setIsCompleted] = useState(false)
    const [isError, setIsError] = useState(false)
    const [error, setError] = useState()
    const [displayPic, setDisplayPic] = useState(false)
    const [displayNFT, setDisplayNFT] = useState(false)

    const { metaplex } = useMetaplex()
    const { publicKey, connected, } = useWallet()

    const { isOpen, onOpen, onClose } = useDisclosure()

    const handleMintClick: MouseEventHandler<HTMLButtonElement> = useCallback(
        async (event) => {

            // ui state 
            setLoadingMachine(false)
            setIsMinting(true)

            // data state 
            setMetadata(undefined)
            setDisplayNFT(false)

            event.preventDefault();
            if (!connected || !candyMachine) {
                if (!connected) {
                    notify({ type: 'error', message: 'Error', description: 'Wallet not connected!' });
                } else {
                    notify({ type: 'error', message: 'Error', description: 'Candy Machine not available.' });
                }
                return;
            }

            let mintedNft: MintCandyMachineV2Output | undefined;
            // Mint
            try {
                mintedNft = await metaplex?.candyMachinesV2().mint({ candyMachine })
                console.log(mintedNft)
            } catch (err: any) {
                setIsMinting(false)
                if (err?.message != 'User rejected the request.') {
                    setIsError(true)
                    setError(err?.message)
                    notify({ type: 'error', message: 'Error', description: err?.message });
                }
                console.log(error)
                return;
            }

            // Fetch Metadata
            try {
                /* metaplex!.nfts()
                    .findByMint({ mintAddress: mint! })
                    .then((nft) => {
                         */
                fetch(mintedNft!.nft.uri)
                    .then((res) => res.json())
                    .then((metadata) => {
                        setMetadata(metadata)
                        notify({ type: 'success', message: "Ailien Minted!", txid: mintedNft?.response.signature });
                    })
            } catch (err: any) {
                setIsMinting(false)
                if (err?.message != 'User rejected the request.') {
                    setIsError(true)
                    setError(err?.message)
                    notify({ type: 'error', message: 'Error', description: err?.message });
                }
                console.log(error)
                return;
            }

            // set state as completed
            setIsMinting(false)
            setIsCompleted(true)
        },
        [metaplex, publicKey, candyMachine]
    )

    return (
        <>
            <Button onClick={onOpen}
                variant={'outline'}
                size='lg'
                maxW="380px"
                rightIcon={<Text fontSize={'2xl'}>&#128377;</Text>}
            >
                <Text>Launch Minting Machine</Text>
            </Button>

            <Modal closeOnOverlayClick={false} isOpen={isOpen} colorScheme='blackAlpha' onClose={onClose} size={'lg'} isCentered>
                <ModalOverlay backdropFilter='blur(10px)' />
                <ModalContent borderRadius={10} className={isMinting && !metadata?.image ? [styles.mintModalMinting, styles.mintModal].join(' ') : styles.mintModal} boxShadow='0 0 20px #000' border={'2px solid #222'}>
                    <ModalBody pb={20} pt={10}>
                        <VStack spacing={12}>
                            {!metadata?.image ?
                                (<>
                                    <VStack >
                                        <Heading as="h1" size="xl" textAlign="center" className={styles.coolTitle}>
                                            Minting Machine
                                        </Heading>

                                        <Text color={isError ? '#999' : isCompleted ? '#fff' : loadingMachine ? '#22f' : isMinting ? "#f22" : "#555"} fontWeight={700} fontSize="md" textAlign="center" >
                                            {isError ? 'PAUSED' : isCompleted ? 'COMPLETED' : loadingMachine ? 'ACTIVATING MACHINE' : isMinting ? 'WOOOAH! MINTOOOOR!' : 'USE WITH CAUTION'}
                                        </Text>
                                    </VStack>
                                    <VStack>
                                        <CustomImageFrame h='35vh' w='35vh' wrapperClassName={isMinting ? styles.mintModalMinting : ''} isMinting={isMinting} >
                                            <Image src={isMinting ? "assets/loadmint.gif" : "assets/ailiens/blendblur.png"}
                                                pointerEvents={'none'} className={styles.nftImage}
                                                maxH={'calc(35vh)'} alt="" />
                                        </CustomImageFrame>
                                        <Spacer />
                                        <Skeleton h='30px' minW={150} startColor='#222' endColor='#222' isLoaded={false}>
                                        </Skeleton>
                                        <Skeleton h='20px' minW={100} startColor='#222' endColor='#222' isLoaded={false}>
                                        </Skeleton>
                                    </VStack>


                                    <MintButton
                                        onClick={(e) => {
                                            setIsCompleted(false)
                                            setIsError(false)
                                            setLoadingMachine(true)
                                            setTimeout(handleMintClick, 3000, e);
                                        }}
                                        isMinting={isMinting}
                                        loadingMachine={loadingMachine}
                                        disabled={!candyMachine}
                                    />
                                </>) : (<>

                                    <VStack >
                                        <Heading as="h1" size="xl" textAlign="center" className={styles.coolTitle}>
                                            Minting Machine
                                        </Heading>
                                        <Text color={isError ? '#999' : isCompleted ? '#fff' : loadingMachine ? '#22f' : isMinting ? "#f22" : "#555"} fontWeight={700} fontSize="md" textAlign="center" >
                                            {isError ? 'PAUSED' : isCompleted ? 'COMPLETED' : loadingMachine ? 'ACTIVATING MACHINE' : isMinting ? 'WOOOAH! MINTOOOOR!' : 'USE WITH CAUTION'}
                                        </Text>
                                    </VStack>
                                    <VStack>
                                        <CustomImageFrame h='35vh' w='35vh' wrapperClassName={isMinting ? styles.mintModalMinting : ''} isLoaded={displayNFT} isMinting={isMinting} >
                                            <Image src={loadingMachine ? 'assets/ailiens/blendblur.png' : metadata?.image}
                                                onLoad={() => {
                                                    setDisplayNFT(true)
                                                }}
                                                pointerEvents={'none'}
                                                className={styles.nftImage}
                                                maxH={'calc(35vh)'} alt="" />
                                        </CustomImageFrame>
                                        <Spacer />
                                        <Skeleton h='30px' minW={150} startColor='#222' endColor='#111' isLoaded={displayNFT && !loadingMachine}>
                                            <Heading color="white" as="h1" size="md" textAlign="center">
                                                {metadata.name}
                                            </Heading>
                                        </Skeleton>
                                        <Skeleton h='20px' minW={100} startColor='#222' endColor='#111' isLoaded={displayNFT && !loadingMachine}>
                                            <Text color={'white'} textAlign="center">{metadata.attributes[1].value}</Text>
                                        </Skeleton>
                                    </VStack>
                                    <MintButton onClick={(e) => {
                                        setIsCompleted(false)
                                        setIsError(false)
                                        setLoadingMachine(true)
                                        setTimeout(handleMintClick, 3000, e);
                                    }}
                                        loadingMachine={loadingMachine}
                                        isMinting={isMinting}
                                        disabled={!candyMachine}
                                    />

                                </>)
                            }
                        </VStack >
                        <ModalCloseButton _hover={{ background: 'transparent' }} color={'#555'} onClick={() => {
                            setLoadingMachine(false)
                            setIsMinting(false)
                            setIsCompleted(false)
                            setIsError(false)

                            setMetadata(undefined)
                            setDisplayNFT(false)
                            setDisplayPic(false)
                        }
                        } />
                    </ModalBody>
                </ModalContent>
            </Modal>
        </>
    )
}

export default MintModal