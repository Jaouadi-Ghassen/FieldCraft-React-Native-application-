import React from 'react';
import {View} from 'react-native';
import VerticalStepIndicator from '../../components/StepIndicator/StepIndicator';
import styles from './HistoryStyle';

const HistoryScreen: React.FC = () => {
  return (
    <View style={styles.container}>
      <VerticalStepIndicator />
    </View>
  );
};

export default HistoryScreen;
