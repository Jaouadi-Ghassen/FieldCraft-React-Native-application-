import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  projectContainer: {
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
    marginTop: '3%',
    elevation: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 15,
  },
  projectName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#182A4D',
  },
  projectReference: {
    alignItems: 'flex-end',
    fontSize: 14,
    color: '#888',
  },
  address: {
    display: 'flex',
    flexDirection: 'row',
    marginTop: '5%',
    gap: 5,
    alignItems: 'center',
  },
});

export default styles;
