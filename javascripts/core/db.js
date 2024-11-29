const highlightDB = {
    db: null,

    async openDatabase() {
        return new Promise((resolve, reject) => {
            const request = indexedDB.open('BookHighlightsDB', 1);

            request.onupgradeneeded = (event) => {
                const db = event.target.result;
                if (!db.objectStoreNames.contains('highlights')) {
                    const store = db.createObjectStore('highlights', {
                        keyPath: 'id',
                        autoIncrement: false
                    });

                    store.createIndex('pageIndex', 'pageIndex', { unique: false });
                }
            };

            request.onsuccess = (event) => {
                this.db = event.target.result;
                resolve(this.db);
            };

            request.onerror = (event) => {
                console.error('IndexedDB error:', event.target.error);
                reject(event.target.error);
            };
        });
    },

    async getHighlights(pageIndex) {
        if (!this.db) await this.openDatabase();

        return new Promise((resolve, reject) => {
            const transaction = this.db.transaction(['highlights'], 'readonly');
            const store = transaction.objectStore('highlights');
            const index = store.index('pageIndex');
            const request = index.getAll(pageIndex);

            request.onsuccess = (event) => {
                resolve(event.target.result || []);
            };

            request.onerror = (event) => {
                console.error('Error retrieving highlights:', event.target.error);
                reject(event.target.error);
            };
        });
    },

    async saveHighlight(highlight) {
        if (!this.db) await this.openDatabase();

        return new Promise((resolve, reject) => {
            const transaction = this.db.transaction(['highlights'], 'readwrite');
            const store = transaction.objectStore('highlights');
            const request = store.put(highlight);

            request.onsuccess = () => {
                resolve(highlight);
            };

            request.onerror = (event) => {
                console.error('Error saving highlight:', event.target.error);
                reject(event.target.error);
            };
        });
    },

    async deleteHighlight(highlightId) {
        if (!this.db) await this.openDatabase();

        return new Promise((resolve, reject) => {
            const transaction = this.db.transaction(['highlights'], 'readwrite');
            const store = transaction.objectStore('highlights');
            const request = store.delete(highlightId);

            request.onsuccess = () => {
                resolve(highlightId);
            };

            request.onerror = (event) => {
                console.error('Error deleting highlight:', event.target.error);
                reject(event.target.error);
            };
        });
    },

    async deleteAllHighlightsForPage(pageIndex) {
        if (!this.db) await this.openDatabase();

        return new Promise((resolve, reject) => {
            const transaction = this.db.transaction(['highlights'], 'readwrite');
            const store = transaction.objectStore('highlights');
            const index = store.index('pageIndex');
            const request = index.openCursor(IDBKeyRange.only(pageIndex));

            const highlightsToDelete = [];

            request.onsuccess = (event) => {
                const cursor = event.target.result;
                if (cursor) {
                    highlightsToDelete.push(cursor.value.id);
                    cursor.delete();
                    cursor.continue();
                } else {
                    resolve(highlightsToDelete);
                }
            };

            request.onerror = (event) => {
                console.error('Error deleting highlights for page:', event.target.error);
                reject(event.target.error);
            };
        });
    }
};

export { highlightDB };