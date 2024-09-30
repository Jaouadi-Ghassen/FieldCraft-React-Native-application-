import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import EditProfileScreen from '../EditProfileMenu/EditProfileMenu';

const Stack = createStackNavigator();

const EditProfileNavigator: React.FC = () => {
  return (
    <Stack.Navigator initialRouteName="EditProfileScreen">
      <Stack.Screen
        name="EditProfileScreen"
        component={EditProfileScreen}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
};

export default EditProfileNavigator;
