/* eslint-disable no-restricted-globals */

/* global self, caches, fetch */

const CACHE = 'cache-e2b3df1';

self.addEventListener('install', e => {
  e.waitUntil(precache()).then(() => self.skipWaiting());
});

self.addEventListener('activate', event => {
  self.clients
    .matchAll({
      includeUncontrolled: true,
    })
    .then(clientList => {
      const urls = clientList.map(client => client.url);
      console.log('[ServiceWorker] Matching clients:', urls.join(', '));
    });

  event.waitUntil(
    caches
      .keys()
      .then(cacheNames =>
        Promise.all(
          cacheNames.map(cacheName => {
            if (cacheName !== CACHE) {
              console.log('[ServiceWorker] Deleting old cache:', cacheName);
              return caches.delete(cacheName);
            }
            return null;
          })
        )
      )
      .then(() => {
        console.log('[ServiceWorker] Claiming clients for version', CACHE);
        return self.clients.claim();
      })
  );
});

function precache() {
  return caches.open(CACHE).then(cache => cache.addAll(["./","./ch02.html","./ch03.html","./ch04.html","./ch05.html","./ch06.html","./ch07.html","./ch08.html","./ch09.html","./ch10.html","./ch11.html","./ch12.html","./ch13.html","./ch14.html","./ch15.html","./ch16.html","./ch17.html","./ch18.html","./ch19.html","./ch20.html","./ch21.html","./ch22.html","./ch23.html","./ch24.html","./ch25.html","./ch26.html","./ch27.html","./ch28.html","./ch29.html","./ch30.html","./ch31.html","./ch32.html","./ch33.html","./ch34.html","./ch35.html","./ch36.html","./ch37.html","./ch38.html","./ch39.html","./ch40.html","./colophon.html","./favicon.png","./index.html","./manifest.json","./fonts/Literata-Italic-var.woff2","./fonts/Literata-var.woff2","./fonts/LiterataTT-TextItalic.woff2","./fonts/LiterataTT-TextRegular.woff2","./fonts/LiterataTT-TextSemibold.woff2","./fonts/LiterataTT_LICENSE.txt","./fonts/SpaceGroteskVF.woff2","./fonts/SpaceGroteskVF_LICENSE.txt","./resources/cover.jpg","./resources/p107s.jpg","./resources/p140s.jpg","./resources/p184s.jpg","./resources/p190s.jpg","./resources/p272s.jpg","./resources/p30s.jpg","./resources/p311s.jpg","./resources/p316s.jpg","./resources/p323s.jpg","./resources/p369s.jpg","./resources/p389s.jpg","./resources/p413s.jpg","./resources/p422s.jpg","./resources/p435s.jpg","./scripts/bundle.js","./style/style.min.css","./template-images/circles.png"]));
}

self.addEventListener('fetch', e => {
  e.respondWith(
    caches.open(CACHE).then(cache => {
      return cache.match(e.request).then(matching => {
        if (matching) {
          console.log('[ServiceWorker] Serving file from cache.');
          console.log(e.request);
          return matching;
        }

        return fetch(e.request);
      });
    })
  );
});
