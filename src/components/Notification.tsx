import { FC, useEffect } from 'react'

import useNotificationStore from '../stores/useNotificationStore'
import { useNetworkConfiguration } from '../contexts/NetworkConfigurationProvider';

const NotificationList = () => {
  const { notifications, set: setNotificationStore } = useNotificationStore(
    (s) => s
  )

  const reversedNotifications = [...notifications].reverse()

  return (
    <>
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
    </>
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

  // TODO: we dont have access to the network or endpoint here.. 
  // getExplorerUrl(connection., txid, 'tx')
  // Either a provider, context, and or wallet adapter related pro/contx need updated

  useEffect(() => {
    const id = setTimeout(() => {
      onHide()
    }, 8000);

    return () => {
      clearInterval(id);
    };
  }, [onHide]);

  return (
    <div style={{ backgroundColor: '#111' }}
      className={`max-w-xs w-full bg-bkg-1 shadow-lg rounded-md mt-1 pointer-events-auto ring-1 ring-black ring-opacity-5 p-2 mx-2 mb-4 overflow-hidden`}
    >
      <div className={`p-2`}>
        <div className={`flex items-center`}>
          <div className={`flex-shrink-0`}>
            {/* {type === 'success' ? (
              <CheckCircleIcon className={`h-5 w-5 mr-1 text-green`} />
            ) : null}
            {type === 'info' && <InformationCircleIcon className={`h-5 w-5 mr-1 text-red`} />}
            {type === 'error' && (
              <XCircleIcon className={`h-5 w-5 mr-1`} />
            )} */}
          </div>
          <div className={`ml-2 w-0 flex-1`}>
            <div className={`text-sm text-fgd-1`}>{message}</div>
            {description ? (
              <p className={`mt-0.5 text-sm text-fgd-2`}>{description}</p>
            ) : null}
            {txid ? (
              <div className="flex-row text-sm">

                <a
                  href={'https://explorer.solana.com/tx/' + txid + `?cluster=${networkConfiguration}`}
                  target="_blank"
                  rel="noreferrer"
                  className="flex flex-row link link-accent"
                >
                  <div className="flex">{txid.slice(0, 8)}...
                    {txid.slice(txid.length - 8)}
                  </div>
                  <svg className="flex-shrink-0 h-4 ml-2 mt-0.5 text-primary-light w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" ><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"></path></svg>

                </a>
              </div>
            ) : null}
          </div>
          <div className={`ml-2 flex-shrink-0 self-start flex`}>
            <button
              onClick={() => onHide()}
              className={`bg-bkg-2 default-transition rounded-md inline-flex text-fgd-3 hover:text-fgd-4 focus:outline-none`}
            >
              <span className={`sr-only`}>Close</span>
              {/* <XIcon className="h-4 w-4" /> */}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default NotificationList
