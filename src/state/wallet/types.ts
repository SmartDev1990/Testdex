import { CurrencyAmount, Token } from '@smartdev1990/crona-sdk'

type TokenAddress = string

export type TokenBalancesMap = Record<TokenAddress, CurrencyAmount<Token>>
