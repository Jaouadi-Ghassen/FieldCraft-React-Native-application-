import {useState} from 'react';
import {useUploadFileMutation} from '../../data/dataSource/graphql/entities/Materials/Materials.gql.hooks';
import {Materials} from '../../data/dataSource/graphql/graphql-schema-types';
import {getDatabseInstance} from '../../data/dataSource/localData/database';
import {ImagesRepository} from '../../data/repository/images.repository';
import {isOfflineError} from '../../helpers/isOfflineError';

export const useUploadImages = () => {
  const [uploading, setUploading] = useState<boolean>(false);
  const [error, setError] = useState<Error | null>(null);
  const [, uploadFileMutation] = useUploadFileMutation();

  const uploadImages = async (images: string[], material: Materials) => {
    setUploading(true);
    setError(null);

    try {
      const uploadPromises = images.map(async image => {
        const file = {
          type: 'image/jpeg',
          name: 'material_image.jpg',
          uri: image,
        };

        if (material.networkId) {
          const response = await uploadFileMutation({
            values: {image: file, materialId: material.networkId},
          });
          if (isOfflineError(response.error)) {
            // Handle offline error
            await uploadImagesLocally(file.uri, material.id);
          } else if (response.data) {
            await ImagesRepository.getInstance().setImage(
              response.data.uploadFile,
              material.id,
            );
          }
        } else {
          await uploadImagesLocally(file.uri, material.id);
        }
      });

      const responses = await Promise.all(uploadPromises);
      console.log('Image upload responses:', responses);
      console.log('Images uploaded:', images);
    } catch (err: any) {
      console.error('Error uploading images:', err);
      setError(err);
    } finally {
      setUploading(false);
    }
  };

  const uploadImagesLocally = async (uri: string, materialId: string) => {
    console.log(materialId);
    try {
      await getDatabseInstance().transaction(async (transaction: any) => {
        await ImagesRepository.getInstance().insertImage(
          transaction,
          {
            materialId,
            imagePath: uri,
          },
          false,
        );
      });
    } catch (error) {
      console.error('Error uploading image locally:', error);
      throw error;
    }
  };

  return {uploadImages, uploading, error};
};
