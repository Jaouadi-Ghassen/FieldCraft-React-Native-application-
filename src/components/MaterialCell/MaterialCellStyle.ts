import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  materialContainer: {
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
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  materialName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#182A4D',
  },
  image: {
    width: 70,
    height: 60,
    borderRadius: 5,
  },
  qty: {
    marginTop: '2%',
  },
});

export default styles;
