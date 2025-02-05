import { Heart, Plus, Minus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useStore } from "@/contexts/StoreContext";
import { useToast } from "@/components/ui/use-toast";
import { useState } from "react";

interface ProductCardProps {
  id: number;
  title: string;
  price: number;
  image: string;
  rating: number;
  discount?: number;
  className?: string;
  category: string;
  description: string;
}

export function ProductCard({ id, title, price, image, rating, discount, className, category, description }: ProductCardProps) {
  const { state, dispatch } = useStore();
  const { toast } = useToast();
  const [quantity, setQuantity] = useState(1);
  
  const isFavorite = state.favorites.some(item => item.id === id);
  const cartItem = state.cart.find(item => item.id === id);
  
  const handleAddToCart = () => {
    dispatch({
      type: 'ADD_TO_CART',
      payload: { id, title, price, image, rating, discount, category, description, quantity: 1 }
    });
    setQuantity(1);
    toast({
      title: "Added to cart",
      description: `${title} has been added to your cart.`
    });
  };

  const handleUpdateQuantity = (newQuantity: number) => {
    if (newQuantity >= 0) {
      setQuantity(newQuantity);
      if (newQuantity === 0) {
        dispatch({
          type: 'REMOVE_FROM_CART',
          payload: id
        });
        toast({
          title: "Removed from cart",
          description: `${title} has been removed from your cart.`
        });
      } else {
        dispatch({
          type: 'UPDATE_QUANTITY',
          payload: { id, quantity: newQuantity }
        });
      }
    }
  };

  const handleToggleFavorite = () => {
    dispatch({
      type: 'TOGGLE_FAVORITE',
      payload: { id, title, price, image, rating, discount, category, description }
    });
    toast({
      title: isFavorite ? "Removed from favorites" : "Added to favorites",
      description: `${title} has been ${isFavorite ? 'removed from' : 'added to'} your favorites.`
    });
  };

  return (
    <div className={cn("group relative flex flex-col h-full", className)}>
      <div className="aspect-square w-full overflow-hidden rounded-lg bg-gray-100">
        <img
          src={image}
          alt={title}
          className="h-full w-full object-contain object-center transition-transform duration-300 group-hover:scale-105"
          onError={(e) => {
            const target = e.target as HTMLImageElement;
            target.src = `https://source.unsplash.com/400x400/?${encodeURIComponent(title)}`;
          }}
        />
        <div className="absolute top-4 right-4">
          <Button 
            variant="ghost" 
            size="icon" 
            className={cn(
              "h-8 w-8 bg-white rounded-full",
              isFavorite && "text-red-500"
            )}
            onClick={handleToggleFavorite}
          >
            <Heart className="h-4 w-4" fill={isFavorite ? "currentColor" : "none"} />
          </Button>
        </div>
        {discount && (
          <div className="absolute top-4 left-4">
            <span className="bg-primary text-white px-2 py-1 rounded-md text-sm">
              -{discount}%
            </span>
          </div>
        )}
      </div>
      <div className="mt-4 space-y-1 flex-1">
        <h3 className="text-sm font-medium line-clamp-2">{title}</h3>
        <div className="flex items-center space-x-2">
          <span className="text-primary font-semibold">${price.toFixed(2)}</span>
          {discount && (
            <span className="text-sm text-gray-500 line-through">
              ${((price * (100 + discount)) / 100).toFixed(2)}
            </span>
          )}
        </div>
        <div className="flex items-center space-x-1">
          {[...Array(5)].map((_, i) => (
            <span
              key={i}
              className={`h-4 w-4 ${
                i < Math.round(rating) ? "text-yellow-400" : "text-gray-300"
              }`}
            >
              ★
            </span>
          ))}
          <span className="text-sm text-gray-500">({rating.toFixed(1)})</span>
        </div>
        <div className="flex items-center space-x-2 mt-2">
          {cartItem ? (
            <>
              <Button 
                variant="outline" 
                size="icon"
                onClick={() => handleUpdateQuantity(cartItem.quantity - 1)}
              >
                <Minus className="h-4 w-4" />
              </Button>
              <span className="w-8 text-center">{cartItem.quantity}</span>
              <Button 
                variant="outline" 
                size="icon"
                onClick={() => handleUpdateQuantity(cartItem.quantity + 1)}
              >
                <Plus className="h-4 w-4" />
              </Button>
            </>
          ) : (
            <Button 
              className="w-full"
              onClick={handleAddToCart}
            >
              Add to Cart
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}