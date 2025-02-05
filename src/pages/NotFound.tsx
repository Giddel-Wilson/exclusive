import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-9xl font-bold mb-4">404</h1>
          <p className="text-xl text-gray-600 mb-8">Oops! The page you're looking for isn't here.</p>
          <Button onClick={() => navigate("/")} className="min-w-[200px]">
            Back to Home
          </Button>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default NotFound;