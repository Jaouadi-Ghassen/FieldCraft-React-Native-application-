import {ParamListBase} from '@react-navigation/native';

export interface MainNavigationList extends ParamListBase {
  Splash: undefined;
  Login: undefined;
  TabNavigator: undefined;
  CreateMaterial: undefined;
  EditMaterialScreen: {
    onRefresh: () => void;
    materialDetail: MaterialDetail;
  };
  NotificationDetails: {
    NotificationDetails: {
      createdAt: string;
      title: string;
      subTitle: string;
      content: string;
    };
  };
  MaterialDetails: {
    onRefresh: () => void;
    materialId: string;
  };
}

interface MaterialDetail {
  id: string;
  materialName: string;
  description: string;
  price: number;
  categoryId: string;
  materialState: string;
  quantity: number;
}

export interface TabNavigationList extends ParamListBase {
  Project: undefined;
  Notification: undefined;
  Setting: undefined;
}

export interface ProjectNavigationList extends ParamListBase {
  Projects: undefined;
  TopNavigationBar: undefined;
  ProjectDetails: {
    ProjectDetails: {
      projectName: string;
      projectReference: string;
    };
  };
}

export interface TopNavigationList extends ParamListBase {
  Materials: undefined;
  Tasks: undefined;
  History: undefined;
}

export interface SettingsNavigationList extends ParamListBase {
  test: undefined;
  Edit: undefined;
  Security: undefined;
  Contact: undefined;
  EditProfileEditScreen: {
    userInfo: {
      username: string;
      email: string;
      adresse: string;
      firstname: string;
      lastname: string;
    };
  };
}
