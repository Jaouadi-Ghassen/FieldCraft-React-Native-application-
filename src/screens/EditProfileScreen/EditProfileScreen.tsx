import {StackScreenProps} from '@react-navigation/stack';
import React, {useEffect, useState} from 'react';
import {View, Text, ScrollView} from 'react-native';
import ButtonComponent from '../../components/Button/ButtonComponent';
import BackButton from '../../components/HeaderBackButton/BackButton';
import InputTextComponent from '../../components/Input/InputTextComponent';
import MessageModal from '../../components/MessageModal/MessageModal';
import {useUpdateMutation} from '../../data/dataSource/graphql/entities/users/Users.gql.hooks';
import {SettingsNavigationList} from '../../navigators/NavigationList';
import styles from './EditProfileScreenStyle';

const EditProfileEditScreen: React.FC<
  StackScreenProps<SettingsNavigationList, 'EditProfileEditScreen'>
> = ({route, navigation}) => {
  const {userInfo} = route.params;

  const [username, setUsername] = useState(userInfo.username);
  const [firstname, setFirstname] = useState(userInfo.firstname);
  const [lastname, setLastname] = useState(userInfo.lastname);
  const [email, setEmail] = useState(userInfo.email);
  const [adresse, setAdresse] = useState(userInfo.adresse);
  const [showModal, setShowModal] = useState(false);
  const [modalTimeout, setModalTimeout] = useState<NodeJS.Timeout | null>(null);

  const [, updateUser] = useUpdateMutation();

  const handleSubmit = async () => {
    try {
      const response = await updateUser({
        values: {username, email, adresse, firstname, lastname},
      });
      if (response.error) {
        console.error('Error updating user information', response.error);
      } else if (response.data) {
        setShowModal(true);
        const timeout = setTimeout(() => setShowModal(false), 3000);
        setModalTimeout(timeout);
        navigation.navigate('EditProfileScreen', {
          userInfo: response.data.update_user,
        });
      } else {
        console.error('No response data');
      }
    } catch (error) {
      console.error('Error updating user information', error);
    }
  };

  useEffect(() => {
    return () => {
      if (modalTimeout !== null) {
        clearTimeout(modalTimeout);
      }
    };
  }, [modalTimeout]);

  return (
    <ScrollView style={styles.container}>
      <BackButton title="Edit Profile Info" />
      <View style={styles.content}>
        <Text style={styles.changeInfo1}>Enter new information:</Text>
        <Text style={styles.changeInfo}>Username:</Text>
        <InputTextComponent
          placeholder="Username"
          value={username}
          onChangeText={setUsername}
        />
        <Text style={styles.changeInfo}>First name:</Text>
        <InputTextComponent
          placeholder="First name"
          value={firstname}
          onChangeText={setFirstname}
        />
        <Text style={styles.changeInfo}>Last name:</Text>
        <InputTextComponent
          placeholder="Last name"
          value={lastname}
          onChangeText={setLastname}
        />
        <Text style={styles.changeInfo}>Email:</Text>
        <InputTextComponent
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
        />
        <Text style={styles.changeInfo}>Address:</Text>
        <InputTextComponent
          placeholder="Address"
          value={adresse}
          onChangeText={setAdresse}
        />
      </View>
      <View style={styles.buttonGroup}>
        <ButtonComponent
          title="Save"
          variant="primary"
          onPress={handleSubmit}
        />
        <ButtonComponent
          title="Cancel"
          variant="secondary"
          onPress={() => navigation.goBack()}
        />
      </View>
      {showModal && (
        <MessageModal
          onClose={() => setShowModal(false)}
          title="Success"
          messages={['User information updated successfully!']}
          icon="check"
        />
      )}
    </ScrollView>
  );
};

export default EditProfileEditScreen;
