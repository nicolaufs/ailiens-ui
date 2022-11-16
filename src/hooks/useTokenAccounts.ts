import { Account, TOKEN_PROGRAM_ID, unpackAccount } from '@solana/spl-token';
import { useConnection, useWallet } from '@solana/wallet-adapter-react';
import { useCallback, useEffect, useState } from 'react';

export const useTokenAccounts = () => {
  //pubkey: String | null
  const [tokenAccounts, setTokenAccounts] = useState<Account[]>([]);
  const { connection } = useConnection();
  const { publicKey } = useWallet();

  const init = useCallback(async () => {
    if (publicKey) {

      // Gte token accounts info
      const fetchedTokenAccounts = await connection.getTokenAccountsByOwner(
        publicKey,
        {
          programId: TOKEN_PROGRAM_ID,
        }
      );
      // unpack account info
      const tokenAccounts = fetchedTokenAccounts.value.map((v) => unpackAccount(v.pubkey, v.account, TOKEN_PROGRAM_ID));
      // get mints
      /* const tokenMints = await Promise.all(tokenAccounts.map(async ta => {
        const mint = await getMint(connection, ta.mint, 'confirmed')
        return mint
      })) */

      /* const tokenAccounts = fetchedTokenAccounts.value.map(tokenAccount => {
        const accountData = AccountLayout.decode(tokenAccount.account.data);
        return accountData;
      }); */

      setTokenAccounts(tokenAccounts);
    }
  }, [publicKey, connection]);

  useEffect(() => {
    if (publicKey) {
      setInterval(init, 2000);
    }
  }, [init, publicKey]);

  return { tokenAccounts };
};
