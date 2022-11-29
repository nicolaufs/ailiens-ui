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
    HStack,
} from "@chakra-ui/react"
import {
    FC,
    MouseEventHandler,
    useCallback,
    useState,
} from "react"
import { useMetaplex } from "../../../hooks/useMetaplex"
import styles from "../../../styles/Home.module.css"
import { CandyMachineV2, Metadata, MintCandyMachineV2Output } from "@metaplex-foundation/js"
import { MintButton } from "./MintButton"
import { notify } from "../../../utils/notifications"
import { CustomImageFrame } from "../../../components/CustomImageFrame"
import StakingModal from "./StakingModal"
import { LAMPORTS_PER_SOL, PublicKey } from "@solana/web3.js"
import { useCandyMachine } from "../../../hooks/useCandyMachine"

interface MintModalProps {
    candyMachine?: CandyMachineV2,
    owned?: Metadata[],
}

const MintModal: FC<MintModalProps> = ({ candyMachine, owned }) => {
    const { metaplex } = useMetaplex()
    const { publicKey } = useWallet()

    const [metadata, setMetadata] = useState<any>()
    const [loadingMachine, setLoadingMachine] = useState(false)
    const [isMinting, setIsMinting] = useState(false)
    const [isCompleted, setIsCompleted] = useState(false)
    const [isError, setIsError] = useState(false)
    const [error, setError] = useState()
    const [mintAddress, setMintAddress] = useState<string>()
    const [displayNFT, setDisplayNFT] = useState(false)

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
            if (!publicKey || !candyMachine) {
                if (!publicKey) {
                    notify({ type: 'error', message: 'Error', description: 'Wallet not connected!' });
                } else {
                    notify({ type: 'error', message: 'Error', description: 'Candy Machine not available.' });
                }
                return;
            }

            let mintedNft: MintCandyMachineV2Output | undefined;
            // Mint
            try {
                console.log('Minting!')
                mintedNft = await metaplex!.candyMachinesV2().mint({ candyMachine })
                console.log('Mint done!')
                console.log('----------')
                console.log(mintedNft.tokenAddress.toBase58())
                console.log(mintedNft.nft.address.toBase58())
                console.log('----------')
                setMintAddress(mintedNft.nft.mint.address.toBase58())
                //console.log(mintedNft)
            } catch (err: any) {
                setIsMinting(false)
                if (err?.message != 'User rejected the request.') {
                    setIsError(true)
                    setError(err?.message)
                    notify({ type: 'error', message: 'Error', description: err?.message });
                }
                console.log(err?.message)
                return;
            }

            // Fetch Metadata
            try {
                /* metaplex!.nfts()
                    .findByMint({ mintAddress: mint! })
                    .then((nft) => {
                         */
                console.log('Fetching mint!')
                fetch(mintedNft!.nft.uri)
                    .then((res) => res.json())
                    .then((metadata) => {
                        console.log('Mint fetched:', metadata)
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
                console.log(err?.message)
                return;
            }
            console.log('Updating state')
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
                disabled={!owned && !candyMachine}
                rightIcon={<Text fontSize={'2xl'}>&#128377;</Text>}
            >
                <Text>Launch Minting Machine</Text>
            </Button>

            <Modal closeOnOverlayClick={false} isOpen={isOpen} colorScheme='blackAlpha' onClose={onClose} size={'lg'} isCentered>
                <ModalOverlay backdropFilter='blur(10px)' />
                <ModalContent borderRadius={10} className={isMinting && !metadata?.image ? [styles.mintModalMinting, styles.mintModal].join(' ') : styles.mintModal} boxShadow='0 0 20px #000' border={'1px solid #222'}>
                    <ModalBody pb={12} pt={5}>
                        <VStack spacing={8}>
                            <VStack >
                                <Heading size="xl" textAlign="center" >
                                    &#128377;
                                </Heading>
                                <Heading as="h1" size="lg" textAlign="center" className={styles.coolTitle}>
                                    Minting Machine
                                </Heading>
                                <Text color={isError ? '#999' : isCompleted ? '#fff' : loadingMachine ? '#aff' : isMinting ? "#f22" : "#555"} fontWeight={700} fontSize="md" textAlign="center" >
                                    {isError ? 'PAUSED' : isCompleted ? 'COMPLETED' : loadingMachine ? 'ACTIVATING MACHINE' : isMinting ? 'WOOOAH! MINTOOOOR!' : 'USE WITH CAUTION'}
                                </Text>
                            </VStack>
                            {!metadata?.image ?
                                (<>

                                    <VStack>
                                        <CustomImageFrame h='35vh' w='35vh' wrapperClassName={isMinting ? styles.mintModalMinting : ''}
                                            style={{ animation: 'none', background: '#222' }}
                                            isMinting={isMinting} >
                                            <Image src={isMinting ? "assets/loadmint.gif" : "assets/ailiens/blendblur.png"}
                                                pointerEvents={'none'} className={styles.nftImage}
                                                maxH={'calc(35vh)'} alt="" />
                                        </CustomImageFrame>
                                        <Spacer />
                                        {candyMachine && <>
                                            <Text color={'white'} textAlign="center">Price: {candyMachine.price.basisPoints.toNumber() / LAMPORTS_PER_SOL} {candyMachine?.price.currency.symbol.toString()}</Text>
                                            <Text color={'#bbb'} fontSize={'sm'} textAlign="justify">
                                                Minted: {candyMachine.itemsMinted.toString()}/{candyMachine.itemsAvailable.toString()}
                                            </Text>
                                            <Text color={'#bbb'} fontSize={'sm'} textAlign="justify">
                                                Owned: {owned?.length}
                                            </Text>
                                        </>}

                                        {/* <Skeleton h='20px' minW={150} startColor='#222' endColor='#222' isLoaded={false} />
                                        <Skeleton h='20px' minW={100} startColor='#222' endColor='#222' isLoaded={false} />
                                        <Skeleton h='100px' w={360} startColor='#222' endColor='#222' isLoaded={false} /> */}
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
                                    <Text color={'#bbb'} fontSize={'xs'} textAlign="justify">Press the START MINT button to start miniting an Ailien!</Text>

                                </>) : (<>


                                    <VStack>
                                        <CustomImageFrame h='35vh' w='35vh' wrapperClassName={isMinting ? styles.mintModalMinting : ''}
                                            isLoaded={displayNFT} isMinting={isMinting} >
                                            <Image src={loadingMachine ? 'assets/ailiens/blendblur.png' : metadata?.image}
                                                onLoad={() => {
                                                    setDisplayNFT(true)
                                                }}
                                                pointerEvents={'none'}
                                                className={styles.nftImage}
                                                maxH={'calc(35vh)'} alt="" />
                                        </CustomImageFrame>
                                        <Spacer />
                                        <Skeleton h='20px' minW={150} startColor='#222' endColor='#111' isLoaded={displayNFT && !loadingMachine}>
                                            <Heading color="white" as="h1" size="md" textAlign="center">
                                                {metadata.name}
                                            </Heading>
                                        </Skeleton>
                                        <Skeleton h='20px' minW={100} startColor='#222' endColor='#111' isLoaded={displayNFT && !loadingMachine}>
                                            <Text color={'white'} textAlign="center">{metadata.attributes[1].value}</Text>
                                        </Skeleton>
                                        <Skeleton h='100px' overflow='scroll' w={360} startColor='#222' endColor='#222' isLoaded={displayNFT && !loadingMachine}>
                                            <Text color={'#bbb'} fontSize={'sm'} textAlign="justify">{metadata.description}</Text>
                                        </Skeleton>

                                    </VStack>
                                    <HStack>
                                        <Button variant={'outline'} onClick={(e) => {
                                            setIsCompleted(false)
                                            setIsError(false)
                                            setMetadata(undefined)
                                            setDisplayNFT(false)
                                        }} rightIcon={<Text fontSize="lg">&#128377;</Text>}
                                        >MINT</Button>
                                        <Button variant={'outline'}>VIEW</Button>
                                        {mintAddress &&
                                            <StakingModal version={'basic'} mintAddress={mintAddress} candyMachine={candyMachine} owned={owned} />
                                        }
                                    </HStack>
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
                            setMintAddress(undefined)
                        }
                        } />

                    </ModalBody>
                </ModalContent>
            </Modal>
        </>
    )
}

export default MintModal