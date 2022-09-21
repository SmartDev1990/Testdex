import { ChainId } from '@smartdev1990/crona-sdk'

const explorers = {
  etherscan: (link: string, data: string, type: 'transaction' | 'token' | 'address' | 'block') => {
    switch (type) {
      case 'transaction':
        return `${link}/tx/${data}`
      default:
        return `${link}/${type}/${data}`
    }
  },
}

interface ChainObject {
  [chainId: number]: {
    link: string
    builder: (chainName: string, data: string, type: 'transaction' | 'token' | 'address' | 'block') => string
  }
}

const chains: ChainObject = {
  [ChainId.BRISE]: {
    link: 'https://brisescan.com',
    builder: explorers.etherscan,
  },
}

export function getExplorerLink(
  chainId: ChainId,
  data: string,
  type: 'transaction' | 'token' | 'address' | 'block'
): string {
  const chain = chains[chainId]
  return chain.builder(chain.link, data, type)
}
