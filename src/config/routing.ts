import { RICE, MAINNET } from './tokens'

// a list of tokens by chain
import { ChainId, Token, WNATIVE } from '@smartdev1990/crona-sdk'

type ChainTokenList = {
  readonly [chainId: number]: Token[]
}

// TODO: SDK should have two maps, WETH map and WNATIVE map.
const WRAPPED_NATIVE_ONLY: ChainTokenList = {
  [ChainId.BRISE]: [WNATIVE[ChainId.BRISE]],
}

// used to construct intermediary pairs for trading
export const BASES_TO_CHECK_TRADES_AGAINST: ChainTokenList = {
  ...WRAPPED_NATIVE_ONLY,

  [ChainId.BRISE]: [...WRAPPED_NATIVE_ONLY[ChainId.BRISE], MAINNET.USDC, MAINNET.USDT, RICE[ChainId.BRISE]],
}

export const ADDITIONAL_BASES: {
  [chainId: number]: { [tokenAddress: string]: Token[] }
} = {
  [ChainId.BRISE]: {
    // ...MIRROR_ADDITIONAL_BASES,
    // '0xF16E4d813f4DcfDe4c5b44f305c908742De84eF0': [ETH2X_FLI],
    // [FEI.address]: [DPI],
    // [FRAX.address]: [FXS],
    // [FXS.address]: [FRAX],
  },
}

/**
 * Some tokens can only be swapped via certain pairs, so we override the list of bases that are considered for these
 * tokens.
 */
export const CUSTOM_BASES: {
  [chainId: number]: { [tokenAddress: string]: Token[] }
} = {
  // [ChainId.BRISE]: { [AMPL.address]: [DAI, WNATIVE[ChainId.BRISE]] },
}

/**
 * Shows up in the currency select for swap and add liquidity
 */
export const COMMON_BASES: ChainTokenList = {
  [ChainId.BRISE]: [...WRAPPED_NATIVE_ONLY[ChainId.BRISE], MAINNET.USDC, MAINNET.USDT, RICE[ChainId.BRISE]],
}

// used to construct the list of all pairs we consider by default in the frontend
export const BASES_TO_TRACK_LIQUIDITY_FOR: ChainTokenList = {
  ...WRAPPED_NATIVE_ONLY,
  [ChainId.BRISE]: [...WRAPPED_NATIVE_ONLY[ChainId.BRISE], MAINNET.USDC, MAINNET.USDT],
}

export const PINNED_PAIRS: {
  readonly [chainId in ChainId]?: [Token, Token][]
} = {
  [ChainId.BRISE]: [
    [RICE[ChainId.BRISE], WNATIVE[ChainId.BRISE]],
    [MAINNET.USDC, MAINNET.USDT],
  ],
}
