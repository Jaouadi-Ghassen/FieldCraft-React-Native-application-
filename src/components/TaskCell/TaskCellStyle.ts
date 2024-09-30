import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  taskContainer: {
    backgroundColor: 'white',
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
  },
  checkedTask: {
    borderLeftColor: '#72BB45',
  },
  taskName: {
    margin: '5%',
    fontSize: 16,
    fontWeight: 'bold',
    color: '#182A4D',
  },
  taskPhase: {
    marginLeft: '5%',
    marginBottom: '5%',
  },
  checkBoxContainer: {
    position: 'absolute',
    marginRight: 5,
    right: 0,
  },
});

export default styles;
