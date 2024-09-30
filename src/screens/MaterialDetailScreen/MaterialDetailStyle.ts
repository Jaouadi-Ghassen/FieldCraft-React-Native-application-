import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FAFAFA',
  },
  materialName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#182A4D',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#182A4D',
    marginBottom: '5%',
  },
  content: {
    fontSize: 15,
    color: 'gray',
    lineHeight: 25,
  },
  contentGroup: {
    margin: '5%',
    height: 'auto',
    padding: '5%',
  },
  buttonGroup: {
    marginBottom: '5%',
    marginRight: '40%',
    display: 'flex',
    flexDirection: 'row',
    width: '40%',
    alignSelf: 'center',
    gap: 10,
  },
  field: {
    flexDirection: 'row',
    marginBottom: 5,
  },
  modalBackground: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalContainer: {
    width: 300,
    padding: 20,
    backgroundColor: 'white',
    borderRadius: 10,
    alignItems: 'center',
  },
  modalTitle: {
    color: '#182A4D',
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  modalMessage: {
    color: '#182A4D',
    fontSize: 16,
    marginBottom: 20,
    textAlign: 'center',
  },
  modalButtonGroup: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  modalButton: {
    padding: 10,
    flex: 1,
    alignItems: 'center',
    borderRadius: 5,
  },
  cancelButton: {
    backgroundColor: '#ccc',
    marginRight: 10,
  },
  deleteButton: {
    backgroundColor: '#182A4D',
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});

export default styles;
