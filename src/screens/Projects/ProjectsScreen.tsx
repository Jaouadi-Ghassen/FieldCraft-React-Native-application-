import React, {FC, useState, useCallback, useEffect} from 'react';
import {View, ScrollView, Text, RefreshControl} from 'react-native';
import BackButton from '../../components/HeaderBackButton/BackButton';
import ProjectCell from '../../components/ProjectCell/ProjectCell';
import styles from './ProjectsStyle';
import Icon from 'react-native-vector-icons/Feather';
import {useDispatch} from 'react-redux';
import {ActivityIndicator} from 'react-native-paper';
import {useGetProjects} from '../../domain/hooks/project.hooks';
import SearchInput from '../../components/SreachInput/SearchInput';
import {ProjectNavigationList} from '../../navigators/NavigationList';
import {StackScreenProps} from '@react-navigation/stack';

const ProjectsScreen: FC<
  StackScreenProps<ProjectNavigationList, 'Projects'>
> = ({navigation}) => {
  const dispatch = useDispatch();

  const navigateToProjectDetails = useCallback(
    (projectName: string, projectReference: string, projectId: string) => {
      dispatch.application.setProjectId(projectId);
      navigation.navigate('ProjectDetails', {
        ProjectDetails: {
          projectName,
          projectReference,
        },
      });
    },
    [dispatch, navigation],
  );

  const {projects, fetching, error, refetch} = useGetProjects();

  useEffect(() => {
    console.log(error);
    setTimeout(() => {
      refetch();
    }, 1000);
    if (error) {
    }
  }, []);

  const [searchTerm, setSearchTerm] = useState('');

  const onRefresh = useCallback(() => {
    refetch();
  }, []);

  if (fetching) {
    return (
      <View style={styles.loading}>
        <ActivityIndicator
          animating={true}
          theme={{colors: {primary: '#182A4D'}}}
          size={'large'}
        />
      </View>
    );
  }

  const filteredProjects = projects.filter(project =>
    project.projectName.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  return (
    <View style={styles.container}>
      <BackButton title="Projects" />
      <ScrollView
        refreshControl={
          <RefreshControl refreshing={fetching} onRefresh={onRefresh} />
        }>
        <SearchInput searchTerm={searchTerm} onSearchChange={setSearchTerm} />
        <View style={styles.projectGroup}>
          {filteredProjects.length > 0 ? (
            filteredProjects.map((project, index) => (
              <ProjectCell
                key={index}
                projectName={project.projectName}
                projectReference={project.reference}
                address={project.projectAdress}
                onPress={() =>
                  navigateToProjectDetails(
                    project.projectName,
                    project.reference,
                    project.id,
                  )
                }
              />
            ))
          ) : (
            <View style={{height: 500, alignItems: 'center', marginTop: '30%'}}>
              <Icon name="alert-octagon" size={100} color="#182A4D" />
              <Text
                style={{
                  marginTop: '8%',
                  fontSize: 20,
                  color: '#182A4D',
                  fontWeight: '900',
                }}>
                No Projects found
              </Text>
            </View>
          )}
        </View>
      </ScrollView>
    </View>
  );
};

export default ProjectsScreen;
