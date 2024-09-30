import {Projects} from '../../dataSource/graphql/graphql-schema-types';
import {getDatabseInstance} from '../dataSource/localData/database';

export class ProjectRepository {
  private static instance: ProjectRepository | null = null;
  private constructor() {}
  public static getInstance() {
    if (this.instance == null) {
      this.instance = new ProjectRepository();
    }
    return this.instance;
  }

  public async getAllProjects(): Promise<Projects[]> {
    return new Promise((resolve, reject) => {
      getDatabseInstance().transaction(
        transaction => {
          transaction.executeSql(
            'SELECT * FROM projects',
            [],
            (_transaction, resultSet) => {
              const rows: Projects[] = [];
              for (let i = 0; i < resultSet.rows.length; i++) {
                const row = resultSet.rows.item(i);
                if (row) {
                  rows.push(row);
                }
              }
              resolve(rows);
            },
            (_transaction, error) => {
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

  public async setAllProjects(projects: Array<Projects>): Promise<void> {
    return new Promise((resolve, reject) => {
      getDatabseInstance().transaction(
        query => {
          projects.forEach(project => {
            query.executeSql(
              `SELECT * FROM projects WHERE projectName = ? AND reference = ?`,
              [project.projectName, project.reference],
              (_tr, resultSet) => {
                if (resultSet.rows.length > 0) {
                  const existingProject = resultSet.rows.item(0);
                  query.executeSql(
                    `UPDATE projects SET projectName = ?, projectAdress = ?, codePostal = ?, city = ?, startDate = ?, estimatedStartDate = ?, endDate = ?, estimatedEndDate = ? WHERE id = ?`,
                    [
                      project.projectName,
                      project.projectAdress,
                      project.codePostal,
                      project.city,
                      project.startDate,
                      project.estimatedstartDate,
                      project.endDate,
                      project.estimatedEndDate,
                      existingProject.id,
                    ],
                    (_tr, results) => {
                      // console.log('Update success', results);
                    },
                    err => {
                      console.error('Error updating project', err);
                      reject(err);
                    },
                  );
                } else {
                  query.executeSql(
                    'INSERT INTO projects (id, projectName, projectAdress, codePostal, city, reference, startDate, estimatedStartDate, endDate, estimatedEndDate) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
                    [
                      project.id,
                      project.projectName,
                      project.projectAdress,
                      project.codePostal,
                      project.city,
                      project.reference,
                      project.startDate,
                      project.estimatedstartDate,
                      project.endDate,
                      project.estimatedEndDate,
                    ],
                    (_tr, results) => {
                      console.log('Insert success', results);
                    },
                    err => {
                      console.error('Error inserting project', err);
                      reject(err);
                    },
                  );
                }
              },
              err => {
                console.error('Error checking existing project', err);
                reject(err);
              },
            );
          });
        },
        err => {
          // console.error('Transaction error', err);
          reject(err);
        },
        () => {
          // console.log('Transaction success');
          resolve();
        },
      );
    });
  }
}
