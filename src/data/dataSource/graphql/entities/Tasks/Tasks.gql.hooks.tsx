import type * as Types from '../../../../../dataSource/graphql/graphql-schema-types';

import gql from 'graphql-tag';
import * as Urql from 'urql';
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;

export const TaskslistDocument = gql`
    query Taskslist($projectId: String!) {
  filterTasks(projectId: $projectId) {
    id
    taskName
    taskState
    description
    taskPhase
    projectId
  }
}
    `;

export function useTaskslistQuery(options: Omit<Urql.UseQueryArgs<Types.TaskslistQueryVariables>, 'query'>) {
  return Urql.useQuery<Types.TaskslistQuery, Types.TaskslistQueryVariables>({ query: TaskslistDocument, ...options });
};
export const UpdateTaskStateDocument = gql`
    mutation UpdateTaskState($id: String!, $taskState: Boolean!) {
  updateTaskState(id: $id, taskState: $taskState) {
    taskName
    taskState
  }
}
    `;

export function useUpdateTaskStateMutation() {
  return Urql.useMutation<Types.UpdateTaskStateMutation, Types.UpdateTaskStateMutationVariables>(UpdateTaskStateDocument);
};