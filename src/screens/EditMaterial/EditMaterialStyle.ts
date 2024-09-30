import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FAFAFA',
  },
  inputGroup: {
    width: '100%',
    marginTop: '5%',
    marginLeft: '5%',
  },
  desc: {
    height: 'auto',
    width: '90%',
    borderColor: 'rgba(141, 160, 210, 0.5)',
    borderWidth: 2,
    borderRadius: 5,
    marginBottom: 25,
    paddingHorizontal: 10,
    backgroundColor: '#FAFAFA',
  },
  selectInput: {
    width: '90%',
    marginBottom: 25,
  },
  buttonGroup: {
    marginBottom: '5%',
    marginTop: '5%',
    marginRight: '40%',
    display: 'flex',
    flexDirection: 'row',
    width: '40%',
    alignSelf: 'center',
    gap: 10,
  },
});

export default styles;
