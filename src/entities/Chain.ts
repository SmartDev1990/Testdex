import { ChainId } from '@smartdev1990/crona-sdk'
import { NETWORK_ICON, NETWORK_LABEL } from '../config/networks'

export type Chain = {
  id: ChainId
  name?: string
  icon?: string
}

export const DEFAULT_CHAIN_FROM: Chain = {
  id: ChainId.BRISE,
  icon: NETWORK_ICON[ChainId.BRISE],
  name: NETWORK_LABEL[ChainId.BRISE],
}

export const DEFAULT_CHAIN_TO: Chain = {
  id: ChainId.BRISE,
  icon: NETWORK_ICON[ChainId.BRISE],
  name: NETWORK_LABEL[ChainId.BRISE],
}
