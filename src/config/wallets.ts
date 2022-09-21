import { AbstractConnector } from '@web3-react/abstract-connector'
import { ChainId } from '@smartdev1990/crona-sdk'
import { InjectedConnector } from '@web3-react/injected-connector'
import { NetworkConnector } from '../entities/connectors/NetworkConnector'

export const RPC = {
  [ChainId.BRISE]: 'https://serverrpc.com',
}

export const network = new NetworkConnector({
  defaultChainId: 32520,
  urls: RPC,
})

const supportedChainIds = Object.values(ChainId) as number[]

export const injected = new InjectedConnector({
  supportedChainIds: [
    32520, // mainnet
  ],
})

export const bridgeInjected = new InjectedConnector({
  supportedChainIds: [
    32520, // mainnet
  ],
})

export interface WalletInfo {
  connector?: (() => Promise<AbstractConnector>) | AbstractConnector
  name: string
  iconName: string
  description: string
  href: string | null
  color: string
  primary?: true
  mobile?: true
  mobileOnly?: true
}

export const SUPPORTED_WALLETS: { [key: string]: WalletInfo } = {
  INJECTED: {
    connector: injected,
    name: 'Injected',
    iconName: 'injected.svg',
    description: 'Injected web3 provider.',
    href: null,
    color: '#010101',
    primary: true,
  },

  METAMASK: {
    connector: injected,
    name: 'MetaMask',
    iconName: 'metamask.png',
    description: 'Easy-to-use browser extension.',
    href: null,
    color: '#E8831D',
  },

  METAMASK_FOR_MOBILE: {
    name: 'MetaMask',
    iconName: 'metamask.png',
    description: 'Open in MetaMask App',
    href: 'https://metamask.app.link/dapp/app.cronaswap.org',
    color: '#E8831D',
    mobile: true,
    mobileOnly: true,
  },

  WALLET_CONNECT: {
    connector: async () => {
      const WalletConnectConnector = (await import('@web3-react/walletconnect-connector')).WalletConnectConnector
      return new WalletConnectConnector({
        rpc: RPC,
        bridge: 'https://bridge.walletconnect.org',
        qrcode: true,
        supportedChainIds: [32520],
        // pollingInterval: 15000,
      })
    },
    name: 'WalletConnect',
    iconName: 'wallet-connect.svg',
    description: 'Connect to Trust Wallet, Rainbow Wallet and more...',
    href: null,
    color: '#4196FC',
    mobile: true,
  },
}
