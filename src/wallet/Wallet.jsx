import { createWeb3Modal } from "@web3modal/wagmi/react";
import { defaultWagmiConfig } from "@web3modal/wagmi/react/config";
import { WagmiProvider } from "wagmi";
import { arbitrum, mainnet, bscTestnet } from "wagmi/chains";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

const projectId = "704b7193f8f27869e0a1782d7fdf9d21";

const metadata = {
  name: "Web3Modal",
  description: "Web3Modal Example",
  url: "https://web3modal.com",
  icons: ["https://avatars.githubusercontent.com/u/37784886"],
};

export const canxium = /*#__PURE__*/ ({
  id: 3003,
  name: 'Canxium Mainnet',
  nativeCurrency: {
    decimals: 18,
    name: 'CAU',
    symbol: 'CAU',
  },
  rpcUrls: {
    default: {
      http: ['https://rpc.canxium.org'],
      https: ['https://rpc.canxium.org']
    },
  },
  blockExplorers: {
    default: {
      name: 'CanxiumScan',
      url: 'https://scan.canxium.org/',
      apiUrl: 'https://scan.canxium.org/api',
    },
  },
  contracts: {
    multicall3: {
      address: '0x5Ad18bCE021ac4E01639782A9dA69e493121Ef68',
      blockCreated: 4324363,
    },
  },
  testnet: false,
})

const chains = [canxium, bscTestnet];
const config = defaultWagmiConfig({
  chains,
  projectId,
  metadata,
});

// export const config = createConfig({
//   chains: [mainnet, arbitrum, bscTestnet],
//   transports: {
//     [mainnet.id]: http(),
//     [arbitrum.id]: http(),
//     [bscTestnet.id]: http(),
//   },
// })


// 3. Create modal
createWeb3Modal({
  wagmiConfig: config,
  projectId,
});

function Web3ModalProvider({ children }) {
  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </WagmiProvider>
  );
}

export { Web3ModalProvider };
