import {Transaction} from 'react-native-sqlite-storage';

export const createProjectTable = (transaction: Transaction) => {
  transaction.executeSql(
    `
              CREATE TABLE IF NOT EXISTS projects (
                id TEXT PRIMARY KEY,
                projectName TEXT NOT NULL,
                projectAdress TEXT NOT NULL,
                codePostal INTEGER NOT NULL,
                city TEXT NOT NULL,
                reference TEXT UNIQUE NOT NULL,
                createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                startDate TIMESTAMP NOT NULL,
                estimatedStartDate TIMESTAMP NOT NULL,
                endDate TIMESTAMP NOT NULL,
                estimatedEndDate TIMESTAMP NOT NULL
              );
            `,
    [],
    (_tr, results) => {
      console.log('Project Table creation success', results);
    },
    err => {
      console.error('Error creating table', err);
    },
  );
};
