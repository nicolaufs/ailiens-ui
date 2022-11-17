import { FC, ReactNode } from "react";
import { Box, Image } from "@chakra-ui/react";
import styles from "../../../styles/Home.module.css"


export const CustomImageFrame: FC<{ children: ReactNode }> = ({ children }) => {
    return (
        <Box p={2} border={'2px solid #222'} borderRadius={12} boxShadow={'inset 0px 0px 10px 5px #ffffff10'}>
            {children}
        </Box>
    )
}