import React, {FC, useState} from 'react';
import {
  PermissionsAndroid,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Modal,
} from 'react-native';
import ImagePicker, {ImageOrVideo} from 'react-native-image-crop-picker';

interface CustomHeaderProps {
  onSelect: (url: ImageOrVideo[]) => void;
  display: React.ReactNode;
}

const ImagePickerComponent: FC<CustomHeaderProps> = ({display, onSelect}) => {
  const [modalVisible, setModalVisible] = useState(false);

  const requestCameraPermission = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.CAMERA,
        {
          title: 'Camera Permission',
          message: 'App needs access to your camera.',
          buttonPositive: 'OK',
        },
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        console.log('Camera permission granted');
        launchCamera();
      } else {
        console.log('Camera permission denied');
      }
    } catch (error) {
      console.warn('Camera permission error:', error);
    }
  };

  const openImagePicker = () => {
    setModalVisible(true);
  };

  const launchCamera = () => {
    ImagePicker.openCamera({
      width: 300,
      height: 400,
      cropping: true,
    })
      .then(image => {
        onSelect([image]);
      })
      .catch(error => {
        console.log('Camera Error: ', error);
      });
  };

  const selectFromGallery = () => {
    ImagePicker.openPicker({
      multiple: true,
      width: 300,
      height: 400,
      cropping: true,
    })
      .then(images => {
        onSelect(images);
      })
      .catch(error => {
        console.log('ImagePicker Error: ', error);
      });
    setModalVisible(false);
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={openImagePicker}>{display}</TouchableOpacity>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(false);
        }}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <TouchableOpacity onPress={selectFromGallery}>
              <Text style={styles.modalText}>Select from Gallery</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={requestCameraPermission}>
              <Text style={styles.modalText}>Launch Camera</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                setModalVisible(false);
              }}>
              <Text style={styles.modalCloseText}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  buttonContainer: {
    flexDirection: 'row',
    gap: 20,
  },
  buttonStyle: {
    width: '20%',
    height: 50,
    borderColor: 'rgba(141, 160, 210, 0.5)',
    borderWidth: 2,
    marginBottom: 25,
    paddingHorizontal: 10,
    backgroundColor: '#FAFAFA',
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalView: {
    backgroundColor: 'white',
    borderRadius: 10,
    paddingVertical: 15,
    paddingHorizontal: 80,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalText: {
    marginBottom: 20,
    textAlign: 'center',
    textDecorationLine: 'underline',
  },
  modalCloseText: {
    marginTop: '3%',
    backgroundColor: '#182A4D',
    paddingHorizontal: 25,
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    color: 'white',
  },
  plusIcon: {
    borderRadius: 25,
    backgroundColor: 'rgb(141, 160, 210)',
    position: 'absolute',
    top: -9,
    right: -9,
    padding: 1,
  },
});

export default ImagePickerComponent;
