import {createCategoryTable} from './createCategoryTable';
import {createImagesTable} from './createImagesTable';
import {createMaterialTable} from './createMaterialsTable';
import {createProjectTable} from './createProjectTable';
import {createTasksTable} from './createTasksTable';
import {createUsersTable} from './createUsersTable';

export const migrations = [
  {
    name: 'create_project_table',
    migration: createProjectTable,
  },
  {
    name: 'create_material_table',
    migration: createMaterialTable,
  },
  {
    name: 'create_users_table',
    migration: createUsersTable,
  },
  {
    name: 'create_category_table',
    migration: createCategoryTable,
  },
  {
    name: 'create_tasks_table',
    migration: createTasksTable,
  },
  {
    name: 'create_images_table',
    migration: createImagesTable,
  },
];
