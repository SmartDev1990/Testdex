import { NETWORK_ICON, NETWORK_LABEL } from '../../config/networks'

import Image from 'next/image'
import React from 'react'
import { useActiveWeb3React } from 'app/services/web3'
import { useNetworkModalToggle } from 'app/state/application/hooks'
import { ChainId } from '@smartdev1990/crona-sdk'
import { BscNetworkModal } from 'app/modals/NetworkModal/indexBsc'
import { useFaucetContract } from 'app/hooks'
import { useTransactionAdder } from 'app/state/transactions/hooks'
import Button from 'app/components/Button'
import { useTokenBalance } from 'state/wallet/hooks'
import QuestionHelper from 'app/components/QuestionHelper'
import { RICE, USDC, USDT } from 'app/config/tokens'

const faucetTokenAddress = {
  USDC: '0x63cE1066c7cA0a028Db94031794bFfe40ceE8b0A',
  USDT: '0xf9586C796087b3c6F39ffd85cB0129f0745143d3',
  RICE: '',
}

export default function Tools() {
  const { chainId } = useActiveWeb3React()
  const toggleNetworkModal = useNetworkModalToggle()
  const addTransaction = useTransactionAdder()

  const faucetContract = useFaucetContract()
  const faucetAddress = '0xe5eD4378f4761cb4b6a6904df5A29003C3e35557'
  const cronaBalance = Number(useTokenBalance(faucetAddress ?? undefined, RICE[chainId])?.toSignificant(8))
  const usdcBalance = Number(useTokenBalance(faucetAddress ?? undefined, USDC[chainId])?.toSignificant(8))
  const usdtBalance = Number(useTokenBalance(faucetAddress ?? undefined, USDT[chainId])?.toSignificant(8))
  const handleFaucetToken = async (token: string) => {
    try {
      const args = [faucetTokenAddress[token]]
      const tx = await faucetContract.faucetTokenWithETH(...args, { value: 100 })
      addTransaction(tx, { summary: `Send ${token}` })
    } catch {}
  }

  if (!chainId) return null
  return (
    <>
      <div
        className="flex items-center rounded bg-dark-900 hover:bg-dark-800 p-0.5 whitespace-nowrap text-sm font-bold cursor-pointer select-none pointer-events-auto"
        onClick={() => toggleNetworkModal()}
      >
        {ChainId.BRISE === chainId ? (
          <div className="grid items-center grid-flow-col px-3 py-2 space-x-2 text-sm rounded-lg pointer-events-auto auto-cols-max bg-dark-1000 text-secondary">
            <Image src={NETWORK_ICON[chainId]} alt="Switch Network" className="rounded-md" width="22px" height="22px" />
            <div className="text-primary">{NETWORK_LABEL[chainId]}</div>
          </div>
        ) : (
          <div className="grid items-center grid-flow-col px-3 py-2 space-x-2 text-sm rounded-lg pointer-events-auto auto-cols-max bg-blue/50">
            <Image src={NETWORK_ICON[chainId]} alt="Switch Network" className="rounded-md" width="22px" height="22px" />
            <div className="text-white">{NETWORK_LABEL[chainId]}</div>
          </div>
        )}

        <BscNetworkModal />
      </div>
      <Button
        color={cronaBalance >= 500 ? 'blue' : 'gray'}
        size="sm"
        onClick={() => handleFaucetToken('RICE')}
        className={`w-48 m-10 flex gap-2 items-center justify-center ${
          cronaBalance >= 500 ? `hover:bg-red` : `bg-gray`
        }`}
        disabled={!cronaBalance}
      >
        {cronaBalance >= 500 ? 'Take test RICE' : 'Not enough faucet RICE'}
        <QuestionHelper text="You send little native token to the protocol and get 500 RICE" />
      </Button>
      <Button
        color={usdcBalance >= 500 ? 'blue' : 'gray'}
        size="sm"
        onClick={() => handleFaucetToken('USDC')}
        className={`w-48 m-10 flex gap-2 items-center justify-center ${
          usdcBalance >= 500 ? `hover:bg-red` : `bg-gray`
        }`}
        disabled={!usdcBalance}
      >
        {usdcBalance >= 500 ? 'Take test USDC' : 'Not enough faucet USDC'}
        <QuestionHelper text="You send little native token to the protocol and get 500 USDC" />
      </Button>
      <Button
        color={usdtBalance >= 500 ? 'blue' : 'gray'}
        size="sm"
        onClick={() => handleFaucetToken('USDT')}
        className={`w-48 m-10 flex gap-2 items-center justify-center ${
          usdtBalance >= 500 ? `hover:bg-red` : `bg-gray`
        }`}
        disabled={!usdtBalance}
      >
        {usdtBalance >= 500 ? 'Take test USDT' : 'Not enough faucet USDT'}
        <QuestionHelper text="You send little native token to the protocol and get 500 USDT" />
      </Button>
    </>
  )
}
