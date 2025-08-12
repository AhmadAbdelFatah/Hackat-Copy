'use client'

import { wagmiAdapter, projectId } from '@/config'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { createAppKit } from '@reown/appkit/react'
import { mainnet, scrollSepolia } from '@reown/appkit/networks'
import React, { type ReactNode } from 'react'
import { cookieToInitialState, WagmiProvider, type Config } from 'wagmi'

// Set up queryClient
const queryClient = new QueryClient()

if (!projectId) {
  throw new Error('Project ID is not defined')
}

// Set up metadata
const metadata = {
  name: 'appkit-example',
  description: 'AppKit Example',
  url: 'https://appkitexampleapp.com', // origin must match your domain & subdomain
  icons: ['https://avatars.githubusercontent.com/u/179229932']
}

// Create the modal
const modal = createAppKit({
  adapters: [wagmiAdapter],
  projectId,
  networks: [mainnet, scrollSepolia],
  defaultNetwork: mainnet,
  metadata: metadata,
  features: {
    analytics: true // Optional - defaults to your Cloud configuration
  },
  themeMode: 'light',
  themeVariables: {
    // Primary green (fresh crop green)
    '--w3m-accent': '#1D7874',
    '--w3m-color-mix': '#1D7874',
    '--w3m-color-mix-strength': 40,
    
    // Background colors (earth tones)
    '--w3m-background': '#FEFFFE',
    '--w3m-color-bg-1': '#F0FDF4', // Very light green
    '--w3m-color-bg-2': '#DCFCE7', // Light green tint
    '--w3m-color-bg-3': '#BBF7D0', // Soft green
    
    // Text colors
    '--w3m-color-fg-1': '#14532D', // Dark forest green
    '--w3m-color-fg-2': '#166534', // Medium green
    '--w3m-color-fg-3': '#15803D', // Lighter green
    
    // Interactive elements
    '--w3m-color-overlay': 'rgba(34, 197, 94, 0.1)',
    '--w3m-border-radius-master': '12px',
    '--w3m-font-family': 'Inter, system-ui, sans-serif'
  }
})

function ContextProvider({ children, cookies }: { children: ReactNode; cookies: string | null }) {
  const initialState = cookieToInitialState(wagmiAdapter.wagmiConfig as Config, cookies)

  return (
    <WagmiProvider config={wagmiAdapter.wagmiConfig as Config} initialState={initialState}>
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </WagmiProvider>
  )
}

export default ContextProvider