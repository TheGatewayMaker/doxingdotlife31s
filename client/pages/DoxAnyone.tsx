import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { ArrowRight, CheckCircle2, Zap, Lock } from "lucide-react";

export default function DoxxAnyone() {
  const handleDoxxNow = () => {
    window.open("https://discord.gg/95eC83gtFN", "_blank");
  };

  return (
    <div className="min-h-screen bg-[#000000] text-white flex flex-col animate-fadeIn">
      <Header />
      <main className="flex-1 w-full">
        {/* Hero Section */}
        <div className="w-full bg-gradient-to-b from-[#0a0a0a] via-[#000000] to-[#000000] border-b border-[#333333]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 md:py-20 lg:py-24">
            <div
              className="text-center max-w-4xl mx-auto animate-slideInDown"
              style={{ animationDelay: "0.1s" }}
            >
              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black mb-4 sm:mb-6 bg-gradient-to-r from-[#0088CC] to-[#00C4FF] bg-clip-text text-transparent leading-tight">
                Doxx Anyone
              </h1>
              <p className="text-base sm:text-lg md:text-xl text-[#979797] max-w-2xl mx-auto font-semibold leading-relaxed">
                Expose individuals on our platform with a simple, transparent,
                and verified process
              </p>
            </div>
          </div>
        </div>

        {/* Pricing Section */}
        <div className="w-full bg-[#000000] py-12 sm:py-16 md:py-20 lg:py-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div
              className="mb-8 sm:mb-12 md:mb-16 animate-scaleUpFadeIn"
              style={{ animationDelay: "0.2s" }}
            >
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-black mb-3 sm:mb-4 text-white text-center">
                Pricing
              </h2>
              <p className="text-center text-[#979797] text-base sm:text-lg max-w-2xl mx-auto">
                Access verified doxing services with competitive rates worldwide
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 lg:gap-10">
              {/* US Pricing Card */}
              <div className="group bg-gradient-to-br from-[#1a1a1a] to-[#0a0a0a] rounded-2xl p-8 sm:p-10 border-2 border-[#00A8E8] hover:border-[#00C4FF] hover:shadow-2xl hover:shadow-[#00A8E8]/20 transition-all duration-300 transform hover:-translate-y-2">
                <div className="flex items-start justify-between mb-6">
                  <div>
                    <p className="text-lg sm:text-xl font-black text-white mb-2 uppercase tracking-widest">
                      United States
                    </p>
                    <p className="text-5xl sm:text-6xl font-black text-[#00A8E8]">
                      $1.10
                    </p>
                  </div>
                  <Zap className="w-8 h-8 text-[#00A8E8] opacity-60 group-hover:opacity-100 transition-opacity" />
                </div>
                <p className="text-sm text-[#00A8E8] font-bold mb-6">USD</p>
                <button
                  onClick={handleDoxxNow}
                  className="w-full py-3 px-4 bg-[#00A8E8] text-[#000000] font-black rounded-lg hover:bg-[#00C4FF] transition-colors duration-300 text-sm"
                >
                  Get Started
                </button>
              </div>

              {/* India Pricing Card */}
              <div className="group bg-gradient-to-br from-[#1a1a1a] to-[#0a0a0a] rounded-2xl p-8 sm:p-10 border-2 border-[#FF9500] hover:border-[#FFB84D] hover:shadow-2xl hover:shadow-[#FF9500]/20 transition-all duration-300 transform hover:-translate-y-2 md:col-span-2 sm:col-span-1 lg:col-span-1">
                <div className="flex items-start justify-between mb-6">
                  <div>
                    <p className="text-lg sm:text-xl font-black text-white mb-2 uppercase tracking-widest">
                      India
                    </p>
                    <p className="text-5xl sm:text-6xl font-black text-[#FFB84D]">
                      ₹99
                    </p>
                  </div>
                  <Zap className="w-8 h-8 text-[#FFB84D] opacity-60 group-hover:opacity-100 transition-opacity" />
                </div>
                <p className="text-sm text-[#FFB84D] font-bold mb-6">INR</p>
                <button
                  onClick={handleDoxNow}
                  className="w-full py-3 px-4 bg-[#FFB84D] text-[#000000] font-black rounded-lg hover:bg-[#FFD699] transition-colors duration-300 text-sm"
                >
                  Get Started
                </button>
              </div>

              {/* Pakistan Pricing Card */}
              <div className="group bg-gradient-to-br from-[#1a1a1a] to-[#0a0a0a] rounded-2xl p-8 sm:p-10 border-2 border-[#06D6A0] hover:border-[#2AE8B8] hover:shadow-2xl hover:shadow-[#06D6A0]/20 transition-all duration-300 transform hover:-translate-y-2">
                <div className="flex items-start justify-between mb-6">
                  <div>
                    <p className="text-lg sm:text-xl font-black text-white mb-2 uppercase tracking-widest">
                      Pakistan
                    </p>
                    <p className="text-5xl sm:text-6xl font-black text-[#2AE8B8]">
                      Rs 299
                    </p>
                  </div>
                  <Zap className="w-8 h-8 text-[#2AE8B8] opacity-60 group-hover:opacity-100 transition-opacity" />
                </div>
                <p className="text-sm text-[#2AE8B8] font-bold mb-6">PKR</p>
                <button
                  onClick={handleDoxNow}
                  className="w-full py-3 px-4 bg-[#2AE8B8] text-[#000000] font-black rounded-lg hover:bg-[#4CF0D0] transition-colors duration-300 text-sm"
                >
                  Get Started
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* How It Works Section - Premium Design */}
        <div className="w-full bg-gradient-to-b from-[#000000] via-[#0a0a0a] to-[#000000] py-16 sm:py-20 md:py-24 lg:py-28 border-t border-[#333333]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div
              className="mb-12 sm:mb-16 md:mb-20 animate-slideInUp"
              style={{ animationDelay: "0.3s" }}
            >
              <div className="max-w-3xl">
                <span className="inline-block text-sm font-black text-[#0088CC] uppercase tracking-widest mb-4 sm:mb-6 bg-[#0088CC]/10 px-4 py-2 rounded-full">
                  Process Overview
                </span>
                <h2 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black text-white mb-6 sm:mb-8 leading-tight">
                  How It Works
                </h2>
                <p className="text-lg sm:text-xl md:text-2xl text-[#979797] font-semibold leading-relaxed max-w-2xl">
                  Follow our simple 5-step verification process to get your
                  doxing submission live
                </p>
              </div>
            </div>

            {/* Steps Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-10 md:gap-12 lg:gap-16">
              {/* Step 1 */}
              <div
                className="group animate-slideInLeft"
                style={{ animationDelay: "0.35s" }}
              >
                <div className="flex gap-6 sm:gap-8">
                  <div className="flex-shrink-0">
                    <div className="flex items-center justify-center h-16 w-16 sm:h-20 sm:w-20 rounded-2xl bg-gradient-to-br from-[#0088CC] to-[#0066AA] text-white font-black text-lg sm:text-2xl group-hover:shadow-lg group-hover:shadow-[#0088CC]/40 transition-all duration-300 transform group-hover:scale-110">
                      1
                    </div>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-2xl sm:text-3xl font-black text-white mb-2 sm:mb-3">
                      Click Dox Button
                    </h3>
                    <p className="text-base sm:text-lg text-[#979797] font-semibold leading-relaxed">
                      Start your doxing submission process by clicking the
                      action button and connecting to our Discord.
                    </p>
                  </div>
                </div>
              </div>

              {/* Step 2 */}
              <div
                className="group animate-slideInRight"
                style={{ animationDelay: "0.37s" }}
              >
                <div className="flex gap-6 sm:gap-8">
                  <div className="flex-shrink-0">
                    <div className="flex items-center justify-center h-16 w-16 sm:h-20 sm:w-20 rounded-2xl bg-gradient-to-br from-[#0088CC] to-[#0066AA] text-white font-black text-lg sm:text-2xl group-hover:shadow-lg group-hover:shadow-[#0088CC]/40 transition-all duration-300 transform group-hover:scale-110">
                      2
                    </div>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-2xl sm:text-3xl font-black text-white mb-2 sm:mb-3">
                      Discord Ticket
                    </h3>
                    <p className="text-base sm:text-lg text-[#979797] font-semibold leading-relaxed">
                      Create a support ticket on Discord with detailed
                      information about the individual being doxed.
                    </p>
                  </div>
                </div>
              </div>

              {/* Step 3 */}
              <div
                className="group animate-slideInLeft"
                style={{ animationDelay: "0.39s" }}
              >
                <div className="flex gap-6 sm:gap-8">
                  <div className="flex-shrink-0">
                    <div className="flex items-center justify-center h-16 w-16 sm:h-20 sm:w-20 rounded-2xl bg-gradient-to-br from-[#0088CC] to-[#0066AA] text-white font-black text-lg sm:text-2xl group-hover:shadow-lg group-hover:shadow-[#0088CC]/40 transition-all duration-300 transform group-hover:scale-110">
                      3
                    </div>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-2xl sm:text-3xl font-black text-white mb-2 sm:mb-3">
                      Prepare Content
                    </h3>
                    <p className="text-base sm:text-lg text-[#979797] font-semibold leading-relaxed">
                      Gather photos, links, and supporting details for
                      verification by our moderation team.
                    </p>
                  </div>
                </div>
              </div>

              {/* Step 4 */}
              <div
                className="group animate-slideInRight"
                style={{ animationDelay: "0.41s" }}
              >
                <div className="flex gap-6 sm:gap-8">
                  <div className="flex-shrink-0">
                    <div className="flex items-center justify-center h-16 w-16 sm:h-20 sm:w-20 rounded-2xl bg-gradient-to-br from-[#0088CC] to-[#0066AA] text-white font-black text-lg sm:text-2xl group-hover:shadow-lg group-hover:shadow-[#0088CC]/40 transition-all duration-300 transform group-hover:scale-110">
                      4
                    </div>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-2xl sm:text-3xl font-black text-white mb-2 sm:mb-3">
                      Secure Payment
                    </h3>
                    <p className="text-base sm:text-lg text-[#979797] font-semibold leading-relaxed">
                      Complete payment securely. Your submission enters our
                      verification queue for review.
                    </p>
                  </div>
                </div>
              </div>

              {/* Step 5 */}
              <div
                className="group lg:col-span-2 animate-slideInLeft"
                style={{ animationDelay: "0.43s" }}
              >
                <div className="flex gap-6 sm:gap-8">
                  <div className="flex-shrink-0">
                    <div className="flex items-center justify-center h-16 w-16 sm:h-20 sm:w-20 rounded-2xl bg-gradient-to-br from-[#00D97E] to-[#06D6A0] text-white font-black text-lg sm:text-2xl group-hover:shadow-lg group-hover:shadow-[#06D6A0]/40 transition-all duration-300 transform group-hover:scale-110">
                      <CheckCircle2 className="w-10 h-10 sm:w-12 sm:h-12" />
                    </div>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-2xl sm:text-3xl font-black text-white mb-2 sm:mb-3">
                      Go Live
                    </h3>
                    <p className="text-base sm:text-lg text-[#979797] font-semibold leading-relaxed">
                      After verification by our moderators, your doxing post
                      goes live on our website and is visible to all users.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Feature Highlights */}
        <div className="w-full bg-[#000000] py-12 sm:py-16 md:py-20 lg:py-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 sm:gap-10 md:gap-12">
              <div
                className="text-center animate-scaleUpFadeIn"
                style={{ animationDelay: "0.45s" }}
              >
                <div className="flex justify-center mb-3 sm:mb-4">
                  <CheckCircle2 className="w-14 h-14 sm:w-16 sm:h-16 text-[#0088CC]" />
                </div>
                <h3 className="text-xl sm:text-2xl font-black text-white mb-2 sm:mb-3">
                  Verified & Moderated
                </h3>
                <p className="text-base text-[#979797] font-semibold">
                  All submissions are carefully reviewed and verified before
                  publication
                </p>
              </div>
              <div
                className="text-center animate-scaleUpFadeIn"
                style={{ animationDelay: "0.47s" }}
              >
                <div className="flex justify-center mb-3 sm:mb-4">
                  <Zap className="w-14 h-14 sm:w-16 sm:h-16 text-[#0088CC]" />
                </div>
                <h3 className="text-xl sm:text-2xl font-black text-white mb-2 sm:mb-3">
                  Fast Processing
                </h3>
                <p className="text-base text-[#979797] font-semibold">
                  Quick turnaround time with our efficient verification process
                </p>
              </div>
              <div
                className="text-center animate-scaleUpFadeIn"
                style={{ animationDelay: "0.49s" }}
              >
                <div className="flex justify-center mb-3 sm:mb-4">
                  <Lock className="w-14 h-14 sm:w-16 sm:h-16 text-[#0088CC]" />
                </div>
                <h3 className="text-xl sm:text-2xl font-black text-white mb-2 sm:mb-3">
                  Secure & Private
                </h3>
                <p className="text-base text-[#979797] font-semibold">
                  Your information and payment details are kept secure and
                  private
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="w-full bg-gradient-to-b from-[#000000] to-[#0a0a0a] py-12 sm:py-16 md:py-20 lg:py-24 border-t border-[#333333]">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <div className="animate-popIn" style={{ animationDelay: "0.5s" }}>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-white mb-4 sm:mb-6">
                Ready to Get Started?
              </h2>
              <p className="text-lg sm:text-xl text-[#979797] mb-8 sm:mb-10 font-semibold max-w-2xl mx-auto">
                Join our community and start your doxing submission today
              </p>
              <button
                onClick={handleDoxNow}
                className="inline-flex items-center gap-3 px-8 sm:px-10 py-4 sm:py-5 bg-gradient-to-r from-[#0088CC] to-[#00C4FF] text-white font-black text-base sm:text-lg rounded-xl hover:shadow-2xl hover:shadow-[#0088CC]/40 transition-all duration-300 transform hover:scale-105 active:scale-95 mb-6 sm:mb-8"
              >
                Dox Now
                <ArrowRight className="w-5 h-5 sm:w-6 sm:h-6" />
              </button>
              <div>
                <a
                  href="https://discord.gg/95eC83gtFN"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#0088CC] hover:text-[#00C4FF] font-black text-base sm:text-lg transition-colors duration-300"
                >
                  Or join our Discord community →
                </a>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
