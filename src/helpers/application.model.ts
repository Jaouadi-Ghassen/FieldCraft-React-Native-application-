import {createModel} from '@rematch/core';
import {RootModel} from './store';

const application = createModel<RootModel>()({
  name: 'application',
  state: {
    projectId: '',
    isConnected: null as boolean | null,
  },
  reducers: {
    setProjectId(state, projectId) {
      return {...state, projectId};
    },
    setIsConnected(state, isConnected: boolean | null) {
      return {...state, isConnected};
    },
  },
  selectors: slice => ({
    projectId: () => slice(state => state.projectId),
    isConnected: () => slice(state => state.isConnected),
  }),
});

export default application;
