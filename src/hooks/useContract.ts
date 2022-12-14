import {
  BAR_ADDRESS,
  BENTOBOX_ADDRESS,
  BORING_HELPER_ADDRESS,
  CHAINLINK_ORACLE_ADDRESS,
  ChainId,
  CHAIN_KEY,
  ENS_REGISTRAR_ADDRESS,
  MAKER_ADDRESS,
  MERKLE_DISTRIBUTOR_ADDRESS,
  MINICHEF_ADDRESS,
  RICE_ADDRESS,
  TIMELOCK_ADDRESS,
  WNATIVE_ADDRESS,
} from '@smartdev1990/crona-sdk'
import { STOP_LIMIT_ORDER_ADDRESS } from '@sushiswap/limit-order-sdk'
import MISO from '@cronaswap/miso/exports/all.json'

import {
  ARGENT_WALLET_DETECTOR_ABI,
  ARGENT_WALLET_DETECTOR_MAINNET_ADDRESS,
} from '../constants/abis/argent-wallet-detector'
import { AddressZero } from '@ethersproject/constants'
import BAR_ABI from '../constants/abis/bar.json'
import BENTOBOX_ABI from '../constants/abis/bentobox.json'
import BORING_HELPER_ABI from '../constants/abis/boring-helper.json'
import CHAINLINK_ORACLE_ABI from '../constants/abis/chainlink-oracle.json'
import CLONE_REWARDER_ABI from '../constants/abis/clone-rewarder.json'
import COMPLEX_REWARDER_ABI from '../constants/abis/complex-rewarder.json'
import { Contract } from '@ethersproject/contracts'
import EIP_2612_ABI from '../constants/abis/eip-2612.json'
import ENS_ABI from '../constants/abis/ens-registrar.json'
import ENS_PUBLIC_RESOLVER_ABI from '../constants/abis/ens-public-resolver.json'
import ERC20_ABI from '../constants/abis/erc20.json'
import { ERC20_BYTES32_ABI } from '../constants/abis/erc20'
import FACTORY_ABI from '../constants/abis/factory.json'
import INARI_ABI from '../constants/abis/inari.json'
import IUniswapV2PairABI from '../constants/abis/uniswap-v2-pair.json'
import LIMIT_ORDER_ABI from '../constants/abis/limit-order.json'
import LIMIT_ORDER_HELPER_ABI from '../constants/abis/limit-order-helper.json'
import MAKER_ABI from '../constants/abis/maker.json'
import MASTERCHEF_ABI from '../constants/abis/masterchef.json'
import MASTERCHEF_V2_ABI from '../constants/abis/masterchef-v2.json'
import MERKLE_DISTRIBUTOR_ABI from '../constants/abis/merkle-distributor.json'
import MINICHEF_ABI from '../constants/abis/minichef-v2.json'
import MULTICALL2_ABI from '../constants/abis/multicall2.json'
import ROUTER_ABI from '../constants/abis/router.json'
import SUSHI_ABI from '../constants/abis/sushi.json'
import TIMELOCK_ABI from '../constants/abis/timelock.json'
import UNI_FACTORY_ABI from '../constants/abis/uniswap-v2-factory.json'
import WETH9_ABI from '../constants/abis/weth.json'
import ZENKO_ABI from '../constants/abis/zenko.json'
import SEEDSALE_ABI from '../constants/abis/seedSale.json'
import PRIVATESALEA_ABI from '../constants/abis/privateSaleA.json'
import PRIVATESALEB_ABI from '../constants/abis/privateSaleB.json'
import PUBLICSALE_ABI from '../constants/abis/publicSale.json'
import DASHBOARD_ABIV1 from '../constants/abis/dashboardv1.json'
import DASHBOARD_ABIV2 from '../constants/abis/dashboardv2.json'
import REWARD_POOL_ABI from '../constants/abis/rewardpool.json'
import VOTING_ESCROW_ABI from '../constants/abis/voting-escrow.json'
import VOTING_ESCROW_AT_ABI from '../constants/abis/voting-escrow-at.json'
import ANYSWAP_ERC20_ABI from '../constants/abis/anyswap_erc20.json'
import CRONAVAULT_ABI from '../constants/abis/cronaVault.json'
import MISO_HELPER_ABI from 'app/constants/abis/miso-helper.json'
import IFOV1_ABI from '../constants/abis/ifoV1.json'
import IFOV2_ABI from '../constants/abis/ifoV2.json'
import VOTE_ABI from '../constants/abis/vote.json'
import ZAP_ABI from '../constants/abis/zap.json'
import FAUCET_ABI from '../constants/abis/faucet.json'
import PRIATESALE_ABI from '../constants/abis/privatesale.json'
import COINTOSS_ABI from '../constants/abis/cointoss.json'
import DICEROLL_ABI from '../constants/abis/diceroll.json'

import { getContract } from '../functions/contract'
import { useActiveWeb3React } from '../services/web3'
import { useMemo } from 'react'
import {
  DASHBOARDV1_ADDRESS,
  DASHBOARDV2_ADDRESS,
  MASTERCHEFV2_ADDRESS,
  PRIVATE_SALEA_ADDRESS,
  PRIVATE_SALEB_ADDRESS,
  PUBLIC_SALE_ADDRESS,
  SEED_SALE_ADDRESS,
  VOTING_ESCROW_ADDRESS,
  CRONAVAULT_ADDRESS,
  REWARD_POOL_ADDRESS,
  MASTERCHEFV1_ADDRESS,
  VOTE_ADDRESS,
  ZAP_ADDRESS,
  FAUCET_ADDRESS,
  PRIVATESALE_ADDRESS,
  COINTOSS_ADDRESS,
  DICEROLL_ADDRESS,
  FACTORY_ADDRESS,
  ROUTER_ADDRESS,
  MULTICALL2_ADDRESS,
} from '../constants/addresses'

const UNI_FACTORY_ADDRESS = '0x05C7E31449Aedd06c39077cc184BA691CA40Aad5'

export function useEIP2612Contract(tokenAddress?: string): Contract | null {
  return useContract(tokenAddress, EIP_2612_ABI, false)
}

// returns null on errors
export function useContract(address: string | undefined, ABI: any, withSignerIfPossible = true): Contract | null {
  const { library, account } = useActiveWeb3React()
  return useMemo(() => {
    if (!address || address === AddressZero || !ABI || !library) return null
    try {
      return getContract(address, ABI, library, withSignerIfPossible && account ? account : undefined)
    } catch (error) {
      console.error('Failed to get contract', error)
      return null
    }
  }, [address, ABI, library, withSignerIfPossible, account])
}

export function useTokenContract(tokenAddress?: string, withSignerIfPossible?: boolean): Contract | null {
  return useContract(tokenAddress, ERC20_ABI, withSignerIfPossible)
}

export function useWETH9Contract(withSignerIfPossible?: boolean): Contract | null {
  const { chainId } = useActiveWeb3React()
  return useContract(chainId && WNATIVE_ADDRESS[chainId], WETH9_ABI, withSignerIfPossible)
}

export function useArgentWalletDetectorContract(): Contract | null {
  const { chainId } = useActiveWeb3React()
  return useContract(
    chainId === ChainId.BRISE ? ARGENT_WALLET_DETECTOR_MAINNET_ADDRESS : undefined,
    ARGENT_WALLET_DETECTOR_ABI,
    false
  )
}

export function useENSRegistrarContract(withSignerIfPossible?: boolean): Contract | null {
  const { chainId } = useActiveWeb3React()
  return useContract(chainId && ENS_REGISTRAR_ADDRESS[chainId], ENS_ABI, withSignerIfPossible)
}

export function useENSResolverContract(address: string | undefined, withSignerIfPossible?: boolean): Contract | null {
  return useContract(address, ENS_PUBLIC_RESOLVER_ABI, withSignerIfPossible)
}

export function useBytes32TokenContract(tokenAddress?: string, withSignerIfPossible?: boolean): Contract | null {
  return useContract(tokenAddress, ERC20_BYTES32_ABI, withSignerIfPossible)
}

export function usePairContract(pairAddress?: string, withSignerIfPossible?: boolean): Contract | null {
  return useContract(pairAddress, IUniswapV2PairABI, withSignerIfPossible)
}

export function useMerkleDistributorContract(): Contract | null {
  const { chainId } = useActiveWeb3React()
  return useContract(chainId ? MERKLE_DISTRIBUTOR_ADDRESS[chainId] : undefined, MERKLE_DISTRIBUTOR_ABI, true)
}

export function useProtocolMerkleDistributorContract(): Contract | null {
  const { chainId } = useActiveWeb3React()
  return useContract(chainId ? '' : undefined, MERKLE_DISTRIBUTOR_ABI, true)
}

export function useBoringHelperContract(): Contract | null {
  const { chainId } = useActiveWeb3React()
  return useContract(chainId && BORING_HELPER_ADDRESS[chainId], BORING_HELPER_ABI, false)
}

export function useMulticall2Contract() {
  const { chainId } = useActiveWeb3React()
  return useContract(chainId && MULTICALL2_ADDRESS[chainId], MULTICALL2_ABI, false)
}

export function useRiceContract(withSignerIfPossible = true): Contract | null {
  const { chainId } = useActiveWeb3React()
  return useContract(chainId && RICE_ADDRESS[chainId], SUSHI_ABI, withSignerIfPossible)
}

export function useMasterChefContract(withSignerIfPossible?: boolean): Contract | null {
  const { chainId } = useActiveWeb3React()
  return useContract(chainId && MASTERCHEFV1_ADDRESS[chainId], MASTERCHEF_ABI, withSignerIfPossible)
}

// new masterchef for cronaswapv2
export function useMasterChefV2Contract(withSignerIfPossible?: boolean): Contract | null {
  const { chainId } = useActiveWeb3React()
  return useContract(chainId && MASTERCHEFV2_ADDRESS[chainId], MASTERCHEF_V2_ABI, withSignerIfPossible)
}

export function useMiniChefContract(withSignerIfPossible?: boolean): Contract | null {
  const { chainId } = useActiveWeb3React()
  return useContract(chainId && MINICHEF_ADDRESS[chainId], MINICHEF_ABI, withSignerIfPossible)
}

export function useFactoryContract(): Contract | null {
  const { chainId } = useActiveWeb3React()
  return useContract(chainId && FACTORY_ADDRESS[chainId], FACTORY_ABI, false)
}

export function useRouterContract(): Contract | null {
  const { chainId } = useActiveWeb3React()
  return useContract(ROUTER_ADDRESS[chainId], ROUTER_ABI, true)
}

export function useSushiBarContract(withSignerIfPossible?: boolean): Contract | null {
  const { chainId } = useActiveWeb3React()
  return useContract(chainId && BAR_ADDRESS[chainId], BAR_ABI, withSignerIfPossible)
}

export function useMakerContract(): Contract | null {
  const { chainId } = useActiveWeb3React()
  return useContract(chainId && MAKER_ADDRESS[chainId], MAKER_ABI, false)
}

export function useTimelockContract(): Contract | null {
  const { chainId } = useActiveWeb3React()
  return useContract(chainId && TIMELOCK_ADDRESS[chainId], TIMELOCK_ABI, false)
}

export function useBentoBoxContract(withSignerIfPossible?: boolean): Contract | null {
  const { chainId } = useActiveWeb3React()
  return useContract(chainId && BENTOBOX_ADDRESS[chainId], BENTOBOX_ABI, withSignerIfPossible)
}

export function useChainlinkOracle(): Contract | null {
  const { chainId } = useActiveWeb3React()
  return useContract(chainId && CHAINLINK_ORACLE_ADDRESS[chainId], CHAINLINK_ORACLE_ABI, false)
}

export function useUniV2FactoryContract(): Contract | null {
  return useContract(UNI_FACTORY_ADDRESS, UNI_FACTORY_ABI, false)
}

export function useComplexRewarderContract(address, withSignerIfPossible?: boolean): Contract | null {
  return useContract(address, COMPLEX_REWARDER_ABI, withSignerIfPossible)
}

export function useCloneRewarderContract(address, withSignerIfPossibe?: boolean): Contract | null {
  return useContract(address, CLONE_REWARDER_ABI, withSignerIfPossibe)
}

export function useLimitOrderContract(withSignerIfPossibe?: boolean): Contract | null {
  const { chainId } = useActiveWeb3React()
  return useContract(STOP_LIMIT_ORDER_ADDRESS[chainId], LIMIT_ORDER_ABI, withSignerIfPossibe)
}

export function useLimitOrderHelperContract(withSignerIfPossible?: boolean): Contract | null {
  return useContract('', LIMIT_ORDER_HELPER_ABI, withSignerIfPossible)
}

export function useInariContract(withSignerIfPossible?: boolean): Contract | null {
  return useContract('', INARI_ABI, withSignerIfPossible)
}

export function useZenkoContract(withSignerIfPossible?: boolean): Contract | null {
  return useContract('', ZENKO_ABI, withSignerIfPossible)
}

// add new address for cronaswapv2
export function useSeedSaleContract(withSignerIfPossible?: boolean): Contract | null {
  const { chainId } = useActiveWeb3React()
  return useContract(SEED_SALE_ADDRESS[chainId], SEEDSALE_ABI, withSignerIfPossible)
}

export function usePrivateSaleAContract(withSignerIfPossible?: boolean): Contract | null {
  const { chainId } = useActiveWeb3React()
  return useContract(PRIVATE_SALEA_ADDRESS[chainId], PRIVATESALEA_ABI, withSignerIfPossible)
}

export function usePrivateSaleBContract(withSignerIfPossible?: boolean): Contract | null {
  const { chainId } = useActiveWeb3React()
  return useContract(PRIVATE_SALEB_ADDRESS[chainId], PRIVATESALEB_ABI, withSignerIfPossible)
}

export function usePublicSaleContract(withSignerIfPossible?: boolean): Contract | null {
  const { chainId } = useActiveWeb3React()
  return useContract(PUBLIC_SALE_ADDRESS[chainId], PUBLICSALE_ABI, withSignerIfPossible)
}

export function useDashboardV1Contract(withSignerIfPossible?: boolean): Contract | null {
  const { chainId } = useActiveWeb3React()
  return useContract(DASHBOARDV1_ADDRESS[chainId], DASHBOARD_ABIV1, withSignerIfPossible)
}

export function useDashboardV2Contract(withSignerIfPossible?: boolean): Contract | null {
  const { chainId } = useActiveWeb3React()
  return useContract(DASHBOARDV2_ADDRESS[chainId], DASHBOARD_ABIV2, withSignerIfPossible)
}

export function useRewardPoolContract(withSignerIfPossible?: boolean): Contract | null {
  const { chainId } = useActiveWeb3React()
  return useContract(REWARD_POOL_ADDRESS[chainId], REWARD_POOL_ABI, withSignerIfPossible)
}

export function useVotingEscrowContract(withSignerIfPossible?: boolean): Contract | null {
  const { chainId } = useActiveWeb3React()
  return useContract(VOTING_ESCROW_ADDRESS[chainId], VOTING_ESCROW_ABI, withSignerIfPossible)
}

// This is a specifically function for balanceOf(address, timestamp) etc
export function useVotingEscrowAtContract(withSignerIfPossible?: boolean): Contract | null {
  const { chainId } = useActiveWeb3React()
  return useContract(VOTING_ESCROW_ADDRESS[chainId], VOTING_ESCROW_AT_ABI, withSignerIfPossible)
}

export function useAnyswapTokenContract(tokenAddress?: string, withSignerIfPossible?: boolean): Contract | null {
  return useContract(tokenAddress, ANYSWAP_ERC20_ABI, withSignerIfPossible)
}

export function useCronaVaultContract(withSignerIfPossible?: boolean): Contract | null {
  const { chainId } = useActiveWeb3React()
  return useContract(CRONAVAULT_ADDRESS[chainId], CRONAVAULT_ABI, withSignerIfPossible)
}

export function useMisoHelperContract(withSignerIfPossible = true): Contract | null {
  const { chainId } = useActiveWeb3React()
  // @ts-ignore TYPE NEEDS FIXING
  const factory = MISO[chainId]?.[CHAIN_KEY[chainId]]?.contracts.MISOHelper
  return useContract(factory?.address, MISO_HELPER_ABI, withSignerIfPossible)
}

export function useIfoV1Contract(tokenAddress?: string, withSignerIfPossible?: boolean): Contract | null {
  return useContract(tokenAddress, IFOV1_ABI, withSignerIfPossible)
}

export function useIfoV2Contract(tokenAddress?: string, withSignerIfPossible?: boolean): Contract | null {
  return useContract(tokenAddress, IFOV2_ABI, withSignerIfPossible)
}

export function useVotingContract(withSignerIfPossible?: boolean): Contract | null {
  const { chainId } = useActiveWeb3React()
  return useContract(VOTE_ADDRESS[chainId], VOTE_ABI, withSignerIfPossible)
}

export function useZapContract(withSignerIfPossible?: boolean): Contract | null {
  const { chainId } = useActiveWeb3React()
  return useContract(ZAP_ADDRESS[chainId], ZAP_ABI, withSignerIfPossible)
}

export function useFaucetContract(withSignerIfPossible?: boolean): Contract | null {
  const { chainId } = useActiveWeb3React()
  return useContract(FAUCET_ADDRESS[chainId], FAUCET_ABI, withSignerIfPossible)
}

export function usePrivateSaleContract(withSignerIfPossible?: boolean): Contract | null {
  const { chainId } = useActiveWeb3React()
  return useContract(PRIVATESALE_ADDRESS[chainId], PRIATESALE_ABI, withSignerIfPossible)
}

export function useCoinTossContract(withSignerIfPossible?: boolean): Contract | null {
  const { chainId } = useActiveWeb3React()
  return useContract(COINTOSS_ADDRESS[chainId], COINTOSS_ABI, withSignerIfPossible)
}

export function useDiceRollContract(withSignerIfPossible?: boolean): Contract | null {
  const { chainId } = useActiveWeb3React()
  return useContract(DICEROLL_ADDRESS[chainId], DICEROLL_ABI, withSignerIfPossible)
}
