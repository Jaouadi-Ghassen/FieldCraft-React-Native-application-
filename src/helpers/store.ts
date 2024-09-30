import {init, Models, RematchDispatch, RematchRootState} from '@rematch/core';
import selectPlugin from '@rematch/select';
import {useDispatch, useSelector} from 'react-redux';
import application from './application.model';

export interface RootModel extends Models<RootModel> {
  application: typeof application;
}

export const models: RootModel = {
  application,
};

let store = InitStore();

function InitStore() {
  return init<RootModel>({
    models,
    plugins: [selectPlugin()],
  });
}

export const getStore = () => {
  if (!store) store = InitStore();
  return store;
};

export type Store = typeof store;
export type Dispatch = RematchDispatch<RootModel>;
export type RootState = RematchRootState<RootModel>;

export const useAppDispatcher = () => {
  const dispatcher = useDispatch<Dispatch>();
  return dispatcher;
};

export function useAppSelector<T>(selector: (state: RootState) => T): T;
export function useAppSelector<T, P>(
  selector: (state: RootState, props: P) => T,
  props: P,
): T;
export function useAppSelector<T, P>(
  selector: (state: RootState, props?: P) => T,
  props?: P,
): T {
  if (props) return useSelector<RootState, T>(state => selector(state, props));

  return useSelector<RootState, T>(selector);
}
