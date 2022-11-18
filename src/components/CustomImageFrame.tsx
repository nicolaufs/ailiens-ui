import { FC, ReactNode } from "react";
import { Box, Skeleton } from "@chakra-ui/react";
import styles from "../styles/Home.module.css"

interface CustomImageFrameProps {
    children: ReactNode,
    wrapperClassName?: string,
    isLoaded?: boolean | true,
    w?: string,
    h?: string,
    isMinting?: boolean,
}
export const CustomImageFrame: FC<CustomImageFrameProps> = ({
    children,
    wrapperClassName,
    isLoaded = true,
    h,
    w,
    isMinting = false,
}) => {
    return (
        <Box className={wrapperClassName}>
            <Box className={isMinting ? styles.imageFrameMinting : styles.imageFrame}  >
                <Skeleton h={h} w={w} startColor='#222' endColor='#111' isLoaded={isLoaded}>
                    {children}
                </Skeleton>
            </Box>
        </Box>
    )
}