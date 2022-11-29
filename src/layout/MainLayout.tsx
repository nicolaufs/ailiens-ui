import { FC, ReactNode } from "react"
import styles from "../styles/Home.module.css"
import { Box, Center, Link, Spacer, Stack } from "@chakra-ui/react"
import NavBar from "../components/NavBar"
import { useWallet } from "@solana/wallet-adapter-react"
import Footer from "../components/Footer"

const MainLayout: FC<{ children: ReactNode }> = ({ children }) => {

    return (

        <Box
            w="full"
            backgroundPosition="center"
            padding={0}
            margin={0}
            className={styles.container}
        >
            <Stack w="full" minH="calc(100vh)">

                <NavBar />

                <Spacer />

                <Center >{children}</Center>

                <Spacer />

                <Footer />
            </Stack>
        </Box>
    )
}

export default MainLayout