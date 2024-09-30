import React from 'react';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {StyleSheet, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';

type Props = {
  navigation: NativeStackNavigationProp<any>;
};

const RoundedButton = ({navigation}: Props) => {
  const handleSubmit = () => {
    navigation.navigate('CreateMaterial');
  };

  return (
    <TouchableOpacity style={styles.container} onPress={handleSubmit}>
      <Icon name="plus" size={55} color={'white'} style={styles.icon} />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    right: 20,
    bottom: 20,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#182A4D',
    zIndex: 1,
    height: 55,
    width: 55,
    borderRadius: 30,
  },
  icon: {
    elevation: 2,
  },
});

export default RoundedButton;
