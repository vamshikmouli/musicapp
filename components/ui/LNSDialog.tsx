'use client';

import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from '@mui/material';
import LNSButton from './LNSButton';

interface LNSDialogProps {
  open: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
  onSubmit?: () => void;
  submitLabel?: string;
  cancelLabel?: string;
}

const LNSDialog = ({
  open,
  onClose,
  title,
  children,
  onSubmit,
  submitLabel = 'Submit',
  cancelLabel = 'Cancel',
}: LNSDialogProps) => {
  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>{title}</DialogTitle>
      <DialogContent>{children}</DialogContent>
      <DialogActions>
        <LNSButton onClick={onClose} color="secondary">
          {cancelLabel}
        </LNSButton>
        {onSubmit && (
          <LNSButton onClick={onSubmit} variant="contained" color="primary">
            {submitLabel}
          </LNSButton>
        )}
      </DialogActions>
    </Dialog>
  );
};

export default LNSDialog;
