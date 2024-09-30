import type * as Types from '../../../../../dataSource/graphql/graphql-schema-types';

import gql from 'graphql-tag';
import * as Urql from 'urql';
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;

export const AllHistoryDocument = gql`
    query AllHistory($projectId: String!) {
  findAllHistoryForProjectById(projectId: $projectId) {
    state
    createdAt
  }
}
    `;

export function useAllHistoryQuery(options: Omit<Urql.UseQueryArgs<Types.AllHistoryQueryVariables>, 'query'>) {
  return Urql.useQuery<Types.AllHistoryQuery, Types.AllHistoryQueryVariables>({ query: AllHistoryDocument, ...options });
};