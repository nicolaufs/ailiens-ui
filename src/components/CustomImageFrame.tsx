import { CSSProperties, FC, ReactNode } from "react";
import { Box, Skeleton } from "@chakra-ui/react";
import styles from "../styles/Home.module.css"

interface CustomImageFrameProps {
    children: ReactNode,
    style?: CSSProperties | undefined,
    wrapperClassName?: string,
    isLoaded?: boolean | true,
    w?: string,
    h?: string,
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
        <Box className={wrapperClassName}>
            <Box className={isStaking ? styles.imageFrameStaking : isMinting ? styles.imageFrameMinting : styles.imageFrame} style={style}  >
                <Skeleton h={h} w={w} startColor='#222' endColor='#111' isLoaded={isLoaded}>
                    {children}
                </Skeleton>
            </Box>
        </Box>
    )
}