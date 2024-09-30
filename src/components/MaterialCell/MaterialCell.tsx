import React from 'react';
import {View, Text, Image, TouchableOpacity} from 'react-native';
import styles from './MaterialCellStyle';

import {ImageSourcePropType} from 'react-native';

interface MaterialCellProps {
  materialName: string;
  quantity: number;
  onPress: () => void;
}

const MaterialCell: React.FC<MaterialCellProps> = ({
  materialName,
  quantity,
  onPress,
}) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <View style={styles.materialContainer}>
        <View>
          <Text style={styles.materialName}>
            Material Name : {materialName}
          </Text>
          <Text style={styles.qty}>Qty : {quantity}</Text>
        </View>
        {/* <View>
          <Image source={materialImage} style={styles.image} />
        </View> */}
      </View>
    </TouchableOpacity>
  );
};

export default MaterialCell;
