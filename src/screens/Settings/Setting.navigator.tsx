import {createStackNavigator} from '@react-navigation/stack';
import {FC} from 'react';
import {SettingsNavigationList} from '../../navigators/NavigationList';
import ContactSupportScreen from '../ContactSupport/ContactSupportScreen';
import EditProfileNavigator from '../EditProfileScreen/EditProfile.navigator';
import EditProfileEditScreen from '../EditProfileScreen/EditProfileScreen';
import SecurityScreen from '../Security/SecutiryScreen';
import SettingScreen from './SettingScreen';

const Stack = createStackNavigator<SettingsNavigationList>();

const SettingsNavigator: FC = () => {
  return (
    <Stack.Navigator initialRouteName="test">
      <Stack.Screen
        name="test"
        component={SettingScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Edit"
        component={EditProfileNavigator}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Security"
        component={SecurityScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Contact"
        component={ContactSupportScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="EditProfileEditScreen"
        component={EditProfileEditScreen}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
};

export default SettingsNavigator;
