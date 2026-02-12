# Mobile Build Guide (Capacitor)

This guide explains how to build the **SimpleMemo** application for Android and iOS using Capacitor.

## Prerequisites

1.  **Node.js** & **npm** installed.
2.  **Android Studio** (for Android builds).
3.  **Xcode** (for iOS builds, macOS only).
4.  **CocoaPods** (for iOS dependencies): `sudo gem install cocoapods`.

---

## 1. Prepare Web Assets

Before building for mobile, always ensure the web assets are up-to-date.

```bash
# Build the React/Vite project
npm run build

# Sync web assets to native platforms
npx cap sync
```

---

## 2. Android Build

1.  **Open Android Studio**:
    ```bash
    npx cap open android
    ```

2.  **Wait for Gradle Sync**: Android Studio will automatically sync the project. Wait until the bottom status bar finishes.

3.  **Run on Emulator/Device**:
    - Select a device from the top toolbar.
    - Click the **Run (Green Play)** button.

4.  **Build APK for Release**:
    - Go to **Build > Build Bundle(s) / APK(s) > Build APK(s)** in the menu.
    - The APK will be generated in `android/app/build/outputs/apk/debug/`.

---

## 3. iOS Build (macOS Only)

1.  **Open Xcode**:
    ```bash
    npx cap open ios
    ```

2.  **Select Team**:
    - Click on **App** in the left project navigator.
    - Go to **Signing & Capabilities**.
    - Select your **Team** (required for running on device).

3.  **Run on Simulator**:
    - Select a simulator (e.g., iPhone 15) from the top toolbar.
    - Click the **Run (Play)** button.

4.  **Archive for App Store**:
    - Select **Any iOS Device (arm64)** as the target.
    - Go to **Product > Archive**.
    - Follow the prompts to upload to TestFlight or App Store Connect.

---

## Troubleshooting

- **"Could not determine executable to run"**: Ensure you are running commands inside the project directory (`fast-memo`).
- **CocoaPods Errors**: Run `cd ios/App && pod install && cd ../..`.
- **Gradle Errors**: Try **File > Invalidate Caches / Restart** in Android Studio.
