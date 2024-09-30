import {Transaction} from 'react-native-sqlite-storage';

export const createTasksTable = (transaction: Transaction) => {
  transaction.executeSql(
    `
    CREATE TABLE IF NOT EXISTS tasks (
      id TEXT PRIMARY KEY,
      networkId TEXT,
      project_id TEXT NOT NULL,
      taskName TEXT NOT NULL,
      description TEXT NOT NULL,
      taskState BOOLEAN DEFAULT FALSE,
      resetProject BOOLEAN DEFAULT FALSE,
      taskPhase TEXT NOT NULL,
      isSynchronise BIT(0),
      createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (project_id) REFERENCES projects(id)
    );
    `,
    [],
    (_tr, results) => {
      console.log('Tasks table creation success', results);
    },
    err => {
      console.error('Error creating tasks table', err);
    },
  );
};
