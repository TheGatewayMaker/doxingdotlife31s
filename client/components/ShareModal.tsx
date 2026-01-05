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
  icon: React.ReactNode;
  color: string;
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
      icon: (
        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.67-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.076 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421-7.403h-.004a9.87 9.87 0 00-4.959 1.231l-.356.213-3.699-.971.992 3.628-.235.374a9.86 9.86 0 001.406 4.855c1.033 1.793 2.621 3.366 4.613 4.491 1.992 1.125 4.256 1.719 6.57 1.719 1.16 0 2.286-.127 3.364-.38l.356-.056 3.704.972-.996-3.628.236-.374a9.865 9.865 0 00-1.408-4.856c-1.033-1.792-2.62-3.365-4.613-4.49C13.068 2.997 10.804 2.4 8.51 2.4" />
        </svg>
      ),
      color: "bg-green-500 hover:bg-green-600",
      action: (url, title, description) => {
        const text = `${title}${description ? " - " + description : ""} ${url}`;
        const waLink = `https://wa.me/?text=${encodeURIComponent(text)}`;
        window.open(waLink, "_blank", "noopener,noreferrer");
      },
    },
    {
      id: "whatsapp-business",
      name: "WhatsApp Business",
      icon: (
        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.67-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.076 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421-7.403h-.004a9.87 9.87 0 00-4.959 1.231l-.356.213-3.699-.971.992 3.628-.235.374a9.86 9.86 0 001.406 4.855c1.033 1.793 2.621 3.366 4.613 4.491 1.992 1.125 4.256 1.719 6.57 1.719 1.16 0 2.286-.127 3.364-.38l.356-.056 3.704.972-.996-3.628.236-.374a9.865 9.865 0 00-1.408-4.856c-1.033-1.792-2.62-3.365-4.613-4.49C13.068 2.997 10.804 2.4 8.51 2.4" />
        </svg>
      ),
      color: "bg-cyan-500 hover:bg-cyan-600",
      action: (url, title, description) => {
        const text = `${title}${description ? " - " + description : ""} ${url}`;
        const waLink = `https://wa.me/?text=${encodeURIComponent(text)}`;
        window.open(waLink, "_blank", "noopener,noreferrer");
      },
    },
    {
      id: "instagram",
      name: "Instagram",
      icon: (
        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zM5.838 12a6.162 6.162 0 1112.324 0 6.162 6.162 0 01-12.324 0zM12 16a4 4 0 110-8 4 4 0 010 8zm4.965-10.322a1.44 1.44 0 110-2.881 1.44 1.44 0 010 2.881z" />
        </svg>
      ),
      color: "bg-pink-500 hover:bg-pink-600",
      action: (url, title) => {
        const text = `Check this out: ${title} ${url}`;
        const link = `https://instagram.com/?url=${encodeURIComponent(url)}`;
        // Instagram doesn't have direct share, so we copy to clipboard and prompt user
        navigator.clipboard.writeText(text).then(() => {
          toast.success("Link copied! Share it on Instagram");
        });
      },
    },
    {
      id: "discord",
      name: "Discord",
      icon: (
        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
          <path d="M20.317 4.369a19.791 19.791 0 00-4.885-1.515.074.074 0 00-.079.037c-.211.375-.444.864-.607 1.25a18.27 18.27 0 00-5.487 0c-.163-.386-.405-.875-.617-1.25a.077.077 0 00-.079-.037A19.736 19.736 0 003.677 4.37a.07.07 0 00-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 00.031.056 19.9 19.9 0 005.993 3.03.078.078 0 00.084-.028c.462-.63.873-1.295 1.226-1.994a.076.076 0 00-.042-.106 13.107 13.107 0 01-1.872-.892.077.077 0 01-.008-.128c.126-.094.252-.192.372-.292a.074.074 0 01.076-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 01.078.009c.12.1.246.199.373.292a.077.077 0 01-.006.127 12.299 12.299 0 01-1.873.892.076.076 0 00-.041.107c.359.699.77 1.364 1.225 1.994a.077.077 0 00.084.028 19.963 19.963 0 006.002-3.03.077.077 0 00.032-.054c.5-4.796-.838-8.97-3.549-12.676a.061.061 0 00-.031-.03zM8.02 15.33c-1.183 0-2.157-.965-2.157-2.156 0-1.193.948-2.157 2.157-2.157 1.211 0 2.176.964 2.157 2.157 0 1.19-.946 2.156-2.157 2.156zm7.975 0c-1.183 0-2.157-.965-2.157-2.156 0-1.193.948-2.157 2.157-2.157 1.211 0 2.176.964 2.157 2.157 0 1.19-.946 2.156-2.157 2.156z" />
        </svg>
      ),
      color: "bg-indigo-500 hover:bg-indigo-600",
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
      icon: (
        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
          <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 11-5.92-2.4 2.88 2.88 0 011.42 2.41V9.4a6.29 6.29 0 00-1.27-.13A6.27 6.27 0 005 16.36a6.27 6.27 0 0010.25 4.83V17.2a4.83 4.83 0 003.34 1.38V14.8a4.81 4.81 0 01-3.34-1.38v-1.07a4.81 4.81 0 013.34-1.38V6.69z" />
        </svg>
      ),
      color: "bg-black hover:bg-gray-800 border border-white",
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
          {/* Social Media Options Grid */}
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
            {socialOptions.map((option) => (
              <button
                key={option.id}
                onClick={() => option.action(url, title, description)}
                className={`flex flex-col items-center justify-center gap-2 p-4 rounded-xl transition-all duration-300 transform hover:scale-105 active:scale-95 ${option.color} text-white font-semibold group`}
              >
                <div className="group-hover:scale-110 transition-transform duration-300">
                  {option.icon}
                </div>
                <span className="text-xs sm:text-sm">{option.name}</span>
              </button>
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
