import {gql} from 'urql';

export const Update_User_Mutation = gql`
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

export const Update_Password_Mutation = gql`
  mutation UpdatePassword($values: UpdateUserPasswordDto!) {
    updatePassword(values: $values) {
      email
      username
    }
  }
`;

export const uploadUserImageMutation = gql`
  mutation uploadUserImage($values: Upload!) {
    uploadUserImage(values: $values)
  }
`;

export const Find_User_Image = gql`
  query userImage {
    userImage
  }
`;

export const Get_Current_User = gql`
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

export const Add_Device_Token_Mutation = gql`
  mutation addDeviceToken($deviceToken: String!) {
    addDeviceToken(deviceToken: $deviceToken) {
      deviceToken
    }
  }
`;
