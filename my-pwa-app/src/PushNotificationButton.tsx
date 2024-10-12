import { messaging } from "./firebase";
import { getToken } from "firebase/messaging";
import { useState } from "react";
const PushNotificationButton = () => {
  const [token, setToken] = useState<string | null>(null);
  const [copySuccess, setCopySuccess] = useState<string | null>(null);

  const requestPermission = async () => {
    try {
      const permission = await Notification.requestPermission();

      if (permission === "granted") {
        const token = await getToken(messaging, {
          vapidKey: import.meta.env.VITE_VAPID_PUBLIC_FIREBASE_KEY,
        });

        if (token) {
          setToken(token);
        } else {
          console.error("No token found");
        }
      } else {
        console.error("Permission not granted for Notification");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const copyToClipboard = () => {
    if (token) {
      navigator.clipboard
        .writeText(token)
        .then(() => {
          setCopySuccess("Token copied to clipboard!");
          setTimeout(() => setCopySuccess(null), 2000); // Clear message after 2 seconds
        })
        .catch((err) => {
          console.error("Failed to copy token: ", err);
        });
    }
  };

  return (
    <section className="flex flex-col justify-center items-center gap-4">
      <button
        className="bg-blue-500 text-white px-4 py-2 rounded-md"
        onClick={requestPermission}
      >
        Generate Token
      </button>
      {token && (
        <p
          className="text-sm text-gray-500 cursor-pointer"
          onClick={copyToClipboard}
          title="Click to copy"
        >
          {copySuccess ? (
            <span className="text-green-500 text-sm">{copySuccess}</span>
          ) : (
            <span>Click to copy token</span>
          )}
        </p>
      )}
    </section>
  );
};

export default PushNotificationButton;
