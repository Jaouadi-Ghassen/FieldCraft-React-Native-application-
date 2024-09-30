import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FAFAFA',
  },
  changeInfo: {
    fontSize: 13,
    fontWeight: '500',
    marginBottom: '3%',
  },
  changeInfo1: {
    fontSize: 16,
    color: '#182A4D',
    fontWeight: 'bold',
    marginBottom: '3%',
  },
  content: {
    width: '100%',
    marginTop: '5%',
    marginLeft: '5%',
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
});

export default styles;
