// server.js
const express = require('express');
const bodyParser = require('body-parser');
const webpush = require('web-push');
const app = express();
app.use(bodyParser.json());

// === ISI DENGAN VAPID KEYS MILIKMU ===
// Generate VAPID keys dulu (lihat instruksi di bawah), lalu isi di sini:
const VAPID_PUBLIC_KEY = 'BEavHwjV0TRYJu7Eyqj7u15l79WoxePttj5RbUw8nfRdfH4qBheRAf7EXJo85kqwujWDVB8mXt0bKUulI-Gh2Jw';
const VAPID_PRIVATE_KEY = 'MIGHAgEAMBMGByqGSM49AgEGCCqGSM49AwEHBG0wawIBAQQgusAbJZ/6fxY1/6UjnVKg0F8zyabDSUta4AzMrMIAki2hRANCAARGrx8I1dE0WCbuxMqo+7teZe/VqMXj7bY+UW1MPJ30XXx+KgYXkQH+xFyaPOZKsLo1g1QfJl7dGylLpSPhodic';
const CONTACT_EMAIL = 'mailto:rikiandidestian@gmail.com'; // ganti dengan emailmu

webpush.setVapidDetails(CONTACT_EMAIL, VAPID_PUBLIC_KEY, VAPID_PRIVATE_KEY);

// subscription yang kamu berikan (saya pre-fill dari pesanmu)
const subscription = {
  endpoint: "https://fcm.googleapis.com/fcm/send/dT-nNQ23QXQ:APA91bGpDMDj3HjmTn2S4a4BWkoxlU-wZCDMSxYhnDW6UhxgYYkqS0ZqW2-jdmz4o3idcR4_bxvu18MAWjIz2gsSZaDR6WGh8iUlqgGTwOAPnreN5L8eb2lwdImj0tEY4NClKtwq44-2",
  expirationTime: null,
  keys: {
    p256dh: "BAQZYM1CWyKSVqBGJbBUfpYG1I-EVagUB_elaL3Eho_hgyW1Q0c404IgRt-QyTJS21KEzKmAOXH5JBtPD8dnf74",
    auth: "ZAdh4vxWn8gI4K_dYx4R2w"
  }
};

// route test: kirim notifikasi langsung (POST /send)
app.post('/send', async (req, res) => {
  const { title = 'Notif dari server', body = 'Halo!' } = req.body || {};
  const payload = JSON.stringify({ title, body });

  try {
    const result = await webpush.sendNotification(subscription, payload);
    res.json({ ok: true, result: result });
  } catch (err) {
    console.error('Gagal kirim:', err);
    // web-push mengembalikan detail di err (statusCode, body)
    res.status(500).json({ ok: false, error: err.stack || err.message, details: err });
  }
});