# pwa-push-notifacations-react-nodejs with firebase messaging

Follow firebase messaging docs: https://firebase.google.com/docs/cloud-messaging/js/client#web

## Objective

- Send push notifications to the PWA from the server by calling an endpoint

## Notes

- This is a one way communication. The PWA cannot send notifications to the server. Manually send the token to the server.
- Service worker is used to send the push notifications in the background, as well as clear the cache on every new version of the app.

## Client Environment Variables:

- VITE_FIREBASE_API_KEY
- VITE_FIREBASE_AUTH_DOMAIN
- VITE_FIREBASE_PROJECT_ID
- VITE_FIREBASE_STORAGE_BUCKET
- VITE_FIREBASE_MESSAGING_SENDER_ID
- VITE_FIREBASE_APP_ID
- VITE_FIREBASE_MEASUREMENT_ID

- VITE_VAPID_PUBLIC_FIREBASE_KEY

## Server Environment Variables:

- VAPID_PUBLIC_FIREBASE_KEY

- FIREBASE_API_KEY
- FIREBASE_AUTH_DOMAIN
- FIREBASE_PROJECT_ID
- FIREBASE_STORAGE_BUCKET
- FIREBASE_MESSAGING_SENDER_ID
- FIREBASE_APP_ID
- FIREBASE_MEASUREMENT_ID

- SERVICE_ACCOUNT_KEY_PATH=./serviceAccountKey.json
