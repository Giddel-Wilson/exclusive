import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Camera, Upload } from "lucide-react";
import { useState } from "react";

const Account = () => {
  const [profileImage, setProfileImage] = useState<string | null>(null);

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfileImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto space-y-8">
          <h1 className="text-2xl font-bold">My Account</h1>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {/* Profile Picture Section */}
            <div className="md:col-span-4 flex flex-col items-center space-y-4">
              <div className="relative">
                <div className="w-32 h-32 rounded-full overflow-hidden bg-gray-100">
                  {profileImage ? (
                    <img
                      src={profileImage}
                      alt="Profile"
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <Camera className="w-8 h-8 text-gray-400" />
                    </div>
                  )}
                </div>
                <label
                  htmlFor="profile-image"
                  className="absolute bottom-0 right-0 bg-primary text-white p-2 rounded-full cursor-pointer hover:bg-primary/90"
                >
                  <Upload className="w-4 h-4" />
                  <input
                    type="file"
                    id="profile-image"
                    className="hidden"
                    accept="image/*"
                    onChange={handleImageUpload}
                  />
                </label>
              </div>
              <p className="text-sm text-gray-500">
                Click the upload button to change your profile picture
              </p>
            </div>

            {/* Personal Information */}
            <div className="md:col-span-2 space-y-4">
              <h2 className="font-semibold">Personal Information</h2>
              <div className="space-y-2">
                <Input placeholder="First Name" />
                <Input placeholder="Last Name" />
                <Input placeholder="Email" type="email" />
                <Input placeholder="Phone Number" type="tel" />
                <Input placeholder="Date of Birth" type="date" />
                <Button className="w-full">Save Changes</Button>
              </div>
            </div>
            
            {/* Address Information */}
            <div className="md:col-span-2 space-y-4">
              <h2 className="font-semibold">Address Information</h2>
              <div className="space-y-2">
                <Input placeholder="Street Address" />
                <Input placeholder="City" />
                <Input placeholder="State/Province" />
                <Input placeholder="Postal Code" />
                <Input placeholder="Country" />
                <Button className="w-full">Update Address</Button>
              </div>
            </div>
            
            {/* Password Change */}
            <div className="md:col-span-2 space-y-4">
              <h2 className="font-semibold">Change Password</h2>
              <div className="space-y-2">
                <Input placeholder="Current Password" type="password" />
                <Input placeholder="New Password" type="password" />
                <Input placeholder="Confirm Password" type="password" />
                <Button className="w-full">Change Password</Button>
              </div>
            </div>
            
            {/* Preferences */}
            <div className="md:col-span-2 space-y-4">
              <h2 className="font-semibold">Preferences</h2>
              <div className="space-y-2">
                <label className="flex items-center space-x-2">
                  <input type="checkbox" className="rounded border-gray-300" />
                  <span className="text-sm">Email notifications for orders</span>
                </label>
                <label className="flex items-center space-x-2">
                  <input type="checkbox" className="rounded border-gray-300" />
                  <span className="text-sm">SMS notifications</span>
                </label>
                <label className="flex items-center space-x-2">
                  <input type="checkbox" className="rounded border-gray-300" />
                  <span className="text-sm">Newsletter subscription</span>
                </label>
                <label className="flex items-center space-x-2">
                  <input type="checkbox" className="rounded border-gray-300" />
                  <span className="text-sm">Special offers and promotions</span>
                </label>
                <Button className="w-full">Save Preferences</Button>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Account;