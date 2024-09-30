import type * as Types from '../../../../../dataSource/graphql/graphql-schema-types';

import gql from 'graphql-tag';
import * as Urql from 'urql';
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;

export const SigninDocument = gql`
    mutation signin($values: SigninDto!) {
  signin(values: $values) {
    access_token
    username
  }
}
    `;

export function useSigninMutation() {
  return Urql.useMutation<Types.SigninMutation, Types.SigninMutationVariables>(SigninDocument);
};