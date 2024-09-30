import React, {useEffect} from 'react';
import {Text, View, Image} from 'react-native';
import {ActivityIndicator} from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import styles from './SplashStyle';
import {cachKeys} from '../../data/dataSource/localData/storage/cacheKeys';
import messaging from '@react-native-firebase/messaging';
import {useAddDeviceTokenMutation} from '../../data/dataSource/graphql/entities/users/Users.gql.hooks';

type Props = {
  navigation: NativeStackNavigationProp<any>;
};

function SplashScreen({navigation}: Props) {
  const [, addDeviceToken] = useAddDeviceTokenMutation();

  useEffect(() => {
    const checkToken = async () => {
      try {
        // Get FCM token
        const fcmToken = await messaging().getToken();
        // console.log('FCM Token:', fcmToken);

        // Store the FCM token locally if needed
        await AsyncStorage.setItem(cachKeys.fcmToken, fcmToken);

        // Add device token to the server
        await addDeviceToken({deviceToken: fcmToken});

        // Check the authentication token
        const token = await AsyncStorage.getItem(cachKeys.token);
        if (token) {
          navigation.navigate('TabNavigator');
        } else {
          navigation.navigate('Login');
        }
      } catch (error) {
        console.error('Error checking token:', error);
        navigation.navigate('Login');
      }
    };

    setTimeout(checkToken, 3000);
  }, [navigation]);

  return (
    <View style={styles.container}>
      <Image
        style={styles.image}
        source={require('../../assets/images/logo.png')}
      />
      <ActivityIndicator
        animating={true}
        theme={{colors: {primary: '#182A4D'}}}
        size={'large'}
        style={styles.loading}
      />
      <Text>Welcome to our FSA</Text>
    </View>
  );
}

export default SplashScreen;
