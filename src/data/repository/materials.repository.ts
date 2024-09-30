import {PartialMaterial} from '../../domain/hooks/materials.hooks';
import {getDatabseInstance} from '../dataSource/localData/database';
import 'react-native-get-random-values';
import {v4 as uuidv4} from 'uuid';
import {Materials} from '../../dataSource/graphql/graphql-schema-types';
import {Transaction} from 'react-native-sqlite-storage';

export class MaterialRepository {
  private static instance: MaterialRepository | null = null;

  private constructor() {}

  public static getInstance(): MaterialRepository {
    if (this.instance === null) {
      this.instance = new MaterialRepository();
    }
    return this.instance;
  }

  public async getAllMaterials(projectId: string): Promise<PartialMaterial[]> {
    return new Promise<PartialMaterial[]>((resolve, reject) => {
      getDatabseInstance().transaction(
        transaction => {
          transaction.executeSql(
            'SELECT id, category_id AS categoryId, materialName, material_state, quantity, price, description, isSynchronise FROM materials WHERE project_id= ?',
            [projectId],
            (_transaction, resultSet) => {
              const rows: PartialMaterial[] = [];
              for (let i = 0; i < resultSet.rows.length; i++) {
                const row = resultSet.rows.item(i) as PartialMaterial;
                if (row) {
                  rows.push(row);
                }
              }
              resolve(rows);
            },
            (_transaction, error) => {
              console.error('Error fetching materials', error);
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

  public async getMaterialById(
    materialId: string,
  ): Promise<PartialMaterial | null> {
    return new Promise<PartialMaterial | null>((resolve, reject) => {
      getDatabseInstance().transaction(
        transaction => {
          transaction.executeSql(
            'SELECT id, category_id AS categoryId, materialName, description, material_state AS materialState, price, quantity, isSynchronise FROM materials WHERE id = ?',
            [materialId],
            (_transaction, resultSet) => {
              if (resultSet.rows.length > 0) {
                const material = resultSet.rows.item(0) as PartialMaterial;
                resolve(material);
              } else {
                resolve(null);
              }
            },
            (_transaction, error) => {
              console.error('Error fetching material', error);
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

  public async setMaterial(material: PartialMaterial): Promise<Materials> {
    return new Promise<Materials>((resolve, reject) => {
      getDatabseInstance().transaction(
        async transaction => {
          try {
            transaction.executeSql(
              'SELECT * FROM materials WHERE networkId = ?',
              [material.id],
              (_transaction, resultSet) => {
                if (resultSet.rows.length > 0) {
                  console.log('updateeeee');
                  this.updateMaterial(
                    resultSet.rows.item(0).id,
                    material,
                    transaction,
                    true,
                  )
                    .then(resolve)
                    .catch(reject);
                } else {
                  console.log('Insertttt');
                  this.insertMaterial(material, transaction, true)
                    .then(resolve)
                    .catch(reject);
                }
              },
              error => {
                console.error('Error checking existing material', error);
                reject(error);
              },
            );
          } catch (error) {
            console.error('Error in setMaterial transaction', error);
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

  // public async setMaterial(material: PartialMaterial): Promise<Materials> {
  //   return new Promise<Materials>((resolve, reject) => {
  //     getDatabseInstance().transaction(
  //       async transaction => {
  //         try {
  //           transaction.executeSql(
  //             'SELECT * FROM materials WHERE id = ?',
  //             [material.id],
  //             (_transaction, resultSet) => {
  //               if (resultSet.rows.length > 0) {
  //                 this.updateMaterial(
  //                   resultSet.rows.item(0).id,
  //                   material,
  //                   transaction,
  //                 )
  //                   .then(resolve)
  //                   .catch(reject);
  //               } else {
  //                 this.insertMaterial(material, transaction)
  //                   .then(resolve)
  //                   .catch(reject);
  //               }
  //             },
  //             error => {
  //               console.error('Error checking existing material', error);
  //               reject(error);
  //             },
  //           );
  //         } catch (error) {
  //           console.error('Error in setMaterial transaction', error);
  //           reject(error);
  //         }
  //       },
  //       error => {
  //         console.error('Transaction error', error);
  //         reject(error);
  //       },
  //     );
  //   });
  // }

  public async setAllMaterials(materials: PartialMaterial[]): Promise<void> {
    return new Promise<void>((resolve, reject) => {
      getDatabseInstance().transaction(
        async transaction => {
          try {
            const promises: Promise<any>[] = [];
            for (const material of materials) {
              if (!material.categoryId) {
                console.error(
                  'Error: category_id is missing for material',
                  material,
                );
                reject(new Error('category_id is missing for material'));
                return;
              }
              promises.push(
                new Promise<void>((resolve, reject) => {
                  transaction.executeSql(
                    'SELECT * FROM materials WHERE networkId = ?',
                    [material.id],
                    (_transaction, resultSet) => {
                      if (resultSet.rows.length > 0) {
                        const existingMaterial = resultSet.rows.item(0);
                        this.updateMaterial(
                          existingMaterial.id,
                          material,
                          transaction,
                          true,
                        )
                          .then(resolve)
                          .catch(reject);
                      } else {
                        this.insertMaterial(material, transaction, true)
                          .then(resolve)
                          .catch(reject);
                      }
                    },
                    error => {
                      console.error('Error checking existing material', error);
                      reject(error);
                    },
                  );
                }),
              );
            }
            await Promise.all(promises);
            resolve();
          } catch (error) {
            console.error('Error in setAllMaterials transaction', error);
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

  public async insertMaterial(
    material: PartialMaterial,
    transaction: Transaction,
    isSynchronise: boolean,
  ): Promise<Materials> {
    const id = uuidv4();
    return new Promise<Materials>((resolve, reject) => {
      transaction.executeSql(
        'INSERT INTO materials (id, networkId, category_id, description, materialName, material_state, price, project_id, quantity, isSynchronise, createdAt, updatedAt) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
        [
          id,
          material.id,
          material.categoryId,
          material.description || '',
          material.materialName,
          material.materialState || 'new',
          material.price || '',
          material.projectId,
          material.quantity,
          isSynchronise ? 1 : 0,
          new Date().toISOString(),
          new Date().toISOString(),
        ],
        () => {
          resolve({
            id,
            networkId: material.id,
            categoryId: material.categoryId,
            description: material.description || '',
            materialName: material.materialName,
            materialState: material.materialState || 'new',
            price: material.price || 0,
            projectId: material.projectId,
            quantity: material.quantity,
            isSynchronise,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
          });
        },
        (error: Error) => {
          console.error('Error inserting material', error);
          reject(error);
        },
      );
    });
  }

  public async updateMaterial(
    id: string,
    material: PartialMaterial,
    transaction: Transaction,
    isSynchronise: boolean,
  ): Promise<Materials> {
    return new Promise<Materials>((resolve, reject) => {
      transaction.executeSql(
        'UPDATE materials SET networkId = ? , category_id = ?, description = ?, materialName = ?, material_state = ?, price = ?, quantity = ?, project_id = ?, isSynchronise = ?, createdAt = ?, updatedAt = ? WHERE id = ?',
        [
          material.id,
          material.categoryId,
          material.description,
          material.materialName,
          material.materialState || 'new',
          material.price,
          material.quantity,
          material.projectId,
          isSynchronise ? 1 : 0,
          '',
          new Date().toISOString(),
          id,
        ],
        () => {
          resolve({
            id,
            networkId: material.id,
            categoryId: material.categoryId,
            description: material.description || '',
            materialName: material.materialName,
            materialState: material.materialState || 'new',
            price: material.price || 0,
            projectId: material.projectId,
            quantity: material.quantity,
            isSynchronise: 0,
            createdAt: material.createdAt,
            updatedAt: new Date().toISOString(),
          });
        },
        (error: Error) => {
          console.error('Error updating material', error);
          reject(error);
        },
      );
    });
  }

  public async deleteMaterial(materialId: string): Promise<void> {
    return new Promise<void>((resolve, reject) => {
      getDatabseInstance().transaction(
        transaction => {
          transaction.executeSql(
            'DELETE FROM materials WHERE id = ?',
            [materialId],
            () => {
              resolve();
            },
            error => {
              console.error('Error deleting material', error);
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

  public async updateMaterialLocally(
    materialId: string,
    material: PartialMaterial,
  ): Promise<void> {
    return new Promise<void>((resolve, reject) => {
      console.log('materialId', materialId);
      console.log('material', material);
      getDatabseInstance().transaction(
        transaction => {
          transaction.executeSql(
            'UPDATE materials SET networkId = ?, category_id = ?, description = ?, materialName = ?, material_state = ?, price = ?, quantity = ?, isSynchronise = ?, createdAt = ?, updatedAt = ? WHERE id = ?',
            [
              material.id,
              material.categoryId,
              material.description,
              material.materialName,
              material.materialState,
              material.price,
              material.quantity,
              0,
              new Date().toISOString(),
              new Date().toISOString(),
              materialId,
            ],
            () => {
              resolve();
            },
            error => {
              console.error('Error updating material locally', error);
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

  public async fetchUnsynchronizedMaterials(): Promise<PartialMaterial[]> {
    return new Promise<PartialMaterial[]>((resolve, reject) => {
      getDatabseInstance().transaction(
        transaction => {
          transaction.executeSql(
            'SELECT * FROM materials WHERE isSynchronise = 0 or networkId is null',
            [],
            (_transaction, resultSet) => {
              const materials: PartialMaterial[] = [];
              for (let i = 0; i < resultSet.rows.length; i++) {
                materials.push({
                  ...(resultSet.rows.item(i) as PartialMaterial),
                  categoryId: resultSet.rows.item(i).category_id,
                  projectId: resultSet.rows.item(i).project_id,
                });
              }
              resolve(materials);
            },
            error => {
              console.error('Error fetching unsynchronized materials', error);
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

  public async markMaterialAsSynchronized(materialId: string): Promise<void> {
    return new Promise<void>((resolve, reject) => {
      getDatabseInstance().transaction(
        transaction => {
          transaction.executeSql(
            'UPDATE materials SET isSynchronise = 1 WHERE id = ?',
            [materialId],
            () => {
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
