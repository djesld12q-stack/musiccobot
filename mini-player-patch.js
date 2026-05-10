/* ============================================================
   MINI PLAYER PATCH — додати в index.html
   
   Вставте цей код ПЕРЕД закриваючим тегом </script> 
   в основному блоці скриптів (там де є togglePlay, skipSong тощо)
   ============================================================ */

// ── Mini Player command listener ──────────────────────────────────────────
// Reads commands written to localStorage by mini-player.html
(function() {
    let lastMiniCmdTs = 0;
    
    setInterval(function() {
        try {
            const raw = localStorage.getItem('ytm_mini_cmd');
            if (!raw) return;
            const cmd = JSON.parse(raw);
            
            // Ignore stale or already-processed commands (>2 seconds old)
            if (!cmd.ts || cmd.ts === lastMiniCmdTs) return;
            if (Date.now() - cmd.ts > 2000) return;
            
            lastMiniCmdTs = cmd.ts;
            // Clear so we don't re-process
            localStorage.removeItem('ytm_mini_cmd');
            
            console.log('[MiniPlayer] Command received:', cmd.type);
            
            if      (cmd.type === 'CMD_PREV')   prevSong();
            else if (cmd.type === 'CMD_TOGGLE') togglePlay();
            else if (cmd.type === 'CMD_NEXT')   skipSong();
            
        } catch(e) {
            console.error('[MiniPlayer] Command error:', e);
        }
    }, 200);
    
    console.log('[MiniPlayer] Command listener started');
})();
