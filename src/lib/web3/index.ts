import { createClient, configureChains } from 'wagmi'
import { mainnet, goerli } from 'wagmi/chains'

import { alchemyProvider } from 'wagmi/providers/alchemy'
import { getDefaultWallets } from '@rainbow-me/rainbowkit'

const chainId = Number(process.env.NEXT_PUBLIC_ETH_CHAIN) ?? 5
const alchemyKey = process.env.ALCHEMY_KEY ?? ''
const chosenChains = [chainId === 1 ? mainnet : goerli]

// Configure chains & providers with the Alchemy provider.
const { chains, provider } = configureChains(chosenChains, [
  alchemyProvider({ apiKey: alchemyKey })
])

const { connectors } = getDefaultWallets({
  appName: 'Lithium',
  chains
})

// Set up client
const client = createClient({
  autoConnect: true,
  connectors,
  provider
})

export { client, chains }
