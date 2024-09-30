import {openDatabase, SQLiteDatabase} from 'react-native-sqlite-storage';

let db: SQLiteDatabase | undefined = undefined;

export function getDatabseInstance() {
  if (db == undefined) {
    db = openDatabase(
      {
        name: 'FieldCraft',
        location: 'default',
      },
      () => console.log('Database opened successfully'),
      error => {
        console.error('Error opening database', error);
      },
    );
  }
  return db;
}
