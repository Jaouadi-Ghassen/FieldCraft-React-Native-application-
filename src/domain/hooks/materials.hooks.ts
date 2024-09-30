import {useState, useEffect} from 'react';
import {
  useCreateMaterialMutation,
  useGetMaterialListQuery,
  useMaterialDetailsQuery,
  useUpdateMaterialMutation,
} from '../../data/dataSource/graphql/entities/Materials/Materials.gql.hooks';
import {Materials} from '../../data/dataSource/graphql/graphql-schema-types';
import {getDatabseInstance} from '../../data/dataSource/localData/database';
import {ImagesRepository} from '../../data/repository/images.repository';
import {MaterialRepository} from '../../data/repository/materials.repository';
import {isOfflineError} from '../../helpers/isOfflineError';

export type PartialMaterial = Omit<
  Materials,
  'category' | 'createdAt' | 'created_by_id' | 'images'
>;

export const useGetMaterials = (projectId: string) => {
  const [materials, setMaterials] = useState<PartialMaterial[]>([]);
  const [fetching, setFetching] = useState<boolean>(false);

  useEffect(() => {
    fetchStoredMaterials();
  }, [projectId]);

  const [{data}, refetch] = useGetMaterialListQuery({
    variables: {projectId},
    requestPolicy: 'network-only',
  });

  const fetchStoredMaterials = async () => {
    try {
      setFetching(true);
      const storedMaterials =
        await MaterialRepository.getInstance().getAllMaterials(projectId);
      setMaterials(storedMaterials);
      // console.log('materials :', storedMaterials);
    } catch (err) {
      console.error('Error fetching materials from local storage', err);
    } finally {
      setFetching(false);
    }
  };

  const onRefresh = () => {
    fetchStoredMaterials();
    refetch();
  };

  useEffect(() => {
    if (data?.filterMaterials) {
      const saveMaterials = async () => {
        try {
          setFetching(true);
          await MaterialRepository.getInstance().setAllMaterials(
            data.filterMaterials,
          );
          setMaterials(data.filterMaterials);
        } catch (err) {
          console.error('Error saving materials to local storage', err);
        } finally {
          setFetching(false);
        }
      };
      saveMaterials();
    }
  }, [data]);

  return {materials, fetching, onRefresh};
};

export type MaterialDetails = {
  id: string;
  materialName: string;
  description: string;
  materialState: 'new' | 'old' | 'used';
  price: number;
  quantity: number;
  isSynchronised: boolean;
  categoryId: string;
  images: {id: string; imagePath: string}[];
  category: {
    id: string;
    name: string;
    parent: {id: string; name: string} | null;
  } | null;
};

export const useGetMaterialDetails = (materialId: string) => {
  const [material, setMaterial] = useState<MaterialDetails | null>(null);
  const [fetching, setFetching] = useState<boolean>(false);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchStoredMaterial = async () => {
      try {
        setFetching(true);
        const storedMaterial =
          await MaterialRepository.getInstance().getMaterialById(materialId);
        const images =
          await ImagesRepository.getInstance().getMaterialImagesById(
            materialId,
          );
        if (storedMaterial) {
          const materialDetails: MaterialDetails = {
            id: storedMaterial.id,
            materialName: storedMaterial.materialName,
            description: storedMaterial.description,
            materialState: storedMaterial.materialState as
              | 'new'
              | 'old'
              | 'used',
            price: storedMaterial.price,
            quantity: storedMaterial.quantity,
            isSynchronised: false,
            categoryId: storedMaterial.categoryId,
            images,
            category: null,
          };
          setMaterial(materialDetails);
        }
      } catch (err) {
        console.error('Error fetching material from local storage', err);
        setError(err as Error);
      } finally {
        setFetching(false);
      }
    };
    fetchStoredMaterial();
  }, [materialId]);

  const [{data, fetching: fetchingRemote, error: remoteError}] =
    useMaterialDetailsQuery({
      variables: {id: materialId},
      requestPolicy: 'cache-and-network',
    });

  useEffect(() => {
    if (data?.material) {
      const saveMaterial = async () => {
        try {
          setFetching(true);
          const material = await MaterialRepository.getInstance().setMaterial(
            data.material,
          );
          data.material.images.forEach(async image => {
            await ImagesRepository.getInstance().setImage(image, material.id);
          });
          setMaterial(data.material as any);
        } catch (err) {
          console.error('Error saving material to local storage', err);
          setError(err as Error);
        } finally {
          setFetching(false);
        }
      };
      saveMaterial();
    }
  }, [data]);

  return {
    material,
    fetching: fetching || fetchingRemote,
    error: error || remoteError,
  };
};

export const useUpdateMaterial = () => {
  const [updating, setUpdating] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const [, updateMaterialMutation] = useUpdateMaterialMutation();

  const updateMaterial = async (
    materialId: string,
    updatedMaterial: PartialMaterial,
  ) => {
    setUpdating(true);
    setError(null);

    try {
      // Update material remotely
      const response = await updateMaterialMutation({
        id: materialId,
        values: {
          categoryId: updatedMaterial.categoryId,
          description: updatedMaterial.description,
          materialName: updatedMaterial.materialName,
          materialState: updatedMaterial.materialState,
          price: updatedMaterial.price,
          quantity: updatedMaterial.quantity,
        },
      });

      if (isOfflineError(response.error)) {
        // Update material locally
        await updateMaterialLocally(materialId, updatedMaterial);
      } else if (response.data) {
        await MaterialRepository.getInstance().setMaterial(
          response.data.updateMaterial,
        );
      }
    } catch (err: any) {
      console.error('Error updating material:', err);
      setError(err);
    } finally {
      setUpdating(false);
    }
  };

  // Offline update
  const updateMaterialLocally = async (
    materialId: string,
    updatedMaterial: PartialMaterial,
  ) => {
    try {
      await MaterialRepository.getInstance().updateMaterialLocally(
        materialId,
        updatedMaterial,
      );
    } catch (error) {
      console.error('Error updating material locally:', error);
      throw error;
    }
  };

  return {updateMaterial, updating, error};
};

export const useCreateMaterial = () => {
  const [creating, setCreating] = useState<boolean>(false);
  const [error, setError] = useState<Error | null>(null);
  const [, createMaterialMutation] = useCreateMaterialMutation();

  const createMaterial = async (
    newMaterial: PartialMaterial,
  ): Promise<Materials | undefined> => {
    setCreating(true);
    setError(null);

    try {
      // Create material remotely
      const response = await createMaterialMutation({
        values: {
          projectId: newMaterial.projectId,
          categoryId: newMaterial.categoryId,
          description: newMaterial.description,
          materialName: newMaterial.materialName,
          materialState: newMaterial.materialState,
          price: newMaterial.price,
          quantity: newMaterial.quantity,
        },
      });
      console.log('new created materail ', response);
      if (isOfflineError(response.error)) {
        // Create material locally
        return createMaterialLocally(newMaterial);
      } else if (response.data) {
        console.log('ay haja');
        return MaterialRepository.getInstance().setMaterial(
          response.data.createMaterial,
        );
      }
    } catch (err: any) {
      console.error('Error creating material:', err);
      setError(err);
    } finally {
      setCreating(false);
    }
  };

  const createMaterialLocally = async (newMaterial: PartialMaterial) => {
    try {
      return new Promise<Materials>((resolve, reject) => {
        getDatabseInstance().transaction(async (transaction: any) => {
          const result = await MaterialRepository.getInstance().insertMaterial(
            newMaterial,
            transaction,
            false,
          );
          resolve(result);
        });
      });
    } catch (error) {
      console.error('Error creating material locally:', error);
      throw error;
    }
  };

  return {createMaterial, creating, error};
};
