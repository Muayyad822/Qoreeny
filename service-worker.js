self.addEventListener("notificationclick", event => {
    event.notification.close(); // Close notification on click
});
