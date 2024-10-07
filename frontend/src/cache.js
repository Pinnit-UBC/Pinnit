// cache.js

const DB_NAME = 'eventsCache';
const DB_VERSION = 1;
const STORE_NAME = 'events';

function openDB() {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(DB_NAME, DB_VERSION);

    request.onerror = (event) => {
      console.error('Error opening IndexedDB:', event.target.errorCode);
      reject(event.target.errorCode);
    };

    request.onsuccess = (event) => {
      resolve(event.target.result);
    };

    request.onupgradeneeded = (event) => {
      const db = event.target.result;
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        db.createObjectStore(STORE_NAME, { keyPath: 'date' });
      }
    };
  });
}

async function fetchImageAsBase64(url) {
  try {
    const response = await fetch(url);
    const blob = await response.blob();
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = () => resolve(reader.result);
      reader.onerror = reject;
      reader.readAsDataURL(blob);
    });
  } catch (error) {
    console.error('Error fetching image:', error);
    return null;
  }
}

export async function cacheEvents(date, events) {
  try {
    // Gather all data first, outside of the transaction
    const eventsWithBase64Images = await Promise.all(
      events.map(async (event) => {
        if (event.image_url) {
          event.image_base64 = await fetchImageAsBase64(event.image_url);
        }
        return event;
      })
    );

    const db = await openDB();
    const transaction = db.transaction([STORE_NAME], 'readwrite');
    const store = transaction.objectStore(STORE_NAME);

    store.put({ date, events: eventsWithBase64Images });

    transaction.oncomplete = () => {
      console.log('Transaction completed');
    };

    transaction.onerror = (event) => {
      console.error('Transaction error:', event.target.errorCode);
    };

    transaction.onabort = (event) => {
      console.error('Transaction aborted:', event.target.errorCode);
    };
  } catch (error) {
    console.error('Error during caching operation:', error);
  }
}

export async function loadCachedEvents(date) {
  const db = await openDB();
  return new Promise((resolve, reject) => {
    const transaction = db.transaction([STORE_NAME], 'readonly');
    const store = transaction.objectStore(STORE_NAME);
    const request = store.get(date);

    request.onerror = (event) => {
      console.error('Error retrieving events from IndexedDB:', event.target.errorCode);
      reject(event.target.errorCode);
    };

    request.onsuccess = (event) => {
      resolve(event.target.result ? event.target.result.events : []);
    };
  });
}

export async function cacheSponsoredEvent(date, sponsoredEvent) {
  try {
    // Gather data first
    if (sponsoredEvent && sponsoredEvent.image_url) {
      sponsoredEvent.image_base64 = await fetchImageAsBase64(sponsoredEvent.image_url);
    }

    const db = await openDB();
    const transaction = db.transaction([STORE_NAME], 'readwrite');
    const store = transaction.objectStore(STORE_NAME);

    store.put({ date: `sponsored_${date}`, events: sponsoredEvent });

    transaction.oncomplete = () => {
      console.log('Transaction completed');
    };

    transaction.onerror = (event) => {
      console.error('Transaction error:', event.target.errorCode);
    };

    transaction.onabort = (event) => {
      console.error('Transaction aborted:', event.target.errorCode);
    };
  } catch (error) {
    console.error('Error during caching operation:', error);
  }
}

export async function loadCachedSponsoredEvent(date) {
  const db = await openDB();
  return new Promise((resolve, reject) => {
    const transaction = db.transaction([STORE_NAME], 'readonly');
    const store = transaction.objectStore(STORE_NAME);
    const request = store.get(`sponsored_${date}`);

    request.onerror = (event) => {
      console.error('Error retrieving sponsored event from IndexedDB:', event.target.errorCode);
      reject(event.target.errorCode);
    };

    request.onsuccess = (event) => {
      resolve(event.target.result ? event.target.result.events : null);
    };
  });
}
