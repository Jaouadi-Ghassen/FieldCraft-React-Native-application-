import React, {useState} from 'react';
import {Image, Text, TouchableOpacity, View} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Feather';
import BackButton from '../../components/HeaderBackButton/BackButton';
import ImagePickerComponent from '../../components/ImagePickerComponent/ImagePickerComponent';
import styles from './EditProfileStyle';
import {
  useCurrentuserIdQuery,
  useUserImageQuery,
  useUploadUserImageMutation,
} from '../../data/dataSource/graphql/entities/users/Users.gql.hooks';
import {Divider} from '../../components/Divider/Divider';
import {ActivityIndicator} from 'react-native-paper';
import {ImageOrVideo} from 'react-native-image-crop-picker';
import {StackScreenProps} from '@react-navigation/stack';
import {SettingsNavigationList} from '../../navigators/NavigationList';

const EditProfileScreen: React.FC<
  StackScreenProps<SettingsNavigationList, 'EditProfileEditScreen'>
> = ({navigation}) => {
  const handleEditPress = () => {
    if (userInfo) {
      navigation.navigate('EditProfileEditScreen', {userInfo: userInfo});
    }
  };

  const [{data: userData, fetching: userFetching, error: userError}] =
    useCurrentuserIdQuery();
  const [{data: imageData, fetching: imageFetching, error: imageError}] =
    useUserImageQuery();

  const [, uploadUserImage] = useUploadUserImageMutation();

  if (userFetching || imageFetching)
    return (
      <ActivityIndicator
        animating={true}
        theme={{colors: {primary: '#182A4D'}}}
        size={'large'}
        style={styles.loading}
      />
    );

  const updateImageProfile = async (image: ImageOrVideo) => {
    try {
      const file = {
        type: image.mime,
        name: image.filename ?? 'profile.jpg',
        uri: image.path,
      };
      await uploadUserImage({
        values: file,
      });
    } catch (error) {
      console.error('Error uploading image:', error);
    }
  };
  const uploadDirectory = process.env.PROFILE_URL;

  if (userError) return <Text>Error: {userError.message}</Text>;
  if (imageError) return <Text>Error: {imageError.message}</Text>;

  const userInfo = userData?.CurrentuserId;
  const userImage = imageData?.userImage;

  if (!userInfo) return <Text>No user data available</Text>;
  if (!userInfo) return <ActivityIndicator />;

  return (
    <View style={styles.container}>
      <BackButton title="Edit Profile" />
      <View style={styles.content}>
        <Image
          style={styles.avatar}
          source={{uri: `http://localhost:3000/uploads/profile/${userImage}`}}
        />
        <ImagePickerComponent
          onSelect={image => updateImageProfile(image[0])}
          display={
            <View style={styles.cameraIcon}>
              <Icon name="camera" size={22} color="white" />
            </View>
          }
        />
        <Text style={styles.username}>{userInfo.username}</Text>
      </View>
      <View style={styles.infoSection}>
        <View style={styles.info}>
          <Text style={styles.personalInfo}>Personal Information :</Text>
          <TouchableOpacity onPress={handleEditPress}>
            <Text>Edit</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.menu}>
          <View style={styles.menu_item}>
            <Icon name="user" size={22} color="gray" />
            <Text style={styles.menu_text}>First Name</Text>
            <Text style={styles.textInfo}>{userInfo.firstname}</Text>
          </View>
          <Divider />
          <View style={styles.menu_item}>
            <Icon name="user" size={22} color="gray" />
            <Text style={styles.menu_text}>Last Name</Text>
            <Text style={styles.textInfo}>{userInfo.lastname}</Text>
          </View>
          <Divider />
          <View style={styles.menu_item}>
            <Icon name="mail" size={22} color="gray" />
            <Text style={styles.menu_text}>Email</Text>
            <Text style={styles.textInfo}>{userInfo.email}</Text>
          </View>
          <Divider />
          <View style={styles.menu_item}>
            <Icon name="map-pin" size={22} color="gray" />
            <Text style={styles.menu_text}>Address</Text>
            <Text style={styles.textInfo}>{userInfo.adresse}</Text>
          </View>
        </View>
      </View>
    </View>
  );
};

export default EditProfileScreen;
