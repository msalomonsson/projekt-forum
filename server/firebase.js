const {
  initializeApp,
  applicationDefault,
  cert,
} = require("firebase-admin/app");
const {
  getFirestore,
  Timestamp,
  FieldValue,
} = require("firebase-admin/firestore");

const serviceAccount = require("./forum-6ad4a-9b071f9b1b6f.json");

initializeApp({
  credential: cert(serviceAccount),
});

const db = getFirestore();

module.exports = db;
