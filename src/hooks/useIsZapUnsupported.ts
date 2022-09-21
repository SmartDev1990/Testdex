import { Currency, Token } from '@smartdev1990/crona-sdk'
import { FarmPairInfo } from 'app/constants/farmsv1'

import { useMemo } from 'react'
import { useUnsupportedTokens } from './Tokens'

/**
 * Returns true if the input currency or output currency cannot be traded in the interface
 * @param currencyIn the input currency to check
 * @param currencyOut the output currency to check
 */
export function useIsZapUnsupported(currencyIn?: Currency, lpTokenOut?: FarmPairInfo): boolean {
  const unsupportedTokens: { [address: string]: Token } = useUnsupportedTokens()

  return useMemo(() => {
    // if unsupported list loaded & either token on list, mark as unsupported
    return Boolean(
      unsupportedTokens &&
        ((currencyIn?.isToken && unsupportedTokens[currencyIn.address]) ||
          (lpTokenOut?.lpToken && unsupportedTokens[lpTokenOut?.token0.id]) ||
          (lpTokenOut?.lpToken && unsupportedTokens[lpTokenOut?.token1.id]))
    )
  }, [currencyIn, lpTokenOut, unsupportedTokens])
}