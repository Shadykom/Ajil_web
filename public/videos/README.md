# Hero Video Background

To use the video background on the hero slider, add your video files here:

## Required Files

1. **hero-video.mp4** - Main video file (MP4 format for best browser support)
2. **hero-video.webm** - WebM format for better compression (optional but recommended)
3. **hero-poster.jpg** - A static image that shows while the video loads

## Recommended Video Specifications

- **Resolution**: 1920x1080 (Full HD) or higher
- **Duration**: 10-30 seconds (will loop)
- **File Size**: Keep under 10MB for fast loading
- **Frame Rate**: 24-30 fps
- **Audio**: None (videos are muted on hero sections)

## Tips for Best Results

1. Use a video that matches the brand aesthetic (cars, financing theme)
2. Keep the video subtle - it should enhance, not distract from content
3. Compress the video for web using tools like:
   - [HandBrake](https://handbrake.fr/)
   - [FFmpeg](https://ffmpeg.org/)
   - Online tools like Cloudinary

## FFmpeg Compression Example

```bash
# Convert to MP4 with web optimization
ffmpeg -i input.mp4 -vcodec libx264 -crf 28 -preset slow -movflags +faststart -an hero-video.mp4

# Convert to WebM
ffmpeg -i input.mp4 -c:v libvpx-vp9 -crf 30 -b:v 0 -an hero-video.webm

# Create poster image from first frame
ffmpeg -i input.mp4 -vframes 1 -q:v 2 hero-poster.jpg
```
