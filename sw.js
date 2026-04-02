// sw.js
self.addEventListener('install', (e) => {
  // 強制讓新的 Service Worker 安裝完後立即進入 active 狀態
  self.skipWaiting(); 
  
  e.waitUntil(
    // 每次更新代碼，建議手動升級這個版本號 (例如 v1.4)
    caches.open('mom-app-v1.4').then((cache) => cache.addAll([
      './',
      './index.html'
    ]))
  );
});

// 當新的 Service Worker 啟用時，立刻接管所有頁面控制權
self.addEventListener('activate', (e) => {
  e.waitUntil(clients.claim()); 
});

self.addEventListener('fetch', (e) => {
  e.respondWith(
    caches.match(e.request).then((response) => response || fetch(e.request))
  );
});