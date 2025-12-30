
import CategoryCard from "../components/CategoryCard";

const MOCK_CATEGORIES = [
  { 
    id: 1, 
    title: "DeFi", 
    slug: "defi", 
    description: "Decentralized Finance. Learn lending, staking, and how to be your own bank.", 
    icon: "💸" 
  },
  { 
    id: 2, 
    title: "NFTs & Art", 
    slug: "nfts-art", 
    description: "The basics of digital ownership, smart contracts, and marketplace mechanics.", 
    icon: "🖼️" 
  },
  { 
    id: 3, 
    title: "Security & Wallets", 
    slug: "security-wallets", 
    description: "The non-negotiables of Web3: private keys, cold storage, and not getting scammed.", 
    icon: "🔒" 
  },
  { 
    id: 4, 
    title: "DAOs & Governance", 
    slug: "daos-governance", 
    description: "Understanding collective ownership and voting systems in decentralized organizations.", 
    icon: "🤝" 
  },
  { 
    id: 5, 
    title: "Layer 2s", 
    slug: "layer-2s", 
    description: "Scaling solutions like Polygon and Arbitrum. How to transact without paying $50 in gas.", 
    icon: "⚡" 
  },
  { 
    id: 6, 
    title: "Solana Ecosystem", 
    slug: "solana", 
    description: "A deep dive into high-speed, low-cost applications and network fundamentals.", 
    icon: "🟣" 
  },
];




export default function HomePage() {


  return (
    <div className=" ">
        <h1>WELCOME NOOB!</h1>

        <div className="  grid grid-cols-1 sm:grid-cols-4 gap-4 p-4 mb-4 max-w-7xl mx-auto">
            {MOCK_CATEGORIES.map((categ) => (
                <CategoryCard
                key={categ.id}
                title={categ.title}
                description={categ.description}
                slug={categ.slug}
                
                />

            ))
            
            }
        </div>

    </div>
  );
}

