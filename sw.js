self.addEventListener('push', event => {
  console.log('[ServiceWorker] Push diterima');
  if (!event.data) {
    console.warn('[ServiceWorker] event.data kosong!');
    return;
  }
  try {
    const data = event.data.json();
    console.log('[ServiceWorker] Payload:', data);
    event.waitUntil(
      self.registration.showNotification(data.data.title, {
        body: data.data.body,
        data: { url: data.data.url }
      })
    );
  } catch (e) {
    console.error('[ServiceWorker] Gagal parse:', e);
  }
});
