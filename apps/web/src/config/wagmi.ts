import { createConfig, http } from 'wagmi';
import { defineChain } from 'viem';
import type { Config } from 'wagmi';
import { injected, walletConnect } from 'wagmi/connectors';
import { humanityTestnet as viemHumanityTestnet } from 'viem/chains'

/**
 * Humanity Protocol Testnet Configuration
 *
 * - Chain ID: 7080969
 * - Network: Humanity Protocol Testnet
 * - Token: tHP (Testnet Humanity)
 * - Explorer: https://explorer.testnet.humanity.org
 */
export const humanityTestnet = defineChain({
  ...viemHumanityTestnet,
  name: 'Humanity Protocol testnet',
  rpcUrls: {
    default: {
      http: ['https://humanity-testnet.g.alchemy.com/public'],
    },
  },
})

/**
 * Wagmi configuration with explicit transports
 * 
 * Key changes:
 * 1. Use createConfig instead of getDefaultConfig for better control
 * 2. Explicitly configure transports for each chain
 * 3. Add connectors manually for wallet support
 * 
 * This fixes the "wrong network" issue in RainbowKit
 */
export const config: Config = createConfig({
  chains: [humanityTestnet],
  transports: {
    [humanityTestnet.id]: http(), // Automatically uses the chain's default RPC URL
  },
  connectors: [
    injected(),
    walletConnect({
      projectId: (import.meta.env.VITE_WALLETCONNECT_PROJECT_ID as string | undefined) || 'demo_project_id',
    }),
  ],
});
