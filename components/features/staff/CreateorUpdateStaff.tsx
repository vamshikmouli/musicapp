'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import LNSDialog from '@/components/ui/LNSDialog';
import LNSTextField from '@/components/ui/LNSTextField';
import Grid from '@mui/material/Grid2';
import { Staff } from '@prisma/client';
import { saveStaff } from '@/actions/staffService';
import { useNotification } from '@/context/NotificationContext';

const staffSchema = z.object({
  id: z.string().optional(), // Include id for updates
  name: z.string().min(1, 'Staff name is required'),
  email: z.string().min(1, 'Email is required').email('Invalid email'),
  joiningDate: z.string().optional(),
});

interface CreateStaffProps {
  open: boolean;
  onClose: () => void;
  staff?: Staff | null;
}

const CreateOrUpdateStaff = ({ open, onClose, staff }: CreateStaffProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<Staff>({
    resolver: zodResolver(staffSchema),
    defaultValues: {
      ...staff,
      joiningDate: staff?.joiningDate && new Date(staff.joiningDate),
    },
  });
  const { showNotification } = useNotification();

  const onSubmit = async (data: Staff) => {
    const staffData = staff ? { ...data, id: staff.id } : data;
    try {
      await saveStaff(staffData);
      showNotification(
        `Staff ${data?.id ? 'updated' : 'added'} successfully`,
        'success'
      );
      reset();
      onClose();
    } catch (error) {
      showNotification('Error saving staff', 'error');
    }
  };

  return (
    <LNSDialog
      open={open}
      onClose={onClose}
      title={staff ? 'Update Staff' : 'Create Staff'}
      onSubmit={handleSubmit(onSubmit)}
    >
      <Grid container spacing={2}>
        <Grid size={6}>
          <LNSTextField
            required
            label="Staff Name"
            placeholder="Enter your staff name"
            {...register('name')}
            error={!!errors.name}
            helperText={errors.name?.message?.toString()}
          />
        </Grid>
        <Grid size={6}>
          <LNSTextField
            required
            label="Email"
            placeholder="Enter your Staff email"
            {...register('email')}
            error={!!errors.email}
            helperText={errors.email?.message?.toString()}
          />
        </Grid>
        <Grid size={6}>
          <label>Joining Date</label>
          <LNSTextField
            required={false}
            type="date"
            placeholder="Enter Joining Date"
            {...register('joiningDate')}
            error={!!errors.joiningDate}
            helperText={errors.joiningDate?.message?.toString()}
          />
        </Grid>
      </Grid>
    </LNSDialog>
  );
};

export default CreateOrUpdateStaff;
