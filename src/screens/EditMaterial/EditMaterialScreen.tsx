import React, {useEffect, useState} from 'react';
import {ScrollView, View} from 'react-native';
import {SelectList} from 'react-native-dropdown-select-list';
import ButtonComponent from '../../components/Button/ButtonComponent';
import BackButton from '../../components/HeaderBackButton/BackButton';
import InputTextComponent from '../../components/Input/InputTextComponent';
import styles from './EditMaterialStyle';
import {MaterialState} from '../../data/dataSource/graphql/graphql-schema-types';
import {StackScreenProps} from '@react-navigation/stack';
import {MainNavigationList} from '../../navigators/NavigationList';
import {useUpdateMaterial} from '../../domain/hooks/materials.hooks';
import {useGetCategories} from '../../domain/hooks/category.hooks';

interface SubCategory {
  key: string;
  value: string;
}

interface Category {
  key: string;
  value: string;
}

const EditMaterialScreen: React.FC<
  StackScreenProps<MainNavigationList, 'EditMaterialScreen'>
> = ({route, navigation}) => {
  const {materialDetail, onRefresh} = route.params;
  const [name, setName] = useState(materialDetail.materialName);
  const [price, setPrice] = useState(materialDetail.price.toString());
  const [quantity, setQuantity] = useState(materialDetail.quantity.toString());
  const [description, setDescription] = useState(materialDetail.description);
  const [selectedCategory, setSelectedCategory] = useState(
    materialDetail.categoryId,
  );
  const [selectedCondition, setSelectedCondition] = useState(
    materialDetail.materialState,
  );
  const [, setSelectedSubCategory] = useState('');
  const {categories, fetching, error, subCategories, fetchAndSetSubCategories} =
    useGetCategories();
  const {updateMaterial, updating, error: updateError} = useUpdateMaterial();

  useEffect(() => {
    // Fetch and set subcategories based on selected category
    fetchAndSetSubCategories(selectedCategory);
  }, [selectedCategory, categories]); // Re-run effect when selectedCategory or categories change

  const handleSubmit = async () => {
    const editedMaterial = {
      materialName: name,
      description,
      price: parseFloat(price),
      categoryId: selectedCategory,
      materialState: selectedCondition,
      quantity: parseInt(quantity, 10),
    };

    try {
      await updateMaterial(materialDetail.id, editedMaterial);
      await onRefresh();
      navigation.navigate('Materials');
    } catch (error) {
      console.error('Error updating material:', error);
    }
  };

  const conditions: SubCategory[] = Object.keys(MaterialState).map(key => ({
    key,
    value: key,
  }));

  return (
    <ScrollView style={styles.container}>
      <BackButton title="Edit Material" />
      <View style={styles.inputGroup}>
        <InputTextComponent
          placeholder="Material name ..."
          value={name}
          onChangeText={setName}
        />
        <InputTextComponent
          placeholder="Price ..."
          value={price}
          onChangeText={setPrice}
          keyboardType="numeric"
        />
        <InputTextComponent
          placeholder="Quantity ..."
          value={quantity}
          onChangeText={setQuantity}
          keyboardType="numeric"
        />
        <View style={styles.selectInput}>
          <SelectList
            setSelected={setSelectedCategory}
            data={categories.map(category => ({
              key: category.id,
              value: category.name,
            }))}
            placeholder={'Select category'}
            boxStyles={{
              borderRadius: 5,
              borderColor: 'rgba(141, 160, 210, 0.5)',
              borderWidth: 2,
            }}
            dropdownStyles={{
              borderRadius: 5,
              borderColor: 'rgba(141, 160, 210, 0.5)',
              borderWidth: 2,
            }}
          />
          <SelectList
            setSelected={setSelectedSubCategory}
            data={subCategories.map(subCategory => ({
              key: subCategory.id,
              value: subCategory.name,
            }))}
            placeholder={'Select sub-category'}
            boxStyles={{
              marginTop: 25,
              borderRadius: 5,
              borderColor: 'rgba(141, 160, 210, 0.5)',
              borderWidth: 2,
            }}
            dropdownStyles={{
              borderRadius: 5,
              borderColor: 'rgba(141, 160, 210, 0.5)',
              borderWidth: 2,
            }}
          />
          <SelectList
            setSelected={setSelectedCondition}
            data={conditions}
            placeholder={'Condition'}
            boxStyles={{
              marginTop: 25,
              borderRadius: 5,
              borderColor: 'rgba(141, 160, 210, 0.5)',
              borderWidth: 2,
            }}
            dropdownStyles={{
              borderRadius: 5,
              borderColor: 'rgba(141, 160, 210, 0.5)',
              borderWidth: 2,
            }}
          />
        </View>
        <InputTextComponent
          placeholder="Description ..."
          value={description}
          onChangeText={setDescription}
        />
      </View>
      <View style={styles.buttonGroup}>
        <ButtonComponent
          title="Save"
          variant="primary"
          onPress={handleSubmit}
        />
        <ButtonComponent
          title="Cancel"
          variant="secondary"
          onPress={() => navigation.goBack()}
        />
      </View>
    </ScrollView>
  );
};

export default EditMaterialScreen;
