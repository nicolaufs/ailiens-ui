import { Button, Heading } from "@chakra-ui/react";
import { FC } from "react";
import styles from "../../../styles/Home.module.css"

interface MintButtonProps {
    isMinting: boolean,
    disabled: boolean,
    loadingMachine: boolean,
    onClick?: (e: any) => void,
}

export const MintButton: FC<MintButtonProps> = ({ isMinting, disabled, loadingMachine, onClick }) => {

    return (
        <Button
            colorScheme='black'
            disabled={disabled}
            boxShadow={loadingMachine ? '0 0 10px 3px #fff, 0 0 10px 7px #00f !important' : ''}
            className={isMinting ? styles.mintButtonPressed : styles.mintButton}
            color="bodyText"
            onClick={onClick}
            h={100}
            w={100}
            isLoading={isMinting}
        >
            <Heading size="3xl" textAlign="center"  >
                &#128434;
            </Heading>
        </Button>
    )
}