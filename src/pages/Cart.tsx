import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Link } from "react-router-dom";
import { useStore } from "@/contexts/StoreContext";
import { Plus, Minus, Trash2 } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

const Cart = () => {
  const { state, dispatch } = useStore();
  const { toast } = useToast();

  const handleUpdateQuantity = (id: number, quantity: number) => {
    if (quantity >= 1) {
      dispatch({
        type: 'UPDATE_QUANTITY',
        payload: { id, quantity }
      });
    }
  };

  const handleRemoveItem = (id: number, title: string) => {
    dispatch({
      type: 'REMOVE_FROM_CART',
      payload: id
    });
    toast({
      title: "Item removed",
      description: `${title} has been removed from your cart.`
    });
  };

  const handleClearCart = () => {
    dispatch({ type: 'CLEAR_CART' });
    toast({
      title: "Cart cleared",
      description: "All items have been removed from your cart."
    });
  };

  const subtotal = state.cart.reduce((total, item) => total + (item.price * item.quantity), 0);

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto space-y-8">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold">Shopping Cart ({state.cart.length} items)</h1>
            {state.cart.length > 0 && (
              <Button variant="destructive" onClick={handleClearCart}>
                Clear Cart
              </Button>
            )}
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-4">
              {state.cart.length === 0 ? (
                <div className="text-center py-8">
                  <p className="text-gray-500 mb-4">Your cart is empty</p>
                  <Link to="/">
                    <Button>Continue Shopping</Button>
                  </Link>
                </div>
              ) : (
                <>
                  <div className="grid grid-cols-5 gap-4 font-semibold pb-4 border-b">
                    <div className="col-span-2">Product</div>
                    <div>Price</div>
                    <div>Quantity</div>
                    <div>Subtotal</div>
                  </div>
                  
                  {state.cart.map((item) => (
                    <div key={item.id} className="grid grid-cols-5 gap-4 items-center py-4 border-b">
                      <div className="col-span-2 flex items-center space-x-4">
                        <img src={item.image} alt={item.title} className="w-16 h-16 object-cover rounded" />
                        <span>{item.title}</span>
                      </div>
                      <div>${item.price}</div>
                      <div>
                        <div className="flex items-center space-x-2">
                          <Button
                            variant="outline"
                            size="icon"
                            onClick={() => handleUpdateQuantity(item.id, item.quantity - 1)}
                            disabled={item.quantity <= 1}
                          >
                            <Minus className="h-4 w-4" />
                          </Button>
                          <span>{item.quantity}</span>
                          <Button
                            variant="outline"
                            size="icon"
                            onClick={() => handleUpdateQuantity(item.id, item.quantity + 1)}
                          >
                            <Plus className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => handleRemoveItem(item.id, item.title)}
                            className="text-red-500"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                      <div>${(item.price * item.quantity).toFixed(2)}</div>
                    </div>
                  ))}
                </>
              )}
              
              <div className="flex justify-between items-center pt-4">
                <Link to="/">
                  <Button variant="outline">Continue Shopping</Button>
                </Link>
              </div>
            </div>
            
            <div className="space-y-4">
              <div className="bg-gray-50 p-6 rounded-lg space-y-4">
                <h2 className="font-semibold">Cart Total</h2>
                <div className="flex justify-between py-2 border-b">
                  <span>Subtotal:</span>
                  <span>${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between py-2 border-b">
                  <span>Shipping:</span>
                  <span>Free</span>
                </div>
                <div className="flex justify-between py-2">
                  <span className="font-semibold">Total:</span>
                  <span className="font-semibold">${subtotal.toFixed(2)}</span>
                </div>
                <Link to="/checkout">
                  <Button className="w-full" disabled={state.cart.length === 0}>
                    Proceed to Checkout
                  </Button>
                </Link>
              </div>
              
              <div className="flex space-x-2">
                <Input placeholder="Coupon Code" />
                <Button variant="outline">Apply Coupon</Button>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Cart;