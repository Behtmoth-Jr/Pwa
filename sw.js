const staticCacheName = 's-app-v3'
const dynamicCacheName = 'd-app-v3'

const assetUrls = [
  'index.html',
]

const CACHE_NAME = "Chelpanov"; // Увеличиваем версию кэша

const urlsToCache = [
  "/index.html",
  '/js/app.js',
  '/css/styles.css',
];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(urlsToCache);
    })
  );
});

self.addEventListener("activate", (event) => {
  // Удаляем устаревшие кэши
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== CACHE_NAME) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});


self.addEventListener('install', async event => {
  self.clients.matchAll().then(clients => {
    clients.forEach(client => {
      client.postMessage('Сервис-воркер установлен');
    });
  });

  const cache = await caches.open(staticCacheName)
  await cache.addAll(assetUrls)

})

self.addEventListener('activate', async event => {
  self.clients.matchAll().then(clients => {
    clients.forEach(client => {
      client.postMessage('Сервис-воркер активирован');
    });
  });

  const cacheNames = await caches.keys()
  await Promise.all(
    cacheNames
      .filter(name => name !== staticCacheName)
      .filter(name => name !== dynamicCacheName)
      .map(name => caches.delete(name))
  )
})

self.addEventListener('fetch', event => {
  self.clients.matchAll().then(clients => {
    clients.forEach(client => {
      client.postMessage('Происходит запрос на сервер: ' + event.request.url);
    });
  });

  const {request} = event

  const url = new URL(request.url)
  if (url.origin === location.origin) {
    event.respondWith(cacheFirst(request))
  } else {
    event.respondWith(networkFirst(request))
  }
})


async function cacheFirst(request) {
  const cached = await caches.match(request)
  return cached ?? await fetch(request)
}

async function networkFirst(request) {
  const cache = await caches.open(dynamicCacheName)
  try {
    const response = await fetch(request)
    await cache.put(request, response.clone())
    return response
  } catch (e) {
    const cached = await cache.match(request)
    return cached ?? await caches.match('/offline.html')
  }
}