import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FAFAFA',
  },
  input_container: {
    marginBottom: '35%',
    width: '100%',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    top: '5%',
    width: 350,
    height: 350,
  },
  login_btn: {
    bottom: '15%',
    width: '50%',
  },
  forget_pass: {
    width: '50%',
    textAlign: 'center',
    bottom: '80%',
  },
  link: {
    fontWeight: 'bold',
    color: '#182A4D',
  },
});

export default styles;
