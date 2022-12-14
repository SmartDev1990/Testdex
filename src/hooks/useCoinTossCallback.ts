import { ChainId, Currency, CurrencyAmount, NATIVE, WNATIVE } from '@smartdev1990/crona-sdk'

import { tryParseAmount } from '../functions/parse'
import { useActiveWeb3React } from '../services/web3'
import { useCurrencyBalance } from '../state/wallet/hooks'
import { useEffect, useMemo, useState } from 'react'
import { useTransactionAdder } from '../state/transactions/hooks'
import { useCoinTossContract, useWETH9Contract } from './useContract'
import { maxAmountSpend } from 'app/functions'
import { ApprovalState, useApproveCallback } from './useApproveCallback'
import { Contract } from '@ethersproject/contracts'
import { BigNumber } from '@ethersproject/bignumber'
import { useSingleCallResult } from 'app/state/multicall/hooks'
import { result } from 'lodash'
import { splitSignature } from '@ethersproject/bytes'
import { GameBetStatus } from 'app/features/gamefi'
import { useCurrency } from './Tokens'
import { ApolloClient, InMemoryCache, gql } from '@apollo/client'

const NOT_APPLICABLE = { error: 'Not Applicable!' }

export function useEIP712BetSignMessageGenerator(
  domainName: string | '',
  domainVersion: string | '',
  chainId: number | undefined,
  verifyingContract: Contract | undefined,
  player: string | undefined,
  amount: BigNumber | undefined,
  choice: number | undefined,
  token: string | '',
  nonce: number | undefined,
  deadline: number | undefined,
  onBeforeSign: () => void,
  onAfterSign: (value) => void,
  onGenerateSign: (value) => void,
  onRejectedSign: () => void
): { signature?: any; onSign?: () => void } {
  const { account, library } = useActiveWeb3React()
  const [signatureData, setSignatureData] = useState(null)
  return {
    onSign: () => {
      const msgParams = JSON.stringify({
        domain: {
          // Give a user friendly name to the specific contract you are signing for.
          name: domainName,
          // Just let's you know the latest version. Definitely make sure the field name is correct.
          version: domainVersion,
          // Defining the chain aka Rinkeby testnet or Ethereum Main Net
          chainId: chainId,
          // If name isn't enough add verifying contract to make sure you are establishing contracts with the proper entity
          verifyingContract: verifyingContract.address,
        },

        // Defining the message signing data content.
        message: {
          player: player,
          amount: amount.toString(),
          choice: choice.toString(),
          token: token,
          nonce: nonce,
          deadline: deadline,
        },
        // Refers to the keys of the *types* object below.
        primaryType: 'PlaceBet',
        types: {
          // TODO: Clarify if EIP712Domain refers to the domain the contract is hosted on
          EIP712Domain: [
            { name: 'name', type: 'string' },
            { name: 'version', type: 'string' },
            { name: 'chainId', type: 'uint256' },
            { name: 'verifyingContract', type: 'address' },
          ],
          // Refer to PrimaryType
          PlaceBet: [
            { name: 'player', type: 'address' },
            { name: 'amount', type: 'uint256' },
            { name: 'choice', type: 'uint256' },
            { name: 'token', type: 'address' },
            { name: 'nonce', type: 'uint256' },
            { name: 'deadline', type: 'uint256' },
          ],
        },
      })

      onBeforeSign()
      library
        .send('eth_signTypedData_v4', [account, msgParams])
        .then(
          (signature) => {
            onAfterSign(signature)
            return splitSignature(signature)
          },
          (reason) => {
            onRejectedSign()
          }
        )
        .then(
          (signature) => {
            setSignatureData(signature)
          },
          (reason) => {}
        )
    },
    signature: signatureData,
  }
}

export function useCoinTossCallback_PlaceBet(
  selectedCurrency: Currency | undefined,
  inputValue: string | undefined
): {
  error?: string | ''
  rewardToken?: Currency | undefined
  reward?: undefined | BigNumber
  claimReward?: undefined | ((onAfterClaim) => Promise<{ tx: string; error: string }>)
  approvalState?: ApprovalState | undefined
  approveCallback?: () => Promise<void>
  contract?: Contract
  betsCountByPlayer?: number | 0
  minBetAmount?: BigNumber | undefined
  maxBetAmount?: BigNumber | undefined
  multiplier?: number | 0
} {
  const { chainId, account } = useActiveWeb3React()
  const conitossContract = useCoinTossContract()
  const balance = maxAmountSpend(useCurrencyBalance(account ?? undefined, selectedCurrency))
  const selectedCurrencyAmount = useMemo(
    () => tryParseAmount(inputValue, selectedCurrency),
    [selectedCurrency, inputValue]
  )
  const tokenAddress = selectedCurrency?.wrapped.address
  const [approvalState, approveCallback] = useApproveCallback(selectedCurrencyAmount, conitossContract?.address)
  // we can always parse the amount typed as the input currency, since wrapping is 1:1
  const addTransaction = useTransactionAdder()

  let callResult = useSingleCallResult(conitossContract, 'getBetAmountRangeByToken', [
    selectedCurrency?.wrapped.address,
  ])?.result
  const { minBetAmount, maxBetAmount } = useMemo(() => {
    return { minBetAmount: callResult && callResult[0], maxBetAmount: callResult && callResult[1] }
  }, [callResult])

  callResult = useSingleCallResult(conitossContract, 'getMultiplier', [
    tokenAddress,
    selectedCurrencyAmount?.quotient.toString() ?? '0',
  ])?.result
  const multiplier: number = useMemo(() => {
    return BigNumber.from((callResult && callResult[0]?.toString()) ?? 0).toNumber()
  }, [callResult])

  callResult = useSingleCallResult(conitossContract, 'getRewardToken', [])?.result
  const rewardTokenAddr: string = useMemo(() => {
    return callResult && callResult[0]?.toString()
  }, [callResult])

  const rewardToken: Currency = useCurrency(rewardTokenAddr)

  callResult = useSingleCallResult(conitossContract, 'getBetsCountByPlayerNotSender', [
    account,
    selectedCurrency?.wrapped.address,
  ])?.result
  const betsCountByPlayer: number = useMemo(() => {
    return BigNumber.from((callResult && callResult[0]?.toString()) ?? 0).toNumber()
  }, [callResult])

  callResult = useSingleCallResult(conitossContract, 'getRewardAmountByPlayerNotSender', [account])?.result
  const reward: BigNumber = useMemo(() => {
    return BigNumber.from((callResult && callResult[0]?.toString()) ?? 0)
  }, [callResult])

  // const [reward, setreward] = useState<BigNumber>(undefined)
  // const [betsCountByPlayer, setbetsCountByPlayer] = useState<number>(0)
  // useEffect(() => {
  //   async function FetchPlayerInfo() {
  //     try {
  //       setbetsCountByPlayer((await conitossContract.getBetsCountByPlayer(tokenAddress)).toNumber())
  //       setreward(await conitossContract.getRewardAmountByPlayer())
  //     } catch {
  //       setbetsCountByPlayer(0)
  //       setreward(BigNumber.from(0))
  //     }
  //   }

  //   FetchPlayerInfo()
  // }, [chainId, account, selectedCurrency, totalBetsCount, coinTossBetStatus])
  return useMemo(() => {
    if (!chainId && conitossContract) return NOT_APPLICABLE

    const hasInputAmount = Boolean(selectedCurrencyAmount?.greaterThan('0'))
    const sufficientBalance = selectedCurrencyAmount && balance && !balance.lessThan(selectedCurrencyAmount)
    const rangedBalance =
      selectedCurrencyAmount &&
      minBetAmount &&
      ((selectedCurrencyAmount?.greaterThan(minBetAmount?.toString()) &&
        selectedCurrencyAmount?.lessThan(maxBetAmount?.toString())) ||
        selectedCurrencyAmount?.equalTo(minBetAmount?.toString()) ||
        selectedCurrencyAmount?.equalTo(maxBetAmount?.toString()))
    return {
      multiplier,
      minBetAmount,
      maxBetAmount,
      betsCountByPlayer,
      approvalState,
      approveCallback,
      rewardToken,
      error: sufficientBalance
        ? rangedBalance
          ? undefined
          : `${selectedCurrency?.symbol} Bet Amount Out of Range`
        : hasInputAmount
        ? `Insufficient ${selectedCurrency?.symbol} balance`
        : `Enter ${selectedCurrency?.symbol} amount`,
      reward: reward,
      claimReward: async (onAfterClaim) => {
        try {
          const txReceipt = await conitossContract.claimReward()
          await txReceipt.wait()
          addTransaction(txReceipt, {
            summary: `Get Reward of ${selectedCurrency.symbol}`,
          })
          onAfterClaim()
          return { tx: txReceipt, error: undefined }
        } catch (error) {
          onAfterClaim()
          return { tx: undefined, error: error?.message }
        }
      },
      contract: conitossContract,
    }
  }, [
    conitossContract,
    chainId,
    account,
    selectedCurrencyAmount,
    balance,
    addTransaction,
    reward,
    minBetAmount,
    maxBetAmount,
    betsCountByPlayer,
    approvalState,
    rewardToken,
  ])
}

export function useCoinTossCallback_GameReview(
  selectedCurrency: Currency | undefined,
  totalBetsCount: number | undefined,
  coinTossBetStatus: GameBetStatus | undefined
): {
  error?: string | ''
  betsByToken?: []
  topGamers?: []
  betsByPlayer?: []
} {
  const { chainId, account } = useActiveWeb3React()
  const conitossContract = useCoinTossContract()

  const tokenAddress = selectedCurrency?.wrapped.address
  const [betsByPlayer, setbetsByPlayer] = useState<[]>([])
  const [betsByToken, setbetsByToken] = useState<[]>([])
  const [topGamers, settopGamers] = useState<[]>([])

  // let callResult = useSingleCallResult(conitossContract, 'getBetsByIndex', ['100'])?.result
  // const betsByIndex = useMemo(() => {
  //   return (callResult && callResult[0]) ?? []
  // }, [callResult])

  // callResult = useSingleCallResult(conitossContract, 'getTopGamers', [tokenAddress])?.result
  // const topGamers = useMemo(() => {
  //   return (callResult && callResult[0]) ?? []
  // }, [callResult])

  useEffect(() => {
    async function FetchPlayerInfo() {
      try {
        setbetsByToken(await conitossContract?.getBetsByToken(tokenAddress, '100'))
        settopGamers(await conitossContract?.getTopGamers(tokenAddress))
        if (account) {
          setbetsByPlayer(await conitossContract?.getBetsByPlayer(tokenAddress, '100'))
        } else {
          setbetsByPlayer([])
        }
      } catch {}
    }

    FetchPlayerInfo()
  }, [account, selectedCurrency, chainId, totalBetsCount, coinTossBetStatus])
  return useMemo(() => {
    if (!chainId && conitossContract) return NOT_APPLICABLE
    return {
      betsByPlayer,
      topGamers,
      betsByToken,
      contract: conitossContract,
    }
  }, [conitossContract, chainId, betsByToken, betsByPlayer, topGamers, totalBetsCount, account, coinTossBetStatus])
}

export function useCoinTossCallback_GameReview_FromSubgraph(
  selectedCurrency: Currency | undefined,
  totalBetsCount: number | undefined,
  coinTossBetStatus: GameBetStatus | undefined
): {
  error?: string | ''
  betsByToken?: []
  topGamers?: []
  betsByPlayer?: []
} {
  const { chainId, account } = useActiveWeb3React()
  const APIURL = 'https://graph.cronaswap.org/subgraphs/name/gamefi/graphql'

  const betsQuery = `
  query($count: Int, $token: string, $player: string) {
    bets(first: $count, where: {player: $player, token: $token}) {
      id
      index
      txn
      amount
      playerOption
      resultOption
      wasSuccess
      payout
    }
  }
`
  const client = new ApolloClient({
    uri: APIURL,
    cache: new InMemoryCache(),
  })
  client
    .query({
      query: gql(betsQuery),
      variables: {
        count: 100,
        token: selectedCurrency?.wrapped?.address,
        player: account,
      },
    })
    .then((data) => console.log('Subgraph data: ', data))
    .catch((err) => {
      console.log('Error fetching data: ', err)
    })

  const conitossContract = useCoinTossContract()

  const tokenAddress = selectedCurrency?.wrapped.address
  const [betsByPlayer, setbetsByPlayer] = useState<[]>([])
  const [betsByToken, setbetsByToken] = useState<[]>([])
  const [topGamers, settopGamers] = useState<[]>([])

  // let callResult = useSingleCallResult(conitossContract, 'getBetsByIndex', ['100'])?.result
  // const betsByIndex = useMemo(() => {
  //   return (callResult && callResult[0]) ?? []
  // }, [callResult])

  // callResult = useSingleCallResult(conitossContract, 'getTopGamers', [tokenAddress])?.result
  // const topGamers = useMemo(() => {
  //   return (callResult && callResult[0]) ?? []
  // }, [callResult])

  useEffect(() => {
    async function FetchPlayerInfo() {
      try {
        setbetsByToken(await conitossContract?.getBetsByToken(tokenAddress, '100'))
        settopGamers(await conitossContract?.getTopGamers(tokenAddress))
        if (account) {
          setbetsByPlayer(await conitossContract?.getBetsByPlayer(tokenAddress, '100'))
        } else {
          setbetsByPlayer([])
        }
      } catch {}
    }

    FetchPlayerInfo()
  }, [account, selectedCurrency, chainId, totalBetsCount, coinTossBetStatus])
  return useMemo(() => {
    if (!chainId && conitossContract) return NOT_APPLICABLE
    return {
      betsByPlayer,
      topGamers,
      betsByToken,
      contract: conitossContract,
    }
  }, [conitossContract, chainId, betsByToken, betsByPlayer, topGamers, totalBetsCount, account, coinTossBetStatus])
}

export function useCoinTossCallback_Volume(selectedCurrency: Currency | undefined): {
  error?: string | ''
  contract?: Contract
  totalBetsCount?: number | 0
  totalBetsAmount?: BigNumber | undefined
  headsCount?: number | 0
  tailsCount?: number | 0
} {
  const { chainId, account } = useActiveWeb3React()
  const conitossContract = useCoinTossContract()

  const tokenAddress = selectedCurrency?.wrapped.address

  const totalBetInfo = useSingleCallResult(conitossContract, 'getBetsAmountAndCountByToken', [tokenAddress])?.result
  const { totalBetsCount, totalBetsAmount } = useMemo(() => {
    return {
      totalBetsCount: BigNumber.from(totalBetInfo?.totalBetsCount.toString() ?? 0).toNumber(),
      totalBetsAmount: BigNumber.from(totalBetInfo?.totalBetsAmount.toString() ?? 0),
    }
  }, [totalBetInfo])

  const totalCounts = useSingleCallResult(conitossContract, 'getHeadsTailsCountByToken', [tokenAddress])?.result
  const { headsCount, tailsCount } = useMemo(() => {
    return {
      headsCount: BigNumber.from((totalCounts && totalCounts[0].toString()) ?? 0).toNumber(),
      tailsCount: BigNumber.from((totalCounts && totalCounts[1].toString()) ?? 0).toNumber(),
    }
  }, [totalCounts])
  return useMemo(() => {
    if (!chainId && conitossContract) return NOT_APPLICABLE

    return {
      headsCount,
      tailsCount,
      totalBetsAmount,
      totalBetsCount,
      contract: conitossContract,
    }
  }, [conitossContract, chainId, account, totalBetsAmount, totalBetsCount, headsCount, tailsCount])
}
