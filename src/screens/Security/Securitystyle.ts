import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FAFAFA',
  },
  info: {
    width: '100%',
    marginTop: '5%',
    marginLeft: '5%',
  },
  changePassword: {
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: '3%',
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
