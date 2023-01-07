import { JsonMetadata, Metadata } from "@metaplex-foundation/js"
import { useCandyMachine } from "../hooks/useCandyMachine"

export const fetchUri = async (uri: string) => {
    let fetchResult = await fetch(uri)
    let json = await fetchResult.json() as JsonMetadata
    return json
}

export const getNftMetadata = async (address: string, owned: Metadata<JsonMetadata<string>>[]) => {
    const nft: Metadata = owned.find(n => {
        return n.mintAddress.toBase58() === address
    })!
    const m: JsonMetadata = await fetchUri(nft.uri)
    return m
}