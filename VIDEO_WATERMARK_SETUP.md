# Video Watermarking Setup Guide

## Overview

The video watermarking feature has been completely rewritten to properly download full videos with watermarks instead of just capturing a screenshot.

## How It Works

### Previous Implementation (Fixed)
- ❌ **Problem**: Was only extracting a single frame and saving it as PNG
- ❌ **Result**: Users got a static image instead of the full video

### New Implementation (Current)
- ✅ **Solution**: Server-side video processing using FFmpeg
- ✅ **Result**: Full video is downloaded with watermark overlays applied
- ✅ **Works on**: Both mobile and desktop browsers

## Technical Details

### Architecture
1. **Client Side** (`client/lib/watermark.ts`):
   - When user clicks download, sends video URL to server
   - Receives watermarked video from server
   - Automatically downloads the processed video file

2. **Server Side** (`server/routes/watermark-video.ts`):
   - Accepts video URL from client
   - Uses FFmpeg to apply watermarks to the entire video
   - Streams the processed video back to client
   - Handles errors gracefully with helpful messages

### Watermark Application
- **Text**: "www.doxing.life"
- **Style**: Diagonal white text (60% opacity) with shadow
- **Position**: Center of video, rotated diagonally across the entire frame
- **Output**: MP4 video format

## Installation & Setup

### Step 1: Dependencies
FFmpeg has been added to `package.json`. The npm/pnpm packages are installed.

```bash
pnpm install  # Already done
```

### Step 2: Install FFmpeg on Server

FFmpeg must be installed on the server/system where the app is running.

#### Ubuntu/Debian
```bash
sudo apt-get update
sudo apt-get install -y ffmpeg
```

#### macOS
```bash
brew install ffmpeg
```

#### Windows
Download from: https://ffmpeg.org/download.html

#### Docker
Add to your Dockerfile:
```dockerfile
RUN apt-get update && apt-get install -y ffmpeg
```

#### Verify Installation
```bash
ffmpeg -version
```

### Step 3: Environment Variables (Optional)

If FFmpeg is in a non-standard location, set:
```bash
FFMPEG_PATH=/path/to/ffmpeg
FFPROBE_PATH=/path/to/ffprobe
```

## Deployment

### Netlify
If deploying to Netlify, add to your `netlify.toml` or Netlify UI environment variables:
```toml
[env.production]
  command = "apt-get update && apt-get install -y ffmpeg && npm run build"
```

### Vercel
Add to `vercel.json`:
```json
{
  "buildCommand": "apt-get update && apt-get install -y ffmpeg && npm run build"
}
```

### Docker
Include in your Dockerfile:
```dockerfile
RUN apt-get update && apt-get install -y ffmpeg && rm -rf /var/lib/apt/lists/*
```

### Self-Hosted/VPS
SSH into your server and run:
```bash
sudo apt-get update
sudo apt-get install -y ffmpeg
# Restart your application
```

## API Endpoint

### POST /api/watermark-video

**Request**:
```json
{
  "videoUrl": "https://example.com/video.mp4"
}
```

**Response**:
- Success (200): Binary MP4 file stream
- Client Error (400): Invalid URL
- Service Error (503): FFmpeg not installed
- Server Error (500): Processing failed

## Error Handling

### FFmpeg Not Installed
Users will see: "Video watermarking service is unavailable. FFmpeg needs to be installed on the server."

The server logs will show:
```
⚠ FFmpeg is not installed. Video watermarking will not work.
To enable video watermarking, install FFmpeg:
  - Ubuntu/Debian: sudo apt-get install ffmpeg
  - macOS: brew install ffmpeg
  - Windows: https://ffmpeg.org/download.html
  - Docker: Add 'RUN apt-get install -y ffmpeg' to your Dockerfile
```

### Network/Timeout Issues
Large videos may take time to process. The server will:
- Stream the video as it's being processed
- Handle client disconnections gracefully
- Return meaningful error messages

## Performance Considerations

### Processing Time
- Depends on video length and resolution
- Server preset: "medium" (good balance of speed and quality)
- Can adjust preset in `server/routes/watermark-video.ts` if needed
- Available presets: ultrafast, superfast, veryfast, faster, fast, medium, slow, slower, veryslow

### Server Resources
- Video processing is CPU-intensive
- Consider limiting concurrent processing in production
- Monitor server CPU and memory usage

### Bandwidth
- Output video size depends on input quality
- FFmpeg uses H.264 codec with AAC audio
- Typical compression results in 50-70% of original size

## Troubleshooting

### Issue: "FFmpeg is not installed"
**Solution**: Install FFmpeg using the platform-specific instructions above

### Issue: Video processing hangs
**Solution**:
1. Check server CPU usage
2. Reduce video preset from "medium" to "fast"
3. Check network connectivity to video URL

### Issue: Output video quality is poor
**Solution**: Adjust encoder settings in `server/routes/watermark-video.ts`:
```typescript
.preset("slow")  // slower = better quality but longer processing
.videoBitrate("5000k')  // adjust bitrate for desired quality
```

### Issue: Audio not working in output
**Solution**: Verify source video has audio. FFmpeg will use AAC codec.

## Testing

### Local Testing
```bash
# Start dev server
pnpm dev

# Test with a sample video URL
curl -X POST http://localhost:8080/api/watermark-video \
  -H "Content-Type: application/json" \
  -d '{"videoUrl": "https://example.com/sample.mp4"}' \
  -o watermarked.mp4
```

### Browser Testing
1. Visit the application
2. Find a post with a video
3. Click "Download"
4. The watermarked video should download
5. Verify watermark is visible on the video

## File Changes

### New Files
- `server/routes/watermark-video.ts` - Video watermarking endpoint
- `server/utils/ffmpeg-check.ts` - FFmpeg availability checker
- `VIDEO_WATERMARK_SETUP.md` - This file

### Modified Files
- `client/lib/watermark.ts` - Updated video download function
- `server/index.ts` - Added watermark-video route
- `package.json` - Added fluent-ffmpeg dependency

## Migration Notes

If you had previously downloaded videos and got images instead:
- This is now fixed
- Videos will download as proper MP4 files with watermarks
- Old downloaded "videos" (which were PNG images) can be safely ignored

## Support

If you encounter issues:
1. Check that FFmpeg is installed: `ffmpeg -version`
2. Check server logs for error messages
3. Verify video URL is accessible from server
4. Try with a different video source
5. Check server CPU and memory availability
