// Next, React
import {
    Heading,
    VStack,
    Text,
    Button,
    SimpleGrid,
    HStack,
    Spinner,
} from "@chakra-ui/react"
import {
    FC,
    useEffect,
    useState,
} from "react"
import styles from "../../styles/Home.module.css"
import { JsonMetadata, Metadata } from "@metaplex-foundation/js"
import { NftCard } from "../../components/NftCard"
import { useCandyMachine } from "../../hooks/useCandyMachine"
import { useRouter } from "next/router"
import { fetchUri } from "../../utils/nfts"

export const DisplayView: FC = () => {
    const { owned } = useCandyMachine()
    const router = useRouter()
    const [isLoading, setIsLoading] = useState<boolean>(true)

    /* const router = useRouter() */
    //router.push(`/stake?mint=${mint}&imageSrc=${metadata?.image}`)
    const [pageItems, setPageItems] = useState<JsonMetadata[]>()
    const [page, setPage] = useState(1)

    // paging
    const getPage = async (page: number, perPage: number) => {
        const pageItems = owned!.slice(
            (page - 1) * perPage,
            page * perPage
        )
        // fetch metadata of NFTs for page
        let m: JsonMetadata[] = []
        for (let i = 0; i < pageItems.length; i++) {
            const json: JsonMetadata = await fetchUri(pageItems[i].uri)
            m.push(json)
        }
        // set state
        setPageItems(m)// .sort((a, b) => Number(a.attributes![1].value!.split('#')[1]) - Number(b.attributes![1].value!.split('#')[1])) 
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

    useEffect(() => {
        if (owned) {
            setIsLoading(false)
            getPage(page, 6)
        }

    }, [page, owned])

    return (
        <>
            <VStack spacing={6}>
                <VStack >
                    <Heading size="md" textAlign="center" >
                        &#128125;
                    </Heading>
                    <Heading as="h1" size="lg" textAlign="center" className={styles.coolTitle}>
                        My Ailiens Collection
                    </Heading>
                    <Text color={isLoading ? '#555' : '#aff'} fontWeight={700} fontSize="sm" textAlign="center" >
                        {isLoading ? 'LOADING' : `YOU OWN ${owned!.length} AILIENS`}
                    </Text>
                </VStack>
                {pageItems ?
                    <>
                        <SimpleGrid columns={owned!.length == 1 ? 1 : owned!.length == 2 ? 2 : { sm: 2, md: 3 }}
                            maxW={800} w={owned!.length == 1 ? '30vh' : { sm: "calc(85vw)", lg: "calc(70vw)" }} spacing={{ sm: '25px', md: '20px' }}>
                            {pageItems.map((m, i) =>
                                <NftCard key={i + (page - 1) * 6} metadata={m} onClick={async () => {
                                    const addr = owned![i + (page - 1) * 6].mintAddress.toBase58()
                                    router.push(`/nft?mint=${addr}`)//&imageSrc=${metadata?.image}
                                }} />
                            )}
                        </SimpleGrid>
                        {pageItems.length != 0 &&
                            <HStack>
                                <Button variant={'outline'} disabled={page === 1} onClick={prev}>Prev</Button>
                                <Button variant={'outline'} disabled={page === Math.ceil(owned!.length / 6)} onClick={next}>Next</Button>
                            </HStack>
                        }
                    </> :
                    <Spinner size='xl' />
                }
            </VStack >
        </>
    )
}

export default DisplayView