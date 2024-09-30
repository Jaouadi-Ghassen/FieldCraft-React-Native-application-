import React from 'react';
import {useNavigation} from '@react-navigation/native';
import {HeaderBackButton} from '@react-navigation/elements';
import style from './BackButtonStyle';
import Icon from 'react-native-vector-icons/AntDesign';
import {Text, View} from 'react-native';
import SynchronizeIcon from '../SynchronizeIcon/SynchronizeIcon';

interface CustomHeaderProps {
  title: string;
}

const BackButton: React.FC<CustomHeaderProps> = ({title}) => {
  const navigation = useNavigation();

  return (
    <View style={style.container}>
      <Text style={style.text}>{title}</Text>
      <View
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexDirection: 'row',
          gap: 20,
        }}>
        <SynchronizeIcon />
        <HeaderBackButton
          style={style.backBtn}
          onPress={() => navigation.goBack()}
          backImage={() => <Icon name="left" size={30} color="white" />}
        />
      </View>
    </View>
  );
};

export default BackButton;
