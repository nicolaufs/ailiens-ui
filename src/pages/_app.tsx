import type { AppProps } from "next/app"
import { ChakraProvider } from "@chakra-ui/react"

import { extendTheme } from "@chakra-ui/react"
import { ContextProvider } from "../contexts/ContextProvider"
import Notifications from '../components/Notification'
import '@fontsource/exo-2'
import MainLayout from "../layout/MainLayout"
import Head from "next/head"
const colors = {
  background: "#222",
  accent: "black",
  bodyText: "rgba(255, 255, 255, 1.0)",
}

const fonts = {
  heading: `'Exo 2', sans-serif`,
  body: `'Exo 2', sans-serif`,
}

const theme = extendTheme({ colors, fonts })

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider theme={theme}>
      <Head>
        <title>Ailiens</title>
        <meta name="Ailien NFT Collection" />
        <link rel="icon" href="/favicon.png" />
      </Head>
      <ContextProvider>
        <Notifications />
        <MainLayout>
          <Component {...pageProps} />
        </MainLayout>
      </ContextProvider>
    </ChakraProvider>
  )
}

export default MyApp