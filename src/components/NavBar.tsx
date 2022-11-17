import { HStack, Spacer } from "@chakra-ui/react"
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui"
import { FC } from "react"
import styles from "../styles/Home.module.css"
import NetworkSwitcher from "./NetworkSwitcher"

const NavBar: FC = () => {
    /* const { colorMode, toggleColorMode } = useColorMode() */
    return (
        <HStack width="full" padding={4}>
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