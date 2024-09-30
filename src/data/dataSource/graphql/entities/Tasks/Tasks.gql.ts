import {gql} from 'urql';

export const Get_Tasks_Query = gql`
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

export const Update_Task_State_Mutation = gql`
  mutation UpdateTaskState($id: String!, $taskState: Boolean!) {
    updateTaskState(id: $id, taskState: $taskState) {
      taskName
      taskState
    }
  }
`;
