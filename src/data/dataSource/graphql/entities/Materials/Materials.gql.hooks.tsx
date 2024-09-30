import type * as Types from '../../../../../dataSource/graphql/graphql-schema-types';

import gql from 'graphql-tag';
import * as Urql from 'urql';
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
export const UseMaterialFieldsFragmentDoc = gql`
    fragment MaterialFields on Materials {
  materialName
  quantity
  price
  description
}
    `;
export const CreateMaterialDocument = gql`
    mutation createMaterial($values: CreateMaterialsDto!) {
  createMaterial(values: $values) {
    ...MaterialFields
    projectId
    categoryId
    materialState
    id
  }
}
    ${UseMaterialFieldsFragmentDoc}`;

export function useCreateMaterialMutation() {
  return Urql.useMutation<Types.CreateMaterialMutation, Types.CreateMaterialMutationVariables>(CreateMaterialDocument);
};
export const GetMaterialDocument = gql`
    query getMaterial($projectId: String!) {
  filterMaterials(projectId: $projectId) {
    ...MaterialFields
    created_by_id
    projectId
    categoryId
    materialState
    id
  }
}
    ${UseMaterialFieldsFragmentDoc}`;

export function useGetMaterialQuery(options: Omit<Urql.UseQueryArgs<Types.GetMaterialQueryVariables>, 'query'>) {
  return Urql.useQuery<Types.GetMaterialQuery, Types.GetMaterialQueryVariables>({ query: GetMaterialDocument, ...options });
};
export const GetMaterialListDocument = gql`
    query getMaterialList($projectId: String!) {
  filterMaterials(projectId: $projectId) {
    ...MaterialFields
    categoryId
    materialState
    projectId
    id
  }
}
    ${UseMaterialFieldsFragmentDoc}`;

export function useGetMaterialListQuery(options: Omit<Urql.UseQueryArgs<Types.GetMaterialListQueryVariables>, 'query'>) {
  return Urql.useQuery<Types.GetMaterialListQuery, Types.GetMaterialListQueryVariables>({ query: GetMaterialListDocument, ...options });
};
export const UploadFileDocument = gql`
    mutation UploadFile($values: UploadMaterialImageDTO!) {
  uploadFile(values: $values) {
    materialtId
    imagePath
    id
  }
}
    `;

export function useUploadFileMutation() {
  return Urql.useMutation<Types.UploadFileMutation, Types.UploadFileMutationVariables>(UploadFileDocument);
};
export const MaterialDetailsDocument = gql`
    query materialDetails($id: String!) {
  material(id: $id) {
    materialName
    materialState
    createdAt
    created_by_id
    categoryId
    price
    projectId
    id
    quantity
    description
    images {
      id
      materialtId
      imagePath
    }
  }
}
    `;

export function useMaterialDetailsQuery(options: Omit<Urql.UseQueryArgs<Types.MaterialDetailsQueryVariables>, 'query'>) {
  return Urql.useQuery<Types.MaterialDetailsQuery, Types.MaterialDetailsQueryVariables>({ query: MaterialDetailsDocument, ...options });
};
export const UpdateMaterialDocument = gql`
    mutation updateMaterial($id: String!, $values: UpdateMaterialsDto!) {
  updateMaterial(id: $id, values: $values) {
    ...MaterialFields
    materialState
    categoryId
    projectId
    created_by_id
    id
  }
}
    ${UseMaterialFieldsFragmentDoc}`;

export function useUpdateMaterialMutation() {
  return Urql.useMutation<Types.UpdateMaterialMutation, Types.UpdateMaterialMutationVariables>(UpdateMaterialDocument);
};
export const DeleteMaterialDocument = gql`
    mutation deleteMaterial($id: String!) {
  deleteMaterial(id: $id)
}
    `;

export function useDeleteMaterialMutation() {
  return Urql.useMutation<Types.DeleteMaterialMutation, Types.DeleteMaterialMutationVariables>(DeleteMaterialDocument);
};