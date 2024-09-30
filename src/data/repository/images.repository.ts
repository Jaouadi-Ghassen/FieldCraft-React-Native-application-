import {v4 as uuidv4} from 'uuid';
import {Transaction} from 'react-native-sqlite-storage';
import {getDatabseInstance} from '../dataSource/localData/database';
import {Images} from '../../dataSource/graphql/graphql-schema-types';

export class ImagesRepository {
  private static instance: ImagesRepository | null = null;

  private constructor() {}

  public static getInstance() {
    if (this.instance == null) {
      this.instance = new ImagesRepository();
    }
    return this.instance;
  }

  setImage = async (
    image: {
      id: string;
      imagePath: string;
      materialtId: string;
    },
    materialId: string,
  ) => {
    return new Promise<void>((resolve, reject) => {
      getDatabseInstance().transaction(
        transaction => {
          transaction.executeSql(
            `SELECT * FROM images WHERE networkId = ?`,
            [image.id],
            (_tr, resultSet) => {
              if (resultSet.rows.length > 0) {
                transaction.executeSql(
                  `UPDATE images SET networkId = ?, imagePath = ?, isSynchronise = 1 WHERE id = ?`,
                  [image.id, image.imagePath, resultSet.rows.item(0).id],
                  (_tr, results) => {
                    console.log('Image updated successfully', results);
                  },
                  err => {
                    console.error('Error updating image 11', err);
                    reject(err);
                  },
                );
              } else {
                this.insertImage(
                  transaction,
                  {
                    imagePath: image.imagePath,
                    materialId,
                    networkId: image.id,
                  },
                  true,
                );
              }
            },
            err => {
              console.error('Error checking existing image', err);
              reject(err);
            },
          );
        },
        err => {
          console.error('Transaction error', err);
          reject(err);
        },
        () => {
          console.log('Transaction completed successfully');
          resolve();
        },
      );
    });
  };

  insertImage = (
    transaction: Transaction,
    image: {imagePath: string; materialId: string; networkId?: string},
    isSynchronise: boolean,
  ) => {
    const id = uuidv4();
    return new Promise<void>((resolve, reject) => {
      transaction.executeSql(
        `INSERT INTO images (id, networkId, imagePath, material_id, isSynchronise) VALUES (?, ?, ?, ?, ?)`,
        [
          id,
          image.networkId,
          image.imagePath,
          image.materialId,
          isSynchronise ? 1 : 0,
        ],

        () => {
          console.log(image);
          console.log('Insert image success');
          resolve();
        },
        error => {
          console.error('Error inserting image', error);
          reject(error);
        },
      );
    });
  };

  updateImage = (
    imageId: string,
    transaction: Transaction,
    image: {imagePath: string; materialId: string; id: string},
    isSynchronise: boolean,
  ) => {
    console.log('imageId', imageId);
    console.log('image ::: ', image);
    console.log('isSynchronise ::::', isSynchronise);
    return new Promise<void>((resolve, reject) => {
      transaction.executeSql(
        `UPDATE images SET networkId = ?, imagePath = ?, isSynchronise = 1 WHERE id = ?`,
        [image.id, image.imagePath, isSynchronise ? 1 : 0, imageId],

        () => {
          console.log(image);
          console.log('Update image success');
          resolve();
        },
        error => {
          console.error('Error updating image 22', error);
          reject(error);
        },
      );
    });
  };

  getMaterialImagesById = (materialId: string) => {
    return new Promise<Images[]>((resolve, reject) => {
      getDatabseInstance().transaction(transaction => {
        transaction.executeSql(
          'SELECT * FROM images WHERE material_id = ?',
          [materialId],
          (__, results) => {
            const images: Images[] = [];
            for (let i = 0; i < results.rows.length; i++) {
              const res = results.rows.item(i);
              images.push({
                id: res.id,
                materialtId: res.material_id,
                imagePath: res.imagePath,
              });
            }
            resolve(images);
          },
          (__, error) => {
            reject(error);
          },
        );
      });
    });
  };

  markImageAsSynchronized = (imageId: string) => {
    return new Promise<void>((resolve, reject) => {
      getDatabseInstance().transaction(
        transaction => {
          transaction.executeSql(
            `UPDATE images SET isSynchronise = 1 WHERE id = ?`,
            [imageId],
            () => {
              console.log('Image marked as synchronized');
              resolve();
            },
            error => {
              console.error('Error marking image as synchronized', error);
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
  };

  fetchUnsynchronizedImages = (): Promise<Images[]> => {
    return new Promise<Images[]>((resolve, reject) => {
      getDatabseInstance().transaction(
        transaction => {
          transaction.executeSql(
            `SELECT images.id AS id, images.imagePath as imagePath, materials.networkId as materialId
             FROM images
             JOIN materials ON images.material_id = materials.id
             WHERE images.isSynchronise = 0 or images.networkId is null`,
            [],
            (_, {rows}) => {
              const images: Images[] = [];
              for (let i = 0; i < rows.length; i++) {
                const image = rows.item(i);
                console.log('image :', image);
                images.push({
                  id: image.id,
                  materialtId: image.materialId,
                  imagePath: image.imagePath,
                });
              }
              resolve(images);
            },
            error => {
              console.error('Error fetching unsynchronized images', error);
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
  };
}
