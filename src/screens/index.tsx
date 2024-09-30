import React, {FC, useEffect, useState} from 'react';
import {Snackbar} from 'react-native-paper';
import MainNavigation from '../navigators/MainNavigation';
import NetInfo from '@react-native-community/netinfo';
import {useAppDispatcher, useAppSelector, getStore} from '../helpers/store';
import {applyMigrations} from '../data/dataSource/localData/database/applyMigration';
import {useMaterialSync} from '../domain/SyncDatabase/syncMaterial';
import {useTaskSync} from '../domain/SyncDatabase/syncTasks';
import {useImageSync} from '../domain/SyncDatabase/syncImages';

const AppProvider: FC = () => {
  const dispatch = useAppDispatcher();
  const isConnected = useAppSelector(getStore().select.application.isConnected);
  const [snackbarVisible, setSnackbarVisible] = useState<boolean>(false);
  const syncUnsynchronizedMaterials = useMaterialSync();
  const syncUnsynchronizedTasks = useTaskSync();
  const syncUnsynchronizedImages = useImageSync();

  useEffect(() => {
    setSnackbarVisible(true);
    if (isConnected) {
      syncUnsynchronizedTasks();
    }
  }, [isConnected, syncUnsynchronizedTasks]);
  useEffect(() => {
    setSnackbarVisible(true);
    if (isConnected) {
      syncUnsynchronizedMaterials();
    }
  }, [isConnected, syncUnsynchronizedMaterials]);
  useEffect(() => {
    setSnackbarVisible(true);
    if (isConnected) {
      syncUnsynchronizedImages();
    }
  }, [isConnected, syncUnsynchronizedImages]);

  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener(state => {
      dispatch.application.setIsConnected(state.isConnected);
    });

    applyMigrations();

    return () => {
      unsubscribe();
    };
  }, [dispatch]);

  const onDismissSnackbar = () => {
    setSnackbarVisible(false);
  };

  return (
    <>
      <MainNavigation />
      <Snackbar
        style={{backgroundColor: '#182A4D'}}
        visible={snackbarVisible}
        onDismiss={onDismissSnackbar}
        duration={Snackbar.DURATION_SHORT}
        action={{
          label: 'Dismiss',
          onPress: onDismissSnackbar,
        }}>
        {isConnected ? 'Connection restored' : "You're offline"}
      </Snackbar>
    </>
  );
};

export default AppProvider;
