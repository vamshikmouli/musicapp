'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import LNSDialog from '@/components/ui/LNSDialog';
import LNSTextField from '@/components/ui/LNSTextField';
import theme from '@/theme';
import { createOrUpdateSchool } from '@/actions/school/route';
import { ISchool } from '@/actions/enities/school';

const schoolSchema = z.object({
  name: z.string().min(1, 'School name is required'),
  location: z.string().optional(),
});

interface CreateSchoolProps {
  open: boolean;
  onClose: () => void;
  school?: ISchool | null;
}

const CreateOrUpdateSchool = ({ open, onClose, school }: CreateSchoolProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ISchool>({
    resolver: zodResolver(schoolSchema),
    defaultValues: {
      id: school?.id || '',
      name: school?.name || '',
      location: school?.location || '',
    },
  });

  const onSubmit = async (data: ISchool) => {
    const schoolData = school ? { ...data, id: school.id } : data;
    const res = await createOrUpdateSchool(schoolData);
    if (!res) return;
    reset();
    onClose();
  };

  return (
    <LNSDialog
      open={open}
      onClose={onClose}
      title={school ? 'Update School' : 'Create School'}
      onSubmit={handleSubmit(onSubmit)}
    >
      <LNSTextField
        label="School Name"
        type="name"
        placeholder="Enter your School name"
        fullWidth
        variant="outlined"
        margin="normal"
        sx={{
          backgroundColor: theme.palette.primary.contrastText,
          borderRadius: 1,
        }}
        {...register('name')}
        error={!!errors.name}
        helperText={errors.name?.message?.toString()}
      />
      <LNSTextField
        label="Location"
        type="location"
        placeholder="Enter your School location"
        fullWidth
        variant="outlined"
        margin="normal"
        sx={{
          backgroundColor: theme.palette.primary.contrastText,
          borderRadius: 1,
        }}
        {...register('location')}
        error={!!errors.location}
        helperText={errors.location?.message?.toString()}
      />
    </LNSDialog>
  );
};

export default CreateOrUpdateSchool;
