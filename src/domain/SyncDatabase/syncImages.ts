// import {useState, useEffect, useCallback} from 'react';
// import {useUploadFileMutation} from '../../data/dataSource/graphql/entities/Materials/Materials.gql.hooks';
// import {ImagesRepository} from '../../data/repository/images.repository';
// import {Images} from '../../data/dataSource/graphql/graphql-schema-types';

// export const useImageSync = () => {
//   const [unsynchronizedImages, setUnsynchronizedImages] = useState<Images[]>(
//     [],
//   );
//   const [, uploadFileMutation] = useUploadFileMutation();

//   const fetchUnsynchronizedImages = useCallback(async () => {
//     try {
//       const images =
//         await ImagesRepository.getInstance().fetchUnsynchronizedImages();
//       setUnsynchronizedImages(images);
//     } catch (error) {
//       console.error('Error fetching unsynchronized images:', error);
//     }
//   }, []);

//   useEffect(() => {
//     fetchUnsynchronizedImages();
//   }, [fetchUnsynchronizedImages]);

//   const syncImage = useCallback(
//     async (image: Images) => {
//       const file = {
//         type: 'image/jpeg',
//         name: 'material_image.jpg',
//         uri: image.imagePath,
//       };

//       try {
//         const response = await uploadFileMutation({
//           values: {image: file, materialId: image.materialtId},
//         });
//         console.log('Sync response:', response);
//         if (response.data) {
//           await ImagesRepository.getInstance().markImageAsSynchronized(
//             image.id,
//           );
//         } else {
//           console.error('Error updating images', response.error);
//         }
//       } catch (error) {
//         console.error('Error syncing image with server:', error);
//       }
//     },
//     [uploadFileMutation],
//   );

//   const syncUnsynchronizedImages = useCallback(async () => {
//     if (unsynchronizedImages.length > 0) {
//       await Promise.all(unsynchronizedImages.map(syncImage));
//     }
//   }, [unsynchronizedImages, syncImage]);

//   return {syncUnsynchronizedImages};
// };
import {useState, useEffect, useCallback} from 'react';
import {useUploadFileMutation} from '../../data/dataSource/graphql/entities/Materials/Materials.gql.hooks';
import {ImagesRepository} from '../../data/repository/images.repository';
import {Images} from '../../data/dataSource/graphql/graphql-schema-types';
import {getDatabseInstance} from '../../data/dataSource/localData/database';

let isSyncronising = false;
export const useImageSync = () => {
  const [unsynchronizedImages, setUnsynchronizedImages] = useState<Images[]>(
    [],
  );
  const [, uploadFileMutation] = useUploadFileMutation();

  const fetchUnsynchronizedImages = useCallback(async () => {
    try {
      const images =
        await ImagesRepository.getInstance().fetchUnsynchronizedImages();
      setUnsynchronizedImages(images);
    } catch (error) {
      console.error('Error fetching unsynchronized images:', error);
    }
  }, []);

  useEffect(() => {
    fetchUnsynchronizedImages();
  }, [fetchUnsynchronizedImages]);

  const syncImage = useCallback(
    async (image: Images) => {
      const file = {
        type: 'image/jpeg',
        name: 'material_image.jpg',
        uri: image.imagePath,
      };

      try {
        const response = await uploadFileMutation({
          values: {image: file, materialId: image.materialtId},
        });
        if (response.data) {
          getDatabseInstance().transaction(async transaction => {
            await ImagesRepository.getInstance().updateImage(
              image.id,
              transaction,
              response.data?.uploadFile,
              true,
            );
          });
        } else {
          console.error('Error updating images', response.error);
        }
      } catch (error) {
        console.error('Error syncing image with server:', error);
      }
    },
    [uploadFileMutation],
  );

  const syncUnsynchronizedImages = useCallback(async () => {
    if (isSyncronising) {
      return;
    }

    if (unsynchronizedImages.length > 0) {
      console.log('unsynchronizedImages', unsynchronizedImages[0]);
      console.log('syncing images');
      isSyncronising = true;
      await Promise.all(unsynchronizedImages.map(syncImage));
    }
    isSyncronising = false;
  }, [unsynchronizedImages, syncImage]);

  return syncUnsynchronizedImages;
};
