import {gql} from 'urql';

const MaterialFragment = gql`
  fragment MaterialFields on Materials {
    materialName
    quantity
    price
    description
  }
`;

export const Create_Materials_Mutation = gql`
  mutation createMaterial($values: CreateMaterialsDto!) {
    createMaterial(values: $values) {
      ...MaterialFields
      projectId
      categoryId
      materialState
      id
    }
  }
  ${MaterialFragment}
`;

export const Get_Materials_Query = gql`
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
  ${MaterialFragment}
`;

export const Get_MaterialsList_Query = gql`
  query getMaterialList($projectId: String!) {
    filterMaterials(projectId: $projectId) {
      ...MaterialFields
      categoryId
      materialState
      projectId
      id
    }
  }
  ${MaterialFragment}
`;

export const Upload_Material_Images = gql`
  mutation UploadFile($values: UploadMaterialImageDTO!) {
    uploadFile(values: $values) {
      materialtId
      imagePath
      id
    }
  }
`;

export const Get_Material_Details = gql`
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

export const Update_Materials_Mutation = gql`
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
  ${MaterialFragment}
`;

export const Delete_Material = gql`
  mutation deleteMaterial($id: String!) {
    deleteMaterial(id: $id)
  }
`;
