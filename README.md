# Cropify - Professional Batch Image Cropping Tool

<div align="center">

![Cropify Logo](https://img.shields.io/badge/Cropify-v1.0.0-brightgreen)
![License](https://img.shields.io/badge/license-MIT-blue)
![Next.js](https://img.shields.io/badge/Next.js-15.4.2-black)
![React](https://img.shields.io/badge/React-19.1.0-blue)
![TypeScript](https://img.shields.io/badge/TypeScript-5.x-blue)

**A modern, powerful, and user-friendly batch image cropping tool built with Next.js 15 and React 19.**

[中文文档](./README.zh.md) | [Demo](#) | [Report Bug](#) | [Request Feature](#)

</div>

## ✨ Features

### 🖼️ Image Management
- **Multiple Import Methods**: Drag & drop, click to select, clipboard paste
- **Format Support**: JPEG, PNG, WebP, BMP, TIFF, GIF
- **Batch Processing**: Handle up to 100 images simultaneously
- **Smart Validation**: File format and size validation with detailed error messages

### ✂️ Advanced Cropping
- **Intelligent Cropping System**: Manual adjustment with real-time preview
- **Preset Sizes**: Photo ID, social media, wallpaper, and custom dimensions
- **Aspect Ratio Control**: Maintain proportions or set custom ratios
- **Anchor Points**: 9-point positioning system for precise cropping
- **Advanced Options**: Rotation (90°, 180°, 270°), horizontal/vertical flip, rounded corners

### 🎨 User Experience
- **Real-time Preview**: Instant before/after comparison
- **Zoom Controls**: 25% to 400% zoom with smooth scaling
- **Grid Guidelines**: Rule of thirds and custom grid overlays
- **Responsive Design**: Works seamlessly on desktop and mobile devices
- **Light Theme**: Clean, modern interface optimized for productivity

### ⚙️ Quality Control
- **Output Formats**: JPG, PNG, WebP
- **Compression Settings**: Adjustable quality levels (1-100%)
- **Size Information**: Real-time file size estimation
- **Metadata Preservation**: Optional EXIF data handling

### 📦 Export Options
- **Single Download**: Individual image download
- **Batch Export**: Sequential download of all processed images
- **ZIP Archive**: Compressed bundle for easy sharing
- **Custom Naming**: Automatic filename generation with customizable patterns

### 🚀 Performance
- **Client-side Processing**: All operations performed locally for privacy
- **Memory Management**: Efficient handling of large image batches
- **Background Processing**: Non-blocking UI during batch operations
- **Progress Tracking**: Real-time progress indicators and error handling

## 🛠️ Technology Stack

- **Frontend**: Next.js 15.4.2, React 19.1.0
- **Language**: TypeScript 5.x
- **Styling**: Tailwind CSS 4
- **Image Processing**: HTML5 Canvas API
- **File Handling**: HTML5 File API, Blob API
- **Compression**: JSZip for archive creation
- **Build Tool**: Turbopack (Next.js)

## 🚀 Quick Start

### Prerequisites

- Node.js 18.x or higher
- npm, yarn, or pnpm

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/cropify.git
   cd cropify
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   # or
   pnpm install
   ```

3. **Start development server**
   ```bash
   npm run dev
   # or
   yarn dev
   # or
   pnpm dev
   ```

4. **Open your browser**
   
   Navigate to [http://localhost:3000](http://localhost:3000)

### Production Build

```bash
# Build for production
npm run build

# Start production server
npm start
```

## 📖 Usage Guide

### Basic Workflow

1. **Import Images**
   - Drag and drop image files onto the upload area
   - Click "Select Files" to browse your computer
   - Paste images from clipboard (Ctrl+V / Cmd+V)

2. **Configure Cropping**
   - Select an image from the list to start editing
   - Choose from preset sizes or set custom dimensions
   - Adjust crop area by dragging corners or using position controls
   - Apply transformations (rotate, flip) as needed

3. **Quality Settings**
   - Select output format (JPG, PNG, WebP)
   - Adjust compression quality for optimal file size
   - Preview estimated output size

4. **Batch Processing**
   - Click "Start Batch" to process all images with current settings
   - Monitor progress in real-time
   - Pause or cancel processing at any time

5. **Export Results**
   - Download individual images as they're processed
   - Export all images at once
   - Create ZIP archive for batch download

### Advanced Features

#### Custom Preset Sizes
Create your own preset sizes by modifying the configuration in `src/constants/index.ts`:

```typescript
export const PRESET_SIZES: PresetSize[] = [
  { name: 'Custom Size', width: 800, height: 600, unit: 'px', category: 'Custom' },
  // Add more presets...
];
```

#### Keyboard Shortcuts
- `Ctrl+V` / `Cmd+V`: Paste image from clipboard
- `Delete`: Remove selected image
- `Escape`: Cancel current operation

## 🏗️ Project Structure

```
cropify/
├── src/
│   ├── app/                 # Next.js App Router
│   ├── components/          # React components
│   │   ├── ui/             # Reusable UI components
│   │   └── modules/        # Feature-specific components
│   ├── hooks/              # Custom React hooks
│   ├── types/              # TypeScript type definitions
│   ├── utils/              # Utility functions
│   └── constants/          # Application constants
├── public/                 # Static assets
├── docs/                   # Documentation
└── package.json
```

## 🔧 Configuration

### Environment Variables

Create a `.env.local` file in the root directory:

```env
# Optional: Add custom configuration
NEXT_PUBLIC_APP_NAME=Cropify
NEXT_PUBLIC_MAX_FILE_SIZE=10
```

### Customization

- **Supported Formats**: Modify `SUPPORTED_INPUT_FORMATS` in `src/constants/index.ts`
- **Max File Size**: Adjust `MAX_FILE_SIZE` limit
- **Preset Sizes**: Add or modify preset dimensions
- **UI Theme**: Customize Tailwind CSS configuration

## 🤝 Contributing

We welcome contributions! Please see our [Contributing Guide](CONTRIBUTING.md) for details.

### Development Setup

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Make your changes
4. Run tests: `npm test`
5. Commit changes: `git commit -m 'Add amazing feature'`
6. Push to branch: `git push origin feature/amazing-feature`
7. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [Next.js](https://nextjs.org/) - The React framework for production
- [Tailwind CSS](https://tailwindcss.com/) - Utility-first CSS framework
- [JSZip](https://stuk.github.io/jszip/) - JavaScript library for creating ZIP files
- [Canvas API](https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API) - For image processing

## 📞 Support

- 📧 Email: support@cropify.com
- 🐛 [Report Issues](https://github.com/yourusername/cropify/issues)
- 💡 [Feature Requests](https://github.com/yourusername/cropify/discussions)
- 📖 [Documentation](https://cropify.github.io/docs)

## 🔮 Roadmap

- [ ] WebAssembly integration for faster processing
- [ ] Advanced filters and effects
- [ ] Cloud storage integration
- [ ] Team collaboration features
- [ ] API for developers
- [ ] Mobile app version

---

<div align="center">
  <strong>Made with ❤️ by the Cropify Team</strong>
</div>