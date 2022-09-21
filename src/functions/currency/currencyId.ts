import { ChainId, Currency } from '@smartdev1990/crona-sdk'

export function currencyId(currency: Currency): string {
  // if ([ChainId.CELO].includes(currency.chainId)) {
  //   return currency.wrapped.address
  // }

  if (currency.isNative) return 'BRISE'

  if (currency.isToken) return currency.address

  throw new Error('invalid currency')
}
