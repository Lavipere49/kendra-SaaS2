const admin = require("firebase-admin");
const path = require("path");
const fs = require("fs");

let db = null;

function initializeFirebase() {
  if (db) return db;

  if (!admin.apps.length) {
    const serviceAccountPath = path.join(__dirname, "../../serviceAccountKey.json");
    let serviceAccount = null;

    // Production-friendly option: keep the service account in environment variables.
    if (process.env.FIREBASE_PROJECT_ID && process.env.FIREBASE_CLIENT_EMAIL && process.env.FIREBASE_PRIVATE_KEY) {
      serviceAccount = {
        project_id: process.env.FIREBASE_PROJECT_ID,
        client_email: process.env.FIREBASE_CLIENT_EMAIL,
        private_key: process.env.FIREBASE_PRIVATE_KEY
      };
    } else if (fs.existsSync(serviceAccountPath)) {
      serviceAccount = require(serviceAccountPath);
    }

    if (!serviceAccount) {
      throw new Error(
        "Configuration Firebase Admin manquante. Fournis FIREBASE_PROJECT_ID, FIREBASE_CLIENT_EMAIL et FIREBASE_PRIVATE_KEY, ou serviceAccountKey.json."
      );
    }

    admin.initializeApp({
      credential: admin.credential.cert({
        projectId: serviceAccount.project_id,
        clientEmail: serviceAccount.client_email,
        privateKey: String(serviceAccount.private_key).replace(/\\n/g, "\n")
      })
    });
  }

  db = admin.firestore();
  console.log("✅ Firebase Firestore connecté");
  return db;
}

function getDb() {
  return db || initializeFirebase();
}

function timestamp() {
  return admin.firestore.FieldValue.serverTimestamp();
}

module.exports = { admin, initializeFirebase, getDb, timestamp };
