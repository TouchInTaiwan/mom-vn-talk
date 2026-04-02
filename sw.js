self.addEventListener('install', (e) => {
  // 強制讓新的 Service Worker 安裝完後立即進入 active 狀態
  self.skipWaiting(); 
  
  e.waitUntil(
    caches.open('mom-app-v1.3').then((cache) => cache.addAll([
      './',
      './index.html'
    ]))
  );
});

// 當新的 Service Worker 啟用時，立刻接管所有頁面
self.addEventListener('activate', (e) => {
  e.waitUntil(clients.claim()); 
});

self.addEventListener('fetch', (e) => {
  e.respondWith(
    caches.match(e.request).then((response) => response || fetch(e.request))
  );
});