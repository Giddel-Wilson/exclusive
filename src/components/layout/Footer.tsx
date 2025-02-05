import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export function Footer() {
  return (
    <footer className="bg-black text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
          <div className="space-y-4">
            <h3 className="text-xl font-bold">Exclusive</h3>
            <div className="space-y-2">
              <p>Subscribe</p>
              <p className="text-sm text-gray-400">Get 10% off your first order</p>
            </div>
            <div className="flex">
              <Input
                type="email"
                placeholder="Enter your email"
                className="rounded-r-none bg-transparent"
              />
              <Button variant="outline" className="rounded-l-none text-black hover:bg-gray-100 hover:text-gray-700">
                Subscribe
              </Button>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="font-semibold">Support</h3>
            <ul className="space-y-2 text-sm text-gray-400">
              <li>111 Bijoy sarani, Dhaka</li>
              <li>exclusive@gmail.com</li>
              <li>+88015-88888-9999</li>
            </ul>
          </div>

          <div className="space-y-4">
            <h3 className="font-semibold">Account</h3>
            <ul className="space-y-2 text-sm text-gray-400">
              <li>My Account</li>
              <li>Login / Register</li>
              <li>Cart</li>
              <li>Wishlist</li>
              <li>Shop</li>
            </ul>
          </div>

          <div className="space-y-4">
            <h3 className="font-semibold">Quick Link</h3>
            <ul className="space-y-2 text-sm text-gray-400">
              <li>Privacy Policy</li>
              <li>Terms Of Use</li>
              <li>FAQ</li>
              <li>Contact</li>
            </ul>
          </div>

          <div className="space-y-4">
            <h3 className="font-semibold">Download App</h3>
            <p className="text-sm text-gray-400">Save $3 with App New User Only</p>
            <div className="flex space-x-2">
              <div className="w-24 h-24 bg-gray-800 rounded">
                <img src="https://i.pinimg.com/236x/ad/f3/d3/adf3d387812a09df1c707b8e2b45dc74.jpg" alt="" className="w-full h-full object-stretch" />
              </div>
              <div className="space-y-2">
                <div className="w-32 h-10 bg-gray-800 rounded"></div>
                <div className="w-32 h-10 bg-gray-800 rounded"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}