import React from 'react';
import {FlatList, View, Image} from 'react-native';
import {ScreenWidth} from 'react-native-elements/dist/helpers';

interface CarouselItem {
  id: string;
  imagePath: string;
}

interface ImageSliderProps {
  images: CarouselItem[];
}

const ImageSlider: React.FC<ImageSliderProps> = ({images}) => {
  const renderItems = ({item}: {item: CarouselItem}) => (
    <View>
      <Image
        source={{uri: item.imagePath}}
        style={{
          height: 300,
          width: ScreenWidth,
          marginTop: 20,
          overflow: 'hidden',
          resizeMode: 'contain',
        }}
      />
    </View>
  );

  return (
    <View>
      <FlatList
        data={images}
        renderItem={renderItems}
        keyExtractor={item => item.id}
        horizontal={true}
        pagingEnabled={true}
      />
    </View>
  );
};

export default ImageSlider;
