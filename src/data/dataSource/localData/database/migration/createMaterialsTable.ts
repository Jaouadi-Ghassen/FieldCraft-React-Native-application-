import {Transaction} from 'react-native-sqlite-storage';

export const createMaterialTable = (transaction: Transaction) => {
  transaction.executeSql(
    `
    CREATE TABLE IF NOT EXISTS materials (
      id TEXT PRIMARY KEY,
      networkId TEXT,
      category_id TEXT NOT NULL,
      description TEXT ,
      materialName TEXT NOT NULL,
      material_state TEXT CHECK(material_state IN ('new', 'old', 'used')),
      price REAL ,
      project_id TEXT NOT NULL,
      quantity REAL NOT NULL,
      isSynchronise BIT(0),
      createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (project_id) REFERENCES projects(id),
      FOREIGN KEY (category_id) REFERENCES category(id)
        );
        `,
    [],
    (_tr, results) => {
      console.log('Material table creation success', results);
    },
    err => {
      console.error('Error creating material table', err);
    },
  );
};
