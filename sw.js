// sw.js
const CACHE_NAME = 'mom-app-v1.4'; // <--- 下次改版手動改這裡

self.addEventListener('install', (e) => {
  // 強制讓新的 Service Worker 安裝完後立即進入 active 狀態
  self.skipWaiting(); 
  
  e.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll([
      './',
      './index.html'
    ]))
  );
});

// 當新的 Service Worker 啟用時，清理舊快取並立刻接管頁面
self.addEventListener('activate', (e) => {
  e.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(
        keys.filter(key => key !== CACHE_NAME).map(key => caches.delete(key))
      );
    }).then(() => self.clients.claim())
  );
});

// 攔截請求，優先從快取讀取，確保離線可用
self.addEventListener('fetch', (e) => {
  e.respondWith(
    caches.match(e.request).then((response) => response || fetch(e.request))
  );
});