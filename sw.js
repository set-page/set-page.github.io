self.addEventListener('push', function(event) {
  const data = event.data ? event.data.json() : {};

  const title = data.title || "Notifikasi";
  const options = {
    body: data.body || "Ada pesan baru.",
    icon: data.icon || "/icon.png",
    badge: data.badge || "/badge.png"
  };

  event.waitUntil(
    self.registration.showNotification(title, options)
  );
});

self.addEventListener('notificationclick', function(event) {
  event.notification.close();
  event.waitUntil(
    clients.openWindow(data.url || "/")
  );
});
