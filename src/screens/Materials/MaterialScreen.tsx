import React, {useState, useCallback} from 'react';
import {View, ScrollView, RefreshControl, Text} from 'react-native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import MaterialCell from '../../components/MaterialCell/MaterialCell';
import styles from './MaterialStyle';
import RoundedButton from '../../components/RoundedButton/RoundedButton';
import Icon from 'react-native-vector-icons/Feather';
import {useSelector} from 'react-redux';
import {useGetMaterials} from '../../domain/hooks/materials.hooks';
import SearchInput from '../../components/SreachInput/SearchInput';
import {getStore} from '../../helpers/store';

type RootStackParamList = {
  MaterialDetails: {
    onRefresh: () => void;
    materialId: string;
  };
};

type Props = {
  navigation: NativeStackNavigationProp<RootStackParamList>;
};

const MaterialScreen: React.FC<Props> = ({navigation}) => {
  const projectId = useSelector(getStore().select.application.projectId);
  const {materials, fetching, onRefresh} = useGetMaterials(projectId);

  const [searchTerm, setSearchTerm] = useState('');

  const navigateToMaterialDetails = useCallback(
    (materialId: string) => {
      navigation.navigate('MaterialDetails', {
        materialId,
        onRefresh,
      });
    },
    [navigation],
  );

  const filteredMaterials = materials.filter(material =>
    material.materialName.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  return (
    <View style={styles.container}>
      <SearchInput searchTerm={searchTerm} onSearchChange={setSearchTerm} />
      <ScrollView
        style={styles.scrollView}
        refreshControl={
          <RefreshControl refreshing={fetching} onRefresh={onRefresh} />
        }>
        <View style={styles.materialGroup}>
          {filteredMaterials.length > 0 ? (
            filteredMaterials.map((material, index) => (
              <MaterialCell
                key={index}
                materialName={material.materialName}
                quantity={material.quantity}
                onPress={() => navigateToMaterialDetails(material.id)}
              />
            ))
          ) : (
            <View style={{height: 500, alignItems: 'center', marginTop: '30%'}}>
              <Icon name="alert-octagon" size={100} color="#182A4D" />
              <Text
                style={{
                  marginTop: '8%',
                  fontSize: 20,
                  color: '#182A4D',
                  fontWeight: '900',
                }}>
                No Materials found
              </Text>
            </View>
          )}
        </View>
      </ScrollView>
      <RoundedButton navigation={navigation} />
    </View>
  );
};

export default MaterialScreen;
