import React, {useState} from 'react';
import {View, Text} from 'react-native';
import ButtonComponent from '../../components/Button/ButtonComponent';
import BackButton from '../../components/HeaderBackButton/BackButton';
import InputTextComponent from '../../components/Input/InputTextComponent';
import MessageModal from '../../components/MessageModal/MessageModal';
import {useUpdatePasswordMutation} from '../../data/dataSource/graphql/entities/users/Users.gql.hooks';
import {UpdatePasswordValidation} from '../../validator/passwordValidation';
import styles from './Securitystyle';

function SecurityScreen() {
  const [oldPassword, setOldPassword] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [modalTitle, setModalTitle] = useState('');
  const [modalMessages, setModalMessages] = useState([]);
  const [modalIcon, setModalIcon] = useState('');
  const [, updatePassword] = useUpdatePasswordMutation();

  const handleSubmit = async () => {
    try {
      await UpdatePasswordValidation.validate({
        oldPassword,
        password,
        confirmPassword,
      });

      const result = await updatePassword({
        values: {oldPassword, password, confirmPassword},
      });

      if (result.error) {
        setModalTitle('Error');
        setModalMessages([result.error.message]);
        setModalIcon('alert');
      } else {
        setModalTitle('Success');
        setModalMessages(['Password updated successfully']);
        setModalIcon('check');
      }
    } catch (error: any) {
      setModalTitle('Error');
      setModalMessages(error.errors);
      setModalIcon('alert');
    }
    setModalVisible(true);
  };

  return (
    <View style={styles.container}>
      <BackButton title="Security" />
      <View style={styles.info}>
        <Text style={styles.changePassword}>Enter old password :</Text>
        <InputTextComponent
          placeholder="Old password ..."
          value={oldPassword}
          onChangeText={setOldPassword}
        />
        <Text style={styles.changePassword}>Enter new password :</Text>
        <InputTextComponent
          placeholder="New password ..."
          value={password}
          onChangeText={setPassword}
        />
        <InputTextComponent
          placeholder="Confirm password ..."
          value={confirmPassword}
          onChangeText={setConfirmPassword}
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
          onPress={() => {
            setOldPassword('');
            setPassword('');
            setConfirmPassword('');
          }}
        />
      </View>
      {modalVisible && (
        <MessageModal
          onClose={() => setModalVisible(false)}
          title={modalTitle}
          messages={modalMessages}
          icon={modalIcon}
        />
      )}
    </View>
  );
}

export default SecurityScreen;
