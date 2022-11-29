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
    SimpleGrid,
    HStack,
    Spacer,
    Skeleton,
} from "@chakra-ui/react"
import {
    FC,
    MouseEventHandler,
    useCallback,
    useEffect,
    useState,
} from "react"
import styles from "../../../styles/Home.module.css"
import { CandyMachineV2, JsonMetadata, Metadata } from "@metaplex-foundation/js"
import { CustomImageFrame } from "../../../components/CustomImageFrame"
import MintModal from "./MintModal"
import { NftCard } from "./NftCard"

interface StakingModalProps {
    version?: 'basic' | 'full' | undefined,
    mintAddress?: string,
    candyMachine?: CandyMachineV2,
    owned?: Metadata[],
}

const StakingModal: FC<StakingModalProps> = ({ version = 'full', mintAddress, candyMachine, owned }) => {
    const [loadingMachine, setLoadingMachine] = useState(false)
    const [isStaking, setIsStaking] = useState(false)
    const [isError, setIsError] = useState(false)
    const [metadata, setMetadata] = useState<JsonMetadata>()
    const [displayNFT, setDisplayNFT] = useState(false)
    const [address, setAddress] = useState(mintAddress)

    /* const router = useRouter() */
    //router.push(`/stake?mint=${mint}&imageSrc=${metadata?.image}`)
    const [pageItems, setPageItems] = useState<JsonMetadata[]>()
    const [page, setPage] = useState(1)


    const { isOpen, onOpen, onClose } = useDisclosure()

    const getMetadata = async (uri: string) => {
        let fetchResult = await fetch(uri)
        let json = await fetchResult.json() as JsonMetadata
        return json
    }

    const getNft = async (addr?: string) => {
        const a = addr ?? address
        const nft: Metadata = owned!.find(n => {
            return n.mintAddress.toBase58() === a
        })!
        const m: JsonMetadata = await getMetadata(nft.uri)
        setMetadata(m)
    }

    // paging
    const getPage = async (page: number, perPage: number) => {
        const pageItems = owned!.slice(
            (page - 1) * perPage,
            page * perPage
        )
        // fetch metadata of NFTs for page
        let m: JsonMetadata[] = []
        for (let i = 0; i < pageItems.length; i++) {
            const json: JsonMetadata = await getMetadata(pageItems[i].uri)
            m.push(json)
        }
        // set state
        setPageItems(m)
    }
    // previous page
    const prev = async () => {
        if (page - 1 < 1) {
            setPage(1)
        } else {
            setPage(page - 1)
        }
    }
    // next page
    const next = async () => {
        setPage(page + 1)
    }

    const [daysStaked, setDaysStaked] = useState<number>(0)
    const [totalEarned, setTotalEarned] = useState()
    const [claimable, setClaimable] = useState()

    const handleStake: MouseEventHandler<HTMLButtonElement> = useCallback(
        async (event) => {
        },
        []
    )

    const handleClaim: MouseEventHandler<HTMLButtonElement> = useCallback(
        async (event) => {
        },
        []
    )

    const handleUnstake: MouseEventHandler<HTMLButtonElement> = useCallback(
        async (event) => {
        },
        []
    )

    useEffect(() => {
        if (owned)
            getPage(page, 6)
    }, [page])

    return (
        <>
            <Button onClick={() => {
                onOpen()
                if (address != undefined) {
                    console.log(address)
                    getNft()
                } else {
                    getPage(page, 6)
                }
            }}
                variant={'outline'}
                size={version == 'basic' ? 'md' : 'lg'}
                maxW="380px"
                disabled={!owned && !candyMachine}
                rightIcon={<Text fontSize={version == 'basic' ? 'lg' : "2xl"}>&#128434;</Text>}
            >
                <Text> {version == 'basic' ? 'STAKE' : 'Launch Staking Machine'}</Text>
            </Button>
            <Modal closeOnOverlayClick={false} isOpen={isOpen} colorScheme='blackAlpha' onClose={onClose} size={address ? 'lg' : '3xl'} isCentered>
                <ModalOverlay backdropFilter='blur(10px)' />
                <ModalContent borderRadius={10} maxH={'100vh'} overflow='scroll' boxShadow='0 0 20px #000' border={'1px solid #222'} className={styles.stakingModal}>
                    <ModalBody pb={20} pt={10} >
                        <VStack spacing={12}>
                            <VStack >
                                <Heading size="xl" textAlign="center" >
                                    &#128434;
                                </Heading>
                                <Heading as="h1" size="lg" textAlign="center" className={styles.coolTitle}>
                                    Staking Machine
                                </Heading>
                                <Text color={isError ? '#999' : loadingMachine ? '#aff' : isStaking ? "#29f" : "#555"} fontWeight={700} fontSize="md" textAlign="center" >
                                    {pageItems?.length == 0 ? 'NO NFTS FOUND' : !address && pageItems ? 'SELECT NFT' : isError ? 'PAUSED' : loadingMachine ? 'ACTIVATING MACHINE' : isStaking ? 'AILIEN STAKED' : 'START EARNING $PAX'}
                                </Text>
                            </VStack>
                            {!address && owned && pageItems ?
                                <>
                                    <SimpleGrid columns={owned.length == 1 ? 1 : owned.length == 2 ? 2 : { sm: 2, md: 3 }}
                                        maxW={700} w={owned.length == 1 ? '30vh' : { sm: "calc(80vw)", lg: "calc(60vw)" }} spacing={{ sm: '25px', md: '20px' }}>
                                        {pageItems.length != 0 ? pageItems.map((m, i) =>
                                            <NftCard key={i} metadata={m} onClick={() => {
                                                const addr = owned[i].mintAddress.toBase58()
                                                setAddress(addr)
                                                getNft(addr)
                                            }} />,
                                        ) :
                                            [1, 2, 3].map((i) =>
                                                <CustomImageFrame key={i} h='100%' w='100%' >
                                                    <Image src="assets/ailiens/blendblur.png" pointerEvents={'none'} className={styles.nftImage} alt="" />
                                                </CustomImageFrame>
                                            )
                                        }
                                    </SimpleGrid>
                                    {pageItems.length == 0 && <>
                                        <Text color={'#bbb'} fontSize={'xs'} textAlign="justify">Get an Ailien first to be able to Stake it!</Text>
                                        <MintModal candyMachine={candyMachine} owned={owned} />
                                    </>
                                    }
                                    {pageItems.length != 0 &&
                                        <HStack>
                                            <Button variant={'outline'} disabled={page === 1} onClick={prev}>Prev</Button>
                                            <Button variant={'outline'} disabled={page === Math.ceil(owned.length / 6)} onClick={next}>Next</Button>

                                        </HStack>
                                    }
                                </>
                                : metadata &&
                                <>
                                    <VStack>
                                        <CustomImageFrame h='30vh' w='30vh' wrapperClassName={isStaking ? styles.stakeModalStaking : ''}
                                            isLoaded={displayNFT} isStaking={isStaking}  >
                                            <Image src={metadata.image}
                                                onLoad={() => {
                                                    setDisplayNFT(true)
                                                }}
                                                pointerEvents={'none'}
                                                className={styles.nftImage}
                                                maxH={'calc(30vh)'} alt="" />
                                        </CustomImageFrame>
                                        <Spacer />
                                        <Skeleton h='20px' minW={150} startColor='#222' endColor='#111' isLoaded={displayNFT && !loadingMachine}>
                                            <Heading color="white" as="h1" size="md" textAlign="center">
                                                {metadata.name}
                                            </Heading>
                                        </Skeleton>
                                        <Skeleton h='20px' minW={100} startColor='#222' endColor='#111' isLoaded={displayNFT && !loadingMachine}>
                                            <Text color={'white'} textAlign="center">{metadata.attributes![1].value}</Text>
                                        </Skeleton>
                                    </VStack>
                                    <VStack

                                        spacing={5}
                                    >

                                        {/* {isStaking
                                                ? `STAKING ${daysStaked} DAY${daysStaked === 1 ? "" : "S"}`
                                                : "READY TO STAKE"} */}
                                        <VStack
                                            border={'1px solid #222'}
                                            borderRadius="10px"
                                            padding="20px"
                                            spacing={0}>
                                            <Text color="white" as="b" fontSize="2xl">
                                                {isStaking ? `${totalEarned} $PAX` : "0 $PAX"}
                                            </Text>
                                            <Text color="#999" fontSize={'smaller'}>
                                                {isStaking ? `${claimable} $BLD earned` : "earn $BLD by staking"}
                                            </Text>
                                        </VStack>
                                        <Button
                                            disabled={false}
                                            variant={'outline'}
                                            onClick={(e) => {
                                                setIsError(false)
                                                if (isStaking) {
                                                    handleClaim(e)
                                                } else {
                                                    setLoadingMachine(true)
                                                    setTimeout(handleStake, 3000, e);
                                                }
                                            }}
                                            size={'lg'}
                                            isLoading={loadingMachine}
                                        >
                                            <Heading size="md" textAlign="center"  >
                                                {isStaking ? 'CLAIM $PAX' : 'STAKE AILIEN'}
                                            </Heading>
                                        </Button>
                                        {isStaking ? <Button variant={'outline'} size={'lg'} onClick={(e) => {
                                            setIsError(false)
                                            setLoadingMachine(true)
                                            setTimeout(handleUnstake, 3000, e);
                                        }}>UNSTAKE</Button> : null}
                                    </VStack>
                                </>
                            }
                        </VStack >
                        <ModalCloseButton color={'#333'} onClick={() => {
                            setLoadingMachine(false)
                            setIsStaking(false)
                            setAddress(undefined)
                            setMetadata(undefined)
                            setIsError(false)
                        }} />
                    </ModalBody>
                </ModalContent>
            </Modal>
        </>
    )
}

export default StakingModal