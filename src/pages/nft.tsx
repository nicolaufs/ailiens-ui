import { PublicKey } from "@solana/web3.js"
import type { NextPage } from "next"
import { NftView } from "../views"

const Nft: NextPage<NftProps> = ({ mintAddress/* , imageSrc */ }) => {
    return (
        <NftView mintAddress={mintAddress} /* imageSrc={imageSrc} */ />
    )
}


export interface NftProps {
    mintAddress: string
    /* imageSrc: string */
}

Nft.getInitialProps = async ({ query }: any) => {
    const { mint/* , imageSrc */ } = query

    if (!mint /* || !imageSrc */) throw { error: "no mint" }

    try {
        const _ = new PublicKey(mint)
        return { mintAddress: mint/* , imageSrc: imageSrc */ }
    } catch {
        throw { error: "invalid mint" }
    }
}

export default Nft