# 🍅 Pomodoro Timer - Desktop Application

> **Coded** with ❤️, ☕ and 🤖 

A beautiful, production-ready Pomodoro timer desktop application with a refined matcha green aesthetic. Built with Electron, React, TypeScript, and Vite for a modern, performant cross-platform experience.

![Pomodoro Timer](./public/icon.svg)

## ✨ Features

### Core Functionality
- **⏱️ Pomodoro Timer**: Customizable work sessions, short breaks, and long breaks
- **📋 Task Management**: Create, edit, and track tasks with Pomodoro estimates
- **📊 Statistics**: View daily and weekly productivity stats with visual charts
- **⚙️ Settings**: Fully customizable durations, auto-start, and notifications
- **🔔 Notifications**: Desktop notifications and sound alerts
- **💾 Data Persistence**: All data saved locally and persists across restarts
- **⌨️ Keyboard Shortcuts**: Space (start/pause), R (reset), N (skip)

### Design
- **🎨 Matcha Green Theme**: Elegant color palette with light and dark modes
- **✨ Premium UI**: Soft shadows, rounded corners, glassy panels, smooth animations
- **📱 Responsive**: Adapts beautifully to different window sizes
- **♿ Accessible**: Keyboard navigation and semantic HTML

## 🎯 Tech Stack

| Technology | Purpose | Justification |
|-----------|---------|--------------|
| **Electron** | Desktop framework | Cross-platform support, native OS integration, mature packaging ecosystem |
| **React** | UI library | Component-based architecture, excellent developer experience, rich ecosystem |
| **TypeScript** | Language | Type safety prevents runtime errors, better IDE support, self-documenting code |
| **Vite** | Build tool | Lightning-fast development server with HMR, optimized production builds |
| **Zustand** | State management | Lightweight, simple API, perfect for this app's complexity |
| **electron-builder** | Packaging | Industry-standard tool for creating Windows, macOS, and Linux executables |

## 📦 Installation & Setup

### Prerequisites
- **Node.js** 18+ and npm (or yarn/pnpm)
- **Git** (optional, for cloning)

### Quick Start

```bash
# Clone or download the project
cd pomodoro

# Install dependencies
npm install

# Run in development mode
npm run dev
```

The app will launch automatically in development mode with hot reload enabled.

## 🚀 Development

```bash
# Start development server
npm run dev

# Build for production (creates dist files)
npm run build

# Preview production build locally
npm run preview
```

### Development Mode
- Vite dev server runs on `http://localhost:5173`
- Electron window opens automatically
- Hot Module Replacement (HMR) for instant updates
- DevTools open by default

## 📦 Building Executables

### Windows (.exe)
```bash
npm run package:win
```
**Output**: `release/Pomodoro Timer Setup.exe`

**Installation**: Double-click the installer. It will install to `C:\Users\<YourName>\AppData\Local\Programs\pomodoro-timer\`.

### macOS (.app and .dmg)
```bash
npm run package:mac
```
**Output**: `release/Pomodoro Timer.dmg`

**Installation**: 
1. Open the DMG file
2. Drag "Pomodoro Timer.app" to Applications folder
3. On first launch, you may need to right-click → Open (macOS security)

### Linux (AppImage and .deb)
```bash
npm run package:linux
```
**Output**: 
- `release/Pomodoro Timer.AppImage`
- `release/pomodoro-timer_1.0.0_amd64.deb`

**Installation**:
- **AppImage**: `chmod +x Pomodoro\ Timer.AppImage && ./Pomodoro\ Timer.AppImage`
- **Debian/Ubuntu**: `sudo dpkg -i pomodoro-timer_1.0.0_amd64.deb`

### Build All Platforms
```bash
npm run package:all
```
*Note: Building macOS apps requires macOS. Building Windows apps works best on Windows but can work on macOS/Linux with wine.*

## 🎨 Color Palette

### Light Theme
- **Primary**: `#5db55d` (Matcha 500)
- **Hover**: `#4a9d4a` (Matcha 600)
- **Background**: `#f3f8f3` (Matcha 50)
- **Text**: `#171717` (Neutral 900)

### Dark Theme
- **Primary**: `#7ec47e` (Matcha 500)
- **Hover**: `#a8d5a8` (Matcha 600)
- **Background**: `#171717` (Neutral 50)
- **Text**: `#fafafa` (Neutral 900)

## ⌨️ Keyboard Shortcuts

| Key | Action |
|-----|--------|
| `Space` | Start / Pause timer |
| `R` | Reset current session |
| `N` | Skip to next session |

*Note: Shortcuts work globally within the app, except when typing in input fields.*

## 💾 Data Storage

User data is stored locally using `localStorage`:

- **Windows**: Stored in browser-like localStorage within Electron
- **macOS**: Same, accessible via Electron's renderer process
- **Linux**: Same, accessible via Electron's renderer process

Data persists across app restarts and updates. No cloud sync or external dependencies.

## 🐛 Troubleshooting

### Common Issues

#### App won't start in development
```bash
# Clear node_modules and reinstall
rm -rf node_modules
npm install
npm run dev
```

#### Build fails with "Cannot find module"
```bash
# Ensure all dependencies are installed
npm install
```

#### Windows build stuck or fails
- **Cause**: Antivirus blocking electron-builder
- **Solution**: Temporarily disable antivirus or add exception for `node_modules\.bin`

#### macOS app won't open (damaged/can't be verified)
- **Cause**: macOS Gatekeeper security
- **Solution**: Right-click app → Open → Open anyway
- *For distribution, apps need to be code-signed*

#### Linux AppImage won't execute
```bash
# Make it executable
chmod +x "Pomodoro Timer.AppImage"

# Run
./Pomodoro\ Timer.AppImage
```

#### Notifications not working
1. Check Settings → Notifications
2. Click "Test Notification"
3. Grant permission when prompted
4. Check OS notification settings if still not working

#### Sound not playing
1. Go to Settings → Notifications
2. Ensure "Sound notifications" toggle is ON
3. Adjust volume slider
4. Click "Test Sound"

### Building on Different Platforms

#### Building Windows .exe on macOS/Linux
Requires Wine:
```bash
# macOS
brew install wine-stable

# Ubuntu/Debian
sudo apt install wine64
```

#### Building macOS .app on Windows/Linux
**Not recommended**. macOS apps should be built on macOS for best results.

## 📁 Project Structure

```
pomodoro/
├── electron/               # Electron main process
│   ├── main.ts            # Window creation, IPC handlers
│   ├── preload.ts         # Secure API bridge
│   └── electron-env.d.ts  # Type definitions
├── src/
│   ├── components/        # React components
│   │   ├── common/        # Button, Card, Input, Toggle, Slider
│   │   ├── timer/         # CircularProgress, TimerDisplay, TimerControls
│   │   ├── tasks/         # TaskList, TaskItem, TaskForm
│   │   └── layout/        # Header, Navigation, Layout
│   ├── pages/             # Views/Routes
│   │   ├── TimerView.tsx
│   │   ├── TasksView.tsx
│   │   ├── StatsView.tsx
│   │   └── SettingsView.tsx
│   ├── store/             # Zustand state management
│   ├── services/          # Business logic (storage, notifications, audio)
│   ├── hooks/             # Custom React hooks
│   ├── types/             # TypeScript definitions
│   ├── utils/             # Utilities and constants
│   ├── styles/            # Global CSS and animations
│   ├── App.tsx            # Root component
│   └── main.tsx           # React entry point
├── build/                 # Build resources (icons)
├── public/                # Static assets
├── package.json           # Dependencies and scripts
├── vite.config.ts         # Vite configuration
├── tsconfig.json          # TypeScript configuration
└── README.md             # This file
```

## 🧪 Validation Checklist

| Test Case | Expected Result | Status |
|-----------|----------------|--------|
| Timer accuracy (1 min) | ±1 second | ✅ To verify |
| Data persistence | All data restored after restart | ✅ To verify |
| Desktop notification | Notification appears | ✅ To verify |
| Sound notification | Sound plays at volume | ✅ To verify |
| Keyboard: Space | Start/pause toggle | ✅ To verify |
| Keyboard: R | Reset timer | ✅ To verify |
| Keyboard: N | Skip session | ✅ To verify |
| Theme switching | Smooth transition | ✅ To verify |
| Task CRUD | All operations work | ✅ To verify |
| Statistics accuracy | Correct counts | ✅ To verify |
| Window resize | Responsive UI | ✅ To verify |
| Windows .exe build | Installer works | ✅ To verify |
| macOS .app build | App launches | ✅ To verify |
| Linux AppImage build | Executable runs | ✅ To verify |

## 🤝 Contributing

This is a standalone project. Feel free to fork and adapt for your needs!

## 📄 License

MIT License - feel free to use this project for any purpose.

## 🙏 Acknowledgments

- **Pomodoro Technique** by Francesco Cirillo
- **Matcha green** color inspiration from Japanese tea culture
- **Icons** from Unicode emoji set

---

**Made with ❤️ and ☕ using the Pomodoro Technique**


