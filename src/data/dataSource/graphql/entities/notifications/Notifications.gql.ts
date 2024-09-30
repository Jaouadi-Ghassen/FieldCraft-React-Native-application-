import {gql} from 'urql';

export const Get_Notifications_Query = gql`
  query getNotificationList {
    notifications {
      content
      subTitle
      title
      createdAt
    }
  }
`;
