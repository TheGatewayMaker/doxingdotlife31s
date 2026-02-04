/**
 * View tracking utility to ensure consistent behavior across mobile and desktop
 * Handles incremental view counting with safety checks
 */

/**
 * Cache to track which posts have had their views incremented in this session
 * Prevents duplicate increments if component remounts
 */
const viewsIncrementedCache = new Set<string>();

/**
 * Track if a post's view has been incremented in the current session
 * Works consistently on mobile and desktop
 */
export const hasViewBeenIncremented = (postId: string): boolean => {
  return viewsIncrementedCache.has(postId);
};

/**
 * Mark a post as having its view incremented
 * Works consistently on mobile and desktop
 */
export const markViewIncremented = (postId: string): void => {
  viewsIncrementedCache.add(postId);
};

/**
 * Increment view count for a post with error handling
 * Works consistently on mobile and desktop networks
 */
export const incrementPostView = async (
  postId: string
): Promise<{ success: boolean; views: number }> => {
  // Prevent duplicate increments
  if (hasViewBeenIncremented(postId)) {
    console.warn(
      `View for post ${postId} was already incremented in this session`
    );
    // Still fetch current views even if already incremented
    try {
      const response = await fetch(`/api/views/${postId}`);
      if (response.ok) {
        const data = await response.json();
        return { success: true, views: data.views };
      }
    } catch (err) {
      console.warn(`Failed to fetch views for post ${postId}:`, err);
    }
    return { success: false, views: 0 };
  }

  try {
    // Use a reasonable timeout for mobile networks (10 seconds)
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 10000);

    const response = await fetch(`/api/views/${postId}`, {
      method: "POST",
      signal: controller.signal,
    });

    clearTimeout(timeoutId);

    if (response.ok) {
      const data = await response.json();
      markViewIncremented(postId);
      return { success: true, views: data.views };
    }

    throw new Error(`HTTP ${response.status}`);
  } catch (err) {
    console.error(`Failed to increment view for post ${postId}:`, err);

    // Fallback: try to fetch current views
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 5000);

      const response = await fetch(`/api/views/${postId}`, {
        signal: controller.signal,
      });

      clearTimeout(timeoutId);

      if (response.ok) {
        const data = await response.json();
        markViewIncremented(postId);
        return { success: true, views: data.views };
      }
    } catch (fetchErr) {
      console.warn(`Failed to fetch views for post ${postId}:`, fetchErr);
    }

    return { success: false, views: 0 };
  }
};

/**
 * Fetch view count for multiple posts in parallel
 * Optimized for mobile and desktop
 */
export const fetchPostsViews = async (
  postIds: string[]
): Promise<Map<string, number>> => {
  const viewsMap = new Map<string, number>();

  // Use Promise.allSettled to prevent one failure from blocking others
  const promises = postIds.map(async (postId) => {
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 5000);

      const response = await fetch(`/api/views/${postId}`, {
        signal: controller.signal,
      });

      clearTimeout(timeoutId);

      if (response.ok) {
        const data = await response.json();
        viewsMap.set(postId, data.views || 0);
      } else {
        viewsMap.set(postId, 0);
      }
    } catch (err) {
      console.warn(`Failed to fetch views for post ${postId}:`, err);
      viewsMap.set(postId, 0);
    }
  });

  await Promise.allSettled(promises);
  return viewsMap;
};
