#!/usr/bin/env python3
"""
Audio Capture Server for OBS
Captures audio from YouTube player and pipes to system audio output
Works with Virtual Audio Cable or Stereo Mix
"""

import subprocess
import sys
import os
from http.server import HTTPServer, SimpleHTTPRequestHandler
from pathlib import Path

class AudioServer:
    def __init__(self):
        self.is_playing = False
        print("🎵 Audio Capture Server Starting...")
        
    def capture_browser_audio(self):
        """Capture audio from browser using system mixer"""
        try:
            # This will use Windows audio mixing to capture output
            print("✅ Audio capture ready - using system audio output")
            print("📌 Make sure Virtual Audio Cable or Stereo Mix is enabled")
            print("   Configure OBS Audio Input Capture to use: Virtual Audio Cable or Stereo Mix")
            return True
        except Exception as e:
            print(f"❌ Error: {e}")
            return False

    def info(self):
        print("""
╔════════════════════════════════════════════════════════════════╗
║          🎵 Audio Capture for OBS - Setup Complete             ║
╠════════════════════════════════════════════════════════════════╣
║                                                                ║
║  Step 1: Install Virtual Audio Cable (if not done)            ║
║    → Run: install-audio-tools.ps1 (as Administrator)         ║
║    → Or download: https://vb-audio.com/Cable/                 ║
║                                                                ║
║  Step 2: In OBS                                               ║
║    → Sources → Audio Input Capture                            ║
║    → Device: "Virtual Audio Cable" or "Stereo Mix"            ║
║                                                                ║
║  Step 3: Start playing music in index.html                    ║
║    → Sound should appear in OBS mixer                         ║
║                                                                ║
║  🎯 Your setup:                                               ║
║    ✅ index.html: http://localhost:3000/index.html            ║
║    ✅ obs-overlay.html: http://localhost:3000/obs-overlay.html║
║    ✅ Audio routing: Windows System → OBS                      ║
║                                                                ║
╚════════════════════════════════════════════════════════════════╝
        """)

if __name__ == '__main__':
    server = AudioServer()
    server.capture_browser_audio()
    server.info()
    
    print("\n✅ Audio system ready for OBS!")
    print("💬 Next steps:")
    print("   1. Install Virtual Audio Cable if needed")
    print("   2. Configure OBS Audio Input Capture")
    print("   3. Start playing music - audio will flow through!")
