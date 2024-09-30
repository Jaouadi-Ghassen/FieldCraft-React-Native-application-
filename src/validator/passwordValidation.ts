import * as yup from 'yup';
import {UpdateUserPasswordDto} from '../data/dataSource/graphql/graphql-schema-types';

export const UpdatePasswordValidation = yup.object<UpdateUserPasswordDto>({
  oldPassword: yup.string().required('Old password is required'),
  password: yup
    .string()
    .required()
    .min(4)
    .max(20)
    .matches(
      /((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/,
      'Password too weak',
    ),
  confirmPassword: yup
    .string()
    .required()
    .oneOf([yup.ref('password')], 'Passwords do not match'),
});
