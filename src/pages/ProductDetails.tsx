import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Heart, Share2, Truck, Shield, RotateCcw } from "lucide-react";
import { ProductCard } from "@/components/home/ProductCard";

const relatedProducts = [
  {
    id: 1,
    title: "Gaming Controller",
    price: 59.99,
    image: "/placeholder.svg",
    rating: 4.2,
    category: "Gaming",
    description: "Wireless gaming controller with haptic feedback"
  },
  {
    id: 2,
    title: "Gaming Keyboard",
    price: 129.99,
    image: "/placeholder.svg",
    rating: 4.6,
    discount: 10,
    category: "Gaming",
    description: "Mechanical Gaming Keyboard with RGB Lighting"
  },
  {
    id: 3,
    title: "Gaming Monitor",
    price: 299.99,
    image: "/placeholder.svg",
    rating: 4.8,
    discount: 20,
    category: "Gaming",
    description: "27-inch Gaming Monitor with 144Hz refresh rate"
  },
  {
    id: 4,
    title: "Gaming Headset",
    price: 79.99,
    image: "/placeholder.svg",
    rating: 4.4,
    category: "Gaming",
    description: "Professional Gaming Headset with 7.1 Surround Sound"
  }
];

const ProductDetails = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto space-y-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="space-y-4">
              <div className="aspect-square bg-gray-100 rounded-lg overflow-hidden">
                <img
                  src="/placeholder.svg"
                  alt="PlayStation 5 Controller"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="grid grid-cols-4 gap-4">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="aspect-square bg-gray-100 rounded-lg overflow-hidden">
                    <img
                      src="/placeholder.svg"
                      alt={`Product view ${i}`}
                      className="w-full h-full object-cover"
                    />
                  </div>
                ))}
              </div>
            </div>
            
            <div className="space-y-6">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold">PlayStation 5 Controller</h1>
                <div className="flex items-center space-x-2">
                  <div className="flex text-yellow-400">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <span key={star}>★</span>
                    ))}
                  </div>
                  <span className="text-gray-600">(150 Reviews)</span>
                </div>
                <div className="text-2xl font-bold">$59.99</div>
              </div>
              
              <div className="space-y-4">
                <p className="text-gray-600">
                  PlayStation 5 DualSense Wireless Controller. Experience immersive gaming with adaptive triggers and haptic feedback.
                </p>
                
                <div className="flex items-center space-x-4">
                  <div className="flex items-center space-x-2">
                    <button className="w-8 h-8 flex items-center justify-center border rounded">-</button>
                    <span className="w-12 text-center">1</span>
                    <button className="w-8 h-8 flex items-center justify-center border rounded">+</button>
                  </div>
                  <Button>Add to Cart</Button>
                  <Button variant="outline" size="icon">
                    <Heart className="h-4 w-4" />
                  </Button>
                </div>
              </div>
              
              <div className="border rounded-lg p-4 space-y-4">
                <div className="flex items-center space-x-4">
                  <Truck className="h-5 w-5" />
                  <div>
                    <p className="font-medium">Free Delivery</p>
                    <p className="text-sm text-gray-600">Enter your postal code for delivery availability</p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-4">
                  <RotateCcw className="h-5 w-5" />
                  <div>
                    <p className="font-medium">Return Delivery</p>
                    <p className="text-sm text-gray-600">Free 30 days delivery returns</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="space-y-6">
            <h2 className="text-2xl font-bold">Related Products</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {relatedProducts.map((product, index) => (
                <ProductCard key={index} {...product} />
              ))}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default ProductDetails;
