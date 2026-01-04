import { Copy, Check } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { GlobeIcon, MapPinIcon, DiscordIcon } from "@/components/Icons";
import { parseMarkdownBold } from "@/lib/markdown-parser";

interface PostDescriptionSectionProps {
  description: string;
  tags?: {
    country?: string;
    city?: string;
    server?: string;
  };
}

export default function PostDescriptionSection({
  description,
  tags = {},
}: PostDescriptionSectionProps) {
  const [copied, setCopied] = useState(false);

  const handleCopyDescription = async () => {
    try {
      await navigator.clipboard.writeText(description);
      setCopied(true);
      toast.success("Description copied to clipboard!");
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy:", err);
      toast.error("Failed to copy description");
    }
  };

  return (
    <div className="space-y-4">
      {/* Tags/Metadata Section - Only show if we have tags */}
      {(tags.country || tags.city || tags.server) && (
        <div>
          <h3 className="text-xs font-bold text-[#979797] uppercase tracking-widest mb-3 opacity-80">
            Location & Server
          </h3>
          <div className="flex flex-wrap gap-2">
            {tags.country && (
              <span className="inline-flex items-center gap-1.5 bg-white/10 backdrop-blur-md text-[#d0d0d0] border border-white/20 px-2 py-1 rounded text-xs font-semibold hover:bg-white/20 hover:border-white/40 transition-all">
                <GlobeIcon className="w-3 h-3" />
                {tags.country}
              </span>
            )}
            {tags.city && (
              <span className="inline-flex items-center gap-1.5 bg-white/10 backdrop-blur-md text-[#d0d0d0] border border-white/20 px-2 py-1 rounded text-xs font-semibold hover:bg-white/20 hover:border-white/40 transition-all">
                <MapPinIcon className="w-3 h-3" />
                {tags.city}
              </span>
            )}
            {tags.server && (
              <span className="inline-flex items-center gap-1.5 bg-white/10 backdrop-blur-md text-[#d0d0d0] border border-white/20 px-2 py-1 rounded text-xs font-semibold hover:bg-white/20 hover:border-white/40 transition-all">
                <DiscordIcon className="w-3 h-3" />
                {tags.server}
              </span>
            )}
          </div>
        </div>
      )}

      {/* Description Section */}
      <div className="border-t border-[#666666] pt-4">
        <div className="flex items-start justify-between gap-2 mb-3">
          <h2 className="text-xs font-bold text-[#979797] uppercase tracking-widest opacity-80">
            Description
          </h2>
          <button
            onClick={handleCopyDescription}
            className="flex items-center gap-1.5 px-2 py-1 rounded bg-white/10 hover:bg-white/20 text-[#d0d0d0] hover:text-white transition-all text-xs font-medium active:scale-95 flex-shrink-0"
            title="Copy description to clipboard"
          >
            {copied ? (
              <>
                <Check className="w-3.5 h-3.5" />
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5" />
              </>
            )}
          </button>
        </div>

        <div className="text-xs sm:text-sm leading-relaxed text-[#d0d0d0] whitespace-pre-wrap break-words">
          {parseMarkdownBold(description)}
        </div>
      </div>
    </div>
  );
}
