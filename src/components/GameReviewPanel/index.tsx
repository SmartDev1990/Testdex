import React, { CSSProperties, useCallback, useMemo, useRef, useState } from 'react'
import { FixedSizeList } from 'react-window'
import AutoSizer from 'react-virtualized-auto-sizer'
import { BigNumber as BN } from '@ethersproject/bignumber'
import BigNumber from 'bignumber.js'
import { CoinTossStatus } from 'app/features/gamefi/cointoss/enum'
import { Currency } from '@smartdev1990/crona-sdk'
import { getExplorerLink, shortenAddress, shortenString, tryParseAmount } from 'app/functions'
import { GameType, GameReview } from 'app/features/gamefi'
import { Dice } from '../DiceRollBetPanel'
import { DiceRollOption } from 'app/constants/gamefi'
import { DiceRollStatus } from 'app/features/gamefi/diceroll/enum'
import { getBalanceAmount } from 'app/functions/formatBalance'
import ExternalLink from '../ExternalLink'
import { useActiveWeb3React } from 'app/services/web3'
interface BetHistory {
  index: BN
  txn: BN
  player: string
  token: string
  amount: BN
  playerOption: CoinTossStatus | DiceRollOption | any
  resultOption: CoinTossStatus | DiceRollStatus
  wasSuccess: boolean
  payout: BN
}
interface TopGamer {
  // index: BN
  player: string
  payoutAmount: BN
  count: BN
}
interface GameReviewPanelProps {
  selectedToken: Currency | undefined
  activeTab: number | 0
  betsByToken: Array<BetHistory> | []
  betsByPlayer: Array<BetHistory> | []
  topGamers: Array<TopGamer> | []
  game?: GameType | undefined
}

function GameReviewPanel({
  selectedToken,
  activeTab,
  betsByToken,
  topGamers,
  betsByPlayer,
  game,
}: GameReviewPanelProps) {
  const fixedListRef = useRef<FixedSizeList>()
  const itemData = useMemo(() => {
    switch (activeTab) {
      case GameReview.ALLBETS:
        return betsByToken
      case GameReview.YOURBETS:
        return betsByPlayer
      case GameReview.LEADERBOARD:
        return topGamers.filter((value: TopGamer) => value?.count.toNumber() !== 0)
      default:
        break
    }
  }, [activeTab, betsByToken, topGamers, betsByPlayer])

  const itemKey = useCallback((index: number, data: typeof itemData) => {
    return index
  }, [])

  const hoverStyle = ' hover:bg-[#0D0C2B] hover:cursor-pointer hover:rounded'
  const fieldsList = {
    [GameReview.ALLBETS]: [
      { field: 'Player', lPos: 0 },
      { field: 'Transaction', lPos: 200 },
      { field: 'Amount', lPos: 420 },
      { field: 'Choice', lPos: 630 },
      { field: 'Result', lPos: game === GameType.COINTOSS ? 820 : game === GameType.DICEROLL ? 870 : 820 },
      { field: 'Payout', lPos: 980 },
    ],
    [GameReview.YOURBETS]: [
      { field: 'RoundID', lPos: 40 },
      { field: 'Transaction', lPos: 200 },
      { field: 'Amount', lPos: 420 },
      { field: 'Choice', lPos: 630 },
      { field: 'Result', lPos: game === GameType.COINTOSS ? 820 : game === GameType.DICEROLL ? 870 : 820 },
      { field: 'Payout', lPos: 980 },
    ],
    [GameReview.LEADERBOARD]: [
      { field: 'Player', lPos: 0 },
      { field: 'Wins', lPos: 454 },
      { field: 'Payout', lPos: 860 },
    ],
  }

  const { chainId } = useActiveWeb3React()

  return (
    <div className="w-full h-[756px] bg-[#1C1B38] rounded flex flex-col">
      <div className="h-[64px] pt-4 pl-8 pr-4 relative">
        {fieldsList[activeTab].map((e) => (
          <div key={e?.field} className={'absolute ml-[' + e?.lPos + 'px]'}>
            {e?.field}
          </div>
        ))}
      </div>
      <div className="h-[1px] bg-[#AFAFC5] bg-opacity-30"></div>
      <div className="h-full pt-4 pb-6 pl-6 pr-4">
        <AutoSizer disableWidth>
          {({ height }) => (
            <FixedSizeList
              height={height}
              ref={fixedListRef as any}
              width="100%"
              itemData={itemData ?? []}
              itemCount={(itemData && itemData.length) ?? 0}
              itemSize={56}
              itemKey={itemKey}
            >
              {activeTab == GameReview.ALLBETS
                ? ({ data, index, style }: { data: Array<BetHistory>; index: number; style: CSSProperties }) => (
                    <div key={index} style={{ ...style, paddingTop: '12px' }}>
                      {data[index] && selectedToken && (
                        <ExternalLink href={getExplorerLink(chainId, data[index]?.txn.toString(), 'transaction')}>
                          <div className={'pl-2 relative flex flex-row items-center' + hoverStyle}>
                            <div className="">{shortenAddress(data[index]?.player)}</div>
                            <div className="absolute ml-[200px]">{shortenString(data[index]?.txn.toString(), 8)}</div>

                            <div className="absolute ml-[420px]">
                              <div className="relative flex flex-row ">
                                <div>
                                  {getBalanceAmount(
                                    new BigNumber(data[index]?.amount?.toString()),
                                    selectedToken?.decimals
                                  ).toFixed(2)}{' '}
                                </div>
                                <div className="absolute ml-[60px] text-[14px] leading-[24px] font-bold">
                                  {selectedToken?.symbol}
                                </div>
                              </div>
                            </div>
                            {game === GameType.COINTOSS ? (
                              <>
                                <div className="absolute ml-[630px]">
                                  {data[index]?.playerOption == CoinTossStatus.HEAD ? 'Head' : 'Tail'}
                                </div>
                                <div className="absolute ml-[820px]">
                                  {data[index]?.resultOption == CoinTossStatus.HEAD ? 'Head' : 'Tail'}
                                </div>
                              </>
                            ) : (
                              game === GameType.DICEROLL && (
                                <>
                                  <div className="absolute ml-[630px] flex flex-row gap-1">
                                    {data[index]?.playerOption?.map((e, index) => {
                                      return (
                                        e && (
                                          <Dice
                                            diceSide={index}
                                            dotSize={6}
                                            size={40}
                                            isSelected={false}
                                            onDiceSelect={() => {}}
                                            key={index}
                                          />
                                        )
                                      )
                                    })}
                                  </div>
                                  <div className="absolute ml-[870px]">
                                    <Dice
                                      diceSide={data[index]?.resultOption}
                                      dotSize={6}
                                      size={40}
                                      isSelected={true}
                                      onDiceSelect={() => {}}
                                    />
                                  </div>
                                </>
                              )
                            )}
                            <div className="absolute ml-[980px]">
                              <div className="relative flex flex-row ">
                                <div className="">
                                  {getBalanceAmount(
                                    new BigNumber(data[index]?.payout?.toString()),
                                    selectedToken?.decimals
                                  ).toFixed(2)}{' '}
                                </div>
                                <div className="absolute ml-[60px] text-[14px] leading-[24px] font-bold">
                                  {selectedToken?.symbol}
                                </div>
                              </div>
                            </div>
                          </div>
                        </ExternalLink>
                      )}
                    </div>
                  )
                : activeTab == GameReview.LEADERBOARD
                ? ({ data, index, style }: { data: Array<TopGamer>; index: number; style: CSSProperties }) => (
                    <div key={index} style={style}>
                      {data[index] && selectedToken && (
                        <div className={'pl-2 relative flex flex-row' + hoverStyle}>
                          <div className="">{shortenAddress(data[index]?.player)}</div>
                          <div className="absolute ml-[454px]">{data[index]?.count.toNumber()}</div>
                          <div className="absolute ml-[860px]">
                            <div className="relative flex flex-row ">
                              <div className="">
                                {getBalanceAmount(
                                  new BigNumber(data[index]?.payoutAmount?.toString()),
                                  selectedToken?.decimals
                                ).toFixed(2)}{' '}
                              </div>
                              <div className="absolute ml-[60px] text-[14px] leading-[24px] font-bold">
                                {selectedToken?.symbol}
                              </div>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  )
                : activeTab == GameReview.YOURBETS
                ? ({ data, index, style }: { data: Array<BetHistory>; index: number; style: CSSProperties }) => (
                    <div key={index} style={{ ...style, paddingTop: '8px' }}>
                      {data[index] && selectedToken && (
                        <ExternalLink href={getExplorerLink(chainId, data[index]?.txn.toString(), 'transaction')}>
                          <div className={'pl-2 relative flex flex-row items-center' + hoverStyle}>
                            <div className="">{data[index]?.index.toNumber()}</div>
                            <div className="absolute ml-[200px]">{shortenString(data[index]?.txn.toString(), 8)}</div>
                            <div className="absolute ml-[420px]">
                              <div className="relative flex flex-row ">
                                <div className="">
                                  {getBalanceAmount(
                                    new BigNumber(data[index]?.amount?.toString()),
                                    selectedToken?.decimals
                                  ).toFixed(2)}{' '}
                                </div>
                                <div className="absolute ml-[60px] text-[14px] leading-[24px] font-bold">
                                  {selectedToken?.symbol}
                                </div>
                              </div>
                            </div>
                            {game === GameType.COINTOSS ? (
                              <>
                                <div className="absolute ml-[630px]">
                                  {data[index]?.playerOption == CoinTossStatus.HEAD ? 'Head' : 'Tail'}
                                </div>
                                <div className="absolute ml-[820px]">
                                  {data[index]?.resultOption == CoinTossStatus.HEAD ? 'Head' : 'Tail'}
                                </div>
                              </>
                            ) : (
                              game === GameType.DICEROLL && (
                                <>
                                  <div className="absolute ml-[630px] flex flex-row gap-1">
                                    {data[index]?.playerOption?.map((e, index) => {
                                      return (
                                        e && (
                                          <Dice
                                            diceSide={index}
                                            dotSize={6}
                                            size={40}
                                            isSelected={false}
                                            onDiceSelect={() => {}}
                                            key={index}
                                          />
                                        )
                                      )
                                    })}
                                  </div>
                                  <div className="absolute ml-[870px]">
                                    <Dice
                                      diceSide={data[index]?.resultOption}
                                      dotSize={6}
                                      size={40}
                                      isSelected={true}
                                      onDiceSelect={() => {}}
                                    />
                                  </div>
                                </>
                              )
                            )}
                            <div className="absolute ml-[980px]">
                              <div className="relative flex flex-row ">
                                <div className="">
                                  {getBalanceAmount(
                                    new BigNumber(data[index]?.payout?.toString()),
                                    selectedToken?.decimals
                                  ).toFixed(2)}{' '}
                                </div>
                                <div className="absolute ml-[60px] text-[14px] leading-[24px] font-bold">
                                  {selectedToken?.symbol}
                                </div>
                              </div>
                            </div>
                          </div>
                        </ExternalLink>
                      )}
                    </div>
                  )
                : ({ data, index, style }) => (
                    <div style={style} key={index}>
                      {data[index] && (
                        <div className="flex flex-row gap-2">
                          {Object.keys(data[index]).map((e) => (
                            <div className="" key={e}>
                              {data[index][e]?.toString()}
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  )}
            </FixedSizeList>
          )}
        </AutoSizer>
      </div>
    </div>
  )
}

export default GameReviewPanel
