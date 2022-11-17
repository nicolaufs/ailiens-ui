import { FC } from 'react';
import dynamic from 'next/dynamic';
import { useNetworkConfiguration } from '../contexts/NetworkConfigurationProvider';
import { Select } from '@chakra-ui/react';
import { ChevronDownIcon } from '@chakra-ui/icons';

const NetworkSwitcher: FC = () => {
  const { networkConfiguration, setNetworkConfiguration } = useNetworkConfiguration();

  return (
    <Select
      bg='black'
      borderColor='black'
      color='white'
      fontSize={14}
      fontWeight={700}
      borderRadius={8}
      cursor='pointer'
      background='transparent'
      border={'none'}
      w='80px'
      h='46px'
      icon={<ChevronDownIcon />}
      value={networkConfiguration}
      onChange={(e) => setNetworkConfiguration(e.target.value)} >
      <option value="mainnet-beta">main</option>
      <option value="devnet">dev</option>
      <option value="testnet">test</option>
    </Select>

  );
};

export default dynamic(() => Promise.resolve(NetworkSwitcher), {
  ssr: false
})