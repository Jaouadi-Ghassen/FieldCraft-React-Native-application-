import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import NotificationScreen from '../screens/Notification/NotificationScreen';
import SettingsNavigator from '../screens/Settings/Setting.navigator';
import ProjectNavigator from '../screens/Projects/Project.navigator';
import {TouchableOpacity, Text, Animated, View, StyleSheet} from 'react-native';
import {TabNavigationList} from './NavigationList';

function MyTabBar({
  state,
  descriptors,
  navigation,
  tabBarOptions,
}: {
  state: any;
  descriptors: any;
  navigation: any;
  tabBarOptions: any;
}) {
  const {
    inactiveTintColor,
    tabBarHeight,
    activeBackgroundColor,
    numOfTabs,
    tabBarBackgroundColor,
  } = tabBarOptions;

  const bubbleAnimation = new Animated.Value(0);

  const animateBubble = (index: number) => {
    Animated.timing(bubbleAnimation, {
      toValue: index,
      duration: 300,
      useNativeDriver: false,
    }).start();
  };

  return (
    <View
      style={[
        style.container,
        {height: tabBarHeight, backgroundColor: tabBarBackgroundColor},
      ]}>
      {state.routes.map((route: any, index: number) => {
        const {options} = descriptors[route.key];
        const label =
          options.tabBarLabel !== undefined
            ? options.tabBarLabel
            : options.title !== undefined
            ? options.title
            : route.name;

        const isFocused = state.index === index;
        const bubbleStyle = {
          backgroundColor: isFocused ? activeBackgroundColor : 'transparent',
          transform: [
            {
              translateY: bubbleAnimation.interpolate({
                inputRange: [0, numOfTabs - 1],
                outputRange: [0, tabBarHeight * index],
              }),
            },
          ],
        };

        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name);
          }
          animateBubble(index);
        };

        const onLongPress = () => {
          navigation.emit({
            type: 'tabLongPress',
            target: route.key,
          });
        };

        return (
          <TouchableOpacity
            key={index}
            accessibilityRole="button"
            accessibilityState={isFocused ? {selected: true} : {}}
            accessibilityLabel={options.tabBarAccessibilityLabel}
            testID={options.tabBarTestID}
            onPress={onPress}
            onLongPress={onLongPress}
            style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
            <Animated.View style={[style.bubble, bubbleStyle]}></Animated.View>
            <Text
              style={{
                color: isFocused ? 'white' : inactiveTintColor,
              }}>
              {label}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

const Tab = createBottomTabNavigator<TabNavigationList>();

interface TabNavigatorProps {
  tabBarOptions: any;
}

const TabNavigator: React.FC<TabNavigatorProps> = ({tabBarOptions}) => {
  return (
    <Tab.Navigator
      tabBar={props => <MyTabBar {...props} tabBarOptions={tabBarOptions} />}
      screenOptions={{headerShown: false}}>
      <Tab.Screen name="Project" component={ProjectNavigator} />
      <Tab.Screen name="Notification" component={NotificationScreen} />
      <Tab.Screen name="Settings" component={SettingsNavigator} />
    </Tab.Navigator>
  );
};

const style = StyleSheet.create({
  container: {
    flexDirection: 'row',
    bottom: 0,
    padding: 10,
  },
  bubble: {
    width: '100%',
    height: '100%',
    borderRadius: 50,
    position: 'absolute',
    bottom: 0,
  },
});

export default TabNavigator;
