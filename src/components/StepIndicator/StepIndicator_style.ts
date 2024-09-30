import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: '#ffffff',
  },
  stepIndicator: {
    marginVertical: 20,
    paddingHorizontal: 20,
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
    marginTop: '13%',
  },
  title: {
    fontSize: 16,
    color: '#333333',
    fontWeight: '600',
    marginBottom: 5,
  },
  description: {
    paddingVertical: 15,
    fontSize: 12,
    color: '#666666',
  },
  loading: {
    marginTop: '85%',
  },
});
