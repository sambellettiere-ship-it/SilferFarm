import Database from 'better-sqlite3';
import path from 'path';

const dbPath = path.resolve(process.cwd(), 'database.sqlite');
const db = new Database(dbPath, {
  // verbose: console.log
});

db.pragma('journal_mode = WAL');

db.exec(`
  CREATE TABLE IF NOT EXISTS products (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    price TEXT NOT NULL,
    status TEXT NOT NULL,
    hidden INTEGER DEFAULT 0,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
  );
  
  CREATE TABLE IF NOT EXISTS store_status (
    id INTEGER PRIMARY KEY CHECK (id = 1),
    last_updated DATETIME DEFAULT CURRENT_TIMESTAMP
  );
  
  INSERT OR IGNORE INTO store_status (id) VALUES (1);
`);

export interface Product {
  id: number;
  name: string;
  price: string;
  status: string;
  hidden: number;
  updated_at: string;
}

export function getVisibleProducts(): Product[] {
  return db.prepare('SELECT * FROM products WHERE hidden = 0 ORDER BY updated_at DESC').all() as Product[];
}

export function getAllProducts(): Product[] {
  return db.prepare('SELECT * FROM products ORDER BY updated_at DESC').all() as Product[];
}

export function addProduct(name: string, price: string, status: string) {
  const stmt = db.prepare('INSERT INTO products (name, price, status, updated_at) VALUES (?, ?, ?, CURRENT_TIMESTAMP)');
  const result = stmt.run(name, price, status);
  updateStoreStatus();
  return result;
}

export function updateProduct(id: number, name: string, price: string, status: string, hidden: number) {
  const stmt = db.prepare('UPDATE products SET name = ?, price = ?, status = ?, hidden = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?');
  const result = stmt.run(name, price, status, hidden, id);
  updateStoreStatus();
  return result;
}

export function deleteProduct(id: number) {
  const stmt = db.prepare('DELETE FROM products WHERE id = ?');
  const result = stmt.run(id);
  updateStoreStatus();
  return result;
}

export function getStoreStatus() {
  const row = db.prepare('SELECT last_updated FROM store_status WHERE id = 1').get() as { last_updated: string };
  return row ? row.last_updated : new Date().toISOString();
}

function updateStoreStatus() {
  db.prepare('UPDATE store_status SET last_updated = CURRENT_TIMESTAMP WHERE id = 1').run();
}

// Seed initial data if empty
const count = db.prepare('SELECT count(*) as count FROM products').get() as { count: number };
if (count.count === 0) {
  addProduct('Farm-Fresh Eggs (Dozen)', '$5.00', 'In Stock');
  addProduct('Local Honey (16oz)', '$12.00', 'In Stock');
  addProduct('Homemade Chocolate Chip Cookies', '$3.00/each', 'Sold Out');
  addProduct('Seasonal Heirloom Tomatoes', '$4.00/lb', '5 Left');
}
