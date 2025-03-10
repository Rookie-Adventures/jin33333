import { Alert, Snackbar } from '@mui/material';
import { useCallback } from 'react';

import type { FC } from 'react';

import { useAppDispatch, useAppSelector } from '@/hooks';
import { hideToast } from '@/store/slices/appSlice';

export const Toast: FC = () => {
  const dispatch = useAppDispatch();
  const { open, message, severity } = useAppSelector(state => state.app.toast);

  const handleClose = useCallback((): void => {
    dispatch(hideToast());
  }, [dispatch]);

  return (
    <Snackbar
      open={open}
      autoHideDuration={3000}
      onClose={handleClose}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
    >
      <Alert onClose={handleClose} severity={severity} variant="filled">
        {message}
      </Alert>
    </Snackbar>
  );
};
