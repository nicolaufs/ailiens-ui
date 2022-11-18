import { Box, HStack, Link, Spacer } from "@chakra-ui/react"
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui"
import { FC } from "react"
import styles from "../styles/Home.module.css"
import NetworkSwitcher from "./NetworkSwitcher"

const Footer: FC = () => {
    /* const { colorMode, toggleColorMode } = useColorMode() */
    return (
        <HStack width="full" p={4} justify={'space-evenly'}>
            {/* <Link
                href="https://twitter.com/ailiensworld"
                target="_blank"
                rel="noopener noreferrer"
                fontSize={'sm'}
                color={'#aaa'}
            >
                @ailiensworld
            </Link> */}
            <Box h={50}></Box>
            {/* <Button variant={'unstyled'} onClick={toggleColorMode}>
                {colorMode === 'light' ? <Text>&#9899;</Text> : <Text>&#9898;</Text>}
            </Button> */}
        </HStack>
    )
}

export default Footer
