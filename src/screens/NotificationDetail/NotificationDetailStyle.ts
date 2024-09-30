import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FAFAFA',
  },
  dateTitleContainer: {
    margin: '5%',
    height: 'auto',
    backgroundColor: 'white',
    padding: 10,
    borderRadius: 5,
    borderWidth: 1,
    borderRightColor: 'rgba(141, 160, 210, 0.5)',
    borderTopColor: 'rgba(141, 160, 210, 0.5)',
    borderBottomColor: 'rgba(141, 160, 210, 0.5)',
    borderLeftColor: '#182A4D',
    borderLeftWidth: 6,
    elevation: 1,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#182A4D',
  },
  content: {
    fontSize: 14,
    fontWeight: 'bold',
    marginTop: '5%',
  },
  subTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: '3%',
  },
  date: {
    fontSize: 14,
    fontWeight: 'bold',
  },
});

export default styles;
