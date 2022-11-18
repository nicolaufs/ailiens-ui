import { FC, ReactNode } from "react";
import { Box } from "@chakra-ui/react";
import styles from "../styles/Home.module.css"


export const CustomImageFrame: FC<{ children: ReactNode, wrapperClassName?: string }> = ({ children, wrapperClassName }) => {
    return (
        <Box className={wrapperClassName}>
            <Box h='100%' className={styles.imageFrame} >
                {children}
            </Box>
        </Box>
    )
}