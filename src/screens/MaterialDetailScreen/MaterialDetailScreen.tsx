import React, {useState} from 'react';
import {View, Text, ScrollView, Modal, Pressable} from 'react-native';
import styles from './MaterialDetailStyle';
import BackButton from '../../components/HeaderBackButton/BackButton';
import ImageSlider from '../../components/ImageSliderBox/ImageSlider';
import ButtonComponent from '../../components/Button/ButtonComponent';
import {useDeleteMaterialMutation} from '../../data/dataSource/graphql/entities/Materials/Materials.gql.hooks';
import {StackScreenProps} from '@react-navigation/stack';
import {MainNavigationList} from '../../navigators/NavigationList';
import {useGetMaterialDetails} from '../../domain/hooks/materials.hooks';

const MaterialDetailScreen: React.FC<
  StackScreenProps<MainNavigationList, 'MaterialDetails'>
> = ({route, navigation}) => {
  const {materialId, onRefresh} = route.params;
  const [isModalVisible, setIsModalVisible] = useState(false);

  const {material, fetching} = useGetMaterialDetails(materialId);

  const [, deleteMaterial] = useDeleteMaterialMutation();

  if (fetching) return <Text>Loading...</Text>;

  if (!material) return <Text>No Material Found</Text>;

  const {
    materialName,
    quantity,
    description,
    price,
    materialState,
    categoryId,
    images = [],
    category,
  } = material;

  console.log(images);

  const formattedImages = images.map(img => ({
    id: img.id,
    imagePath: img.imagePath.includes('file://')
      ? img.imagePath
      : `http://localhost:3000/uploads/materials/${img.imagePath}`,
  }));

  const handleDelete = async () => {
    try {
      await deleteMaterial({id: materialId});
      setIsModalVisible(false);
      navigation.goBack();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <View style={styles.container}>
      <BackButton title={materialName} />
      <ScrollView>
        <ImageSlider images={formattedImages} />
        <View style={styles.contentGroup}>
          <View style={styles.field}>
            <Text style={styles.title}>Material name :</Text>
            <Text style={styles.content}> {materialName}</Text>
          </View>
          <View style={styles.field}>
            <Text style={styles.title}>Quantity :</Text>
            <Text style={styles.content}> {quantity}</Text>
          </View>
          <View style={styles.field}>
            <Text style={styles.title}>Category :</Text>
            {category ? (
              <Text style={styles.content}>{category.name}</Text>
            ) : (
              <Text style={styles.content}>No Category Assigned</Text>
            )}
          </View>
          {category && category.parent && (
            <View style={styles.field}>
              <Text style={styles.title}>Subcategory :</Text>
              <Text style={styles.content}>{category.parent.name}</Text>
            </View>
          )}
          <View style={styles.field}>
            <Text style={styles.title}>Condition :</Text>
            <Text style={styles.content}> {materialState}</Text>
          </View>
          <View style={styles.field}>
            <Text style={styles.title}>Price :</Text>
            <Text style={styles.content}> {price}</Text>
          </View>
          <View style={styles.field}>
            <Text style={styles.title}>Description :</Text>
            <Text style={styles.content}> {description}</Text>
          </View>
        </View>
        <View style={styles.buttonGroup}>
          <ButtonComponent
            title="Edit"
            variant="primary"
            onPress={() =>
              navigation.navigate('EditMaterialScreen', {
                materialDetail: material,
                onRefresh,
              })
            }
          />
          <ButtonComponent
            title="Delete"
            variant="secondary"
            onPress={() => setIsModalVisible(true)}
          />
        </View>
      </ScrollView>
      <Modal
        transparent={true}
        visible={isModalVisible}
        onRequestClose={() => setIsModalVisible(false)}>
        <View style={styles.modalBackground}>
          <View style={styles.modalContainer}>
            <Text style={styles.modalTitle}>Confirm Deletion</Text>
            <Text style={styles.modalMessage}>
              Are you sure you want to delete this material?
            </Text>
            <View style={styles.modalButtonGroup}>
              <Pressable
                style={[styles.modalButton, styles.cancelButton]}
                onPress={() => setIsModalVisible(false)}>
                <Text style={styles.buttonText}>Cancel</Text>
              </Pressable>
              <Pressable
                style={[styles.modalButton, styles.deleteButton]}
                onPress={handleDelete}>
                <Text style={styles.buttonText}>Delete</Text>
              </Pressable>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default MaterialDetailScreen;
