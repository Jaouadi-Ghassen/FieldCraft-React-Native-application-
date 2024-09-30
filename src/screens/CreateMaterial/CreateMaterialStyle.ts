import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FAFAFA',
  },
  imageContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: '3%',
  },
  image: {
    width: '100%',
    height: 70,
    resizeMode: 'cover',
    borderRadius: 5,
    borderWidth: 2,
    borderColor: 'rgba(141, 160, 210, 0.5)',
    overflow: 'hidden',
  },
  imageWrapper: {
    position: 'relative',
    width: '20%',
    height: 70,
    margin: 5,
  },

  closeIcon: {
    borderRadius: 25,
    backgroundColor: 'rgb(141, 160, 210)',
    position: 'absolute',
    top: -9,
    right: -9,
    padding: 1,
    zIndex: 1,
  },
  inputGroup: {
    width: '100%',
    marginTop: '5%',
    marginLeft: '5%',
  },
  desc: {
    height: 100,
    width: '90%',
    borderColor: 'rgba(141, 160, 210, 0.5)',
    borderWidth: 2,
    marginBottom: 25,
    paddingHorizontal: 10,
    backgroundColor: '#FAFAFA',
    borderRadius: 5,
  },
  selectInput: {
    width: '90%',
    marginBottom: 25,
  },
  buttonGroup: {
    marginBottom: '5%',
    marginTop: '5%',
    marginRight: '50%',
    display: 'flex',
    flexDirection: 'row',
    width: '40%',
    alignSelf: 'center',
    gap: 10,
  },
  plusIcon: {
    borderRadius: 25,
    backgroundColor: 'rgb(141, 160, 210)',
    position: 'absolute',
    top: -17,
    right: -20,
    padding: 1,
  },
  buttonContainer: {
    flexDirection: 'row',
    gap: 20,
    alignItems: 'center',
    marginTop: '20%',
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
});

export default styles;
