import { Button, Heading } from "@chakra-ui/react";
import { FC } from "react";
import styles from "../../../styles/Home.module.css"

interface StakingButtonProps {
    isStaking: boolean,
    disabled: boolean,
    loadingMachine: boolean,
    onClick?: (e: any) => void,
}

export const StakingButton: FC<StakingButtonProps> = ({ isStaking, disabled, loadingMachine, onClick }) => {

    return (
        <Button
            disabled={disabled}
            variant={'outline'}
            onClick={onClick}
            size={'lg'}
            isLoading={isStaking || loadingMachine}
        >
            <Heading size="md" textAlign="center"  >
                STAKE
            </Heading>
        </Button>
    )
}