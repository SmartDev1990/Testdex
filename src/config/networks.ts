import { ChainId } from '@smartdev1990/crona-sdk'

const Mainnet = 'https://raw.githubusercontent.com/smartdev1990/default-token-list/main/assets/tokens/brise/0x0eb9036cbE0f052386f36170c6b07eF0a0E3f710/logo.png'

export const NETWORK_ICON = {
  [ChainId.BRISE]: Mainnet,
}

export const NETWORK_LABEL: { [chainId in ChainId]?: string } = {
  [ChainId.BRISE]: 'Brise',
}
