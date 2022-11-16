import { HStack, Spacer } from "@chakra-ui/react"
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui"
import { FC } from "react"
import styles from "../styles/Home.module.css"
import NetworkSwitcher from "./NetworkSwitcher"

const NavBar: FC = () => {
    return (
        <HStack width="full" padding={4}>
            <Spacer />
            <WalletMultiButton className={styles["wallet-adapter-button-trigger"]} />
            <NetworkSwitcher />
        </HStack>
    )
}

export default NavBar