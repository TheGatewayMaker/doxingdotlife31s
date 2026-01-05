import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { cn } from "@/lib/utils";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PostDescriptionSection from "@/components/PostDescriptionSection";
import PostMediaSection from "@/components/PostMediaSection";
import NSFWWarningModal from "@/components/NSFWWarningModal";
import { ShareModal } from "@/components/ShareModal";
import ModernLoader from "@/components/ModernLoader";
import {
  NSFWIcon,
  PictureIcon,
  WarningTriangleIcon,
  ClipboardIcon,
  FolderIcon,
  CalendarIcon,
  ClockIcon,
  DocumentIcon,
} from "@/components/Icons";
import { Post } from "@shared/api";
import { toast } from "sonner";

export default function PostDetail() {
  const { postId } = useParams<{ postId: string }>();
  const navigate = useNavigate();
  const [post, setPosts] = useState<Post | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [thumbnailError, setThumbnailError] = useState(false);
  const [showNSFWWarning, setShowNSFWWarning] = useState(false);
  const [nsfwApproved, setNsfwApproved] = useState(false);
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);

  useEffect(() => {
    const loadPost = async () => {
      try {
        const controller = new AbortController();
        const timeout = setTimeout(() => controller.abort(), 30000);

        const response = await fetch(`/api/posts/${postId}`, {
          signal: controller.signal,
        });

        clearTimeout(timeout);

        if (!response.ok) {
          if (response.status === 404) {
            setError("Post not found");
          } else {
            throw new Error(`API responded with status ${response.status}`);
          }
        } else {
          const foundPost = await response.json();

          if (foundPost) {
            setPosts(foundPost);
            if (foundPost.nsfw) {
              setShowNSFWWarning(true);
            }
          } else {
            setError("Post not found");
          }
        }
      } catch (err) {
        console.error("Error loading post:", err);
        setError("Failed to load post");
      } finally {
        setLoading(false);
      }
    };

    loadPost();
  }, [postId]);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#000000] text-white flex flex-col animate-fadeIn">
        <Header />
        <main className="flex-1 w-full flex flex-col items-center justify-center px-4 py-8 sm:py-12 lg:py-16">
          <ModernLoader size="lg" text="Loading post..." />
        </main>
        <Footer />
      </div>
    );
  }

  if (error || !post) {
    return (
      <div className="min-h-screen bg-[#000000] text-white flex flex-col animate-fadeIn">
        <Header />
        <main className="flex-1 w-full flex items-center justify-center px-4">
          <div className="text-center">
            <WarningTriangleIcon className="w-20 h-20 mx-auto mb-4 text-[#FF0000]" />
            <h2 className="text-3xl font-bold mb-4 text-white">
              {error || "Post not found"}
            </h2>
            <p className="text-[#979797] mb-6 max-w-sm">
              The post you're looking for doesn't exist or has been removed.
            </p>
            <button
              onClick={() => navigate("/")}
              className="px-6 py-3 bg-[#0088CC] text-white font-semibold rounded-lg hover:bg-[#0077BB] transition-all shadow-md hover:shadow-lg active:scale-95"
            >
              ← Back to Home
            </button>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  if (showNSFWWarning && !nsfwApproved && post.nsfw) {
    return (
      <div className="min-h-screen bg-[#000000] text-white flex flex-col animate-fadeIn">
        <Header />
        <main className="flex-1 w-full flex items-center justify-center p-4">
          <NSFWWarningModal
            onProceed={() => setNsfwApproved(true)}
            onGoBack={() => navigate("/")}
          />
        </main>
        <Footer />
      </div>
    );
  }

  const handleShare = () => {
    setIsShareModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-[#000000] text-white flex flex-col animate-fadeIn">
      <Header />
      <main className="flex-1 w-full">
        <div className="w-full py-6 sm:py-8 lg:py-10">
          {/* Back Button */}
          <div className="px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto w-full">
              <button
                onClick={() => navigate("/")}
                className="flex items-center justify-center gap-2 px-6 py-3 sm:py-4 mb-6 bg-[#0088CC] text-white hover:bg-[#0077BB] transition-all duration-200 font-bold rounded-lg animate-fadeIn text-sm sm:text-base shadow-lg hover:shadow-lg hover:shadow-[#0088CC]/40 active:scale-95"
              >
                <svg
                  className="w-5 h-5"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <line x1="19" y1="12" x2="5" y2="12"></line>
                  <polyline points="12 19 5 12 12 5"></polyline>
                </svg>
                <span>Back to Home</span>
              </button>
            </div>
          </div>

          {/* Main Content - Full Width with Proper Grid */}
          <div className="px-4 sm:px-6 lg:px-8 space-y-8 sm:space-y-10">
            {/* NSFW Warning Banner */}
            {post.nsfw && (
              <div className="bg-[#1a1a1a] border border-[#FF0000]/40 rounded-lg p-4 flex items-start gap-3 animate-fadeIn max-w-7xl mx-auto w-full">
                <NSFWIcon className="w-6 h-6 text-[#FF0000] flex-shrink-0 mt-0.5" />
                <div className="flex-1 min-w-0">
                  <p className="font-bold text-white mb-1 text-sm sm:text-base">
                    NSFW Content Warning
                  </p>
                  <p className="text-xs sm:text-sm text-[#979797]">
                    This post contains explicit content. Ensure you're viewing
                    in an appropriate and private setting.
                  </p>
                </div>
              </div>
            )}

            {/* Header Section with Badges and Metadata */}
            <div
              className="max-w-7xl mx-auto w-full animate-fadeIn"
              style={{ animationDelay: "0.1s" }}
            >
              <div className="flex flex-wrap items-center gap-2 mb-3 sm:mb-4">
                {post.nsfw && (
                  <span className="inline-flex items-center gap-1 px-2.5 py-1 bg-[#FF0000]/20 text-[#FF0000] text-xs font-bold rounded border border-[#FF0000]/40">
                    <NSFWIcon className="w-3.5 h-3.5" />
                    NSFW
                  </span>
                )}
                <span className="inline-flex items-center gap-1 px-2.5 py-1 bg-[#666666] text-white text-xs font-semibold rounded border border-[#979797]">
                  <DocumentIcon className="w-3.5 h-3.5" />
                  Post
                </span>
              </div>
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-black mb-4 text-white leading-tight">
                {post.title}
              </h1>
              <div className="flex flex-col xs:flex-row xs:items-center xs:gap-3 text-xs sm:text-sm text-[#979797] space-y-2 xs:space-y-0">
                <div className="flex items-center gap-2">
                  <CalendarIcon className="w-4 h-4" />
                  <span>
                    {new Date(post.createdAt).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "short",
                      day: "numeric",
                    })}
                  </span>
                </div>
                <div className="hidden xs:block w-1 h-1 bg-[#666666] rounded-full"></div>
                <div className="flex items-center gap-2">
                  <ClockIcon className="w-4 h-4" />
                  <span>
                    {new Date(post.createdAt).toLocaleTimeString("en-US", {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </span>
                </div>
              </div>
            </div>

            {/* Two Column Layout - Media and Description */}
            <div
              className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-5 gap-6 sm:gap-8 animate-fadeIn"
              style={{ animationDelay: "0.2s" }}
            >
              {/* Left Column - Media (Takes 3/5 on desktop) */}
              <div className="lg:col-span-3 space-y-6">
                {/* Thumbnail Section */}
                <section>
                  {post.thumbnail && !thumbnailError && (
                    <div className="rounded-lg overflow-hidden border border-[#666666] shadow-lg">
                      <img
                        src={post.thumbnail}
                        alt={post.title}
                        className={cn(
                          "w-full h-auto object-cover aspect-video",
                          post.blurThumbnail && !nsfwApproved && "blur-2xl",
                        )}
                        onError={() => setThumbnailError(true)}
                        crossOrigin="anonymous"
                      />
                    </div>
                  )}

                  {thumbnailError && (
                    <div className="w-full aspect-video bg-[#1a1a1a] flex items-center justify-center rounded-lg border border-[#666666]">
                      <div className="text-center">
                        <PictureIcon className="w-16 h-16 mx-auto mb-2 text-[#666666]" />
                        <p className="text-[#979797] text-sm">
                          Thumbnail unavailable
                        </p>
                      </div>
                    </div>
                  )}
                </section>

                {/* Media Gallery Section */}
                {post.mediaFiles && post.mediaFiles.length > 0 && (
                  <section>
                    <h2 className="text-base sm:text-lg font-bold text-white mb-4 flex items-center gap-2">
                      <FolderIcon className="w-5 h-5" />
                      Media Gallery ({post.mediaFiles.length})
                    </h2>
                    <PostMediaSection
                      mediaFiles={post.mediaFiles}
                      postTitle={post.title}
                      thumbnailUrl={post.thumbnail}
                    />
                  </section>
                )}
              </div>

              {/* Right Column - Description (Takes 2/5 on desktop) */}
              <div className="lg:col-span-2 space-y-6 flex flex-col">
                {/* Share Button - Always Visible */}
                <section>
                  <button
                    onClick={handleShare}
                    className="w-full flex items-center justify-center gap-2 px-4 py-3 sm:py-4 bg-[#0088CC] text-white font-bold rounded-lg hover:bg-[#0077BB] transition-all shadow-lg hover:shadow-lg hover:shadow-[#0088CC]/40 active:scale-95 text-sm sm:text-base"
                  >
                    <Share2 className="w-5 h-5" />
                    <span>Share</span>
                  </button>
                </section>

                {/* Description Section */}
                <section className="bg-[#1a1a1a] border border-[#666666] rounded-lg p-5 sm:p-6">
                  <h2 className="text-base sm:text-lg font-bold text-white mb-4 flex items-center gap-2">
                    <ClipboardIcon className="w-5 h-5" />
                    Details
                  </h2>
                  <PostDescriptionSection
                    description={post.description}
                    tags={{
                      country: post.country,
                      city: post.city,
                      server: post.server,
                    }}
                  />
                </section>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />

      {/* Share Modal */}
      <ShareModal
        isOpen={isShareModalOpen}
        onClose={() => setIsShareModalOpen(false)}
        title={post.title}
        description={post.description}
        url={window.location.href}
      />
    </div>
  );
}
