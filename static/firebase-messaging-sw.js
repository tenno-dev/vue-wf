/*We can only add firebase-messaging serive in the serive worker others
 * services not allowed here.
 */

importScripts("https://www.gstatic.com/firebasejs/5.7.0/firebase.js");
importScripts("https://www.gstatic.com/firebasejs/5.7.0/firebase-app.js");
importScripts("https://www.gstatic.com/firebasejs/5.7.0/firebase-messaging.js");

/* Now initialize firebase app in the servie worker.
 *s
 */
var config = {
  messagingSenderId: "834339407252"
};
if (!firebase.apps.length) {
  firebase.initializeApp(config);
}
let messaging = firebase.messaging();
navigator.serviceWorker
  .register(`/vue-wf/firebase-messaging-sw.js`)
  .then(registration => {
    messaging.useServiceWorker(registration);
  });
messaging.setBackgroundMessageHandler(function(payload) {
  console.log(
    "[firebase-messaging-sw.js] Received background message ",
    payload.data
  );
  // Customize notification here
  var notificationTitle = "Background Message Title" + payload.data.title;
  var notificationOptions = {
    body: "back",
    icon: "/firebase-logo.png",
    image: payload.data.image
  };

  return self.registration.showNotification(
    notificationTitle,
    notificationOptions
  );
});
// [END background_handler]
