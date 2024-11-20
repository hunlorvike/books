export default {
    db: null,
  
    // Mở và khởi tạo cơ sở dữ liệu
    async openDB(dbName, version) {
      return new Promise((resolve, reject) => {
        const request = indexedDB.open(dbName, version);
  
        request.onupgradeneeded = (event) => {
          const db = event.target.result;
          if (!db.objectStoreNames.contains('quotes')) {
            db.createObjectStore('quotes', { keyPath: 'id', autoIncrement: true });
          }
        };
  
        request.onsuccess = (event) => {
          this.db = event.target.result;
          resolve(this.db);
        };
  
        request.onerror = (event) => {
          reject(event.target.error);
        };
      });
    },
  
    // Thêm một câu trích dẫn
    async addQuote(quote) {
      return new Promise((resolve, reject) => {
        const transaction = this.db.transaction(['quotes'], 'readwrite');
        const store = transaction.objectStore('quotes');
        const request = store.add(quote);
  
        request.onsuccess = () => resolve(request.result);
        request.onerror = (event) => reject(event.target.error);
      });
    },
  
    // Lấy tất cả câu trích dẫn
    async getAllQuotes() {
      return new Promise((resolve, reject) => {
        const transaction = this.db.transaction(['quotes'], 'readonly');
        const store = transaction.objectStore('quotes');
        const request = store.getAll();
  
        request.onsuccess = () => resolve(request.result);
        request.onerror = (event) => reject(event.target.error);
      });
    },
  };
  