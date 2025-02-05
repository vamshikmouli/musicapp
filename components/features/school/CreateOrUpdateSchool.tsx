'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import LNSDialog from '@/components/ui/LNSDialog';
import LNSTextField from '@/components/ui/LNSTextField';
import theme from '@/theme';
import { ISchool } from '@/actions/enities/school';
import { saveSchool } from '@/actions/schoolService';

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
    try {
      await saveSchool(schoolData);
      reset();
      onClose();
    } catch (error) {
      console.error('Error saving school:', error);
    }
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
        placeholder="Enter your School name"
        {...register('name')}
        error={!!errors.name}
        helperText={errors.name?.message?.toString()}
      />
      <LNSTextField
        label="Location"
        placeholder="Enter your School location"
        {...register('location')}
      />
    </LNSDialog>
  );
};

export default CreateOrUpdateSchool;
