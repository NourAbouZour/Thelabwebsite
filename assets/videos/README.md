# Video Setup Instructions

## 📹 Where to Place Your Hero Video

Place your high-quality video files in this folder:

### Required:
- **`hero.mp4`** - Main video file (H.264 codec recommended for best compatibility)

### Optional but Recommended:
- **`hero.webm`** - WebM format for better compression (VP9 codec)

---

## 🖼️ Poster Image (Optional)

Create a poster frame (thumbnail shown before video loads):
- **File:** `assets/images/video-poster.jpg`
- **Recommended size:** 1920x1080 or 1280x720
- **Format:** JPG or PNG

---

## 🎬 Video Specifications

### Recommended Settings:
- **Resolution:** 1920x1080 (Full HD) or 1280x720 (HD)
- **Aspect Ratio:** 16:9
- **Duration:** 10-30 seconds (loops automatically)
- **File Size:** Keep under 5MB for fast loading
- **Frame Rate:** 30fps or 24fps
- **Codec (MP4):** H.264
- **Codec (WebM):** VP9 or VP8

### Export Settings for Common Tools:

#### **Adobe Premiere / After Effects:**
- Format: H.264 (MP4)
- Bitrate: 8-10 Mbps for HD, 5-8 Mbps for 720p
- Audio: None (or very low quality since video is muted)

#### **DaVinci Resolve:**
- Format: MP4
- Codec: H.264
- Quality: Medium-High
- Bitrate: 8-10 Mbps

#### **HandBrake (Free):**
- Preset: "Web" > "Discord Medium 5-10 Minutes"
- Adjust resolution to 1920x1080 or 1280x720

---

## 🔧 Current Implementation

The video is configured in `index.html` with these attributes:
- `playsinline` - Plays inline on mobile (not fullscreen)
- `muted` - Required for autoplay to work
- `autoplay` - Starts playing automatically
- `loop` - Repeats continuously
- `preload="metadata"` - Loads video metadata quickly

---

## ⚠️ Important Notes

1. **Video must be muted** for autoplay to work on most browsers
2. **Keep file size small** (< 5MB) for fast page load
3. **Test on mobile** - Some browsers may not autoplay despite settings
4. **Provide MP4** at minimum - WebM is optional but recommended
5. **Aspect ratio 16:9** ensures proper display across devices

---

## 🧪 Testing

After adding your video:
1. Clear browser cache (Ctrl+Shift+R or Cmd+Shift+R)
2. Open http://localhost:8000
3. Video should autoplay and loop
4. Check console (F12) for any errors

If video doesn't autoplay:
- Verify file path is correct
- Ensure video is properly encoded
- Check browser console for errors
- Try opening in different browsers

---

## 📝 Example File Structure

```
assets/
  ├── videos/
  │   ├── hero.mp4      ← Place your main video here
  │   └── hero.webm     ← Optional: WebM version
  └── images/
      └── video-poster.jpg  ← Optional: Poster frame
```

---

Once you place your video files, the hero section will automatically display them! 🎥

