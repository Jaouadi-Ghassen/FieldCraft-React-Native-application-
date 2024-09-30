import {BottomTabScreenProps} from '@react-navigation/bottom-tabs';
import React, {useCallback} from 'react';
import {View, ScrollView, Text, RefreshControl} from 'react-native';
import {ActivityIndicator} from 'react-native-paper';
import BackButton from '../../components/HeaderBackButton/BackButton';
import NotificationCell from '../../components/NotificationCell/NotificationCell';
import {useGetNotificationListQuery} from '../../data/dataSource/graphql/entities/notifications/Notifications.gql.hooks';
import {formatDate} from '../../helpers/formatDate';
import {TabNavigationList} from '../../navigators/NavigationList';
import styles from './NotificationStyle';

const NotificationScreen: React.FC<
  BottomTabScreenProps<TabNavigationList, 'Notification'>
> = ({navigation}) => {
  const navigateToNotificationDetails = (
    createdAt: string,
    title: string,
    subTitle: string,
    content: string,
  ) => {
    navigation.navigate('NotificationDetails', {
      NotificationDetails: {
        createdAt,
        title,
        subTitle,
        content,
      },
    });
  };

  const [{data, fetching, error}, refetch] = useGetNotificationListQuery({
    requestPolicy: 'cache-and-network',
  });

  const onRefresh = useCallback(() => {
    refetch();
  }, [refetch]);

  if (fetching)
    return (
      <ActivityIndicator
        animating={true}
        theme={{colors: {primary: '#182A4D'}}}
        size={'large'}
        style={styles.loading}
      />
    );

  const notifications = data?.notifications || [];

  return (
    <View style={styles.container}>
      <BackButton title="Notifications" />
      <ScrollView
        refreshControl={
          <RefreshControl refreshing={fetching} onRefresh={onRefresh} />
        }>
        <View style={styles.notifGroup}>
          {notifications.map((notification, index) => (
            <NotificationCell
              key={index}
              date={formatDate(notification.createdAt)}
              title={notification.title}
              subTitle={notification.subTitle}
              content={notification.content}
              onPress={() =>
                navigateToNotificationDetails(
                  notification.createdAt,
                  notification.title,
                  notification.subTitle,
                  notification.content,
                )
              }
            />
          ))}
        </View>
      </ScrollView>
    </View>
  );
};

export default NotificationScreen;
