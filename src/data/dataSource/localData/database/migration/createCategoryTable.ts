import {Transaction} from 'react-native-sqlite-storage';

export const createCategoryTable = (transaction: Transaction) => {
  transaction.executeSql(
    `
          CREATE TABLE IF NOT EXISTS category (
            id TEXT PRIMARY KEY,
            name TEXT NOT NULL,
            parent_id TEXT,
            createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            FOREIGN KEY (parent_id) REFERENCES category(id)
          );
        `,
    [],
    (_tr, results) => {
      console.log('Category table creation success', results);
    },
    err => {
      console.error('Error creating category table', err);
    },
  );
};
