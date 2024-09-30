import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import MaterialScreen from '../Materials/MaterialScreen';

const Stack = createStackNavigator();

const MaterialNavigator: React.FC = () => {
  return (
    <Stack.Navigator initialRouteName="materials">
      <Stack.Screen
        name="materials"
        component={MaterialScreen}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
};

export default MaterialNavigator;
