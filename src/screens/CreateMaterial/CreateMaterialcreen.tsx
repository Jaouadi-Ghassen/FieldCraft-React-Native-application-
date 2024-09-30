import React, {useState, useEffect, useCallback} from 'react';
import {
  View,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import {SelectList} from 'react-native-dropdown-select-list';
import ButtonComponent from '../../components/Button/ButtonComponent';
import BackButton from '../../components/HeaderBackButton/BackButton';
import ImagePickerComponent from '../../components/ImagePickerComponent/ImagePickerComponent';
import InputTextComponent from '../../components/Input/InputTextComponent';
import styles from './CreateMaterialStyle';
import Icon from 'react-native-vector-icons/AntDesign';
import {Image} from 'react-native-elements';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {useSelector} from 'react-redux';
import {MaterialState} from '../../data/dataSource/graphql/graphql-schema-types';
import {useGetCategories} from '../../domain/hooks/category.hooks';
import {useCreateMaterial} from '../../domain/hooks/materials.hooks';
import {getStore} from '../../helpers/store';
import {useUploadImages} from '../../domain/hooks/images.hook';

type Props = {
  navigation: NativeStackNavigationProp<any>;
};

const CreateMaterialScreen: React.FC<Props> = ({navigation}) => {
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [quantity, setQuantity] = useState('');
  const [description, setDescription] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedSubCategory, setSelectedSubCategory] = useState<string | null>(
    null,
  );
  const [materialState, setMaterialState] = useState<MaterialState>(
    MaterialState.new,
  );
  const [selectedImages, setSelectedImages] = useState<string[]>([]);
  const projectId = useSelector(getStore().select.application.projectId);
  const {categories} = useGetCategories();
  // const {createMaterial, creating, error: createError} = useCreateMaterial();
  const {createMaterial, creating, error: createError} = useCreateMaterial();
  const {uploadImages, uploading, error: uploadError} = useUploadImages();

  const [subCategories, setSubCategories] = useState<
    {key: string; value: string}[]
  >([]);

  useEffect(() => {
    if (selectedCategory && categories) {
      const subCategoryList = categories
        .filter(category => category.parent_id === selectedCategory)
        .map(subCategory => ({
          key: subCategory.id,
          value: subCategory.name,
        }));
      setSubCategories(subCategoryList);
    } else {
      setSubCategories([]);
    }
  }, [selectedCategory, categories]);

  const handleMaterialStateChange = (state: MaterialState) => {
    setMaterialState(state);
  };

  const handleSubmit = async () => {
    try {
      const materialInput = {
        projectId: projectId,
        materialName: name,
        price: parseFloat(price),
        quantity: parseInt(quantity, 10),
        description: description,
        categoryId: selectedCategory,
        subCategoryId: selectedSubCategory,
        materialState: materialState,
      };

      const response = await createMaterial(materialInput);
      console.log('Material created successfully');
      console.log('respone :', response);
      if (response?.id) {
        const materialId = response.id;
        await uploadImages(selectedImages, response);
      }

      navigation.navigate('Materials');
    } catch (error) {
      console.error('Error handling submit:', error);
    }
  };

  const handlePriceChange = (text: string) => {
    const numericValue = text.replace(/[^0-9.]/g, '');
    setPrice(numericValue);
  };

  const handleQuantityChange = (text: string) => {
    const numericValue = text.replace(/[^0-9]/g, '');
    setQuantity(numericValue);
  };

  const handleDescriptionChange = (text: string) => setDescription(text);

  const removeImage = (index: number) => {
    setSelectedImages(prevImages => {
      const updatedImages = [...prevImages];
      updatedImages.splice(index, 1);
      return updatedImages;
    });
  };

  const onSelect = useCallback((media: any[]) => {
    const urls = media.map(item => item.path);
    setSelectedImages(prev => [...prev, ...urls]);
  }, []);

  return (
    <ScrollView style={styles.container}>
      <BackButton title="Create Material" />
      <View style={styles.inputGroup}>
        <InputTextComponent
          placeholder="Material name ..."
          value={name}
          onChangeText={setName}
        />
        <View style={styles.selectInput}>
          <SelectList
            setSelected={setSelectedCategory}
            data={categories.map(category => ({
              key: category.id,
              value: category.name,
            }))}
            placeholder="Select category"
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
          {selectedCategory && (
            <SelectList
              setSelected={setSelectedSubCategory}
              data={subCategories}
              placeholder="Select sub-category"
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
          )}
          {selectedCategory && (
            <SelectList
              setSelected={handleMaterialStateChange}
              data={Object.keys(MaterialState).map(key => ({
                key,
                value: key,
              }))}
              placeholder="Condition"
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
          )}
        </View>
        <InputTextComponent
          placeholder="Price ..."
          value={price}
          onChangeText={handlePriceChange}
          keyboardType="numeric"
        />
        <InputTextComponent
          placeholder="Quantity ..."
          value={quantity}
          onChangeText={handleQuantityChange}
          keyboardType="numeric"
        />
        <View style={styles.buttonStyle}>
          <ImagePickerComponent
            onSelect={onSelect}
            display={
              <View style={styles.buttonContainer}>
                <Icon
                  name="plus"
                  size={12}
                  color="black"
                  style={styles.plusIcon}
                />
                <Text>{'Images'}</Text>
              </View>
            }
          />
        </View>
        <View style={styles.imageContainer}>
          {selectedImages.map((image, index) => (
            <View key={index} style={styles.imageWrapper}>
              <Image source={{uri: image}} style={styles.image} />
              <TouchableOpacity onPress={() => removeImage(index)}>
                <Icon name="close" size={20} color="red" />
              </TouchableOpacity>
            </View>
          ))}
        </View>
        <TextInput
          placeholder="Description ..."
          style={styles.desc}
          value={description}
          onChangeText={handleDescriptionChange}
        />
      </View>
      <View style={styles.buttonGroup}>
        <ButtonComponent
          title="Create"
          variant="primary"
          onPress={handleSubmit}
        />
        <ButtonComponent
          title="Cancel"
          variant="secondary"
          onPress={() => navigation.navigate('Materials')}
        />
      </View>
    </ScrollView>
  );
};

export default CreateMaterialScreen;
// import React, {useState, useEffect, useCallback} from 'react';
// import {
//   View,
//   ScrollView,
//   Text,
//   TextInput,
//   TouchableOpacity,
//   ActivityIndicator,
// } from 'react-native';
// import {SelectList} from 'react-native-dropdown-select-list';
// import ButtonComponent from '../../components/Button/ButtonComponent';
// import BackButton from '../../components/HeaderBackButton/BackButton';
// import ImagePickerComponent from '../../components/ImagePickerComponent/ImagePickerComponent';
// import InputTextComponent from '../../components/Input/InputTextComponent';
// import styles from './CreateMaterialStyle';
// import Icon from 'react-native-vector-icons/AntDesign';
// import {Image} from 'react-native-elements';
// import {NativeStackNavigationProp} from '@react-navigation/native-stack';
// import {useSelector} from 'react-redux';
// import {MaterialState} from '../../data/dataSource/graphql/graphql-schema-types';
// import {useGetCategories} from '../../domain/hooks/category.hooks';
// import {useCreateMaterial} from '../../domain/hooks/materials.hooks';
// import {getStore} from '../../helpers/store';
// import {useUploadImages} from '../../domain/hooks/images.hook';

// type Props = {
//   navigation: NativeStackNavigationProp<any>;
// };

// const CreateMaterialScreen: React.FC<Props> = ({navigation}) => {
//   const [name, setName] = useState('');
//   const [price, setPrice] = useState('');
//   const [quantity, setQuantity] = useState('');
//   const [description, setDescription] = useState('');
//   const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
//   const [selectedSubCategory, setSelectedSubCategory] = useState<string | null>(
//     null,
//   );
//   const [materialState, setMaterialState] = useState<MaterialState>(
//     MaterialState.new,
//   );
//   const [selectedImages, setSelectedImages] = useState<string[]>([]);
//   const projectId = useSelector(getStore().select.application.projectId);
//   const {categories} = useGetCategories();
//   const {createMaterial, creating, error: createError} = useCreateMaterial();
//   const {uploadImages, uploading, error: uploadError} = useUploadImages();
//   const [subCategories, setSubCategories] = useState<
//     {key: string; value: string}[]
//   >([]);
//   const [loading, setLoading] = useState(false);

//   useEffect(() => {
//     if (selectedCategory && categories) {
//       const subCategoryList = categories
//         .filter(category => category.parent_id === selectedCategory)
//         .map(subCategory => ({
//           key: subCategory.id,
//           value: subCategory.name,
//         }));
//       setSubCategories(subCategoryList);
//     } else {
//       setSubCategories([]);
//     }
//   }, [selectedCategory, categories]);

//   const handleMaterialStateChange = (state: MaterialState) => {
//     setMaterialState(state);
//   };

//   const handleSubmit = async () => {
//     try {
//       const materialInput = {
//         projectId: projectId,
//         materialName: name,
//         price: parseFloat(price),
//         quantity: parseInt(quantity, 10),
//         description: description,
//         categoryId: selectedCategory,
//         subCategoryId: selectedSubCategory,
//         materialState: materialState,
//       };

//       const response = await createMaterial(materialInput);
//       console.log('Material created successfully');
//       console.log('response:', response);
//       if (response?.id) {
//         const materialId = response.id;
//         await uploadImages(selectedImages, response);
//       }

//       navigation.navigate('Materials');
//     } catch (error) {
//       console.error('Error handling submit:', error);
//     }
//   };

//   const handlePriceChange = (text: string) => {
//     const numericValue = text.replace(/[^0-9.]/g, '');
//     setPrice(numericValue);
//   };

//   const handleQuantityChange = (text: string) => {
//     const numericValue = text.replace(/[^0-9]/g, '');
//     setQuantity(numericValue);
//   };

//   const handleDescriptionChange = (text: string) => setDescription(text);

//   const removeImage = (index: number) => {
//     setSelectedImages(prevImages => {
//       const updatedImages = [...prevImages];
//       updatedImages.splice(index, 1);
//       return updatedImages;
//     });
//   };

//   const onSelectImages = useCallback((images: any[]) => {
//     const urls = images.map(item => item.path);
//     setSelectedImages(prev => [...prev, ...urls]);
//   }, []);

//   return (
//     <ScrollView style={styles.container}>
//       <BackButton title="Create Material" />
//       <View style={styles.inputGroup}>
//         <InputTextComponent
//           placeholder="Material name ..."
//           value={name}
//           onChangeText={setName}
//         />
//         <View style={styles.selectInput}>
//           <SelectList
//             setSelected={setSelectedCategory}
//             data={categories.map(category => ({
//               key: category.id,
//               value: category.name,
//             }))}
//             placeholder="Select category"
//             boxStyles={{
//               borderRadius: 5,
//               borderColor: 'rgba(141, 160, 210, 0.5)',
//               borderWidth: 2,
//             }}
//             dropdownStyles={{
//               borderRadius: 5,
//               borderColor: 'rgba(141, 160, 210, 0.5)',
//               borderWidth: 2,
//             }}
//           />
//           {selectedCategory && (
//             <SelectList
//               setSelected={setSelectedSubCategory}
//               data={subCategories}
//               placeholder="Select sub-category"
//               boxStyles={{
//                 marginTop: 25,
//                 borderRadius: 5,
//                 borderColor: 'rgba(141, 160, 210, 0.5)',
//                 borderWidth: 2,
//               }}
//               dropdownStyles={{
//                 borderRadius: 5,
//                 borderColor: 'rgba(141, 160, 210, 0.5)',
//                 borderWidth: 2,
//               }}
//             />
//           )}
//           {selectedCategory && (
//             <SelectList
//               setSelected={handleMaterialStateChange}
//               data={Object.keys(MaterialState).map(key => ({
//                 key,
//                 value: key,
//               }))}
//               placeholder="Condition"
//               boxStyles={{
//                 marginTop: 25,
//                 borderRadius: 5,
//                 borderColor: 'rgba(141, 160, 210, 0.5)',
//                 borderWidth: 2,
//               }}
//               dropdownStyles={{
//                 borderRadius: 5,
//                 borderColor: 'rgba(141, 160, 210, 0.5)',
//                 borderWidth: 2,
//               }}
//             />
//           )}
//         </View>
//         <InputTextComponent
//           placeholder="Price ..."
//           value={price}
//           onChangeText={handlePriceChange}
//           keyboardType="numeric"
//         />
//         <InputTextComponent
//           placeholder="Quantity ..."
//           value={quantity}
//           onChangeText={handleQuantityChange}
//           keyboardType="numeric"
//         />
//         <View style={styles.buttonStyle}>
//           <ImagePickerComponent
//             onSelect={onSelectImages}
//             display={
//               <View style={styles.buttonContainer}>
//                 <Icon
//                   name="plus"
//                   size={12}
//                   color="black"
//                   style={styles.plusIcon}
//                 />
//                 <Text>{'Images'}</Text>
//               </View>
//             }
//             serverUrl="http://192.168.88.124:5000"
//             // serverUrl="http://20.30.0.20:5000"
//           />
//         </View>
//         <View style={styles.imageContainer}>
//           {selectedImages.map((image, index) => (
//             <View key={index} style={styles.imageWrapper}>
//               <Image source={{uri: image}} style={styles.image} />
//               <TouchableOpacity onPress={() => removeImage(index)}>
//                 <Icon name="close" size={20} color="red" />
//               </TouchableOpacity>
//             </View>
//           ))}
//         </View>
//         <TextInput
//           placeholder="Description ..."
//           style={styles.desc}
//           value={description}
//           onChangeText={handleDescriptionChange}
//         />
//       </View>
//       <View style={styles.buttonGroup}>
//         <ButtonComponent
//           title="Create"
//           variant="primary"
//           onPress={handleSubmit}
//         />
//         <ButtonComponent
//           title="Cancel"
//           variant="secondary"
//           onPress={() => navigation.navigate('Materials')}
//         />
//       </View>
//       {creating && <ActivityIndicator size="large" color="#0000ff" />}
//     </ScrollView>
//   );
// };

// export default CreateMaterialScreen;
