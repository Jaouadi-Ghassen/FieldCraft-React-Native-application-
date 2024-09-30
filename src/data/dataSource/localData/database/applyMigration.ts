import {getDatabseInstance} from './index';
import {migrations} from './migration';
import {createMigrationTable} from './migration/createMigrations';

export const applyMigrations = () => {
  const db = getDatabseInstance();

  createMigrationTable(db);

  db.transaction(
    tx => {
      migrations.forEach(migration => {
        tx.executeSql(
          'SELECT 1 FROM migrations WHERE migration_name = ?',
          [migration.name],
          (_tx, results) => {
            if (results.rows.length === 0) {
              console.log(`Applying migration: ${migration.name}`);
              migration.migration(tx);
              tx.executeSql(
                'INSERT INTO migrations (migration_name) VALUES (?)',
                [migration.name],
                (_tx, results) =>
                  console.log(
                    `Migration ${migration.name} applied successfully`,
                    results,
                  ),
                err =>
                  console.error(
                    `Error recording migration ${migration.name}`,
                    err,
                  ),
              );
            } else {
              console.log(`Migration ${migration.name} already applied`);
            }
          },
          err => console.error('Error checking migration', err),
        );
      });
    },
    err => console.error('Transaction error during migrations', err),
  );
};
