import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FAFAFA',
  },
  content: {
    display: 'flex',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  avatar: {
    marginTop: '15%',
    width: 180,
    height: 180,
    borderRadius: 180 / 2,
    overflow: 'hidden',
  },
  cameraIcon: {
    left: 30,
    bottom: 1,
    position: 'absolute',
    padding: 10,
    backgroundColor: '#182A4D',
    borderRadius: 20,
    borderColor: 'white',
    borderWidth: 1,
    elevation: 1,
  },
  username: {
    marginBottom: '15%',
    fontSize: 22,
    fontWeight: 'bold',
    color: '#182A4D',
  },
  infoSection: {
    margin: '5%',
  },
  info: {
    flexDirection: 'row',
    gap: 30,
    justifyContent: 'space-between',
  },
  personalInfo: {
    fontSize: 14,
    fontWeight: 'bold',
  },
  menu: {
    marginTop: '5%',
    backgroundColor: 'rgba(220,220,220,0.3)',
    width: '100%',
    height: 'auto',
    borderRadius: 5,
  },
  menu_group: {
    paddingVertical: '10%',
    marginHorizontal: '5%',
    alignItems: 'flex-end',
    paddingRight: '5%',
    paddingLeft: '5%',
  },
  menu_item: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginVertical: '3%',
    paddingHorizontal: 20,
    width: '100%',
  },
  menu_text: {
    flex: 1,
    paddingLeft: '5%',
    fontSize: 14,
  },
  textInfo: {
    fontWeight: 'bold',
  },
  loading: {
    marginTop: '85%',
  },
});

export default styles;
