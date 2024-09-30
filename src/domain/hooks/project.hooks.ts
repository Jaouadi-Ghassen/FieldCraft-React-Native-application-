import {useState, useEffect} from 'react';
import {useGetProjectListQuery} from '../../data/dataSource/graphql/entities/Project/Project.gql.hooks';
import {Projects} from '../../data/dataSource/graphql/graphql-schema-types';
import {ProjectRepository} from '../../data/repository/project.repository';

export const useGetProjects = () => {
  const [projects, setProjects] = useState<Projects[]>([]);

  // Offline
  useEffect(() => {
    const fetchStoredProjects = async () => {
      try {
        const storedProjects =
          await ProjectRepository.getInstance().getAllProjects();
        setProjects(storedProjects);
      } catch (err) {
        console.error('Error fetching projects from local storage', err);
      }
    };
    fetchStoredProjects();
  }, []);

  // Network
  const [{data, fetching, error}, refetch] = useGetProjectListQuery({
    requestPolicy: 'cache-and-network',
  });

  useEffect(() => {
    if (data?.filterProjects) {
      const saveProjects = async () => {
        try {
          await ProjectRepository.getInstance().setAllProjects(
            data.filterProjects,
          );
          setProjects(data.filterProjects);
        } catch (err) {
          console.error('Error saving projects to local storage', err);
        }
      };
      saveProjects();
    }
  }, [data]);

  return {projects, fetching, error, refetch};
};
