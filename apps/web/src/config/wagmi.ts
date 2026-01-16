import { createConfig, http } from 'wagmi'
import { defineChain } from 'viem'
import type { Config } from 'wagmi'
import { injected, walletConnect } from 'wagmi/connectors'
import { humanityTestnet as viemHumanityTestnet } from 'viem/chains'

/**
 * Humanity Protocol Network Configuration
 *
 * Environment variables:
 * - VITE_CHAIN_ID: Chain ID (defaults to testnet: 7080969)
 * - VITE_RPC_URL: Custom RPC URL (defaults to Alchemy testnet endpoint)
 *
 * Supported Networks (set in .env file):
 * - Testnet: Chain ID 7080969, RPC: https://humanity-testnet.g.alchemy.com/public
 * - Mainnet: Chain ID 6985385, RPC: https://humanity-mainnet.g.alchemy.com/public
 */
const chainId = Number(import.meta.env.VITE_CHAIN_ID) || 7080969
const rpcUrl =
  import.meta.env.VITE_RPC_URL ||
  'https://humanity-testnet.g.alchemy.com/public'

export const humanityNetwork = defineChain({
  ...viemHumanityTestnet,
  id: chainId,
  name: 'Humanity Protocol',
  rpcUrls: {
    default: {
      http: [rpcUrl],
    },
  },
})

/**
 * Wagmi configuration with explicit transports
 */
export const config: Config = createConfig({
  chains: [humanityNetwork],
  transports: {
    [humanityNetwork.id]: http(),
  },
  connectors: [
    injected(),
    walletConnect({
      projectId:
        (import.meta.env.VITE_WALLETCONNECT_PROJECT_ID as string | undefined) ||
        'demo_project_id',
    }),
  ],
})
