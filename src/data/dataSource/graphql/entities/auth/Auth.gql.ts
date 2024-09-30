import {gql} from 'urql';

export const Singin_Mutation = gql`
  mutation signin($values: SigninDto!) {
    signin(values: $values) {
      access_token
      username
    }
  }
`;
