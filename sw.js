/* ============================================================
   sw.js — Service Worker (cache-first)
   ============================================================ */

const CACHE_NAME = 'ricks-driving-academy-v1';

const ASSETS = [
  '/',
  '/index.html',
  '/style.css',
  '/manifest.json',
  '/assets/icon-192.png',
  '/assets/icon-512.png',
  '/data/rick-dialogue.js',
  '/data/questions.js',
  '/js/storage.js',
  '/js/rick.js',
  '/js/engine.js',
  '/js/trophies.js',
  '/js/app.js',
  '/js/modes/lecture.js',
  '/js/modes/speed-blitz.js',
  '/js/modes/sign-recon.js',
  '/js/modes/daily-mission.js',
  '/js/modes/boss-battle.js'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(ASSETS))
  );
  self.skipWaiting();
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(
        keys.filter(k => k !== CACHE_NAME).map(k => caches.delete(k))
      )
    )
  );
  self.clients.claim();
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(cached => {
      return cached || fetch(event.request).catch(() => cached);
    })
  );
});
