const CACHE_NAME = 'logo-quiz-v2';
const ASSETS = [
  "./assets/icons/icon-192.png",
  "./assets/icons/icon-512.png",
  "./assets/logos/ASUS.png",
  "./assets/logos/Adidas.png",
  "./assets/logos/Almarai.png",
  "./assets/logos/Amazon.png",
  "./assets/logos/Apple.png",
  "./assets/logos/BMW.png",
  "./assets/logos/Burger King.png",
  "./assets/logos/Coca-Cola.png",
  "./assets/logos/Domino's.png",
  "./assets/logos/Ford.png",
  "./assets/logos/Google.png",
  "./assets/logos/HungerStation.png",
  "./assets/logos/Hyundai.png",
  "./assets/logos/Instagram.png",
  "./assets/logos/KFC.png",
  "./assets/logos/Kia.png",
  "./assets/logos/LEGO.png",
  "./assets/logos/LV.png",
  "./assets/logos/Mercedes-Benz.png",
  "./assets/logos/Microsoft.png",
  "./assets/logos/Mobily.png",
  "./assets/logos/NADEC.png",
  "./assets/logos/Nintendo.png",
  "./assets/logos/Pepsi.png",
  "./assets/logos/Pizza Hut.png",
  "./assets/logos/PlayStation.png",
  "./assets/logos/Puma.png",
  "./assets/logos/Red Bull.png",
  "./assets/logos/SACO.png",
  "./assets/logos/Samsung.png",
  "./assets/logos/Snapchat.png",
  "./assets/logos/Starbucks.png",
  "./assets/logos/Subway.png",
  "./assets/logos/Tesla.png",
  "./assets/logos/TikTok.png",
  "./assets/logos/WhatsApp.png",
  "./assets/logos/X.png",
  "./assets/logos/Xbox.png",
  "./assets/logos/YouTube.png",
  "./assets/logos/smsa.png",
  "./index.html",
  "./manifest.webmanifest"
];

self.addEventListener('install', event => {
  event.waitUntil(caches.open(CACHE_NAME).then(cache => cache.addAll(ASSETS)).then(() => self.skipWaiting()));
});
self.addEventListener('activate', event => {
  event.waitUntil(caches.keys().then(keys => Promise.all(keys.filter(k => k !== CACHE_NAME).map(k => caches.delete(k)))).then(() => self.clients.claim()));
});
self.addEventListener('fetch', event => {
  if (event.request.method !== 'GET') return;
  event.respondWith(caches.match(event.request).then(cached => cached || fetch(event.request).then(response => {
    const copy = response.clone(); caches.open(CACHE_NAME).then(cache => cache.put(event.request, copy)); return response;
  }).catch(() => caches.match('./index.html'))));
});
