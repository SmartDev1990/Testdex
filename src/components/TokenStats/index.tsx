import React from 'react'
import Image from 'next/image'
import { formatBalance, formatNumber, formatNumberScale } from '../../functions/format'
import { useTokenStatsModalToggle } from '../../state/application/hooks'
import TokenStatsModal from '../../modals/TokenStatsModal'
import { ChainId } from '@smartdev1990/crona-sdk'
import { useRiceUsdcPrice } from '../../features/farms/hooks'

const supportedTokens = {
  RICE: {
    name: 'Rice Token',
    symbol: 'RICE',
    icon: '/mstile-70x70.png',
    address: {
      [ChainId.BRISE]: '0xadbd1231fb360047525BEdF962581F3eee7b49fe',
    },
  },
}

interface TokenStatsProps {
  token: string
}

function TokenStatusInner({ token, price }) {
  const toggleModal = useTokenStatsModalToggle()
  return (
    <div
      className="flex items-center px-2 py-2 text-sm rounded-lg bg-dark-900 hover:bg-dark-800 text-secondary"
      onClick={toggleModal}
    >
      {token.icon && (
        <Image
          src={token['icon']}
          alt={token['symbol']}
          width="24px"
          height="24px"
          objectFit="contain"
          className="rounded-md"
        />
      )}
      <div className="px-1 text-primary">{formatNumberScale(price, true)}</div>
    </div>
  )
}

export default function TokenStats({ token, ...rest }: TokenStatsProps) {
  const selectedToken = supportedTokens[token]
  const ricePrice = useRiceUsdcPrice()

  return (
    <>
      <TokenStatusInner token={selectedToken} price={formatBalance(ricePrice ? ricePrice : '0')} />
      <TokenStatsModal token={selectedToken} price={formatBalance(ricePrice ? ricePrice : 0)} />
    </>
  )
}
