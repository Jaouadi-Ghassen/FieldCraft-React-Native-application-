import React from 'react';
import {View, Text} from 'react-native';
import styles from './ProjectDetailStyle';
import BackButton from '../../components/HeaderBackButton/BackButton';
import TopNavigationBar from '../../navigators/TopNavigationBar';
import {StackScreenProps} from '@react-navigation/stack';
import {ProjectNavigationList} from '../../navigators/NavigationList';

const ProjectDetailsScreen: React.FC<
  StackScreenProps<ProjectNavigationList, 'ProjectDetails'>
> = ({route}) => {
  const {projectName, projectReference} = route.params.ProjectDetails;

  return (
    <View style={styles.container}>
      <BackButton title={projectName} />
      <View>
        <Text style={styles.projectReference}>#{projectReference}</Text>
      </View>
      <TopNavigationBar />
    </View>
  );
};

export default ProjectDetailsScreen;
