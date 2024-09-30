import {StyleSheet} from 'react-native';

const style = StyleSheet.create({
  primaryButton: {
    backgroundColor: '#182A4D',
    paddingHorizontal: 25,
    paddingVertical: 12,
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
  },
  secondaryButton: {
    backgroundColor: 'white',
    paddingHorizontal: 25,
    paddingVertical: 12,
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    borderWidth: 1,
    borderColor: '#182A4D',
  },
  primaryButtonText: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'normal',
  },
  secondaryButtonText: {
    color: '#182A4D',
    fontSize: 15,
    fontWeight: 'normal',
  },
});
export default style;
