import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FAFAFA',
  },
  content: {
    flex: 1,
    display: 'flex',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  logout_btn: {
    marginBottom: 20,
    width: '40%',
  },
  avatar: {
    marginTop: 10,
    width: 200,
    height: 200,
    borderRadius: 200 / 2,
    borderWidth: 2,
    borderColor: 'gray',
    overflow: 'hidden',
  },
  menu_group: {
    paddingVertical: '8%',
    marginHorizontal: '3%',
    alignItems: 'flex-end',
    paddingRight: '5%',
    paddingLeft: '5%',
  },
  menu_item: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginVertical: 10,
    paddingHorizontal: 20,
    width: '100%',
  },
  menu_text: {
    flex: 1,
    paddingLeft: '5%',
    fontSize: 16,
    fontWeight: '600',
  },
  divider: {
    zIndex: 1,
  },
});

export default styles;
