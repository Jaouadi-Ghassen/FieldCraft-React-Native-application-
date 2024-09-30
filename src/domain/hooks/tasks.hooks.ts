import {useState, useEffect} from 'react';
import {
  useTaskslistQuery,
  useUpdateTaskStateMutation,
} from '../../data/dataSource/graphql/entities/Tasks/Tasks.gql.hooks';
import {Tasks} from '../../data/dataSource/graphql/graphql-schema-types';
import {TaskRepository} from '../../data/repository/tasks.repository';
import {isOfflineError} from '../../helpers/isOfflineError';

export const useGetTasks = (projectId: string) => {
  const [tasks, setTasks] = useState<Tasks[]>([]);

  // Offline
  useEffect(() => {
    const fetchStoredTasks = async () => {
      try {
        const storedTasks = await TaskRepository.getInstance().getAllTasks(
          projectId,
        );
        console.log(storedTasks);
        setTasks(storedTasks);
      } catch (err) {
        console.error('Error fetching tasks from local storage', err);
      }
    };
    fetchStoredTasks();
  }, [projectId]);

  // Network
  const [{data, fetching, error}, refetch] = useTaskslistQuery({
    variables: {projectId},
    requestPolicy: 'network-only',
  });

  useEffect(() => {
    if (data?.filterTasks) {
      const saveTasks = async () => {
        try {
          await TaskRepository.getInstance().setAllTasks(data.filterTasks);
          setTasks(data.filterTasks);
        } catch (err) {
          console.error('Error saving tasks to local storage', err);
        }
      };
      saveTasks();
    }
  }, [data]);

  return {
    tasks,
    fetching,
    error,
    refetch,
  };
};

export const useUpdateTaskState = () => {
  const [, updateTask] = useUpdateTaskStateMutation();

  const updateTaskState = async (taskId: string, taskState: boolean) => {
    try {
      const result = await updateTask({id: taskId, taskState});

      if (isOfflineError(result.error)) {
        // Update task locally
        await updateTaskLocally(taskId, taskState);
      } else if (result.data) {
        await TaskRepository.getInstance().updateTaskStateLocally(
          taskId,
          taskState,
        );
      }
      return result.data;
    } catch (error) {
      console.error('Error updating task state:', error);
      throw error;
    }
  };

  const updateTaskLocally = async (taskId: string, taskState: boolean) => {
    try {
      await TaskRepository.getInstance().updateTaskStateLocally(
        taskId,
        taskState,
      );
    } catch (error) {
      console.error('Error updating task locally:', error);
      throw error;
    }
  };

  return {updateTaskState};
};
