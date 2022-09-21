import { Contract } from '@ethersproject/contracts'
import { ChainId } from '@smartdev1990/crona-sdk'
import stringify from 'fast-json-stable-stringify'
import useSWR from 'swr'

async function queryFilter(contract: Contract, event, fromBlockOrBlockHash, toBlock) {
  return await contract.queryFilter(event, fromBlockOrBlockHash, toBlock)
}

export function useQueryFilter({
  chainId = ChainId.BRISE,
  shouldFetch = true,
  contract,
  event,
  fromBlockOrBlockHash = undefined,
  toBlock = undefined,
}) {
  const { data } = useSWR(
    shouldFetch ? () => ['queryFilter', chainId, stringify(event), fromBlockOrBlockHash, toBlock] : null,
    () => queryFilter(contract, event, fromBlockOrBlockHash, toBlock)
  )
  return data
}
