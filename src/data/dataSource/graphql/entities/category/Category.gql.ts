import {gql} from 'urql';

export const Get_All_Categories = gql`
  query getAllCategories {
    getAllCategories {
      id
      name
      parent_id
    }
  }
`;
