import { FC, ReactNode } from "react"
import styles from "../styles/Home.module.css"
import { Box, Center, Spacer, Stack } from "@chakra-ui/react"
import NavBar from "../components/NavBar"
import { useWallet } from "@solana/wallet-adapter-react"

const MainLayout: FC<{ children: ReactNode }> = ({ children }) => {

    return (

        <Box
            w="full"
            backgroundPosition="center"
            padding={0}
            margin={0}
            className={styles.container}
        >
            <Stack w="full" h="calc(100vh)" justify="center" >

                <NavBar />

                <Spacer />

                <Center>{children}</Center>

                <Spacer />

                <Center>
                    <Box marginBottom={4} color="white" >
                        <a
                            href="https://twitter.com/_buildspace"
                            target="_blank"
                            rel="noopener noreferrer"
                            style={{ fontSize: 10 }}
                        >
                            built with @_buildspace
                        </a>
                    </Box>
                </Center>
            </Stack>
        </Box>
    )
}

export default MainLayout