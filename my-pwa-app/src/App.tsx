import PushNotificationButton from "./PushNotificationButton";
import { useEffect } from "react";
import { notification } from "antd";
import { messaging } from "./firebase";
import { onMessage } from "firebase/messaging";

function notifyUser() {
  if (!("Notification" in window)) {
    alert("This browser does not support desktop notification");
  } else {
    Notification.requestPermission().then((permission) => {
      if (permission === "granted") {
        new Notification("Hello", {
          body: "This is a test notification",
        });
      }
    });
  }
}

function App() {
  const [api, contextHolder] = notification.useNotification();

  useEffect(() => {
    // Listen for messages from the service worker
    const unsubscribe = onMessage(messaging, (payload) => {
      console.log("Message received. ", payload);
      const { title, body } = payload.notification || {};
      if (title && body) {
        api.open({
          message: title,
          description: body,
          duration: 0,
        });
      }
    });

    return () => unsubscribe();
  }, [api, messaging]);

  return (
    <section className="flex flex-col items-center justify-center h-screen">
      {contextHolder}
      <h1 className="text-2xl font-bold mb-4">Get Notified</h1>
      <div className="card">
        <PushNotificationButton />
      </div>
    </section>
  );
}

export default App;
