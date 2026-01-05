import React, { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Copy, Check } from "lucide-react";
import { toast } from "sonner";

interface ShareModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  description?: string;
  url: string;
}

interface SocialOption {
  id: string;
  name: string;
  icon: string;
  bgColor: string;
  action: (url: string, title: string, description: string) => void;
}

export const ShareModal: React.FC<ShareModalProps> = ({
  isOpen,
  onClose,
  title,
  description = "",
  url,
}) => {
  const [copied, setCopied] = useState(false);

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      toast.success("Link copied to clipboard!");
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy URL:", err);
      toast.error("Failed to copy link");
    }
  };

  const socialOptions: SocialOption[] = [
    {
      id: "whatsapp",
      name: "WhatsApp",
      icon: "https://cdn.builder.io/api/v1/image/assets%2F11aff1be323447348ae0668822e6debc%2Fdfde67f0648f4cda9d97b7b33537a60a?format=webp&width=800",
      bgColor: "bg-green-500",
      action: (url, title, description) => {
        const text = `${title}${description ? " - " + description : ""} ${url}`;
        const waLink = `https://wa.me/?text=${encodeURIComponent(text)}`;
        window.open(waLink, "_blank", "noopener,noreferrer");
      },
    },
    {
      id: "whatsapp-business",
      name: "WhatsApp Business",
      icon: "https://cdn.builder.io/api/v1/image/assets%2F11aff1be323447348ae0668822e6debc%2F6b90820f0fe142b099c987300758fee0?format=webp&width=800",
      bgColor: "bg-green-500",
      action: (url, title, description) => {
        const text = `${title}${description ? " - " + description : ""} ${url}`;
        const waLink = `https://wa.me/?text=${encodeURIComponent(text)}`;
        window.open(waLink, "_blank", "noopener,noreferrer");
      },
    },
    {
      id: "instagram",
      name: "Instagram",
      icon: "https://cdn.builder.io/api/v1/image/assets%2F11aff1be323447348ae0668822e6debc%2Fc8f55cd80d894f22afb82f489aa85ee4?format=webp&width=800",
      bgColor: "bg-gradient-to-br from-purple-500 via-pink-500 to-orange-400",
      action: (url, title) => {
        const text = `Check this out: ${title} ${url}`;
        navigator.clipboard.writeText(text).then(() => {
          toast.success("Link copied! Share it on Instagram");
        });
      },
    },
    {
      id: "discord",
      name: "Discord",
      icon: "https://cdn.builder.io/api/v1/image/assets%2F11aff1be323447348ae0668822e6debc%2F9b8431d952304590bf6c1cab94c7fb72?format=webp&width=800",
      bgColor: "bg-indigo-500",
      action: (url, title) => {
        const text = `Check this out: ${title} ${url}`;
        navigator.clipboard.writeText(text).then(() => {
          toast.success("Message copied! Paste in Discord");
        });
      },
    },
    {
      id: "tiktok",
      name: "TikTok",
      icon: "https://cdn.builder.io/api/v1/image/assets%2F11aff1be323447348ae0668822e6debc%2Fc91adc14716d4177935453545ef83c40?format=webp&width=800",
      bgColor: "bg-black border border-white",
      action: (url, title) => {
        const text = `Check this out: ${title} ${url}`;
        navigator.clipboard.writeText(text).then(() => {
          toast.success("Message copied! Paste on TikTok");
        });
      },
    },
  ];

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md bg-gradient-to-br from-[#1a1a1a] to-[#0f0f0f] border border-[#333333] text-white overflow-hidden">
        <DialogHeader className="text-center">
          <DialogTitle className="text-2xl font-bold bg-gradient-to-r from-[#0088CC] to-[#00BBFF] bg-clip-text text-transparent">
            Share This Post
          </DialogTitle>
          <p className="text-sm text-[#979797] mt-2">Choose how you want to share</p>
        </DialogHeader>

        <div className="space-y-6 py-4">
          {/* Social Media Options Grid - Apple Style */}
          <div className="grid grid-cols-3 gap-6 sm:grid-cols-5 px-2">
            {socialOptions.map((option) => (
              <div key={option.id} className="flex flex-col items-center gap-2">
                <button
                  onClick={() => option.action(url, title, description)}
                  className={`flex items-center justify-center w-12 h-12 sm:w-14 sm:h-14 rounded-full ${option.bgColor} text-white active:scale-90 transition-transform`}
                >
                  <img
                    src={option.icon}
                    alt={option.name}
                    className="w-6 h-6 sm:w-7 sm:h-7 object-contain"
                  />
                </button>
                <p className="text-xs text-center text-[#979797] font-medium">Share</p>
              </div>
            ))}
          </div>

          {/* Divider */}
          <div className="flex items-center gap-3">
            <div className="flex-1 h-px bg-[#333333]"></div>
            <span className="text-xs text-[#979797]">OR</span>
            <div className="flex-1 h-px bg-[#333333]"></div>
          </div>

          {/* Copy Link Section */}
          <div className="bg-[#0a0a0a] border border-[#444444] rounded-xl p-4 space-y-3">
            <p className="text-sm font-semibold text-white">Copy Link</p>
            <div className="flex items-center gap-2 bg-[#1a1a1a] border border-[#555555] rounded-lg p-3 group hover:border-[#0088CC]/50 transition-colors">
              <input
                type="text"
                value={url}
                readOnly
                className="flex-1 bg-transparent text-xs sm:text-sm text-[#979797] outline-none truncate"
              />
              <button
                onClick={handleCopyLink}
                className="flex-shrink-0 p-2 rounded-lg hover:bg-[#0088CC]/20 transition-colors text-[#0088CC] hover:text-white"
                title="Copy link"
              >
                {copied ? (
                  <Check className="w-5 h-5" />
                ) : (
                  <Copy className="w-5 h-5" />
                )}
              </button>
            </div>
            {copied && (
              <p className="text-xs text-green-400 animate-pulse">Copied to clipboard!</p>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
