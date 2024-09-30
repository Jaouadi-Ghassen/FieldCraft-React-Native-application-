import React from 'react';
import {View} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {useAppSelector} from '../../helpers/store';
const SynchronizeIcon = () => {
  const isConnected = useAppSelector(state => state.application.isConnected);
  return (
    <View>
      {isConnected ? (
        <MaterialCommunityIcons name="cloud-check" size={30} color="#182A4D" />
      ) : (
        <MaterialCommunityIcons
          name="cloud-off-outline"
          size={30}
          color="#182A4D"
        />
      )}
    </View>
  );
};

export default SynchronizeIcon;
