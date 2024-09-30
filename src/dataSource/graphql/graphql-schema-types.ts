export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  DateTime: any;
  Upload: any;
};

export type Category = {
  __typename?: 'Category';
  id: Scalars['String'];
  name: Scalars['String'];
  parent?: Maybe<Category>;
  parent_id?: Maybe<Scalars['String']>;
};

export type CreateHistoryDto = {
  projectId: Scalars['String'];
  state: Scalars['String'];
};

export type CreateMaterialsDto = {
  categoryId: Scalars['String'];
  description: Scalars['String'];
  materialName: Scalars['String'];
  materialState: MaterialState;
  price: Scalars['Float'];
  projectId: Scalars['String'];
  quantity: Scalars['Float'];
};

export type CreateNotificationtDto = {
  content: Scalars['String'];
  subTitle: Scalars['String'];
  title: Scalars['String'];
};

export type CreateProjectDto = {
  city: Scalars['String'];
  codePostal: Scalars['Float'];
  endDate: Scalars['DateTime'];
  estimatedEndDate: Scalars['DateTime'];
  estimatedstartDate: Scalars['DateTime'];
  projectAdress: Scalars['String'];
  projectName: Scalars['String'];
  reference: Scalars['String'];
  startDate: Scalars['DateTime'];
};

export type CreateTaskDto = {
  description: Scalars['String'];
  projectId: Scalars['String'];
  resetProject: Scalars['Boolean'];
  taskName: Scalars['String'];
  taskPhase: Scalars['String'];
};

export type CreateUserDto = {
  adresse: Scalars['String'];
  email: Scalars['String'];
  firstname: Scalars['String'];
  image: Scalars['String'];
  lastname: Scalars['String'];
  password: Scalars['String'];
  username: Scalars['String'];
};

export type History = {
  __typename?: 'History';
  createdAt: Scalars['DateTime'];
  id: Scalars['String'];
  projectId: Scalars['String'];
  state: Scalars['String'];
};

export type Images = {
  __typename?: 'Images';
  id: Scalars['String'];
  imagePath: Scalars['String'];
  materialtId: Scalars['String'];
};

export enum MaterialState {
  new = 'new',
  old = 'old',
  used = 'used'
}

export type Materials = {
  __typename?: 'Materials';
  category: Category;
  categoryId: Scalars['String'];
  createdAt: Scalars['DateTime'];
  created_by_id: Scalars['String'];
  description: Scalars['String'];
  id: Scalars['String'];
  images: Array<Images>;
  materialName: Scalars['String'];
  materialState: Scalars['String'];
  price: Scalars['Float'];
  projectId: Scalars['String'];
  quantity: Scalars['Float'];
};

export type Mutation = {
  __typename?: 'Mutation';
  addDeviceToken: User;
  assignUserToProject: Scalars['Boolean'];
  createCategory: Category;
  createHistory: History;
  createMaterial: Materials;
  createNotification: Notifications;
  create_project: Projects;
  create_task: Tasks;
  create_user: User;
  deleteCategory: Scalars['Boolean'];
  deleteHistory: Scalars['Boolean'];
  deleteMaterial: Scalars['Boolean'];
  deleteNotification: Scalars['Boolean'];
  deleteUser: User;
  delete_task: Scalars['Boolean'];
  exportMaterialsToExcel: Scalars['Boolean'];
  signin: SignInResult;
  updateCategory?: Maybe<Category>;
  updateMaterial: Materials;
  updateNotification: Notifications;
  updatePassword: User;
  updateTaskState: Tasks;
  update_project: Projects;
  update_task?: Maybe<Tasks>;
  update_user: User;
  uploadFile: Images;
  uploadUserImage: Scalars['Boolean'];
};


export type MutationAddDeviceTokenArgs = {
  deviceToken: Scalars['String'];
};


export type MutationAssignUserToProjectArgs = {
  projectId: Array<Scalars['String']>;
  userId: Scalars['String'];
};


export type MutationCreateCategoryArgs = {
  name: Scalars['String'];
  parentId?: InputMaybe<Scalars['String']>;
};


export type MutationCreateHistoryArgs = {
  values: CreateHistoryDto;
};


export type MutationCreateMaterialArgs = {
  values: CreateMaterialsDto;
};


export type MutationCreateNotificationArgs = {
  values: CreateNotificationtDto;
};


export type MutationCreate_ProjectArgs = {
  values: CreateProjectDto;
};


export type MutationCreate_TaskArgs = {
  values: CreateTaskDto;
};


export type MutationCreate_UserArgs = {
  values: CreateUserDto;
};


export type MutationDeleteCategoryArgs = {
  id: Scalars['String'];
};


export type MutationDeleteHistoryArgs = {
  id: Scalars['String'];
};


export type MutationDeleteMaterialArgs = {
  id: Scalars['String'];
};


export type MutationDeleteNotificationArgs = {
  id: Scalars['String'];
};


export type MutationDeleteUserArgs = {
  id: Scalars['String'];
};


export type MutationDelete_TaskArgs = {
  id: Scalars['String'];
};


export type MutationExportMaterialsToExcelArgs = {
  projectId: Scalars['String'];
};


export type MutationSigninArgs = {
  values: SigninDto;
};


export type MutationUpdateCategoryArgs = {
  id: Scalars['String'];
  name: Scalars['String'];
};


export type MutationUpdateMaterialArgs = {
  id: Scalars['String'];
  values: UpdateMaterialsDto;
};


export type MutationUpdateNotificationArgs = {
  id: Scalars['String'];
  values: UpdateNotificationtDto;
};


export type MutationUpdatePasswordArgs = {
  values: UpdateUserPasswordDto;
};


export type MutationUpdateTaskStateArgs = {
  id: Scalars['String'];
  taskState: Scalars['Boolean'];
};


export type MutationUpdate_ProjectArgs = {
  id: Scalars['String'];
  values: UpdateProjectDto;
};


export type MutationUpdate_TaskArgs = {
  id: Scalars['String'];
  values: UpdateTaskDto;
};


export type MutationUpdate_UserArgs = {
  values: UpdateUserDto;
};


export type MutationUploadFileArgs = {
  values: UploadMaterialImageDto;
};


export type MutationUploadUserImageArgs = {
  values: Scalars['Upload'];
};

export type Notifications = {
  __typename?: 'Notifications';
  content: Scalars['String'];
  createdAt: Scalars['DateTime'];
  subTitle: Scalars['String'];
  title: Scalars['String'];
};

export enum ProjectState {
  demolition = 'demolition',
  finishing = 'finishing',
  handover = 'handover',
  planning = 'planning',
  qualityControl = 'qualityControl',
  renovation = 'renovation'
}

export type Projects = {
  __typename?: 'Projects';
  city: Scalars['String'];
  codePostal: Scalars['Float'];
  endDate: Scalars['DateTime'];
  estimatedEndDate: Scalars['DateTime'];
  estimatedstartDate: Scalars['DateTime'];
  id: Scalars['String'];
  projectAdress: Scalars['String'];
  projectName: Scalars['String'];
  reference: Scalars['String'];
  startDate: Scalars['DateTime'];
};

export type Query = {
  __typename?: 'Query';
  CurrentuserId: User;
  category?: Maybe<Category>;
  filterMaterials: Array<Materials>;
  filterProjects: Array<Projects>;
  filterTasks: Array<Tasks>;
  findAllHistoryForProjectById: Array<History>;
  getAllCategories: Array<Maybe<Category>>;
  getProjectId: Materials;
  getProjects: Array<Projects>;
  histories: Array<History>;
  historyById: History;
  material: Materials;
  materialsByUser: Array<Materials>;
  notifications: Array<Notifications>;
  stateByProjectId?: Maybe<ProjectState>;
  task_id: Tasks;
  tasks: Array<Tasks>;
  userId: User;
  userImage?: Maybe<Scalars['String']>;
  users: Array<User>;
};


export type QueryCategoryArgs = {
  id: Scalars['String'];
};


export type QueryFilterMaterialsArgs = {
  projectId: Scalars['String'];
};


export type QueryFilterTasksArgs = {
  projectId: Scalars['String'];
};


export type QueryFindAllHistoryForProjectByIdArgs = {
  projectId: Scalars['String'];
};


export type QueryGetProjectIdArgs = {
  id: Scalars['String'];
};


export type QueryHistoryByIdArgs = {
  id: Scalars['String'];
};


export type QueryMaterialArgs = {
  id: Scalars['String'];
};


export type QueryMaterialsByUserArgs = {
  userId: Scalars['String'];
};


export type QueryStateByProjectIdArgs = {
  id: Scalars['String'];
};


export type QueryTask_IdArgs = {
  id: Scalars['String'];
};


export type QueryUserIdArgs = {
  userId: Scalars['String'];
};

export type SignInResult = {
  __typename?: 'SignInResult';
  access_token: Scalars['String'];
  image: Scalars['String'];
  username: Scalars['String'];
};

export type SigninDto = {
  password: Scalars['String'];
  username: Scalars['String'];
};

export type Tasks = {
  __typename?: 'Tasks';
  description: Scalars['String'];
  id: Scalars['String'];
  projectId: Scalars['String'];
  taskName: Scalars['String'];
  taskPhase: ProjectState;
  taskState: Scalars['Boolean'];
};

export type UpdateMaterialsDto = {
  categoryId?: InputMaybe<Scalars['String']>;
  description: Scalars['String'];
  materialName: Scalars['String'];
  materialState: Scalars['String'];
  price: Scalars['Float'];
  quantity: Scalars['Float'];
};

export type UpdateNotificationtDto = {
  content: Scalars['String'];
  subTitle: Scalars['String'];
  title: Scalars['String'];
};

export type UpdateProjectDto = {
  city: Scalars['String'];
  codePostal: Scalars['Float'];
  endDate: Scalars['DateTime'];
  estimatedEndDate: Scalars['DateTime'];
  estimatedstartDate: Scalars['DateTime'];
  projectAdress: Scalars['String'];
  projectName: Scalars['String'];
  reference: Scalars['String'];
  startDate: Scalars['DateTime'];
};

export type UpdateTaskDto = {
  description: Scalars['String'];
  projectId: Scalars['String'];
  resetProject: Scalars['Boolean'];
  taskName: Scalars['String'];
  taskPhase: Scalars['String'];
};

export type UpdateUserDto = {
  adresse: Scalars['String'];
  email: Scalars['String'];
  firstname: Scalars['String'];
  lastname: Scalars['String'];
  username: Scalars['String'];
};

export type UpdateUserPasswordDto = {
  confirmPassword: Scalars['String'];
  oldPassword: Scalars['String'];
  password: Scalars['String'];
};

export type UploadMaterialImageDto = {
  image: Scalars['Upload'];
  materialId: Scalars['String'];
};

export type User = {
  __typename?: 'User';
  adresse: Scalars['String'];
  deviceToken: Scalars['String'];
  email: Scalars['String'];
  firstname: Scalars['String'];
  image: Scalars['String'];
  lastname: Scalars['String'];
  password: Scalars['String'];
  role: UserRole;
  username: Scalars['String'];
};

export enum UserRole {
  admin = 'admin',
  diagnostician = 'diagnostician'
}

export type SigninMutationVariables = Exact<{
  values: SigninDto;
}>;


export type SigninMutation = { __typename?: 'Mutation', signin: { __typename?: 'SignInResult', access_token: string, username: string } };

export type AllHistoryQueryVariables = Exact<{
  projectId: Scalars['String'];
}>;


export type AllHistoryQuery = { __typename?: 'Query', findAllHistoryForProjectById: Array<{ __typename?: 'History', state: string, createdAt: any }> };

export type GetProjectListQueryVariables = Exact<{ [key: string]: never; }>;


export type GetProjectListQuery = { __typename?: 'Query', filterProjects: Array<{ __typename?: 'Projects', projectName: string, reference: string, projectAdress: string, id: string, city: string, codePostal: number, endDate: any, estimatedEndDate: any, estimatedstartDate: any, startDate: any }> };

export type MaterialFieldsFragment = { __typename?: 'Materials', materialName: string, quantity: number, price: number, description: string };

export type CreateMaterialMutationVariables = Exact<{
  values: CreateMaterialsDto;
}>;


export type CreateMaterialMutation = { __typename?: 'Mutation', createMaterial: { __typename?: 'Materials', projectId: string, categoryId: string, materialState: string, id: string, materialName: string, quantity: number, price: number, description: string } };

export type GetMaterialQueryVariables = Exact<{
  projectId: Scalars['String'];
}>;


export type GetMaterialQuery = { __typename?: 'Query', filterMaterials: Array<{ __typename?: 'Materials', created_by_id: string, projectId: string, categoryId: string, materialState: string, id: string, materialName: string, quantity: number, price: number, description: string }> };

export type GetMaterialListQueryVariables = Exact<{
  projectId: Scalars['String'];
}>;


export type GetMaterialListQuery = { __typename?: 'Query', filterMaterials: Array<{ __typename?: 'Materials', categoryId: string, materialState: string, projectId: string, id: string, materialName: string, quantity: number, price: number, description: string }> };

export type UploadFileMutationVariables = Exact<{
  values: UploadMaterialImageDto;
}>;


export type UploadFileMutation = { __typename?: 'Mutation', uploadFile: { __typename?: 'Images', materialtId: string, imagePath: string, id: string } };

export type MaterialDetailsQueryVariables = Exact<{
  id: Scalars['String'];
}>;


export type MaterialDetailsQuery = { __typename?: 'Query', material: { __typename?: 'Materials', materialName: string, materialState: string, createdAt: any, created_by_id: string, categoryId: string, price: number, projectId: string, id: string, quantity: number, description: string, images: Array<{ __typename?: 'Images', id: string, materialtId: string, imagePath: string }> } };

export type UpdateMaterialMutationVariables = Exact<{
  id: Scalars['String'];
  values: UpdateMaterialsDto;
}>;


export type UpdateMaterialMutation = { __typename?: 'Mutation', updateMaterial: { __typename?: 'Materials', materialState: string, categoryId: string, projectId: string, created_by_id: string, id: string, materialName: string, quantity: number, price: number, description: string } };

export type DeleteMaterialMutationVariables = Exact<{
  id: Scalars['String'];
}>;


export type DeleteMaterialMutation = { __typename?: 'Mutation', deleteMaterial: boolean };

export type GetNotificationListQueryVariables = Exact<{ [key: string]: never; }>;


export type GetNotificationListQuery = { __typename?: 'Query', notifications: Array<{ __typename?: 'Notifications', content: string, subTitle: string, title: string, createdAt: any }> };

export type GetAllCategoriesQueryVariables = Exact<{ [key: string]: never; }>;


export type GetAllCategoriesQuery = { __typename?: 'Query', getAllCategories: Array<{ __typename?: 'Category', id: string, name: string, parent_id?: string | null } | null> };

export type TaskslistQueryVariables = Exact<{
  projectId: Scalars['String'];
}>;


export type TaskslistQuery = { __typename?: 'Query', filterTasks: Array<{ __typename?: 'Tasks', id: string, taskName: string, taskState: boolean, description: string, taskPhase: ProjectState, projectId: string }> };

export type UpdateTaskStateMutationVariables = Exact<{
  id: Scalars['String'];
  taskState: Scalars['Boolean'];
}>;


export type UpdateTaskStateMutation = { __typename?: 'Mutation', updateTaskState: { __typename?: 'Tasks', taskName: string, taskState: boolean } };

export type UpdateMutationVariables = Exact<{
  values: UpdateUserDto;
}>;


export type UpdateMutation = { __typename?: 'Mutation', update_user: { __typename?: 'User', username: string, email: string, lastname: string, firstname: string, adresse: string } };

export type UpdatePasswordMutationVariables = Exact<{
  values: UpdateUserPasswordDto;
}>;


export type UpdatePasswordMutation = { __typename?: 'Mutation', updatePassword: { __typename?: 'User', email: string, username: string } };

export type UploadUserImageMutationVariables = Exact<{
  values: Scalars['Upload'];
}>;


export type UploadUserImageMutation = { __typename?: 'Mutation', uploadUserImage: boolean };

export type UserImageQueryVariables = Exact<{ [key: string]: never; }>;


export type UserImageQuery = { __typename?: 'Query', userImage?: string | null };

export type CurrentuserIdQueryVariables = Exact<{ [key: string]: never; }>;


export type CurrentuserIdQuery = { __typename?: 'Query', CurrentuserId: { __typename?: 'User', firstname: string, lastname: string, email: string, username: string, adresse: string } };

export type AddDeviceTokenMutationVariables = Exact<{
  deviceToken: Scalars['String'];
}>;


export type AddDeviceTokenMutation = { __typename?: 'Mutation', addDeviceToken: { __typename?: 'User', deviceToken: string } };
