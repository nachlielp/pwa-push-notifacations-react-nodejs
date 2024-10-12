self.addEventListener("push", function (event) {
  const data = event.data.json();
  console.log("data: ", data);
  const options = {
    body: data.body,
    icon: "/icon-192x192.png",
    badge: "/icon-192x192.png",
    data: {
      url: data.link,
    },
  };
  event.waitUntil(self.registration.showNotification("CI Eents", options));
});

self.addEventListener("notificationclick", (event) => {
  const notificationData = event.notification.data;

  if (notificationData.url) {
    clients.openWindow(notificationData.url);
  }

  event.notification.close();
});
