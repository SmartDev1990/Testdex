import { ChainId, RICE_ADDRESS, Token, WETH9 } from '@smartdev1990/crona-sdk'

// export const ETHEREUM: { [key: string]: Token } = {
//   DAI: new Token(ChainId.BRISE, '0x6B175474E89094C44Da98b954EedeAC495271d0F', 18, 'DAI', 'Dai Stablecoin'),
//   USDC: new Token(ChainId.BRISE, '0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48', 6, 'USDC', 'USD Coin'),
//   USDT: new Token(ChainId.BRISE, '0xdAC17F958D2ee523a2206206994597C13D831ec7', 6, 'USDT', 'Tether USD'),
//   WBTC: new Token(ChainId.BRISE, '0x2260FAC5E5542a773Aa44fBCfeDf7C193bc2C599', 8, 'WBTC', 'Wrapped Bitcoin'),
// }

export const MAINNET: { [key: string]: Token } = {
  // DAI: new Token(ChainId.BRISE, '0xF2001B145b43032AAF5Ee2884e456CCd805F677D', 18, 'DAI', 'Dai Stablecoin'),
  USDC: new Token(ChainId.BRISE, '0xcf2DF9377A4e3C10e9EA29fDB8879d74C27FCDE7', 6, 'USDC', 'USD Coin'),
  USDT: new Token(ChainId.BRISE, '0xDe14b85cf78F2ADd2E867FEE40575437D5f10c06', 6, 'USDT', 'Tether USD'),
}

export const USDC: ChainTokenMap = {
  [ChainId.BRISE]: new Token(ChainId.BRISE, '0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48', 6, 'USDC', 'USD Coin'),
}

export const USDT: ChainTokenMap = {
  [ChainId.BRISE]: new Token(
    ChainId.BRISE,
    '0xDe14b85cf78F2ADd2E867FEE40575437D5f10c06',
    6,
    'USDT',
    'Tether USD'
  ),
}

export const XRICE: ChainTokenMap = {
  [ChainId.BRISE]: new Token(ChainId.BRISE, '0x722f5f012D29Cc4d6464B6a46343fBA3881eaa56', 18, 'xRICE', 'xRice Token'),
}

export type ChainTokenMap = {
  readonly [chainId in ChainId]?: Token
}

// CRONA
export const RICE: ChainTokenMap = {
  [ChainId.BRISE]: new Token(ChainId.BRISE, '0x1eb697Cb6F457F6a65C682F7f7c65F9f2E622A34', 18, 'RICE', 'Rice Token'),
}

export const WETH9_EXTENDED: { [chainId: number]: Token } = {
  ...WETH9,
  // [ChainId.ARBITRUM_TESTNET]: new Token(
  //   ChainId.ARBITRUM_TESTNET,
  //   '0x4A5e4A42dC430f669086b417AADf2B128beFEfac',
  //   18,
  //   'WETH9',
  //   'Wrapped Ether'
  // ),
  // [ChainId.ARBITRUM]: new Token(
  //   ChainId.ARBITRUM,
  //   '0x82aF49447D8a07e3bd95BD0d56f35241523fBab1',
  //   18,
  //   'WETH',
  //   'Wrapped Ether'
  // ),
  // [ChainId.FANTOM]: new Token(
  //   ChainId.FANTOM,
  //   '0x21be370D5312f44cB42ce377BC9b8a0cEF1A4C83',
  //   18,
  //   'WFTM',
  //   'Wrapped Fantom'
  // ),
}

// ifo tokens list
export const BETA: ChainTokenMap = {
  [ChainId.BRISE]: new Token(ChainId.BRISE, '0xc21223249CA28397B4B6541dfFaEcC539BfF0c59', 6, 'USDC', 'USD Coin'),
}
