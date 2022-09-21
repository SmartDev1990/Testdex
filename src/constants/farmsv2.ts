import { ChainId } from '@smartdev1990/crona-sdk'
import { AddressMap } from './farmsv1'

// For MasterChefV2
export const FARMSV2: AddressMap = {
  [ChainId.BRISE]: {
    // '0xadbd1231fb360047525BEdF962581F3eee7b49fe': {
    //   id: 0, symbol: 'CLP', name: 'CronaSwap LP',
    //   token0: { id: '0xadbd1231fb360047525BEdF962581F3eee7b49fe', name: 'CronSwap', symbol: 'CRONA', decimals: 18 },
    //   token1: { id: '0xadbd1231fb360047525BEdF962581F3eee7b49fe', name: 'CronSwap', symbol: 'CRONA', decimals: 18 },
    // },

    '0xeD75347fFBe08d5cce4858C70Df4dB4Bbe8532a0': {
      id: 0,
      pid: 0,
      symbol: 'CLP',
      name: 'CRONA-CRO',
      token0: {
        id: '0xadbd1231fb360047525BEdF962581F3eee7b49fe',
        name: 'CronSwap',
        symbol: 'CRONA',
        decimals: 18,
      },
      token1: {
        id: '0x5C7F8A570d578ED84E63fdFA7b1eE72dEae1AE23',
        name: 'WCRO Token',
        symbol: 'CRO',
        decimals: 18,
      },
      isVote: true,
      isZap: true,
    },

    '0x482E0eEb877091cfca439D131321bDE23ddf9bB5': {
      id: 1,
      pid: 1,
      symbol: 'CLP',
      name: 'CRONA-USDC',
      token0: {
        id: '0xadbd1231fb360047525BEdF962581F3eee7b49fe',
        name: 'CronSwap',
        symbol: 'CRONA',
        decimals: 18,
      },
      token1: {
        id: '0xc21223249CA28397B4B6541dfFaEcC539BfF0c59',
        name: 'USD Coin',
        symbol: 'USDC',
        decimals: 6,
      },
      isVote: true,
      isZap: true,
    },

    '0x0427F9C304b0028f67A5fD61ffdD613186c1894B': {
      id: 2,
      pid: 2,
      symbol: 'CLP',
      name: 'CRONA-USDT',
      token0: {
        id: '0xadbd1231fb360047525BEdF962581F3eee7b49fe',
        name: 'CronSwap',
        symbol: 'CRONA',
        decimals: 18,
      },
      token1: {
        id: '0x66e428c3f67a68878562e79A0234c1F83c208770',
        name: 'Tether USD',
        symbol: 'USDT',
        decimals: 6,
      },
      isVote: true,
      isZap: true,
    },

    '0x0625A68D25d304aed698c806267a4e369e8Eb12a': {
      id: 3,
      pid: 3,
      symbol: 'CLP',
      name: 'CRO-USDC',
      token0: {
        id: '0x5C7F8A570d578ED84E63fdFA7b1eE72dEae1AE23',
        name: 'WCRO Token',
        symbol: 'CRO',
        decimals: 18,
      },
      token1: {
        id: '0xc21223249CA28397B4B6541dfFaEcC539BfF0c59',
        name: 'USD Coin',
        symbol: 'USDC',
        decimals: 6,
      },
      isVote: true,
      isZap: true,
    },

    '0x19Dd1683e8c5F6Cc338C1438f2D25EBb4e0b0b08': {
      id: 4,
      pid: 4,
      symbol: 'CLP',
      name: 'USDT-CRO',
      token0: {
        id: '0x66e428c3f67a68878562e79A0234c1F83c208770',
        name: 'Tether USD',
        symbol: 'USDT',
        decimals: 6,
      },
      token1: {
        id: '0x5C7F8A570d578ED84E63fdFA7b1eE72dEae1AE23',
        name: 'WCRO Token',
        symbol: 'CRO',
        decimals: 18,
      },
      isVote: false,
      isZap: false,
    },

    '0x8232aA9C3EFf79cd845FcDa109B461849Bf1Be83': {
      id: 5,
      pid: 5,
      symbol: 'CLP',
      name: 'WETH-CRO',
      token0: {
        id: '0xe44Fd7fCb2b1581822D0c862B68222998a0c299a',
        name: 'Wrapped ETH',
        symbol: 'WETH',
        decimals: 18,
      },
      token1: {
        id: '0x5C7F8A570d578ED84E63fdFA7b1eE72dEae1AE23',
        name: 'WCRO Token',
        symbol: 'CRO',
        decimals: 18,
      },
      isVote: false,
      isZap: false,
    },

    '0xb4684F52867dC0dDe6F931fBf6eA66Ce94666860': {
      id: 6,
      pid: 6,
      symbol: 'CLP',
      name: 'WBTC-CRO',
      token0: {
        id: '0x062e66477faf219f25d27dced647bf57c3107d52',
        name: 'Wrapped BTC',
        symbol: 'WBTC',
        decimals: 8,
      },
      token1: {
        id: '0x5C7F8A570d578ED84E63fdFA7b1eE72dEae1AE23',
        name: 'WCRO Token',
        symbol: 'CRO',
        decimals: 18,
      },
      isVote: false,
      isZap: false,
    },

    '0x5cc953f278bf6908B2632c65D6a202D6fd1370f9': {
      id: 7,
      pid: 7,
      symbol: 'CLP',
      name: 'WETH-USDC',
      token0: {
        id: '0xe44Fd7fCb2b1581822D0c862B68222998a0c299a',
        name: 'Wrapped ETH',
        symbol: 'WETH',
        decimals: 18,
      },
      token1: {
        id: '0xc21223249CA28397B4B6541dfFaEcC539BfF0c59',
        name: 'USD Coin',
        symbol: 'USDC',
        decimals: 6,
      },
      isVote: true,
      isZap: true,
    },

    '0xea7fc6A39B0d0344e1662E6ABF2FEcD19Bf3D029': {
      id: 8,
      pid: 8,
      symbol: 'CLP',
      name: 'WBTC-USDC',
      token0: {
        id: '0x062e66477faf219f25d27dced647bf57c3107d52',
        name: 'Wrapped BTC',
        symbol: 'WBTC',
        decimals: 8,
      },
      token1: {
        id: '0xc21223249CA28397B4B6541dfFaEcC539BfF0c59',
        name: 'USD Coin',
        symbol: 'USDC',
        decimals: 6,
      },
      isZap: true,
    },

    '0x285a569EDD6210a0410883d2E29471A6B0c7790d': {
      id: 9,
      pid: 9,
      symbol: 'CLP',
      name: 'WBTC-WETH',
      token0: {
        id: '0x062e66477faf219f25d27dced647bf57c3107d52',
        name: 'Wrapped BTC',
        symbol: 'WBTC',
        decimals: 8,
      },
      token1: {
        id: '0xe44Fd7fCb2b1581822D0c862B68222998a0c299a',
        name: 'Wrapped ETH',
        symbol: 'WETH',
        decimals: 18,
      },
      isZap: true,
    },

    '0xaEbaFDbe975DB0bfbF4e95a6493CB93d02cc86aE': {
      id: 10,
      pid: 10,
      symbol: 'CLP',
      name: 'DAI-USDC',
      token0: {
        id: '0xF2001B145b43032AAF5Ee2884e456CCd805F677D',
        name: 'Dai Stablecoin',
        symbol: 'DAI',
        decimals: 18,
      },
      token1: {
        id: '0xc21223249CA28397B4B6541dfFaEcC539BfF0c59',
        name: 'USD Coin',
        symbol: 'USDC',
        decimals: 6,
      },
      isVote: true,
      isZap: false,
    },
  },
}
