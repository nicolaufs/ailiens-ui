import { background, Button, Heading, Image, Skeleton, Spacer, Text, VStack, withDefaultSize } from "@chakra-ui/react";
import { JsonMetadata } from "@metaplex-foundation/js";
import { FC, useState } from "react";
import { CustomImageFrame } from "./CustomImageFrame";
import styles from "../styles/Home.module.css"

interface NftCardProps {
    metadata: JsonMetadata,
    withDescription?: boolean
    onClick?: (e: any) => void,
}

export const NftCard: FC<NftCardProps> = ({ metadata, withDescription = false, onClick }) => {
    const [display, setDisplay] = useState(false)
    return (
        <VStack spacing={0} className={styles.nftCard} onClick={onClick}>
            <CustomImageFrame isLoaded={display}>
                <Image src={metadata.image} w={'100%'} pointerEvents={'none'} className={styles.nftImage} alt="" onLoad={() => {
                    setDisplay(true)
                }} />
            </CustomImageFrame>
            <Spacer />
            <VStack spacing={0} pt={2}>
                <Skeleton h='20px' minW={150} startColor='#222' endColor='#111' isLoaded={display}>
                    <Heading className={styles.nftCardHeading} size={{ sm: 'xs', md: 'sm' }} textAlign="center" >
                        {metadata.name}
                    </Heading>
                </Skeleton>
                <Skeleton h='20px' minW={100} startColor='#222' endColor='#111' isLoaded={display}>
                    <Text className={styles.nftCardText} fontSize={{ sm: 12, md: 14 }} textAlign="center">{metadata.attributes![1].value}</Text>
                </Skeleton>
                {withDescription && < Skeleton h='100px' overflow='scroll' startColor='#222' endColor='#222' isLoaded={display}>
                    <Text className="nftCardDesc" >{metadata.description}</Text>
                </Skeleton>
                }
            </VStack>
        </VStack >
    )

}