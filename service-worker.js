self.addEventListener("install", (event) => {
    self.skipWaiting();
  });
  
  self.addEventListener("activate", (event) => {
    console.log("Service Worker Activated");
    return self.clients.claim();
  });
  
  self.addEventListener("notificationclick", (event) => {
    event.notification.close(); // Close notification on click
    event.waitUntil(
      self.clients.matchAll({ type: "window", includeUncontrolled: true }).then((clientList) => {
        if (clientList.length > 0) {
          clientList[0].focus();
        } else {
          self.clients.openWindow("/");
        }
      })
    );
  });
  
  self.addEventListener("push", (event) => {
    const data = event.data ? event.data.json() : {};
    self.registration.showNotification(data.title, {
      body: data.body,
      icon: data.icon || "https://fav.farm/🌙",
      badge: data.badge || "https://fav.farm/🌙",
      requireInteraction: true, // Keeps the notification persistent
    });
  });
  