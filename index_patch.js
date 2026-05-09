
        function updateNowPlayingOverlay(songInfo) {
            if (songInfo) {
                const payload = { id: songInfo.id, title: songInfo.title, author: songInfo.author, user: songInfo.user, duration: songInfo.duration || 0, stopped: false, ts: Date.now() };
                localStorage.setItem('ytm_now_playing', JSON.stringify(payload));
                if (ws && ws.readyState === WebSocket.OPEN) {
                    ws.send(JSON.stringify({ request: "BroadcastEvent", name: "NOW_PLAYING", data: payload, id: "NowPlaying" }));
                }
            } else {
                const payload = { id: null, stopped: true, ts: Date.now() };
                localStorage.setItem('ytm_now_playing', JSON.stringify(payload));
                if (ws && ws.readyState === WebSocket.OPEN) {
                    ws.send(JSON.stringify({ request: "BroadcastEvent", name: "NOW_PLAYING", data: payload, id: "NowPlaying" }));
                }
            }
        }
*/

        let syncInterval = null;

        function broadcastWS(name, payload) {
            localStorage.setItem('ytm_now_playing', JSON.stringify(payload));
            if (ws && ws.readyState === WebSocket.OPEN) {
                ws.send(JSON.stringify({ request: "BroadcastEvent", name: name, data: payload, id: "NowPlaying" }));
            }
        }

        function getElapsed() {
            if (!player || typeof player.getCurrentTime !== 'function') return 0;
            try { return Math.floor(player.getCurrentTime()); } catch(e) { return 0; }
        }

        function updateNowPlayingOverlay(songInfo) {
            clearInterval(syncInterval);
            if (songInfo) {
                const payload = { type: 'NOW_PLAYING', id: songInfo.id, title: songInfo.title, author: songInfo.author, user: songInfo.user, duration: songInfo.duration || 0, elapsed: 0, paused: false, stopped: false, ts: Date.now() };
                broadcastWS('NOW_PLAYING', payload);
                // Sync time to overlay every 5 seconds while playing
                syncInterval = setInterval(() => {
                    if (!currentSongInfo) return;
                    try {
                        const state = player.getPlayerState();
                        if (state === 1) {
                            const syncPayload = { type: 'NOW_SYNC', elapsed: getElapsed(), duration: currentSongInfo.duration || 0 };
                            if (ws && ws.readyState === WebSocket.OPEN)
                                ws.send(JSON.stringify({ request: "BroadcastEvent", name: "NOW_SYNC", data: syncPayload, id: "Sync" }));
                        }
                    } catch(e) {}
                }, 5000);
            } else {
                const payload = { type: 'NOW_STOPPED', id: null, stopped: true, ts: Date.now() };
                broadcastWS('NOW_STOPPED', payload);
            }
        }
*/



        function onPlayerStateChange(e) {
            if (e.data === 0) playNext(); 
            if (e.data === 1) {           
                document.getElementById('now-playing-title').innerText = currentSongInfo.title;
                document.getElementById('now-playing-meta').innerText = currentSongInfo.user === "Auto" ? `Auto` : `👤 ${currentSongInfo.user}`;
            }
        }
*/


        function onPlayerStateChange(e) {
            if (e.data === 0) {
                playNext();
            }
            if (e.data === 1) {
                document.getElementById('now-playing-title').innerText = currentSongInfo.title;
                document.getElementById('now-playing-meta').innerText = currentSongInfo.user === "Auto" ? `Auto` : `👤 ${currentSongInfo.user}`;
                // Tell overlay: resumed (with current time for sync)
                if (ws && ws.readyState === WebSocket.OPEN) {
                    const payload = { type: 'NOW_RESUMED', elapsed: getElapsed(), duration: currentSongInfo ? currentSongInfo.duration || 0 : 0 };
                    ws.send(JSON.stringify({ request: "BroadcastEvent", name: "NOW_RESUMED", data: payload, id: "Resumed" }));
                }
            }
            if (e.data === 2) {
                // Tell overlay: paused (snapshot current time)
                if (ws && ws.readyState === WebSocket.OPEN) {
                    const payload = { type: 'NOW_PAUSED', elapsed: getElapsed() };
                    ws.send(JSON.stringify({ request: "BroadcastEvent", name: "NOW_PAUSED", data: payload, id: "Paused" }));
                }
            }
        }
*/



        function stopSongUI() { 
            player.stopVideo(); 
            document.getElementById('now-playing-title').innerText = "STOP"; 
        }
*/


        function stopSongUI() {
            player.stopVideo();
            document.getElementById('now-playing-title').innerText = "STOP";
            currentSongInfo = null;
            clearInterval(syncInterval);
            const payload = { type: 'NOW_STOPPED', id: null, stopped: true, ts: Date.now() };
            broadcastWS('NOW_STOPPED', payload);
        }
*/

/* ============================================================
   DONE! Save index.html and refresh both pages.
   ============================================================ */
