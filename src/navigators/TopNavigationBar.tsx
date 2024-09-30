import React from 'react';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import {View, TouchableOpacity, Text, StyleSheet} from 'react-native';
import TaskScreen from '../screens/Tasks/TaskScreen';
import HistoryScreen from '../screens/History/HistoryScreen';
import MaterialNavigator from '../screens/MaterialDetailScreen/Material.navigator';
import {TopNavigationList} from './NavigationList';

const Tab = createMaterialTopTabNavigator<TopNavigationList>();

interface MyTabBarProps {
  state: any;
  descriptors: any;
  navigation: any;
}

const MyTabBar: React.FC<MyTabBarProps> = ({
  state,
  descriptors,
  navigation,
}) => {
  return (
    <View style={styles.tabBarContainer}>
      {state.routes.map((route: any, index: number) => {
        const {options} = descriptors[route.key];
        const label =
          options.tabBarLabel !== undefined
            ? options.tabBarLabel
            : options.title !== undefined
            ? options.title
            : route.name;
        const isFocused = state.index === index;
        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true,
          });
          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name, route.params);
          }
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
            style={styles.tabItem}>
            <Text style={styles.tabLabel}>{label}</Text>
            {isFocused && <View style={styles.underline} />}
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

const TopNavigationBar: React.FC = () => {
  return (
    <Tab.Navigator tabBar={props => <MyTabBar {...props} />}>
      <Tab.Screen name="Materials" component={MaterialNavigator} />
      <Tab.Screen name="Tasks">{() => <TaskScreen />}</Tab.Screen>
      <Tab.Screen name="History">{() => <HistoryScreen />}</Tab.Screen>
    </Tab.Navigator>
  );
};
const styles = StyleSheet.create({
  tabBarContainer: {
    flexDirection: 'row',
    backgroundColor: 'white',
    height: '10%',
    marginTop: '3%',
  },
  tabItem: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  tabLabel: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'black',
  },
  underline: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    width: '100%',
    height: 2,
    backgroundColor: '#182A4D',
  },
});

export default TopNavigationBar;
