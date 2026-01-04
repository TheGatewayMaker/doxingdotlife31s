export function MediaSkeleton() {
  return (
    <div className="w-full h-full bg-[#1a1a1a] animate-pulse flex items-center justify-center">
      <div className="w-8 h-8 bg-[#333333] rounded-full"></div>
    </div>
  );
}

export function MediaThumbnailSkeleton() {
  return (
    <div className="w-full h-full aspect-square bg-[#1a1a1a] animate-pulse rounded overflow-hidden border-2 border-[#666666]" />
  );
}
