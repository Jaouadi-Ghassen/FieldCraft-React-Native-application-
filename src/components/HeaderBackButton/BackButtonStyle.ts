import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingRight: '7%',
    paddingLeft: '7%',
    paddingTop: '7%',
  },
  backBtn: {
    backgroundColor: '#182A4D',
    padding: 10,
    borderRadius: 12,
    zIndex: 10,
    color: '#fff',
  },
  text: {
    fontSize: 30,
    color: '#182A4D',
  },
});

export default styles;
