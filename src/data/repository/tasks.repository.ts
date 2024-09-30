import {getDatabseInstance} from '../dataSource/localData/database';
import {Tasks} from '../../dataSource/graphql/graphql-schema-types';
import 'react-native-get-random-values';
import {v4 as uuidv4} from 'uuid';

export class TaskRepository {
  private static instance: TaskRepository | null = null;
  private constructor() {}

  public static getInstance() {
    if (this.instance == null) {
      this.instance = new TaskRepository();
    }
    return this.instance;
  }

  public async getAllTasks(projectId: string): Promise<Tasks[]> {
    return new Promise((resolve, reject) => {
      getDatabseInstance().transaction(
        transaction => {
          transaction.executeSql(
            'SELECT * FROM tasks WHERE project_id = ?',
            [projectId],
            (_transaction, resultSet) => {
              const rows: Tasks[] = [];
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

  public async setAllTasks(tasks: Tasks[]): Promise<void> {
    return new Promise((resolve, reject) => {
      getDatabseInstance().transaction(
        async query => {
          try {
            const promises: Promise<void>[] = [];
            for (const task of tasks) {
              promises.push(
                new Promise<void>((resolve, reject) => {
                  query.executeSql(
                    'SELECT * FROM tasks WHERE networkId = ?',
                    [task.id],
                    (_tr, resultSet) => {
                      // console.log(resultSet.rows.length);
                      if (resultSet.rows.length > 0) {
                        const existingTask = resultSet.rows.item(0);
                        this.updateTask(existingTask.id, task, query)
                          .then(resolve)
                          .catch(reject);
                      } else {
                        this.insertTask(task, query)
                          .then(resolve)
                          .catch(reject);
                      }
                    },
                    err => {
                      console.error('Error checking existing task', err);
                      reject(err);
                    },
                  );
                }),
              );
            }
            await Promise.all(promises);
            resolve();
          } catch (error) {
            console.error('Error in setAllTasks transaction', error);
            reject(error);
          }
        },
        error => {
          console.error('Transaction error', error);
          reject(error);
        },
      );
    });
  }

  private async insertTask(task: Tasks, transaction: any): Promise<void> {
    const id = uuidv4();
    console.log('Inserting task:', task, id);

    return new Promise<void>((resolve, reject) => {
      transaction.executeSql(
        'INSERT INTO tasks (id, networkId, project_id, taskName, description, taskState, resetProject, taskPhase, isSynchronise, createdAt, updatedAt) VALUES (?, ?, ?, ?, ?, ?, ?, ?, 0, ?, ?)',
        [
          id,
          task.id, // This is the network ID
          task.projectId,
          task.taskName,
          task.description,
          task.taskState,
          '',
          task.taskPhase,
          new Date().toISOString(), // createdAt
          new Date().toISOString(), // updatedAt
        ],
        () => {
          console.log('Insert task success');
          resolve();
        },
        (error: Error) => {
          console.error('Error inserting task', error);
          reject(error);
        },
      );
    });
  }

  private async updateTask(
    taskId: string,
    task: Tasks,
    transaction: any,
  ): Promise<void> {
    console.log('Updating task:', task);
    return new Promise<void>((resolve, reject) => {
      transaction.executeSql(
        'UPDATE tasks SET project_id = ?, taskName = ?, description = ?, taskState = ?, resetProject = ?, taskPhase = ?, updatedAt = ? WHERE id = ?',
        [
          task.projectId,
          task.taskName,
          task.description,
          task.taskState,
          '',
          task.taskPhase,
          new Date().toISOString(),
          taskId,
        ],
        () => {
          console.log('Update task success');
          resolve();
        },
        (error: Error) => {
          console.error('Error updating task', error);
          reject(error);
        },
      );
    });
  }
  public async updateTaskState(
    taskId: string,
    taskState: boolean,
  ): Promise<void> {
    return new Promise((resolve, reject) => {
      getDatabseInstance().transaction(
        transaction => {
          transaction.executeSql(
            'UPDATE tasks SET taskState = ? WHERE id = ?',
            [taskState ? 1 : 0, taskId],
            (_transaction, resultSet) => {
              console.log('Update task state success', resultSet);
              resolve();
            },
            (_transaction, error) => {
              console.error('Error updating task state', error);
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

  public async updateTaskStateLocally(
    taskId: string,
    taskState: boolean,
  ): Promise<void> {
    return new Promise((resolve, reject) => {
      getDatabseInstance().transaction(
        transaction => {
          transaction.executeSql(
            'UPDATE tasks SET taskState = ?, isSynchronise = 0 WHERE id = ?',
            [taskState ? 1 : 0, taskId],
            (_transaction, resultSet) => {
              console.log('Update task state locally success', resultSet);
              resolve();
            },
            (_transaction, error) => {
              console.error('Error updating task state locally', error);
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

  public async fetchUnsynchronizedTasks(): Promise<Tasks[]> {
    return new Promise<Tasks[]>((resolve, reject) => {
      getDatabseInstance().transaction(
        transaction => {
          transaction.executeSql(
            'SELECT * FROM tasks WHERE isSynchronise = 0',
            [],
            (_transaction, resultSet) => {
              const tasks: Tasks[] = [];
              for (let i = 0; i < resultSet.rows.length; i++) {
                const task = resultSet.rows.item(i);
                console.log(
                  `Fetched unsynchronized task: ${task.id}, networkId: ${task.networkId}`,
                );
                tasks.push(task);
              }
              resolve(tasks);
            },
            error => {
              console.error('Error fetching unsynchronized tasks', error);
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

  public async markTaskAsSynchronized(taskId: string): Promise<void> {
    return new Promise<void>((resolve, reject) => {
      getDatabseInstance().transaction(
        transaction => {
          transaction.executeSql(
            'UPDATE tasks SET isSynchronise = 1 WHERE id = ?',
            [taskId],
            () => {
              console.log('Material marked as synchronized');
              resolve();
            },
            error => {
              console.error('Error marking material as synchronized', error);
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
}
