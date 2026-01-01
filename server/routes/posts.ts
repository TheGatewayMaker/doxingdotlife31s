import { RequestHandler } from "express";
import {
  listPostFolders,
  getPostWithThumbnail,
  listPostFiles,
  getMediaUrl,
} from "../utils/r2-storage";
import { Post } from "@shared/api";

const getMimeType = (fileName: string): string => {
  const extension = fileName.toLowerCase().split(".").pop() || "";
  const mimeTypes: { [key: string]: string } = {
    // Images
    jpg: "image/jpeg",
    jpeg: "image/jpeg",
    png: "image/png",
    gif: "image/gif",
    webp: "image/webp",
    svg: "image/svg+xml",
    bmp: "image/bmp",
    ico: "image/x-icon",
    tiff: "image/tiff",
    tif: "image/tiff",
    jpe: "image/jpeg",

    // Videos
    mp4: "video/mp4",
    webm: "video/webm",
    mov: "video/quicktime",
    avi: "video/x-msvideo",
    mkv: "video/x-matroska",
    flv: "video/x-flv",
    m4v: "video/x-m4v",
    mpg: "video/mpeg",
    mpeg: "video/mpeg",
    mts: "video/mp2t",
    m2ts: "video/mp2t",
    wmv: "video/x-ms-wmv",
    mxf: "video/mxf",
    ogv: "video/ogg",

    // Audio
    mp3: "audio/mpeg",
    wav: "audio/wav",
    m4a: "audio/mp4",
    aac: "audio/aac",
    flac: "audio/flac",
    ogg: "audio/ogg",
    opus: "audio/opus",
    wma: "audio/x-ms-wma",
    aiff: "audio/aiff",
    aif: "audio/aiff",

    // Other
    json: "application/json",
    pdf: "application/pdf",
    txt: "text/plain",
  };

  return mimeTypes[extension] || "application/octet-stream";
};

export const handleGetPosts: RequestHandler = async (req, res) => {
  const startTime = Date.now();
  try {
    console.log(`[${new Date().toISOString()}] Starting to fetch posts...`);

    const listStart = Date.now();
    const postIds = await listPostFolders();
    const listDuration = Date.now() - listStart;
    console.log(
      `[${new Date().toISOString()}] Listed ${postIds.length} post folders in ${listDuration}ms`,
    );

    const posts: Post[] = [];
    let successCount = 0;
    let errorCount = 0;

    for (const postId of postIds) {
      try {
        const postData = await getPostWithThumbnail(postId);
        if (postData) {
          const mediaFiles = await listPostFiles(postId);
          const mediaFileObjects = mediaFiles
            .map((fileName) => ({
              name: fileName,
              url: `/api/media/${postId}/${fileName}`,
              type: getMimeType(fileName),
            }))
            .filter((f) => f.name !== "metadata.json");

          const post: Post = {
            id: postData.id,
            title: postData.title,
            description: postData.description,
            country: postData.country,
            city: postData.city,
            server: postData.server,
            thumbnail: postData.thumbnail,
            blurThumbnail: postData.blurThumbnail || false,
            nsfw: postData.nsfw || false,
            isTrend: postData.isTrend || false,
            trendRank: postData.trendRank,
            mediaFiles: mediaFileObjects,
            createdAt: postData.createdAt,
          };

          posts.push(post);
          successCount++;
        }
      } catch (postError) {
        errorCount++;
        console.warn(`Error loading post ${postId}:`, postError);
        continue;
      }
    }

    posts.sort(
      (a, b) =>
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
    );

    const totalDuration = Date.now() - startTime;
    console.log(
      `[${new Date().toISOString()}] Fetched posts: ${successCount} successful, ${errorCount} errors in ${totalDuration}ms`,
    );

    res.json({
      posts,
      total: posts.length,
    });
  } catch (error) {
    const duration = Date.now() - startTime;
    console.error(
      `[${new Date().toISOString()}] Error getting posts after ${duration}ms:`,
      error,
    );
    res.status(200).json({ posts: [], total: 0 });
  }
};
