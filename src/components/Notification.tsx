import { FC, useEffect } from 'react'

import useNotificationStore from '../stores/useNotificationStore'
import { useNetworkConfiguration } from '../contexts/NetworkConfigurationProvider';
import { Box, Button, calc, Center, Flex, HStack, IconButton, Link, SlideFade, Stack, Text, useDisclosure, VStack } from '@chakra-ui/react';
import { CheckCircleIcon, CheckIcon, ChevronDownIcon, CloseIcon, ExternalLinkIcon, InfoOutlineIcon, SmallCloseIcon, WarningIcon } from '@chakra-ui/icons';

const NotificationList = () => {
  const { notifications, set: setNotificationStore } = useNotificationStore(
    (s) => s
  )

  const reversedNotifications = [...notifications].reverse()
  return (
    <Flex
      position={'fixed'} inset={0} zIndex={200} maxW={'xs'} alignItems={'end'} px={4} py={6} pointerEvents={'none'}
    >
      <Flex direction={'column'}>
        {reversedNotifications.map((n, idx) => (
          <Notification
            key={`${n.message}${idx}`}
            type={n.type}
            message={n.message}
            description={n.description}
            txid={n.txid}
            onHide={() => {
              setNotificationStore((state: any) => {
                const reversedIndex = reversedNotifications.length - 1 - idx;
                state.notifications = [
                  ...notifications.slice(0, reversedIndex),
                  ...notifications.slice(reversedIndex + 1),
                ];
              });
            }}
          />
        ))}
      </Flex>
    </Flex>
  );
}

interface NewMintProps {
  type: string,
  message: string,
  description: string | undefined,
  txid: string | undefined,
  onHide: () => void,
}



const Notification: FC<NewMintProps> = ({ type, message, description, txid, onHide }) => {
  const { networkConfiguration } = useNetworkConfiguration();
  const { isOpen, onToggle } = useDisclosure()
  // TODO: we dont have access to the network or endpoint here.. 
  // getExplorerUrl(connection., txid, 'tx')
  // Either a provider, context, and or wallet adapter related pro/contx need updated

  useEffect(() => {
    onToggle()
    const id = setTimeout(() => {
      onHide()
    }, 8000);

    return () => {
      clearInterval(id);
    };
  }, [onHide]);

  return (
    <SlideFade in={isOpen} offsetY='20px'>
      <Box border={'1px solid #222'} bg={'#101010'} color={'bodyText'} maxW={'sm'} minW={'xs'} p={3} mx={1} mb={4} borderRadius={8} pointerEvents={'auto'} mt={1} overflow={'hidden'}  >
        <Center>
          <HStack justify={'space-between'} w={'full'} >
            <Box >
              {type === 'success' ? (
                <CheckIcon h={3} w={3} mx={2} />
              ) : null}
              {type === 'error' && (
                <WarningIcon mx={2} color={'#bb3333'} />
              )}
            </Box>
            <Box ml={4} w={'full'}>
              <Text fontSize={'sm'} fontWeight={700}>{message}</Text>
              {description ? (
                <Text mt={0.5} fontSize={'xs'} >{description}</Text>
              ) : null}
              {txid ? (

                <Link
                  href={'https://explorer.solana.com/tx/' + txid + `?cluster=${networkConfiguration}`}
                  target="_blank"
                  rel="noreferrer"
                  mt={0.5}
                >
                  <HStack fontSize={'xs'} color={'#999'}>
                    <Text>{txid.slice(0, 8)}...
                      {txid.slice(txid.length - 8)}
                    </Text>
                    <ExternalLinkIcon />
                  </HStack>
                </Link>
              ) : null}
            </Box>
            <Box ml={2} >
              <IconButton
                aria-label='Notification Close Button'
                variant={'unstyled'}
                onClick={() => onHide()}
                icon={<SmallCloseIcon color={'white'} />}
              />

            </Box>
          </HStack>
        </Center>
      </Box>
    </SlideFade>
  )
}

export default NotificationList
