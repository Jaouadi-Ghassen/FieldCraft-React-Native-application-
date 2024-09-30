import {View} from 'react-native';
import BackButton from '../../components/HeaderBackButton/BackButton';
import styles from './ContactSupportStyle';

function ContactSupportScreen() {
  return (
    <View style={styles.container}>
      <BackButton title="Contact Support" />
    </View>
  );
}

export default ContactSupportScreen;
