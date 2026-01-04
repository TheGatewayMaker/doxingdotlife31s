import { useState, useRef, useEffect } from "react";
import { ChevronLeft, ChevronRight, Download, Play } from "lucide-react";
import { addWatermarkToImage, addWatermarkToVideo } from "@/lib/watermark";
import { toast } from "sonner";
import PhotoCard from "./PhotoCard";

interface MediaFile {
  name: string;
  url: string;
  type: string;
}

interface PostMediaSectionProps {
  mediaFiles: MediaFile[];
  postTitle: string;
  thumbnailUrl?: string;
}

interface MediaItem extends MediaFile {
  index: number;
  isVideo: boolean;
  isPhoto: boolean;
  duration?: number;
}

export default function PostMediaSection({
  mediaFiles,
  postTitle,
  thumbnailUrl,
}: PostMediaSectionProps) {
  const filteredMediaFiles = mediaFiles.filter(
    (file) => !thumbnailUrl || file.url !== thumbnailUrl,
  );

  const photos = filteredMediaFiles.filter((f) => f.type.startsWith("image/"));
  const videos = filteredMediaFiles.filter((f) => f.type.startsWith("video/"));

  const [selectedMediaIndex, setSelectedMediaIndex] = useState(0);
  const [videoDurations, setVideoDurations] = useState<{
    [key: string]: number;
  }>({});
  const videoRefsForDuration = useRef<{
    [key: string]: HTMLVideoElement | null;
  }>({});

  if (photos.length === 0 && videos.length === 0) {
    return null;
  }

  const formatDuration = (seconds: number): string => {
    if (!seconds || isNaN(seconds)) return "0:00";
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  const handleVideoDurationLoaded = (url: string, duration: number) => {
    setVideoDurations((prev) => ({
      ...prev,
      [url]: duration,
    }));
  };

  const handleDownload = async (mediaFile: MediaFile) => {
    try {
      if (mediaFile.type.startsWith("image/")) {
        await addWatermarkToImage(mediaFile.url, mediaFile.name);
      } else if (mediaFile.type.startsWith("video/")) {
        await addWatermarkToVideo(mediaFile.url, mediaFile.name);
      } else {
        // For non-image/video files, download normally
        const link = document.createElement("a");
        link.href = mediaFile.url;
        link.download = mediaFile.name;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      }
      toast.success("Downloaded Successful");
    } catch (error) {
      console.error("Download error:", error);
      toast.error("Failed to download file");
    }
  };

  // Combine all media files
  const allMedia: MediaItem[] = [
    ...photos.map((photo, idx) => ({
      ...photo,
      index: idx,
      isVideo: false,
      isPhoto: true,
    })),
    ...videos.map((video, idx) => ({
      ...video,
      index: idx,
      isVideo: true,
      isPhoto: false,
      duration: videoDurations[video.url],
    })),
  ];

  const selectedMedia = allMedia[selectedMediaIndex];
  const isSelectedVideo = selectedMedia?.isVideo;
  const isSelectedPhoto = selectedMedia?.isPhoto;

  return (
    <div className="space-y-6">
      {/* Media Viewer - Display main media */}
      {selectedMedia && (
        <div className="rounded-lg overflow-hidden border border-[#666666]">
          {isSelectedPhoto && (
            <div
              className="bg-black flex items-center justify-center w-full"
              style={{ aspectRatio: "16/9" }}
            >
              <img
                src={selectedMedia.url}
                alt={selectedMedia.name}
                className="w-full h-full object-contain"
                crossOrigin="anonymous"
              />
            </div>
          )}

          {isSelectedVideo && (
            <div className="relative bg-black flex items-center justify-center w-full" style={{ aspectRatio: "16/9" }}>
              <video
                key={`video-${selectedMediaIndex}`}
                controls
                controlsList="nodownload"
                preload="metadata"
                className="w-full h-full object-contain"
                crossOrigin="anonymous"
                playsInline
                onLoadedMetadata={(e) => {
                  const video = e.currentTarget;
                  handleVideoDurationLoaded(selectedMedia.url, video.duration);
                }}
              >
                <source src={selectedMedia.url} type={selectedMedia.type} />
                Your browser does not support the video tag.
              </video>
            </div>
          )}

          {/* Media Controls */}
          <div className="bg-[#1a1a1a] border-t border-[#666666] p-3 sm:p-4 space-y-3">
            <div className="flex items-center justify-between gap-3">
              <div className="min-w-0 flex-1">
                <p className="text-xs sm:text-sm font-semibold text-white truncate break-words line-clamp-1">
                  {selectedMedia.name}
                </p>
                {allMedia.length > 1 && (
                  <p className="text-xs text-[#979797] mt-1">
                    {selectedMediaIndex + 1} / {allMedia.length}
                  </p>
                )}
              </div>
            </div>

            <div className="flex gap-2">
              {allMedia.length > 1 && (
                <>
                  <button
                    onClick={() =>
                      setSelectedMediaIndex((prev) =>
                        prev === 0 ? allMedia.length - 1 : prev - 1,
                      )
                    }
                    className="p-2 bg-[#1a1a1a] hover:bg-[#0088CC] text-[#979797] hover:text-white rounded transition-all text-sm font-medium border border-[#666666] hover:border-[#0088CC]"
                    aria-label="Previous media"
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() =>
                      setSelectedMediaIndex((prev) =>
                        prev === allMedia.length - 1 ? 0 : prev + 1,
                      )
                    }
                    className="p-2 bg-[#1a1a1a] hover:bg-[#0088CC] text-[#979797] hover:text-white rounded transition-all text-sm font-medium border border-[#666666] hover:border-[#0088CC]"
                    aria-label="Next media"
                  >
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </>
              )}
              <button
                onClick={() => handleDownload(selectedMedia)}
                className="flex-1 px-3 py-2 bg-[#0088CC] hover:bg-[#0077BB] text-white text-xs sm:text-sm font-medium rounded transition-all flex items-center justify-center gap-1.5"
              >
                <Download className="w-4 h-4" />
                <span>Download</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Media Thumbnails Grid - Only if multiple items */}
      {allMedia.length > 1 && (
        <div>
          <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
            {allMedia.map((media, idx) => {
              const isSelected = selectedMediaIndex === idx;

              return (
                <button
                  key={`${media.name}-${idx}`}
                  onClick={() => setSelectedMediaIndex(idx)}
                  className={`relative group rounded overflow-hidden border-2 transition-all aspect-square ${
                    isSelected
                      ? "border-[#0088CC] ring-2 ring-[#0088CC] ring-offset-1 ring-offset-[#000000]"
                      : "border-[#666666] hover:border-[#0088CC]/70"
                  }`}
                >
                  {media.isPhoto ? (
                    <img
                      src={media.url}
                      alt={media.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                      loading="lazy"
                      crossOrigin="anonymous"
                    />
                  ) : (
                    <div className="w-full h-full bg-black flex items-center justify-center relative overflow-hidden">
                      <video
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                        crossOrigin="anonymous"
                        preload="metadata"
                        playsInline
                      >
                        <source src={media.url} type={media.type} />
                      </video>
                      <Play className="absolute w-5 h-5 text-white fill-white opacity-70" />
                    </div>
                  )}
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors"></div>
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
