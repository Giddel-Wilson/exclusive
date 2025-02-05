import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Phone, Mail, MapPin } from "lucide-react";

const Contact = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-6">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                <Phone className="text-primary" />
              </div>
              <div>
                <h3 className="font-semibold">Call To Us</h3>
                <p className="text-sm text-gray-600">We are available 24/7, 7 days a week.</p>
                <p className="text-sm text-gray-600">Phone: +8801611112222</p>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                <Mail className="text-primary" />
              </div>
              <div>
                <h3 className="font-semibold">Write To Us</h3>
                <p className="text-sm text-gray-600">Fill out our form and we will contact you within 24 hours.</p>
                <p className="text-sm text-gray-600">Email: customer@exclusive.com</p>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                <MapPin className="text-primary" />
              </div>
              <div>
                <h3 className="font-semibold">Visit Us</h3>
                <p className="text-sm text-gray-600">Visit our office HQ.</p>
                <p className="text-sm text-gray-600">Address: 123 Business Avenue, NYC</p>
              </div>
            </div>
          </div>

          <div className="bg-gray-50 p-6 rounded-lg space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <Input placeholder="First Name" />
              <Input placeholder="Last Name" />
            </div>
            <Input placeholder="Email" type="email" />
            <Input placeholder="Phone" type="tel" />
            <Textarea placeholder="Your Message" className="h-32" />
            <Button className="w-full">Send Message</Button>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Contact;