import {Transaction} from 'react-native-sqlite-storage';

export const createUsersTable = (transaction: Transaction) => {
  transaction.executeSql(
    `
          CREATE TABLE IF NOT EXISTS users (
            id TEXT PRIMARY KEY,
            networkId TEXT,
            username TEXT UNIQUE NOT NULL,
            firstname TEXT NOT NULL,
            lastname TEXT NOT NULL,
            email TEXT UNIQUE NOT NULL,
            password TEXT NOT NULL,
            adresse TEXT NOT NULL,
            image TEXT NOT NULL,
            isSynchronise BIT(0),
            createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
          );
        `,
    [],
    (_tr, results) => {
      console.log('Users table creation success', results);
    },
    err => {
      console.error('Error creating users table', err);
    },
  );
};
