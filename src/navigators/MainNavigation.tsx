import {NavigationContainer} from '@react-navigation/native';
import SplashScreen from '../screens/Splash/SplashScreen';
import LoginScreen from '../screens/Login/LoginScreen';
import TabNavigator from '../navigators/TabNavigator';
import {createStackNavigator} from '@react-navigation/stack';
import CreateMaterialScreen from '../screens/CreateMaterial/CreateMaterialcreen';
import NotificationDetailScreen from '../screens/NotificationDetail/NotificationDetailScreen';
import MaterialDetailScreen from '../screens/MaterialDetailScreen/MaterialDetailScreen';
import EditMaterialScreen from '../screens/EditMaterial/EditMaterialScreen';
import {MainNavigationList} from './NavigationList';

const Stack = createStackNavigator<MainNavigationList>();

function MainNavigation() {
  const tabBarOptions = {
    activeTintColor: '#ffffff',
    inactiveTintColor: 'grey',
    tabBarType: 'bubbleTab',
    tabBarHeight: 70,
    activeBackgroundColor: '#182A4D',
    numOfTabs: 4,
    tabBarBackgroundColor: '#ffffff',
  };
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName={'Splash'}>
        <Stack.Screen
          name="Splash"
          component={SplashScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Login"
          options={{headerShown: false}}
          component={LoginScreen}
        />
        <Stack.Screen name="TabNavigator" options={{headerShown: false}}>
          {() => <TabNavigator tabBarOptions={tabBarOptions} />}
        </Stack.Screen>
        <Stack.Screen
          name="CreateMaterial"
          options={{headerShown: false}}
          component={CreateMaterialScreen}
        />
        <Stack.Screen
          name="EditMaterialScreen"
          options={{headerShown: false}}
          component={EditMaterialScreen}
        />
        <Stack.Screen
          name="NotificationDetails"
          options={{headerShown: false}}
          component={NotificationDetailScreen}
        />
        <Stack.Screen
          name="MaterialDetails"
          component={MaterialDetailScreen}
          options={{headerShown: false}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default MainNavigation;
