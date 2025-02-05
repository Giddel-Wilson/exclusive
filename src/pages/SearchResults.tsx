import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { ProductCard } from "@/components/home/ProductCard";
import { useSearchParams } from "react-router-dom";
import { useStore } from "@/contexts/StoreContext";

// Mock data - replace with actual API call
const searchProducts = (query: string) => {
  return Array.from({ length: 12 }, (_, i) => ({
    id: i + 1,
    title: `Search Result ${i + 1} for "${query}"`,
    price: 99.99 + i,
    image: "/placeholder.svg",
    rating: 4 + Math.random(),
    category: "search",
    description: `This is a search result for "${query}"`,
    discount: i % 3 === 0 ? 10 : undefined,
  }));
};

const SearchResults = () => {
  const [searchParams] = useSearchParams();
  const query = searchParams.get("q") || "";
  const searchResults = searchProducts(query);

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold mb-8">
          Search Results for "{query}"
        </h1>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {searchResults.map((product) => (
            <ProductCard key={product.id} {...product} />
          ))}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default SearchResults;