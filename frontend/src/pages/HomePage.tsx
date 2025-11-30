
import CategoryCard from "../components/CategoryCard";

const MOCK_CATEGORIES = [
  { id: 1, title: "DeFi", description: "Decentralized Finance basics.", slug: "defi" },
  { id: 2, title: "NFTs", slug: "nfts", description: "Digital ownership and marketplaces." },
  { id: 3, title: "Solana", slug: "solana", description: "High speed, low cost blockchain." },
];




export default function HomePage() {

  return (
    <div>
        <h1>THIS IS WEB3FORNOOBS homepage</h1>
        <div>
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
