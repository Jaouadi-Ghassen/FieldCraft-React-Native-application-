import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import styles from './NotificationCellStyle';

interface NotificationProps {
  date: string;
  title: string;
  subTitle: string;
  content: string;
  onPress: () => void;
}

const NotificationCell: React.FC<NotificationProps> = ({
  date,
  title,
  subTitle,
  content,
  onPress,
}) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <View style={styles.container}>
        <View style={styles.dateTitleContainer}>
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.date}>{date}</Text>
        </View>
        <Text style={styles.subTitle}>{subTitle}</Text>
        <Text style={styles.content}>{content}</Text>
      </View>
    </TouchableOpacity>
  );
};

export default NotificationCell;
