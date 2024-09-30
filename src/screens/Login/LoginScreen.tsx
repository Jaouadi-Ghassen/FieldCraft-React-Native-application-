import React, {useState, useCallback, useEffect} from 'react';
import {Image, Text, View} from 'react-native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import ButtonComponent from '../../components/Button/ButtonComponent';
import InputTextComponent from '../../components/Input/InputTextComponent';
import styles from './LoginStyle';
import MessageModal from '../../components/MessageModal/MessageModal';
import Snackbar from 'react-native-snackbar';
import {useSigninMutation} from '../../data/dataSource/graphql/entities/auth/Auth.gql.hooks';
import {SigninMutationVariables} from '../../data/dataSource/graphql/graphql-schema-types';
import {useForm, Controller} from 'react-hook-form';
import storage from '../../data/dataSource/localData/storage';
import {cachKeys} from '../../data/dataSource/localData/storage/cacheKeys';
import {AuthValidation} from '../../validator/authValidation';

type Props = {
  navigation: NativeStackNavigationProp<any>;
};

interface FormData {
  username: string;
  password: string;
}

const Login: React.FC<Props> = ({navigation}) => {
  const [showModal, setShowModal] = useState(false);
  const [errorMessage, setErrorMessage] = useState<Array<string>>([]);
  const {control, handleSubmit} = useForm<FormData>({});
  const [{data, error}, signinMutation] = useSigninMutation();

  const onSubmit = useCallback(async (formData: FormData) => {
    try {
      console.log(formData);
      const validation = AuthValidation.validateSync(formData, {
        abortEarly: false,
        disableStackTrace: true,
      });
      const variables: SigninMutationVariables = {
        values: {
          username: formData.username,
          password: formData.password,
        },
      };
      signinMutation(variables);
    } catch (error: any) {
      setErrorMessage(
        error.inner.length
          ? error.inner.map((it: any) => it.message)
          : ['An error occurred during login.'],
      );
      setShowModal(true);
    }
  }, []);

  useEffect(() => {
    if (data?.signin) {
      const {access_token, username} = data.signin;
      storage
        .save({key: cachKeys.token, data: access_token})
        .then(() => {
          console.log('Test token retrieved:', access_token);
        })
        .catch(error => {
          console.log('Error retrieving test token:', error);
        });
      navigation.navigate('TabNavigator');
      Snackbar.show({
        text: `Welcome ${username}`,
        duration: Snackbar.LENGTH_SHORT,
        backgroundColor: '#182A4D',
        textColor: 'white',
        marginBottom: 20,
      });
    } else if (error) {
      setErrorMessage(['Username or password is incorrect.']);
      setShowModal(true);
    }
  }, [data, navigation, error]);

  return (
    <View style={styles.container}>
      <Image
        style={styles.logo}
        source={require('../.././assets/images/logo.png')}
      />
      <View style={styles.input_container}>
        <Controller
          control={control}
          render={({field: {onChange, value}}) => (
            <InputTextComponent
              placeholder="Username ..."
              onChangeText={onChange}
              value={value}
              keyboardType={'default'}
            />
          )}
          name="username"
        />

        <Controller
          control={control}
          render={({field: {onChange, value}}) => (
            <InputTextComponent
              placeholder="Password ..."
              onChangeText={onChange}
              value={value}
              secureTextEntry={true}
              keyboardType={'default'}
            />
          )}
          name="password"
        />
      </View>
      <View style={styles.login_btn}>
        <ButtonComponent
          title="Connexion"
          onPress={handleSubmit(onSubmit)}
          variant="primary"
        />
      </View>
      <View>
        <Text style={styles.forget_pass}>
          Password forgotten? Check admin <Text style={styles.link}>here.</Text>
        </Text>
      </View>
      {showModal && (
        <MessageModal
          onClose={() => setShowModal(false)}
          title="Notice"
          messages={errorMessage}
          icon="alert"
        />
      )}
    </View>
  );
};

export default Login;
