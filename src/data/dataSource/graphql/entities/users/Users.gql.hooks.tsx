import type * as Types from '../../../../../dataSource/graphql/graphql-schema-types';

import gql from 'graphql-tag';
import * as Urql from 'urql';
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;

export const UpdateDocument = gql`
    mutation update($values: UpdateUserDto!) {
  update_user(values: $values) {
    username
    email
    lastname
    firstname
    adresse
  }
}
    `;

export function useUpdateMutation() {
  return Urql.useMutation<Types.UpdateMutation, Types.UpdateMutationVariables>(UpdateDocument);
};
export const UpdatePasswordDocument = gql`
    mutation UpdatePassword($values: UpdateUserPasswordDto!) {
  updatePassword(values: $values) {
    email
    username
  }
}
    `;

export function useUpdatePasswordMutation() {
  return Urql.useMutation<Types.UpdatePasswordMutation, Types.UpdatePasswordMutationVariables>(UpdatePasswordDocument);
};
export const UploadUserImageDocument = gql`
    mutation uploadUserImage($values: Upload!) {
  uploadUserImage(values: $values)
}
    `;

export function useUploadUserImageMutation() {
  return Urql.useMutation<Types.UploadUserImageMutation, Types.UploadUserImageMutationVariables>(UploadUserImageDocument);
};
export const UserImageDocument = gql`
    query userImage {
  userImage
}
    `;

export function useUserImageQuery(options?: Omit<Urql.UseQueryArgs<Types.UserImageQueryVariables>, 'query'>) {
  return Urql.useQuery<Types.UserImageQuery, Types.UserImageQueryVariables>({ query: UserImageDocument, ...options });
};
export const CurrentuserIdDocument = gql`
    query CurrentuserId {
  CurrentuserId {
    firstname
    lastname
    email
    firstname
    username
    adresse
  }
}
    `;

export function useCurrentuserIdQuery(options?: Omit<Urql.UseQueryArgs<Types.CurrentuserIdQueryVariables>, 'query'>) {
  return Urql.useQuery<Types.CurrentuserIdQuery, Types.CurrentuserIdQueryVariables>({ query: CurrentuserIdDocument, ...options });
};
export const AddDeviceTokenDocument = gql`
    mutation addDeviceToken($deviceToken: String!) {
  addDeviceToken(deviceToken: $deviceToken) {
    deviceToken
  }
}
    `;

export function useAddDeviceTokenMutation() {
  return Urql.useMutation<Types.AddDeviceTokenMutation, Types.AddDeviceTokenMutationVariables>(AddDeviceTokenDocument);
};