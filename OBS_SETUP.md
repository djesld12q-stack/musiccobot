# 🎵 YTM Song Request - OBS Setup Guide

## ✅ Що вже готово:

- ✅ **index.html** - YouTube Music Player з WebSocket передачею даних
- ✅ **obs-overlay.html** - Красивий оверлей для OBS з Live Info
- ✅ **WebSocket синхронізація** - Реал-тайм оновлення пісні
- ✅ **Автоматичне оновлення** - При переміщенні пісні показує нову

## 🎯 Як налаштувати звук в OBS:

### Варіант 1: Virtual Audio Cable (Рекомендується)

1. **Встанови Virtual Audio Cable:**
   ```powershell
   # Запусти як Адміністратор:
   .\install-audio-tools.ps1
   ```
   Або вручну: https://vb-audio.com/Cable/

2. **В OBS:**
   - Sources → `+` → **Audio Input Capture**
   - Device: **Cable Output** або **Virtual Audio Cable**
   - Готово! 🎵

### Варіант 2: Stereo Mix (якщо є в системі)

1. **Включи в Windows:**
   - Правий клік на звук → Звукові налаштування
   - Tab "Запис" → Stereo Mix → Enable (якщо серий)

2. **В OBS:**
   - Sources → `+` → **Audio Input Capture**
   - Device: **Stereo Mix**
   - Готово! 🎵

### Варіант 3: WASAPI (для Windows)

1. **В OBS:**
   - Sources → `+` → **Audio Output Capture**
   - Виберіть пристрій відтворення (Speakers)
   - Готово! 🎵

---

## 🖥️ Як запустити все разом:

1. **Запусти Python сервер** (папка з проектом):
   ```powershell
   python -m http.server 3000
   ```

2. **Запусти index.html** у браузері:
   ```
   http://localhost:3000/index.html
   ```

3. **Додай до OBS два Browser Sources:**

   **Source 1: Main Player**
   - URL: `http://localhost:3000/index.html`
   - Width: 1280, Height: 720
   - ✅ Контролювати звук через OBS (якщо є)

   **Source 2: Overlay**
   - URL: `http://localhost:3000/obs-overlay.html`
   - Width: 420, Height: 180
   - Розташуй на сцені

4. **Налаштуй звук:**
   - Audio Mixer → `+` → Audio Input Capture
   - Виберіть Virtual Audio Cable або Stereo Mix

---

## 🎵 Що буде:

✅ Музика грає в браузері  
✅ Звук передається в OBS  
✅ Оверлей показує "Now Playing" з обкладинкою  
✅ Все синхронізується в реальному часі  
✅ При зміні пісні - оверлей оновлюється автоматично  

---

## 🔧 Налаштування WebSocket (якщо потрібно):

Якщо OBS на іншій машині, додай параметри:
```
http://YOUR_PC_IP:3000/obs-overlay.html?ws_host=YOUR_PC_IP&ws_port=8080
```

Де:
- `YOUR_PC_IP` - IP адреса де запущено index.html
- `8080` - WebSocket порт (за замовчуванням)

---

## ❓ Проблеми:

**Q: Немає звука в OBS**
- A: Переконайся, що Stereo Mix або Virtual Audio Cable **увімкнені**
- A: В OBS Audio Input Capture вибери правильний пристрій

**Q: Оверлей не показує пісню**
- A: Відкрий F12 консоль в OBS Interact і поділися логами
- A: Перевір, що index.html грає музику

**Q: Звук затримується**
- A: Це нормально для системної маршрутизації звука
- A: Використовуй Stereo Mix для кращої синхронізації

---

**Готово! Твоя стрім-система повністю налаштована! 🚀**
