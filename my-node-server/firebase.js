import admin from "firebase-admin";
import dotenv from "dotenv";
import fs from "fs";

dotenv.config();

const serviceAccount = JSON.parse(
  Buffer.from(process.env.SERVICE_ACCOUNT_KEY_BASE64, "base64").toString("utf8")
);

console.log(serviceAccount);

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

// Export the initialized admin instance
export default admin;
