import {Transaction} from 'react-native-sqlite-storage';
import {Category} from '../dataSource/graphql/graphql-schema-types';
import {getDatabseInstance} from '../dataSource/localData/database';

export class CategoryRepository {
  private static instance: CategoryRepository | null = null;

  private constructor() {}

  public static getInstance() {
    if (this.instance == null) {
      this.instance = new CategoryRepository();
    }
    return this.instance;
  }

  public async getAllCategories(): Promise<Category[]> {
    return new Promise((resolve, reject) => {
      getDatabseInstance().transaction(
        transaction => {
          transaction.executeSql(
            'SELECT * FROM category',
            [],
            (_transaction, resultSet) => {
              const rows: Category[] = [];
              for (let i = 0; i < resultSet.rows.length; i++) {
                const row = resultSet.rows.item(i);
                rows.push(row);
              }
              resolve(rows);
            },
            (_transaction, error) => {
              console.error('Error fetching categories', error);
              reject(error);
            },
          );
        },
        error => {
          console.error('Transaction error', error);
          reject(error);
        },
      );
    });
  }

  public async setAllCategories(categories: Category[]): Promise<void> {
    return new Promise((resolve, reject) => {
      getDatabseInstance().transaction(
        transaction => {
          categories.forEach(category => {
            transaction.executeSql(
              `SELECT * FROM category WHERE id = ?`,
              [category.id],
              (_tr, resultSet) => {
                if (resultSet.rows.length > 0) {
                  transaction.executeSql(
                    `UPDATE category SET name = ?, parent_id = ?, updatedAt = CURRENT_TIMESTAMP WHERE id = ?`,
                    [category.name, category.parent_id, category.id],
                    (_tr, results) => {},
                    err => {
                      console.error('Error updating category', err);
                      reject(err);
                    },
                  );
                } else {
                  transaction.executeSql(
                    'INSERT INTO category (id, name, parent_id) VALUES (?, ?, ?)',
                    [category.id, category.name, category.parent_id],
                    (_tr, results) => {},
                    err => {
                      console.error('Error inserting category', err);
                      reject(err);
                    },
                  );
                }
              },
              err => {
                console.error('Error checking existing category', err);
                reject(err);
              },
            );
          });
        },
        err => {
          console.error('Transaction error', err);
          reject(err);
        },
        () => {
          resolve();
        },
      );
    });
  }
}
