import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.gart76.simplememo',
  appName: 'SimpleMemo',
  webDir: 'dist',
  server: {
    url: 'http://10.0.2.2:5173', // Android Emulator loopback to host
    cleartext: true
  },
  backgroundColor: '#13111C',
  plugins: {
    Keyboard: {
      resize: "body",
      style: "DARK",
      resizeOnFullScreen: true
    }
  }
};

export default config;
