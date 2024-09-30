import React, {useState} from 'react';
import {View, Text} from 'react-native';
import {ActivityIndicator} from 'react-native-paper';
import StepIndicator from 'react-native-step-indicator';
import {useSelector} from 'react-redux';
import {useAllHistoryQuery} from '../../data/dataSource/graphql/entities/History/History.gql.hooks';
import {getStore} from '../../helpers/store';
import {stepIndicatorStyles} from './StepIndicatorStyle';
import {styles} from './StepIndicator_style';

const VerticalStepIndicator: React.FC = () => {
  const [completedSteps, setCompletedSteps] = useState(new Set());

  const projectId = useSelector(getStore().select.application.projectId);
  const [{data, fetching, error}] = useAllHistoryQuery({
    variables: {projectId},
  });

  if (fetching)
    return (
      <ActivityIndicator
        animating={true}
        theme={{colors: {primary: '#182A4D'}}}
        size={'large'}
        style={styles.loading}
      />
    );

  const history = data?.findAllHistoryForProjectById || [];

  return (
    <View style={styles.container}>
      <View style={styles.stepIndicator}>
        <StepIndicator
          customStyles={stepIndicatorStyles}
          direction="vertical"
          currentPosition={completedSteps.size}
        />
      </View>
      <View style={styles.content}>
        {history.map((history, index) => (
          <View key={index}>
            <Text style={styles.title}>{history.state}</Text>
            <Text style={styles.description}>{history.createdAt}</Text>
          </View>
        ))}
      </View>
    </View>
  );
};

export default VerticalStepIndicator;
