import {SQLiteDatabase} from 'react-native-sqlite-storage';

export const createMigrationTable = (db: SQLiteDatabase) => {
  db.executeSql(
    `CREATE TABLE IF NOT EXISTS migrations (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            migration_name TEXT NOT NULL UNIQUE,
            migration_time TIMESTAMP DEFAULT CURRENT_TIMESTAMP
          );`,
    [],
    (_tx, results) => console.log('Migration table creation success', results),
    err => console.error('Error creating migration table', err),
  );
};
