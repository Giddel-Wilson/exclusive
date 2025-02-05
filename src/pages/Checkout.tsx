import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

const Checkout = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="space-y-6">
            <h2 className="text-xl font-semibold">Billing Details</h2>
            
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <Input placeholder="First Name" />
                <Input placeholder="Last Name" />
              </div>
              <Input placeholder="Company Name (Optional)" />
              <Input placeholder="Street Address" />
              <Input placeholder="Apartment, suite, etc. (Optional)" />
              <Input placeholder="Town/City" />
              <Input placeholder="Phone Number" />
              <Input placeholder="Email Address" type="email" />
              <label className="flex items-center space-x-2">
                <input type="checkbox" className="rounded border-gray-300" />
                <span className="text-sm">Save this information for next time</span>
              </label>
            </div>
          </div>
          
          <div className="space-y-6">
            <div className="bg-gray-50 p-6 rounded-lg space-y-4">
              <h2 className="font-semibold">Order Summary</h2>
              
              <div className="space-y-4 border-b pb-4">
                <div className="flex justify-between items-center">
                  <div className="flex items-center space-x-4">
                    <img src="/placeholder.svg" alt="LCD Monitor" className="w-16 h-16 object-cover rounded" />
                    <div>
                      <p className="font-medium">LCD Monitor</p>
                      <p className="text-sm text-gray-600">Quantity: 1</p>
                    </div>
                  </div>
                  <span>$650</span>
                </div>
              </div>
              
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span>$650</span>
                </div>
                <div className="flex justify-between">
                  <span>Shipping</span>
                  <span>Free</span>
                </div>
                <div className="flex justify-between font-semibold">
                  <span>Total</span>
                  <span>$650</span>
                </div>
              </div>
              
              <div className="space-y-4">
                <RadioGroup defaultValue="card">
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="card" id="card" />
                    <label htmlFor="card">Credit Card</label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="paypal" id="paypal" />
                    <label htmlFor="paypal">PayPal</label>
                  </div>
                </RadioGroup>
                
                <Button className="w-full">Place Order</Button>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Checkout;