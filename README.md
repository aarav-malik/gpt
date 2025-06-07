# Shared Cam App

This repository contains a minimal peer‑to‑peer photo album built with Expo React Native. The project runs entirely on device without any cloud services.

## Zero Setup

1. Install [Node.js](https://nodejs.org/) and [Expo CLI](https://docs.expo.dev/get-started/installation/):
   ```bash
   npm install -g expo-cli
   ```
2. From the `shared-cam-app` directory install dependencies:
   ```bash
   npm install
   ```
3. Start the project for iOS, Android or Web:
   ```bash
   npm run ios
   npm run android
   npm run web
   ```

## Features

- Create or join a trip using a short code or QR scan.
- Capture images with the device camera. Images are compressed and stored locally in SQLite and the filesystem.
- Discover peers on the local network and sync photos over WebRTC data channels *(placeholder implementation)*.
- Request and receive high‑resolution versions of photos from peers.
- Works offline and resynchronizes when peers reconnect.

See the source inside `shared-cam-app` for implementation details.
