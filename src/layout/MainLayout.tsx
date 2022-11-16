import { FC, ReactNode } from "react"
import Head from "next/head"
import styles from "../styles/Home.module.css"
import { Box, Center, Spacer, Stack } from "@chakra-ui/react"
import NavBar from "../components/NavBar"
import { useWallet } from "@solana/wallet-adapter-react"

const MainLayout: FC<{ children: ReactNode }> = ({ children }) => {
    const { connected } = useWallet()

    return (

        <Box
            w="full"
            h="calc(100vh)"
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