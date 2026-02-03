//this is just to store the values and labels. it has noting to do woith execution or components in react, hence the .ts instead of .tsx


export const CATEGORIES = [
  { 
    id: 1, 
    label: "DeFi", 
    value: "defi", // Matches your DB exactly (lowercase based on our last check)
    description: "Decentralized Finance. Learn lending, staking, and how to be your own bank.", 
    icon: "💸" 
  },
  { 
    id: 2, 
    label: "NFTs & Art", 
    value: "nfts-art", 
    description: "The basics of digital ownership, smart contracts, and marketplace mechanics.", 
    icon: "🖼️" 
  },
  { 
    id: 3, 
    label: "Security & Wallets", 
    value: "security-wallets", 
    description: "The non-negotiables of Web3: private keys, cold storage, and not getting scammed.", 
    icon: "🔒" 
  },
  { 
    id: 4, 
    label: "DAOs & Governance", 
    value: "daos-governance", 
    description: "Understanding collective ownership and voting systems in decentralized organizations.", 
    icon: "🤝" 
  },
  { 
    id: 5, 
    label: "Layer 2s", 
    value: "layer-2s", 
    description: "Scaling solutions like Polygon and Arbitrum. How to transact without paying $50 in gas.", 
    icon: "⚡" 
  },
  { 
    id: 6, 
    label: "Solana Ecosystem", 
    value: "solana", 
    description: "A deep dive into high-speed, low-cost applications and network fundamentals.", 
    icon: "🟣" 
  },
];