import {useState, useEffect, useCallback} from 'react';
import {useUpdateTaskStateMutation} from '../../data/dataSource/graphql/entities/Tasks/Tasks.gql.hooks';
import {TaskRepository} from '../../data/repository/tasks.repository';
import {Tasks} from '../../dataSource/graphql/graphql-schema-types';
let isSyncronising = false;
export const useTaskSync = () => {
  const [unsynchronizedTasks, setUnsynchronizedTasks] = useState<Tasks[]>([]);
  const [, updateTaskState] = useUpdateTaskStateMutation();

  const fetchUnsynchronizedTasks = useCallback(async () => {
    try {
      const tasks =
        await TaskRepository.getInstance().fetchUnsynchronizedTasks();
      setUnsynchronizedTasks(tasks);
    } catch (error) {
      console.error('Error fetching unsynchronized tasks', error);
    }
  }, []);

  useEffect(() => {
    fetchUnsynchronizedTasks();
  }, [fetchUnsynchronizedTasks]);

  const syncTask = useCallback(
    async (task: Tasks) => {
      try {
        const response = await updateTaskState({
          id: task.networkId,
          taskState: Boolean(task.taskState),
        });
        if (!response.error) {
          await TaskRepository.getInstance().markTaskAsSynchronized(task.id);
        } else {
          console.error('Error updating task', response.error);
        }
      } catch (error) {
        console.error('Error syncing task with server', error);
      }
    },
    [updateTaskState],
  );

  const syncUnsynchronizedTasks = useCallback(async () => {
    if (isSyncronising) {
      return;
    }
    if (unsynchronizedTasks.length > 0) {
      console.log('syncing tasks');
      isSyncronising = true;
      await Promise.all(unsynchronizedTasks.map(syncTask));
    }
    isSyncronising = false;
  }, [unsynchronizedTasks, syncTask]);

  return syncUnsynchronizedTasks;
};
