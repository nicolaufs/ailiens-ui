import type { AppProps } from "next/app"
import { ChakraProvider } from "@chakra-ui/react"

import { ContextProvider } from "../contexts/ContextProvider"
import Notifications from '../components/Notification'
import MainLayout from "../layout/MainLayout"

import '@fontsource/exo-2'
import theme from "../theme"
import Head from "next/head"

require('@solana/wallet-adapter-react-ui/styles.css');
require('../styles/globals.css');



function MyApp({ Component, pageProps }: AppProps) {

  return (

    <ChakraProvider theme={theme}>

      <ContextProvider>
        <MainLayout>
          <Notifications />

          <Component {...pageProps} />
        </MainLayout>
      </ContextProvider>
    </ChakraProvider>
  )
}

export default MyApp