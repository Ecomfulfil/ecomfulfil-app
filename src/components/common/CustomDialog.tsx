import React from 'react';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';

interface CustomDialogProps {
  title?: string;
  message?: string;
  successButtonText?: string;
  onSuccess?: () => void;
  onClose?: () => void;
}

/**
 * CustomDialog - A dialog component using Material-UI.
 *
 * @param {CustomDialogProps} props - The props for the component.
 * @returns {React.Component} - The CustomDialog.
 */
const CustomDialog: React.FC<CustomDialogProps> = ({
  title,
  message,
  successButtonText,
  onSuccess,
  onClose,
}) => {
  return (
    <Dialog
      open={true}
      onClose={onClose}
      aria-labelledby="dialog-title"
    >
      {title && <DialogTitle id="dialog-title">{title}</DialogTitle>}
      <DialogContent>
        {message && <DialogContentText>{message}</DialogContentText>}
      </DialogContent>
      <DialogActions>
        {onSuccess && (
          <Button onClick={onSuccess}>
            {successButtonText ?? 'Ok'}
          </Button>
        )}
        {onClose && <Button onClick={onClose}>Close</Button>}
      </DialogActions>
    </Dialog>
  );
};

export default CustomDialog;
