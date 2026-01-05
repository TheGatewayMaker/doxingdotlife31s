import { useNavigate } from "react-router-dom";
import { ChevronLeft } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function Clowns() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#000000] text-white flex flex-col animate-fadeIn">
      <Header />

      <main className="flex-1 w-full flex flex-col">
        {/* Hero Section */}
        <div className="bg-[#000000] py-6 sm:py-10 md:py-16 lg:py-20 border-b border-[#333333]/50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center gap-3 mb-6 animate-slideInDown">
              <button
                onClick={() => navigate(-1)}
                className="flex items-center justify-center w-10 h-10 sm:w-11 sm:h-11 rounded-lg bg-[#0088CC]/20 hover:bg-[#0088CC]/40 transition-all duration-200 group text-[#0088CC] hover:text-white"
                aria-label="Go back"
              >
                <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6 group-hover:scale-110 transition-transform" />
              </button>
              <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black text-foreground tracking-tighter">
                Clowns
              </h1>
            </div>
            <p className="text-xs sm:text-sm md:text-base font-semibold text-muted-foreground max-w-2xl">
              Explore and discover clown content from across the internet
            </p>
          </div>
        </div>

        {/* Main Content Section */}
        <div className="flex-1 flex items-center justify-center px-4 sm:px-6 lg:px-8 py-12 sm:py-16 md:py-20">
          <div className="text-center animate-fadeIn">
            <p className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-white mb-4 leading-tight">
              Clowns Across the Internet will be Posted Here
            </p>
            <p className="text-sm sm:text-base md:text-lg text-muted-foreground max-w-2xl mx-auto">
              Check back soon for exciting clown content updates
            </p>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
