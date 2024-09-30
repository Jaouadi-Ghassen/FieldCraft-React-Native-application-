import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import styles from './TaskCellStyle';
import {CheckBox} from 'react-native-elements';
import {Tasks} from '../../data/dataSource/graphql/graphql-schema-types';

interface TaskCellProps {
  taskName: string;
  taskPhase: string;
  taskState: boolean;
  onToggle: () => void;
}

const TaskCell: React.FC<TaskCellProps> = ({
  taskName,
  taskPhase,
  taskState,
  onToggle,
}) => {
  const handleToggle = () => {
    console.log(`Task "${taskName}" is ${taskState ? 'unchecked' : 'checked'}`);
    onToggle();
  };

  return (
    <TouchableOpacity onPress={handleToggle}>
      <View style={[styles.taskContainer, taskState && styles.checkedTask]}>
        <View>
          <Text style={styles.taskName}>Task Name: {taskName}</Text>
          <Text style={styles.taskPhase}>Phase: {taskPhase}</Text>
        </View>
        <CheckBox
          checked={taskState}
          onPress={handleToggle}
          checkedColor="#72BB45"
          containerStyle={styles.checkBoxContainer}
          size={40}
        />
      </View>
    </TouchableOpacity>
  );
};

export default TaskCell;
