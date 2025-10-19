// functions/index.js (ESM)

// Functions v2 imports
import { setGlobalOptions } from "firebase-functions/v2";
import { onRequest } from "firebase-functions/v2/https";
import logger from "firebase-functions/logger";

// Firestore trigger (if you need it later)
// import { onDocumentCreated } from "firebase-functions/v2/firestore";

// Admin SDK
import admin from "firebase-admin";
import { getFirestore, FieldValue } from "firebase-admin/firestore";

// Initialize Admin app only once
if (!admin.apps.length) {
  admin.initializeApp();
}
const db = getFirestore();

// Default options for ALL functions here (optional)
setGlobalOptions({ maxInstances: 10 });

/** Simple hello to test the deploy quickly */
export const myHelloWorld = onRequest((req, res) => {
  logger.info("Hello logs!", { structuredData: true });
  res.send("Hello from FIT5032!");
});

/**
 * HTTP function: counts documents in 'books' collection.
 * Example: GET https://<region>-<project>.cloudfunctions.net/countBooks
 * Response: { "count": 42 }
 */
export const countBooks = onRequest(async (req, res) => {
  try {
    if (req.method !== "GET") {
      res.status(405).json({ error: "Use GET" });
      return;
    }
    // Aggregation count (Firestore Admin SDK)
    const agg = await db.collection("books").count().get();
    res.json({ count: agg.data().count });
  } catch (err) {
    logger.error("countBooks failed", err);
    res.status(500).json({ error: String(err) });
  }
});

/* -------------------------------------------------
   Example Firestore trigger you might add later:

export const notesWelcomeOnCreate = onDocumentCreated("/notes/{noteId}", async (event) => {
  const snap = event.data;
  if (!snap) return;
  const data = snap.data() ?? {};
  const updates = {};
  if (data.welcome !== true) updates.welcome = true;
  if (!data.lastModifiedAt) updates.lastModifiedAt = FieldValue.serverTimestamp();
  if (Object.keys(updates).length) await snap.ref.update(updates);
});
------------------------------------------------- */
