import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {FC} from 'react';
import ProjectDetailsScreen from '../ProjectDetailScreen/ProjectDetailScreen';
import ProjectsScreen from './ProjectsScreen';
import TopNavigationBar from '../../navigators/TopNavigationBar';
import {ProjectNavigationList} from '../../navigators/NavigationList';

const Stack = createStackNavigator<ProjectNavigationList>();
const ProjectNavigator: FC = () => {
  return (
    <Stack.Navigator initialRouteName="Projects">
      <Stack.Screen
        name="Projects"
        component={ProjectsScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="ProjectDetails"
        component={ProjectDetailsScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen name="TopNavigationBar" options={{headerShown: false}}>
        {() => <TopNavigationBar />}
      </Stack.Screen>
    </Stack.Navigator>
  );
};

export default ProjectNavigator;
