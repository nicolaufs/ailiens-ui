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
    Box,
    Skeleton,
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
import { CustomImageFrame } from "../../../components/CustomImageFrame"
import { StakingButton } from "./StakingButton"

interface StakingModalProps {
}

const StakingModal: FC<StakingModalProps> = ({ }) => {
    const [loadingMachine, setLoadingMachine] = useState(false)
    const [isStaking, setIsStaking] = useState(false)
    const [isCompleted, setIsCompleted] = useState(false)
    const [isError, setIsError] = useState(false)
    const [error, setError] = useState()

    const { metaplex } = useMetaplex()
    const { publicKey } = useWallet()

    const { isOpen, onOpen, onClose } = useDisclosure()

    const handleStakingClick: MouseEventHandler<HTMLButtonElement> = useCallback(
        async (event) => {
            console.log('Start Staking')
        },
        [metaplex, publicKey]
    )

    return (
        <>
            <Button onClick={onOpen}
                variant={'outline'}
                size='lg'
                maxW="380px"
                rightIcon={<Text fontSize="2xl">&#128377;</Text>}
            >
                <Text>Launch Staking Machine</Text>
            </Button>

            <Modal closeOnOverlayClick={false} isOpen={isOpen} colorScheme='blackAlpha' onClose={onClose} size={'xl'} isCentered>
                <ModalOverlay backdropFilter='blur(10px)' />
                <ModalContent borderRadius={10} boxShadow='0 0 20px #000' border={'2px solid #222'} className={styles.stakingModal}>
                    <ModalBody pb={20} pt={10}>
                        <VStack spacing={12}>
                            <VStack >
                                <Heading as="h1" size="xl" textAlign="center" className={styles.coolTitle}>
                                    Staking Machine
                                </Heading>

                                <Text color={isError ? '#999' : isCompleted ? '#fff' : loadingMachine ? '#22f' : isStaking ? "#f22" : "#555"} fontWeight={700} fontSize="md" textAlign="center" >
                                    {isError ? 'ERROR' : isCompleted ? 'COMPLETED' : loadingMachine ? 'ACTIVATING MACHINE' : isStaking ? 'MINTING IN PROCESS' : 'USE WITH CAUTION'}
                                </Text>
                            </VStack>
                            <Box h='35vh' w='35vh'>
                            </Box>

                            <StakingButton
                                onClick={(e) => {
                                    setIsCompleted(false)
                                    setIsError(false)
                                    setLoadingMachine(true)
                                    setTimeout(handleStakingClick, 3000, e);
                                }}
                                isStaking={isStaking}
                                loadingMachine={loadingMachine}
                                disabled={false}
                            />

                        </VStack >
                        <ModalCloseButton color={'#333'} onClick={() => {
                            setLoadingMachine(false)
                            setIsStaking(false)
                            setIsCompleted(false)
                            setIsError(false)
                        }} />
                    </ModalBody>
                </ModalContent>
            </Modal>
        </>
    )
}

export default StakingModal