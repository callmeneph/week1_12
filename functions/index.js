// functions/index.js  (ESM)
import { setGlobalOptions } from 'firebase-functions/v2/options'
import { onRequest } from 'firebase-functions/v2/https'
import { initializeApp } from 'firebase-admin/app'
import { getFirestore } from 'firebase-admin/firestore'

initializeApp()
setGlobalOptions({ region: 'australia-southeast1' })

// GET https://<region>-<project>.cloudfunctions.net/countBooks
export const countBooks = onRequest(async (_req, res) => {
  try {
    const db = getFirestore()
    const snap = await db.collection('books').get()
    res.json({ total: snap.size })
  } catch (err) {
    res.status(500).json({ error: String(err?.message || err) })
  }
})
