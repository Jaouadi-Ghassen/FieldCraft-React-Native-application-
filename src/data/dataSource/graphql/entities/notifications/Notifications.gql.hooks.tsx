import type * as Types from '../../../../../dataSource/graphql/graphql-schema-types';

import gql from 'graphql-tag';
import * as Urql from 'urql';
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;

export const GetNotificationListDocument = gql`
    query getNotificationList {
  notifications {
    content
    subTitle
    title
    createdAt
  }
}
    `;

export function useGetNotificationListQuery(options?: Omit<Urql.UseQueryArgs<Types.GetNotificationListQueryVariables>, 'query'>) {
  return Urql.useQuery<Types.GetNotificationListQuery, Types.GetNotificationListQueryVariables>({ query: GetNotificationListDocument, ...options });
};