import {useState, useEffect, useCallback} from 'react';
import {
  useCreateMaterialMutation,
  useUpdateMaterialMutation,
} from '../../data/dataSource/graphql/entities/Materials/Materials.gql.hooks';
import {getDatabseInstance} from '../../data/dataSource/localData/database';
import {MaterialRepository} from '../../data/repository/materials.repository';
import {isOfflineError} from '../../helpers/isOfflineError';
import {PartialMaterial} from '../hooks/materials.hooks';

let isSyncronising = false;

export const useMaterialSync = () => {
  const [unsynchronizedMaterials, setUnsynchronizedMaterials] = useState<
    PartialMaterial[]
  >([]);
  const [, createMaterialMutation] = useCreateMaterialMutation();
  const [, updateMaterialMutation] = useUpdateMaterialMutation();
  const materialRepository = MaterialRepository.getInstance();

  useEffect(() => {
    const fetchUnsynchronizedMaterials = async () => {
      try {
        const materials =
          await materialRepository.fetchUnsynchronizedMaterials();
        setUnsynchronizedMaterials(materials);
      } catch (error) {
        console.error('Error fetching unsynchronized materials:', error);
      }
    };
    fetchUnsynchronizedMaterials();
  }, [materialRepository]);

  const syncMaterial = useCallback(
    async (material: PartialMaterial) => {
      console.log('material before sync:', material);
      try {
        if (!material.categoryId || !material.projectId) {
          console.error('Missing categoryId or projectId:', material);
          return;
        }

        if (material.networkId) {
          // Update existing material
          const response = await updateMaterialMutation({
            id: material.networkId,
            values: {
              categoryId: material.categoryId,
              description: material.description,
              materialName: material.materialName,
              materialState: material.materialState || 'new',
              price: material.price,
              quantity: material.quantity,
            },
          });
          if (response.error && !isOfflineError(response.error)) {
            console.error('Error updating material:', response.error);
            // await materialRepository.deleteMaterial(material.id);
          } else if (response.data) {
            await materialRepository.markMaterialAsSynchronized(material.id);
          }
        } else {
          // Create new material
          const response = await createMaterialMutation({
            values: {
              categoryId: material.categoryId,
              description: material.description,
              materialName: material.materialName,
              materialState: material.materialState || 'new',
              price: material.price,
              projectId: material.projectId,
              quantity: material.quantity,
            },
          });
          console.log('material after sync:', material);
          if (response.error && !isOfflineError(response.error)) {
            console.error('Error creating material:', response.error);
            // await materialRepository.deleteMaterial(material.id);
          } else if (response.data) {
            getDatabseInstance().transaction(async transaction => {
              await materialRepository.updateMaterial(
                material.id,
                response.data.createMaterial,
                transaction,
                true,
              );
            });
            await materialRepository.markMaterialAsSynchronized(material.id);
          }
        }
      } catch (error) {
        console.error('Error syncing material with server:', error);
        throw error;
      }
    },
    [createMaterialMutation, updateMaterialMutation, materialRepository],
  );

  const syncUnsynchronizedMaterials = useCallback(async () => {
    if (isSyncronising) {
      return;
    }
    if (unsynchronizedMaterials.length > 0) {
      console.log('syncing material', unsynchronizedMaterials.length);
      isSyncronising = true;
      await Promise.all(unsynchronizedMaterials.map(syncMaterial));
    }
    isSyncronising = false;
  }, [unsynchronizedMaterials, syncMaterial]);

  return syncUnsynchronizedMaterials;
};
