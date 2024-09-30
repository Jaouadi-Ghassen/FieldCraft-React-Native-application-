import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    padding: 10,
    borderRadius: 5,
    borderWidth: 1,
    borderRightColor: 'rgba(141, 160, 210, 0.5)',
    borderTopColor: 'rgba(141, 160, 210, 0.5)',
    borderBottomColor: 'rgba(141, 160, 210, 0.5)',
    borderLeftColor: '#182A4D',
    borderLeftWidth: 6,
    margin: '5%',
    marginTop: '1%',
    elevation: 1,
  },
  dateTitleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 5,
    justifyContent: 'space-between',
  },
  date: {
    fontSize: 12,
    color: '#888',
    marginRight: 5,
    alignItems: 'flex-end',
  },
  title: {
    fontSize: 18,
    color: '#182A4D',
    fontWeight: 'bold',
  },
  subTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  content: {
    fontSize: 14,
  },
});

export default styles;
