import {gql} from 'urql';

export const Project_Query = gql`
  query getProjectList {
    filterProjects {
      projectName
      reference
      projectAdress
      id
      city
      codePostal
      endDate
      estimatedEndDate
      estimatedstartDate
      startDate
    }
  }
`;
