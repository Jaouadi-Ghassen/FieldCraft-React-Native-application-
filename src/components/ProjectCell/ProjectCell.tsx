import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import styles from './ProjectCellStyle';

interface ProjectCellProps {
  projectName: string;
  address: string;
  projectReference: string;
  onPress: () => void;
}

const ProjectCell: React.FC<ProjectCellProps> = ({
  projectName,
  address,
  projectReference,
  onPress,
}) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <View style={styles.projectContainer}>
        <View>
          <Text style={styles.projectName}>Project: {projectName}</Text>
          <View style={styles.address}>
            <Icon name="map-pin" size={15} color="gray" />
            <Text style={styles.projectReference}>Address : {address}</Text>
          </View>
        </View>
        <Text style={styles.projectReference}>#{projectReference}</Text>
      </View>
    </TouchableOpacity>
  );
};

export default ProjectCell;
