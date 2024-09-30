import React from 'react';
import {View, Text} from 'react-native';
import styles from './NotificationDetailStyle';
import BackButton from '../../components/HeaderBackButton/BackButton';
import {formatDate} from '../../helpers/formatDate';
import {StackScreenProps} from '@react-navigation/stack';
import {MainNavigationList} from '../../navigators/NavigationList';

const NotificationDetailScreen: React.FC<
  StackScreenProps<MainNavigationList, 'NotificationDetails'>
> = ({route}) => {
  const {createdAt, title, subTitle, content} =
    route.params.NotificationDetails;

  return (
    <View style={styles.container}>
      <BackButton title="Notification Detail" />
      <View style={styles.dateTitleContainer}>
        <View
          style={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}>
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.date}>{formatDate(createdAt)}</Text>
        </View>
        <Text style={styles.subTitle}>{subTitle}</Text>
        <Text style={styles.content}>{content}</Text>
      </View>
    </View>
  );
};

export default NotificationDetailScreen;
