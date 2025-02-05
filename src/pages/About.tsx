import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";

const About = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-8">
        <div className="space-y-20">
          <div className="flex flex-col md:flex-row gap-8 items-center">
            <div className="md:w-1/2 space-y-4">
              <h1 className="text-3xl font-bold">Our Story</h1>
              <p className="text-gray-600">
                Exclusive, since 2024, has been a fresh take on online shopping, providing 
                a diverse range of high-quality products. We believe in making online 
                shopping more accessible and enjoyable, while delivering an exceptional 
                customer service journey.
              </p>
              <p className="text-gray-600">
                We have built a solid platform to make your online shopping experience 
                engaging, fun, and most importantly, trustworthy. Our commitment to 
                excellence drives us forward.
              </p>
            </div>
            <div className="md:w-2/5">
              <img
                src="https://i.pinimg.com/736x/ce/c5/c2/cec5c23524ae25d4cbf6e140a45011df.jpg"
                alt="Happy shoppers"
                className="rounded-lg w-full"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
            <div className="space-y-2">
              <div className="text-4xl font-bold">10.5k</div>
              <p className="text-gray-600">Sellers active our site</p>
            </div>
            <div className="space-y-2">
              <div className="text-4xl font-bold">33k</div>
              <p className="text-gray-600">Monthly Product Sale</p>
            </div>
            <div className="space-y-2">
              <div className="text-4xl font-bold">45.5k</div>
              <p className="text-gray-600">Customer active in our site</p>
            </div>
            <div className="space-y-2">
              <div className="text-4xl font-bold">25k</div>
              <p className="text-gray-600">Annual gross sale in our site</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center space-y-4">
              <img
                src="/placeholder.svg"
                alt="Tom Cruise"
                className="w-32 h-32 rounded-full mx-auto"
              />
              <h3 className="font-semibold">Tom Cruise</h3>
              <div className="flex justify-center space-x-2">
                <span className="text-yellow-400">★★★★★</span>
              </div>
            </div>
            <div className="text-center space-y-4">
              <img
                src="/placeholder.svg"
                alt="Emma Watson"
                className="w-32 h-32 rounded-full mx-auto"
              />
              <h3 className="font-semibold">Emma Watson</h3>
              <div className="flex justify-center space-x-2">
                <span className="text-yellow-400">★★★★★</span>
              </div>
            </div>
            <div className="text-center space-y-4">
              <img
                src="/placeholder.svg"
                alt="Will Smith"
                className="w-32 h-32 rounded-full mx-auto"
              />
              <h3 className="font-semibold">Will Smith</h3>
              <div className="flex justify-center space-x-2">
                <span className="text-yellow-400">★★★★★</span>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center space-y-4">
              <div className="w-16 h-16 bg-primary/10 rounded-full mx-auto flex items-center justify-center">
                <span className="text-2xl">🚚</span>
              </div>
              <h3 className="font-semibold">FREE AND FAST DELIVERY</h3>
              <p className="text-sm text-gray-600">Free delivery for all orders over $140</p>
            </div>
            <div className="text-center space-y-4">
              <div className="w-16 h-16 bg-primary/10 rounded-full mx-auto flex items-center justify-center">
                <span className="text-2xl">💬</span>
              </div>
              <h3 className="font-semibold">24/7 CUSTOMER SERVICE</h3>
              <p className="text-sm text-gray-600">Friendly 24/7 customer support</p>
            </div>
            <div className="text-center space-y-4">
              <div className="w-16 h-16 bg-primary/10 rounded-full mx-auto flex items-center justify-center">
                <span className="text-2xl">🔒</span>
              </div>
              <h3 className="font-semibold">MONEY BACK GUARANTEE</h3>
              <p className="text-sm text-gray-600">We return money within 30 days</p>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default About;