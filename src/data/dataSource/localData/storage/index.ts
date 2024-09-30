import Storage from 'react-native-storage';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {cachKeys} from './cacheKeys';

const storage = new Storage({
  size: 1000,
  storageBackend: AsyncStorage,
  defaultExpires: 1000 * 3600 * 24,
  enableCache: true,
  sync: {
    [cachKeys.token]: '',
  },
});

export default storage;
