import type * as Types from '../../../../../dataSource/graphql/graphql-schema-types';

import gql from 'graphql-tag';
import * as Urql from 'urql';
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;

export const GetProjectListDocument = gql`
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

export function useGetProjectListQuery(options?: Omit<Urql.UseQueryArgs<Types.GetProjectListQueryVariables>, 'query'>) {
  return Urql.useQuery<Types.GetProjectListQuery, Types.GetProjectListQueryVariables>({ query: GetProjectListDocument, ...options });
};