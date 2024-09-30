import * as yup from 'yup';
import {SigninDto} from '../data/dataSource/graphql/graphql-schema-types';

export const AuthValidation = yup.object<SigninDto>({
  username: yup.string().required(),
  password: yup.string().required(),
});
