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
            disabled={disabled}
            variant={'outline'}
            onClick={onClick}
            size={'lg'}
            isLoading={isMinting || loadingMachine}
        >
            <Heading size="md" textAlign="center">
                START
            </Heading>
        </Button>
    )
}