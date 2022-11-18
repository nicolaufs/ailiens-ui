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
            colorScheme='black'
            disabled={disabled}
            boxShadow={loadingMachine ? '0 0 10px 3px #fff, 0 0 10px 7px #f00 !important' : ''}
            className={isStaking ? styles.stakingButtonPressed : styles.stakingButton}
            color="bodyText"
            onClick={onClick}
            h={100}
            w={100}
            isLoading={isStaking}
        >
            <Heading size="3xl" pb={2} textAlign="center"  >
                &#128377;
            </Heading>
        </Button>
    )
}