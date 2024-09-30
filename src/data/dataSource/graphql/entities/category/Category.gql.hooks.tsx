import type * as Types from '../../../../../dataSource/graphql/graphql-schema-types';

import gql from 'graphql-tag';
import * as Urql from 'urql';
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;

export const GetAllCategoriesDocument = gql`
    query getAllCategories {
  getAllCategories {
    id
    name
    parent_id
  }
}
    `;

export function useGetAllCategoriesQuery(options?: Omit<Urql.UseQueryArgs<Types.GetAllCategoriesQueryVariables>, 'query'>) {
  return Urql.useQuery<Types.GetAllCategoriesQuery, Types.GetAllCategoriesQueryVariables>({ query: GetAllCategoriesDocument, ...options });
};