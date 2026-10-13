import mysql from 'mysql2/promise';
import fs from 'fs';
import path from 'path';

let pool;

export function getPool() {
  if (!pool) {
    pool = mysql.createPool({
      host: process.env.DB_HOST,
      port: Number(process.env.DB_PORT) || 3306,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      ssl: {
        ca: fs.readFileSync(path.join(process.cwd(), 'ca.pem')),
        rejectUnauthorized: false
      },
      waitForConnections: true,
      connectionLimit: 5,
      maxIdle: 5,
      idleTimeout: 60000,
    });
  }
  return pool;
}
