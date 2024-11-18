self.addEventListener("push", function (event) {
  const { data } = event.data.json();

  // Get current badge count from IndexedDB or other storage
  const getBadgeCount = async () => {
    const reg = await self.registration;
    return reg
      .getNotifications()
      .then((notifications) => notifications.length + 1);
  };

  // Wrap the entire async operation in waitUntil
  event.waitUntil(
    (async () => {
      const count = await getBadgeCount();
      const options = {
        body: data.body,
        title: data.title + " 🎉",
        data: { url: data.url },
        icon: "/icon-192.png",
        badge: data.count,
      };

      // Set app badge
      if (navigator.setAppBadge) {
        navigator.setAppBadge(count);
      }

      console.log("options:5 ", options);
      return self.registration.showNotification(data.title, options);
    })()
  );
});

self.addEventListener("notificationclick", (event) => {
  console.log("notificationData.event: ", event);
  const notificationData = event.notification.data;
  if (notificationData.url) {
    clients.openWindow(notificationData.url);
  }

  event.notification.close();
});

//TODO cach images and assets
const cacheName = "my-pwa-shell-v1.5";
const filesToCache = [];

self.addEventListener("install", (e) => {
  console.log("[ServiceWorker] - Install");
  self.skipWaiting();
  e.waitUntil(
    (async () => {
      const cache = await caches.open(cacheName);
      console.log("[ServiceWorker] - Caching app shell");
      await cache.addAll(filesToCache);
    })()
  );
});

//clean up old caches by name
self.addEventListener("activate", (e) => {
  e.waitUntil(
    (async () => {
      // await self.registration.unregister();
      console.log("[ServiceWorker] - Unregistered old service worker");

      const keyList = await caches.keys();
      await Promise.all(
        keyList.map((key) => {
          console.log(key);

          if (key !== cacheName) {
            console.log("[ServiceWorker] - Removing old cache", key);
            return caches.delete(key);
          }
        })
      );
    })()
  );
  self.clients.claim();
});
