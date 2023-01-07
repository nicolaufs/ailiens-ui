import { CSSProperties, FC, ReactNode, useEffect, useRef, useState } from "react";
import { Box, Center, ResponsiveValue, Skeleton } from "@chakra-ui/react";
import styles from "../styles/Home.module.css"

interface CustomImageFrameProps {
    children: ReactNode,
    style?: CSSProperties | undefined,
    wrapperClassName?: string,
    isLoaded?: boolean | true,
    w?: string | ResponsiveValue<string>,
    h?: string | ResponsiveValue<string>,
    isMinting?: boolean,
    isStaking?: boolean,
}
export const CustomImageFrame: FC<CustomImageFrameProps> = ({
    children,
    style,
    wrapperClassName,
    isLoaded = true,
    h,
    w,
    isMinting = false,
    isStaking = false,
}) => {

    return (
        <Center style={{ aspectRatio: '1' }} className={wrapperClassName} >
            <Box maxW={'500px'} maxH={'500px'} h={'100%'} w={'100%'} className={isStaking ? styles.imageFrameStaking : isMinting ? styles.imageFrameMinting : styles.imageFrame} style={style}  >
                <Skeleton h={h} w={w} startColor='#222' endColor='#111' isLoaded={isLoaded}>
                    {children}
                </Skeleton>
            </Box>
        </Center>
    )
}