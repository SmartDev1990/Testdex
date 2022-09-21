import { ChainId } from '@smartdev1990/crona-sdk'

// migrate from sushiswap
export type TokenInfo = {
  id: string
  name: string
  symbol: string
  decimals?: number
}

export type PairInfo = {
  id: number
  pid: number
  token0: TokenInfo
  token1?: TokenInfo
  name?: string
  symbol?: string
  pair?: string
  isCommunity?: boolean
  migrate?: boolean
  isVote?: boolean
  isZap?: boolean
}

export type FarmPairInfo = {
  id: number
  pid: number
  token0?: TokenInfo
  token1?: TokenInfo
  name?: string
  symbol?: string
  pair?: string
  isCommunity?: boolean
  migrate?: boolean
  isVote?: boolean
  isZap?: boolean
  lpToken?: string
  chef?: number
  type?: string
  tokenPrice?: number
  totalTvlInUSD?: number
  flpBalance?: number
  tvl?: number
  apr?: number
  lpPrice?: number
  boostApr?: number
  multiplier?: number
}

export type AddressMap = {
  [chainId: number]: {
    [address: string]: PairInfo
  }
}

// For MasterChefV1
export const FARMS: AddressMap = {
  [ChainId.BRISE]: {
    '': {
      id: 0,
      pid: 1,
      symbol: 'CLP',
      name: 'CRONA-CRO',
      migrate: true,
      token0: { id: '', name: 'Rice Token', symbol: 'RICE', decimals: 18 },
      token1: { id: '', name: 'WBRISE', symbol: 'BRISE', decimals: 18 },
    },

    '': {
      id: 1,
      pid: 2,
      symbol: 'CLP',
      name: 'USDC-CRO',
      migrate: true,
      token0: { id: '', name: 'USD Coin', symbol: 'USDC', decimals: 6 },
      token1: { id: '', name: 'WBRISE', symbol: 'BRISE', decimals: 18 },
    },

    '': {
      id: 2,
      pid: 3,
      symbol: 'CLP',
      name: 'USDT-CRO',
      migrate: false,
      token0: { id: '', name: 'Tether USD', symbol: 'USDT', decimals: 6 },
      token1: { id: '', name: 'WBRISE', symbol: 'BRISE', decimals: 18 },
    },

    '': {
      id: 3,
      pid: 4,
      symbol: 'CLP',
      name: 'WETH-CRO',
      migrate: false,
      token0: { id: '', name: 'xRice Token', symbol: 'xRICE', decimals: 18 },
      token1: { id: '', name: 'WBRISE', symbol: 'BRISE', decimals: 18 },
    },
  },
}
