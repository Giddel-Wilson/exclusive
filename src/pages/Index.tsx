import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { ProductCard } from "@/components/home/ProductCard";
import { Button } from "@/components/ui/button";
import { FlashSaleTimer } from "@/components/home/FlashSaleTimer";
import { useNavigate } from "react-router-dom";
import { useProducts } from "@/services/productService";
import { Skeleton } from "@/components/ui/skeleton";

const categories = [
  { name: "Electronics", icon: "🔌" },
  { name: "Jewelery", icon: "💍" },
  { name: "Men's clothing", icon: "👔" },
  { name: "Women's clothing", icon: "👗" },
  { name: "Home & Garden", icon: "🏡" },
  { name: "Books", icon: "📚" },
  { name: "Sports", icon: "⚽" },
  { name: "Toys", icon: "🎮" },
  { name: "Beauty", icon: "💄" },
  { name: "Health", icon: "💊" },
  { name: "Automotive", icon: "🚗" },
  { name: "Pet Supplies", icon: "🐾" }
];

const Index = () => {
  const navigate = useNavigate();
  const { data: products, isLoading, error } = useProducts();

  const handleCategoryClick = (category: string) => {
    navigate(`/category/${category.toLowerCase()}`);
  };

  const flashSaleProducts = products?.slice(0, 4).map(product => ({
    ...product,
    price: Number(product.price.toFixed(2)),
    rating: product.rating.rate, // Extract just the rate from the rating object
    discount: Math.floor(Math.random() * 30) + 10,
  })) || [];

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1">
        {/* Hero Section */}
        <section className="bg-black text-white">
          <div className="container mx-auto px-4 py-16">
            <div className="max-w-xl">
              <h1 className="text-4xl font-bold mb-4">
                Up to 40% off Voucher
              </h1>
              <p className="mb-6">
                Shop the latest products from top brands
              </p>
              <Button variant="outline" className="border-white text-black hover:scale-105">
                Shop Now
              </Button>
            </div>
          </div>
        </section>

        {/* Flash Sale Section */}
        <section className="container mx-auto px-4 py-12">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-bold">Flash Sales</h2>
            <FlashSaleTimer />
          </div>
          
          {isLoading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="space-y-4">
                  <Skeleton className="h-[200px] w-full" />
                  <Skeleton className="h-4 w-2/3" />
                  <Skeleton className="h-4 w-1/2" />
                </div>
              ))}
            </div>
          ) : error ? (
            <div className="text-center text-red-500">
              Failed to load products. Please try again later.
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {flashSaleProducts.map((product) => (
                <ProductCard 
                  key={product.id}
                  {...product}
                  className="w-full"
                />
              ))}
            </div>
          )}
        </section>

        {/* Categories Section */}
        <section className="container mx-auto px-4 py-12">
          <h2 className="text-2xl font-bold mb-8">Browse By Category</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {categories.map((category) => (
              <button
                key={category.name}
                className="p-6 border rounded-lg hover:border-primary transition-colors text-center"
                onClick={() => handleCategoryClick(category.name)}
              >
                <div className="text-3xl mb-2">{category.icon}</div>
                <div className="text-sm font-medium">{category.name}</div>
              </button>
            ))}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Index;