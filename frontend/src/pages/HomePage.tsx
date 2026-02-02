
import CategoryCard from "../components/CategoryCard";
import LatestArticleBox from "../components/LatestArticlesBox";

const MOCK_CATEGORIES = [
  { 
    id: 1, 
    title: "DeFi", 
    category: "defi", 
    description: "Decentralized Finance. Learn lending, staking, and how to be your own bank.", 
    icon: "💸" 
  },
  { 
    id: 2, 
    title: "NFTs & Art", 
    category: "nfts-art", 
    description: "The basics of digital ownership, smart contracts, and marketplace mechanics.", 
    icon: "🖼️" 
  },
  { 
    id: 3, 
    title: "Security & Wallets", 
    category: "security-wallets", 
    description: "The non-negotiables of Web3: private keys, cold storage, and not getting scammed.", 
    icon: "🔒" 
  },
  { 
    id: 4, 
    title: "DAOs & Governance", 
    category: "daos-governance", 
    description: "Understanding collective ownership and voting systems in decentralized organizations.", 
    icon: "🤝" 
  },
  { 
    id: 5, 
    title: "Layer 2s", 
    category: "layer-2s", 
    description: "Scaling solutions like Polygon and Arbitrum. How to transact without paying $50 in gas.", 
    icon: "⚡" 
  },
  { 
    id: 6, 
    title: "Solana Ecosystem", 
    category: "solana", 
    description: "A deep dive into high-speed, low-cost applications and network fundamentals.", 
    icon: "🟣" 
  },
];




export default function HomePage() {


  return (
    <div className="max-w-7xl mx-auto px-4 py-8  ">
        <h1 className=" text-4xl md:text-5xl font-reading  mb-8 px-2 ">mr noob, pick your card-</h1>

        <div className="  grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {MOCK_CATEGORIES.map((categ) => (
                <CategoryCard
                key={categ.id}
                title={categ.title}
                description={categ.description}
                category={categ.category}
                
                />

            ))
            
            }
        </div>
        <div className="flex-1 container mx-auto px-4 py-8">

          <div className="">
          <LatestArticleBox/>

          </div>

        </div>

    </div>
  );
}

