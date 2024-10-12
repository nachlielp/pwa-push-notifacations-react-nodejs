declare module "./firebase.js" {
  export const messaging: {
    requestPermission: () => Promise<void>;
    getToken: () => Promise<string>;
  };
}
