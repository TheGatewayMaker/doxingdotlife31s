import { RequestHandler } from "express";
import { getPostViews, incrementPostViews } from "../utils/r2-storage";

/**
 * GET /api/views/:postId
 * Get the view count for a post
 */
export const handleGetViews: RequestHandler = async (req, res) => {
  const { postId } = req.params;

  try {
    if (!postId) {
      return res.status(400).json({ error: "Missing postId parameter" });
    }

    const views = await getPostViews(postId);

    res.json({ postId, views });
  } catch (error) {
    console.error(`Error getting views for post ${req.params.postId}:`, error);
    res.status(500).json({ error: "Failed to get view count" });
  }
};

/**
 * POST /api/views/:postId
 * Increment the view count for a post
 * Returns the new view count
 */
export const handleIncrementViews: RequestHandler = async (req, res) => {
  const { postId } = req.params;

  try {
    if (!postId) {
      return res.status(400).json({ error: "Missing postId parameter" });
    }

    const newViews = await incrementPostViews(postId);

    res.json({ postId, views: newViews, message: "View incremented" });
  } catch (error) {
    console.error(`Error incrementing views for post ${req.params.postId}:`, error);
    res.status(500).json({ error: "Failed to increment view count" });
  }
};
