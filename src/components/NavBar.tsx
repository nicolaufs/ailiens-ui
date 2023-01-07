import { Button, HStack, Spacer } from "@chakra-ui/react"
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui"
import { useRouter } from "next/router"
import { FC } from "react"
import styles from "../styles/Home.module.css"
import NetworkSwitcher from "./NetworkSwitcher"

const NavBar: FC = () => {
    const router = useRouter()
    /* const { colorMode, toggleColorMode } = useColorMode() */
    return (
        <HStack width="full" p={4}>
            {router.asPath != '/' && <Button variant={'outline'} onClick={() => {
                console.log(router.asPath)
                if (router.asPath == '/display') {
                    router.push('/')
                } else if (router.asPath.includes('nft?mint')) {
                    router.push('/display')
                }
            }}>Back</Button>
            }
            <Spacer />
            <WalletMultiButton className={styles["wallet-adapter-button-trigger"]} />
            <NetworkSwitcher />
            {/* <Button variant={'unstyled'} onClick={toggleColorMode}>
                {colorMode === 'light' ? <Text>&#9899;</Text> : <Text>&#9898;</Text>}
            </Button> */}
        </HStack>
    )
}

export default NavBar