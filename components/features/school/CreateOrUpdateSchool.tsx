'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import LNSDialog from '@/components/ui/LNSDialog';
import LNSTextField from '@/components/ui/LNSTextField';
import { saveSchool } from '@/actions/schoolService';
import Grid from '@mui/material/Grid2';
import { School } from '@prisma/client';
import { useNotification } from '@/context/NotificationContext';

const schoolSchema = z.object({
  id: z.string().optional(), // Include id for updates
  name: z.string().min(1, 'School name is required'),
  email: z.string().min(1, 'Email is required').email('Invalid email'),
  contactPerson: z.string().optional(),
  contactNumber: z.string().optional(),
  location: z.string().optional(),
});

interface CreateSchoolProps {
  open: boolean;
  onClose: () => void;
  school?: School | null;
}

const CreateOrUpdateSchool = ({ open, onClose, school }: CreateSchoolProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<School>({
    resolver: zodResolver(schoolSchema),
    defaultValues: {
      ...school,
    },
  });
  const { showNotification } = useNotification();

  const onSubmit = async (data: School) => {
    const schoolData = school ? { ...data, id: school.id } : data;
    try {
      await saveSchool(schoolData);
      reset();
      onClose();
      showNotification(
        `School ${data?.id ? 'updated' : 'added'} successfully`,
        'success'
      );
    } catch (error) {
      showNotification('Error saving school', 'error');
    }
  };

  return (
    <LNSDialog
      open={open}
      onClose={onClose}
      title={school ? 'Update School' : 'Create School'}
      onSubmit={handleSubmit(onSubmit)}
    >
      <Grid container spacing={2}>
        <Grid size={6}>
          <LNSTextField
            required
            label="School Name"
            placeholder="Enter your School name"
            {...register('name')}
            error={!!errors.name}
            helperText={errors.name?.message?.toString()}
          />
        </Grid>
        <Grid size={6}>
          <LNSTextField
            required
            label="Email"
            placeholder="Enter your School email"
            {...register('email')}
            error={!!errors.email}
            helperText={errors.email?.message?.toString()}
          />
        </Grid>
        <Grid size={6}>
          <LNSTextField
            label="Contact Name"
            placeholder="Enter Contact Name"
            {...register('contactPerson')}
          />
        </Grid>
        <Grid size={6}>
          <LNSTextField
            label="Contact Number"
            placeholder="Enter Contact Number"
            {...register('contactNumber')}
          />
        </Grid>
        <Grid size={6}>
          <LNSTextField
            label="Location"
            placeholder="Enter your School location"
            {...register('location')}
          />
        </Grid>
      </Grid>
    </LNSDialog>
  );
};

export default CreateOrUpdateSchool;
