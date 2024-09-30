import React, {FC} from 'react';
import {View, Image, Text} from 'react-native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import styles from './SettingStyle';
import ButtonComponent from '../../components/Button/ButtonComponent';
import BackButton from '../../components/HeaderBackButton/BackButton';
import Icon from 'react-native-vector-icons/AntDesign';
import {Divider} from '../../components/Divider/Divider';
import {useUserImageQuery} from '../../data/dataSource/graphql/entities/users/Users.gql.hooks';
import {ActivityIndicator} from 'react-native';
import storage from '../../data/dataSource/localData/storage';
import {cachKeys} from '../../data/dataSource/localData/storage/cacheKeys';

type Props = {
  navigation: NativeStackNavigationProp<any>;
};

const SettingScreen: FC<Props> = ({navigation}) => {
  const navigateTo = (screen: string) => {
    navigation.navigate(screen);
  };

  const handleLogout = async () => {
    try {
      await storage.remove({key: cachKeys.token});

      navigation.navigate('Login');
    } catch (error) {
      console.error('Error removing token from storage:', error);
    }
  };

  const [{data, fetching, error}] = useUserImageQuery();

  const userImage = data?.userImage;

  const renderImage = () => {
    if (fetching) {
      return <ActivityIndicator size="large" />;
    } else if (userImage) {
      return (
        <Image
          style={styles.avatar}
          source={{uri: `http://localhost:3000/uploads/profile/${userImage}`}}
        />
      );
    } else {
      return (
        <Image
          style={styles.avatar}
          source={require('../../assets/images/avatar.png')}
        />
      );
    }
  };

  return (
    <View style={styles.container}>
      <BackButton title="Settings" />
      <View style={styles.content}>
        {renderImage()}
        <View style={styles.menu_group}>
          <View style={styles.menu_item}>
            <Icon
              name="user"
              size={22}
              color="gray"
              onPress={() => navigateTo('Edit')}
            />
            <Text style={styles.menu_text} onPress={() => navigateTo('Edit')}>
              Edit profile
            </Text>
            <Icon
              name="right"
              size={20}
              color="gray"
              onPress={() => navigateTo('Edit')}
            />
          </View>
          <Divider />
          <View style={styles.menu_item}>
            <Icon
              name="Safety"
              size={22}
              color="gray"
              onPress={() => navigateTo('Security')}
            />
            <Text
              style={styles.menu_text}
              onPress={() => navigateTo('Security')}>
              Security
            </Text>
            <Icon
              name="right"
              size={20}
              color="gray"
              onPress={() => navigateTo('Security')}
            />
          </View>
          <Divider />
          <View style={styles.menu_item}>
            <Icon
              name="mail"
              size={22}
              color="gray"
              onPress={() => navigateTo('Contact')}
            />
            <Text
              style={styles.menu_text}
              onPress={() => navigateTo('Contact')}>
              Contact
            </Text>
            <Icon
              name="right"
              size={20}
              color="gray"
              onPress={() => navigateTo('Contact')}
            />
          </View>
        </View>
        <View style={styles.logout_btn}>
          <ButtonComponent
            title="Sign Out"
            onPress={handleLogout}
            variant="secondary"
          />
        </View>
      </View>
    </View>
  );
};

export default SettingScreen;
