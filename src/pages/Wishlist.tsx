import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { ProductCard } from "@/components/home/ProductCard";
import { Button } from "@/components/ui/button";
import { useStore } from "@/contexts/StoreContext";
import { useToast } from "@/components/ui/use-toast";
import { Link } from "react-router-dom";

const Wishlist = () => {
  const { state, dispatch } = useStore();
  const { toast } = useToast();

  const handleClearWishlist = () => {
    state.favorites.forEach(item => {
      dispatch({
        type: 'TOGGLE_FAVORITE',
        payload: item
      });
    });
    toast({
      title: "Wishlist cleared",
      description: "All items have been removed from your wishlist."
    });
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto space-y-8">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold">Wishlist ({state.favorites.length})</h1>
            {state.favorites.length > 0 && (
              <div className="space-x-4">
                <Button onClick={handleClearWishlist} variant="destructive">
                  Clear Wishlist
                </Button>
                <Button onClick={() => {
                  state.favorites.forEach(item => {
                    dispatch({
                      type: 'ADD_TO_CART',
                      payload: item
                    });
                  });
                  toast({
                    title: "Added to cart",
                    description: "All wishlist items have been added to your cart."
                  });
                }}>
                  Move All to Cart
                </Button>
              </div>
            )}
          </div>
          
          {state.favorites.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-gray-500 mb-4">Your wishlist is empty</p>
              <Button asChild>
                <Link to="/">Continue Shopping</Link>
              </Button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {state.favorites.map((item) => (
                <ProductCard key={item.id} {...item} />
              ))}
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Wishlist;