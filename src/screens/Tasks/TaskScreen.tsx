// import React, {useState, useEffect, useCallback} from 'react';
// import {RefreshControl, ScrollView, View} from 'react-native';
// import TaskCell from '../../components/TaskCell/TaskCell';
// import {Text} from 'react-native-paper';
// import Icon from 'react-native-vector-icons/Feather';
// import {useSelector} from 'react-redux';
// import {Tasks} from '../../data/dataSource/graphql/graphql-schema-types';
// import {useGetTasks, useUpdateTaskState} from '../../domain/hooks/tasks.hooks';
// import {TaskRepository} from '../../data/repository/tasks.repository';
// import {getStore} from '../../helpers/store';
// import styles from './TaskStyle';

// const TaskScreen: React.FC = () => {
//   const projectId = useSelector(getStore().select.application.projectId);

//   const {tasks: fetchedTasks, fetching, refetch} = useGetTasks(projectId);
//   const {updateTaskState} = useUpdateTaskState();

//   const [tasks, setTasks] = useState<Tasks[]>([]);

//   useEffect(() => {
//     setTasks(fetchedTasks);
//   }, [fetchedTasks]);

//   const onRefresh = useCallback(() => {
//     refetch();
//   }, [refetch]);

//   const handleCheckTask = async (task: Tasks) => {
//     const newTaskState = !task.taskState;
//     try {
//       // Update task state locally in SQLite
//       await TaskRepository.getInstance().updateTaskState(task.id, newTaskState);

//       // Update tasks state in UI immediately
//       const updatedTasks = tasks.map(t =>
//         t.id === task.id ? {...t, taskState: newTaskState} : t,
//       );
//       setTasks(updatedTasks);
//     } catch (error) {
//       console.error('Error updating task state:', error);
//       // Handle error
//     }
//   };

//   if (fetching && tasks.length === 0) return <Text>Loading...</Text>;

//   return (
//     <ScrollView
//       refreshControl={
//         <RefreshControl refreshing={fetching} onRefresh={onRefresh} />
//       }>
//       <View style={styles.container}>
//         {tasks.length > 0 ? (
//           tasks.map((task, index) => (
//             <TaskCell
//               key={index}
//               taskName={task.taskName}
//               taskPhase={task.taskPhase}
//               taskState={task.taskState}
//               onToggle={() => handleCheckTask(task)}
//             />
//           ))
//         ) : (
//           <View style={{height: 500, alignItems: 'center', marginTop: '30%'}}>
//             <Icon name="alert-octagon" size={100} color="#182A4D" />
//             <Text
//               style={{
//                 marginTop: '8%',
//                 fontSize: 20,
//                 color: '#182A4D',
//                 fontWeight: '900',
//               }}>
//               No tasks found
//             </Text>
//           </View>
//         )}
//       </View>
//     </ScrollView>
//   );
// };

// export default TaskScreen;

import React, {useState, useEffect, useCallback} from 'react';
import {RefreshControl, ScrollView, View} from 'react-native';
import TaskCell from '../../components/TaskCell/TaskCell';
import {Text} from 'react-native-paper';
import Icon from 'react-native-vector-icons/Feather';
import {useSelector} from 'react-redux';
import {Tasks} from '../../data/dataSource/graphql/graphql-schema-types';
import {useGetTasks, useUpdateTaskState} from '../../domain/hooks/tasks.hooks';
import {TaskRepository} from '../../data/repository/tasks.repository';
import {getStore} from '../../helpers/store';
import styles from './TaskStyle';

const TaskScreen: React.FC = () => {
  const projectId = useSelector(getStore().select.application.projectId);

  const {tasks: fetchedTasks, fetching, refetch} = useGetTasks(projectId);
  const {updateTaskState} = useUpdateTaskState();

  const [tasks, setTasks] = useState<Tasks[]>([]);

  useEffect(() => {
    setTasks(fetchedTasks);
  }, [fetchedTasks]);

  const onRefresh = useCallback(() => {
    refetch();
  }, [refetch]);

  const handleCheckTask = async (task: Tasks) => {
    const newTaskState = !task.taskState;
    try {
      await updateTaskState(task.id, newTaskState);
      const updatedTasks = tasks.map(t =>
        t.id === task.id ? {...t, taskState: newTaskState} : t,
      );
      setTasks(updatedTasks);
    } catch (error) {
      console.error('Error updating task state:', error);
    }
  };

  if (fetching && tasks.length === 0) return <Text>Loading...</Text>;

  return (
    <ScrollView
      refreshControl={
        <RefreshControl refreshing={fetching} onRefresh={onRefresh} />
      }>
      <View style={styles.container}>
        {tasks.length > 0 ? (
          tasks.map((task, index) => (
            <TaskCell
              key={index}
              taskName={task.taskName}
              taskPhase={task.taskPhase}
              taskState={task.taskState}
              onToggle={() => handleCheckTask(task)}
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
              No tasks found
            </Text>
          </View>
        )}
      </View>
    </ScrollView>
  );
};

export default TaskScreen;
