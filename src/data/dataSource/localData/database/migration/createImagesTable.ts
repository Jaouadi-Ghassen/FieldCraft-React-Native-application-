import {Transaction} from 'react-native-sqlite-storage';

export const createImagesTable = (transaction: Transaction) => {
  transaction.executeSql(
    `
    CREATE TABLE IF NOT EXISTS images (
      id TEXT PRIMARY KEY,
      networkId TEXT,
      imagePath TEXT NOT NULL,
      material_id TEXT NOT NULL,
      isSynchronise BIT(0),
      createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (material_id) REFERENCES materials(id)
    );
    `,
    [],
    (_tr, results) => {
      console.log('Images table creation success', results);
    },
    err => {
      console.error('Error creating images table', err);
    },
  );
};
