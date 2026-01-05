import { useState, useEffect } from "react";
import { Post } from "@shared/api";
import {
  CloseIcon,
  TrashIcon,
  VideoIcon,
  ImageIcon,
  DocumentIcon,
} from "./Icons";
import { toast } from "sonner";

interface MediaManagerModalProps {
  post: Post;
  onClose: () => void;
  onUpdate: (post: Post) => void;
}

export default function MediaManagerModal({
  post,
  onClose,
  onUpdate,
}: MediaManagerModalProps) {
  const [deletingFileName, setDeletingFileName] = useState<string | null>(null);
  const [isDeletingFile, setIsDeletingFile] = useState(false);
  const [mediaFiles, setMediaFiles] = useState(post.mediaFiles);
  const [isLoadingMedia, setIsLoadingMedia] = useState(false);

  // Fetch full post details with mediaFiles on mount
  useEffect(() => {
    const fetchPostDetails = async () => {
      try {
        setIsLoadingMedia(true);
        const response = await fetch(`/api/posts/${post.id}`);
        if (!response.ok) throw new Error("Failed to fetch post details");

        const fullPost: Post = await response.json();
        setMediaFiles(fullPost.mediaFiles);
      } catch (error) {
        console.error("Error fetching post details:", error);
        toast.error("Failed to load media files");
      } finally {
        setIsLoadingMedia(false);
      }
    };

    fetchPostDetails();
  }, [post.id]);

  const isImageFile = (fileName: string): boolean => {
    const imageExtensions = [
      "jpg",
      "jpeg",
      "png",
      "gif",
      "webp",
      "svg",
      "bmp",
      "ico",
      "tiff",
      "tif",
    ];
    const ext = fileName.split(".").pop()?.toLowerCase() || "";
    return imageExtensions.includes(ext);
  };

  const isVideoFile = (fileName: string): boolean => {
    const videoExtensions = [
      "mp4",
      "webm",
      "mov",
      "avi",
      "mkv",
      "flv",
      "m4v",
      "mpg",
      "mpeg",
      "mts",
      "m2ts",
      "wmv",
      "mxf",
      "ogv",
    ];
    const ext = fileName.split(".").pop()?.toLowerCase() || "";
    return videoExtensions.includes(ext);
  };

  const handleDeleteMedia = async () => {
    if (!deletingFileName) return;

    try {
      setIsDeletingFile(true);

      const response = await fetch(
        `/api/posts/${post.id}/media/${encodeURIComponent(deletingFileName)}`,
        {
          method: "DELETE",
          credentials: "include",
        },
      );

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.error || "Failed to delete media file");
      }

      const updatedFiles = mediaFiles.filter(
        (file) => file.name !== deletingFileName,
      );
      setMediaFiles(updatedFiles);

      onUpdate({
        ...post,
        mediaFiles: updatedFiles,
      });

      toast.success("Media file deleted successfully");
    } catch (error) {
      console.error("Error deleting media file:", error);
      toast.error(
        error instanceof Error ? error.message : "Failed to delete media file",
      );
    } finally {
      setIsDeletingFile(false);
      setDeletingFileName(null);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4 animate-fadeIn overflow-y-auto">
      <div className="bg-card border border-border rounded-xl w-full max-w-3xl p-6 shadow-xl my-8 animate-fadeIn">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl sm:text-2xl font-bold text-foreground">
            Manage Media Files
          </h3>
          <button
            onClick={onClose}
            disabled={isDeletingFile}
            className="text-muted-foreground hover:text-foreground transition-colors disabled:opacity-50"
          >
            <CloseIcon className="w-6 h-6" />
          </button>
        </div>

        {/* Post Info */}
        <div className="bg-muted/50 border border-border rounded-lg p-4 mb-6">
          <h4 className="font-semibold text-foreground text-sm mb-2">
            Post: {post.title}
          </h4>
          <p className="text-xs text-muted-foreground">ID: {post.id}</p>
        </div>

        {/* Media Files Grid */}
        {isLoadingMedia ? (
          <div className="text-center py-12">
            <div className="inline-block animate-spin">
              <svg
                className="w-6 h-6 text-accent"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                />
              </svg>
            </div>
            <p className="text-muted-foreground text-sm mt-3">
              Loading media files...
            </p>
          </div>
        ) : mediaFiles.length > 0 ? (
          <div className="max-h-96 overflow-y-auto">
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
              {mediaFiles.map((file) => (
                <div
                  key={file.name}
                  className="group relative bg-muted border border-border rounded-lg overflow-hidden hover:border-accent/50 transition-all flex flex-col"
                >
                  {/* File Preview */}
                  <div className="aspect-square bg-muted/70 flex items-center justify-center overflow-hidden relative">
                    {isImageFile(file.name) ? (
                      <img
                        src={file.url}
                        alt={file.name}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                        crossOrigin="anonymous"
                      />
                    ) : isVideoFile(file.name) ? (
                      <div className="flex flex-col items-center justify-center gap-2 w-full h-full bg-gradient-to-br from-purple-500/20 to-purple-600/20">
                        <VideoIcon className="w-8 h-8 text-purple-400" />
                        <span className="text-xs text-purple-300 font-medium">
                          Video
                        </span>
                      </div>
                    ) : (
                      <div className="flex flex-col items-center justify-center gap-2 w-full h-full bg-gradient-to-br from-gray-500/20 to-gray-600/20">
                        <DocumentIcon className="w-8 h-8 text-gray-400" />
                        <span className="text-xs text-gray-300 font-medium">
                          File
                        </span>
                      </div>
                    )}
                  </div>

                  {/* File Info and Actions */}
                  <div className="p-2 flex-1 flex flex-col justify-between bg-card border-t border-border">
                    <p className="text-xs font-medium text-foreground truncate mb-2">
                      {file.name}
                    </p>
                    <div className="flex gap-1.5 w-full">
                      <a
                        href={file.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-1 px-2 py-1 bg-blue-600/90 hover:bg-blue-700 text-white text-xs font-semibold rounded transition-all"
                      >
                        View
                      </a>
                      <button
                        onClick={() => setDeletingFileName(file.name)}
                        disabled={isDeletingFile}
                        className="px-2 py-1 bg-red-600/90 hover:bg-red-700 text-white rounded transition-all disabled:opacity-50 flex items-center justify-center"
                        title="Delete file"
                      >
                        <TrashIcon className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="text-center py-12">
            <DocumentIcon className="w-12 h-12 text-muted-foreground/50 mx-auto mb-3" />
            <p className="text-muted-foreground text-sm">
              No media files in this post
            </p>
          </div>
        )}

        {/* Close Button */}
        <div className="flex gap-3 mt-6">
          <button
            onClick={onClose}
            disabled={isDeletingFile}
            className="flex-1 px-4 py-2 bg-accent text-accent-foreground font-medium rounded-lg hover:bg-accent/90 disabled:opacity-40 transition-all"
          >
            Done
          </button>
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      {deletingFileName && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4 animate-fadeIn">
          <div className="bg-card border border-border rounded-xl max-w-sm w-full p-6 shadow-xl animate-fadeIn">
            <h3 className="text-lg sm:text-xl font-bold text-foreground mb-2">
              Delete Media File?
            </h3>
            <p className="text-sm text-muted-foreground mb-4">
              File: <span className="font-semibold">{deletingFileName}</span>
            </p>
            <p className="text-sm text-muted-foreground mb-6">
              Are you sure you want to delete this media file? This action
              cannot be undone.
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => setDeletingFileName(null)}
                disabled={isDeletingFile}
                className="flex-1 px-4 py-2 bg-card border border-border text-foreground font-medium rounded-lg hover:bg-muted disabled:opacity-40 transition-all"
              >
                Cancel
              </button>
              <button
                onClick={handleDeleteMedia}
                disabled={isDeletingFile}
                className="flex-1 px-4 py-2 bg-red-600 text-white font-medium rounded-lg hover:bg-red-700 disabled:opacity-40 transition-all flex items-center justify-center gap-2"
              >
                <TrashIcon className="w-4 h-4" />
                {isDeletingFile ? "Deleting..." : "Delete"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
