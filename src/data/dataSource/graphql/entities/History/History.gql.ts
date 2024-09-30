import {gql} from 'urql';

export const Get_All_History_Query = gql`
  query AllHistory($projectId: String!) {
    findAllHistoryForProjectById(projectId: $projectId) {
      state
      createdAt
    }
  }
`;
