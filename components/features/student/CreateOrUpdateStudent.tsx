'use client';

import { useForm } from 'react-hook-form';
import isEmpty from 'lodash/isEmpty';
import { zodResolver } from '@hookform/resolvers/zod';
import LNSDialog from '@/components/ui/LNSDialog';
import LNSTextField from '@/components/ui/LNSTextField';
import Grid from '@mui/material/Grid2';
import { Student } from '@prisma/client';
import { useNotification } from '@/context/NotificationContext';
import { saveStudent } from '@/actions/studentService';
import LNSSelect from '@/components/ui/LNSSelect';
import studentSchema, { genderOptions, standardOptions } from './studentHelper';
import LNSDatePicker from '@/components/ui/LNSDatePicker';

interface CreateStudentProps {
  open: boolean;
  onClose: () => void;
  student?: Student | null;
  schoolId?: string;
  tempBatchId?: string | null;
}

const CreateOrUpdateStudent = ({
  open,
  onClose,
  student,
  schoolId,
  tempBatchId,
}: CreateStudentProps) => {
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<Student>({
    resolver: zodResolver(studentSchema),
    defaultValues: {
      ...student,
    },
  });

  const { showNotification } = useNotification();

  const onSubmit = async (data: Student) => {
    try {
      const batchId = !isEmpty(tempBatchId) ? tempBatchId : null;
      await saveStudent({ ...data, schoolId, batchId });
      reset();
      onClose();
      showNotification(
        `Student ${data?.id ? 'updated' : 'added'} successfully`,
        'success'
      );
    } catch (error) {
      showNotification('Error saving student', 'error');
    }
  };

  return (
    <LNSDialog
      open={open}
      onClose={onClose}
      title={student ? 'Update Student' : 'Create Student'}
      onSubmit={handleSubmit(onSubmit)}
    >
      <Grid container spacing={2}>
        <Grid size={6}>
          <LNSTextField
            required
            label="Student Name"
            placeholder="Enter Student Name"
            {...register('name')}
            error={!!errors.name}
            helperText={errors.name?.message?.toString()}
          />
        </Grid>
        <Grid size={6}>
          <LNSTextField
            required
            label="Email"
            placeholder="Enter Student Email"
            {...register('email')}
            error={!!errors.email}
            helperText={errors.email?.message?.toString()}
          />
        </Grid>
        <Grid size={6}>
          <LNSDatePicker
            label="Date of Birth"
            name="DOB"
            control={control}
            disableFuture
          />
        </Grid>
        <Grid size={6}>
          <LNSSelect
            name="gender"
            label="Gender"
            control={control}
            options={genderOptions}
          />
        </Grid>
        <Grid size={6}>
          <LNSSelect
            name="standard"
            label="Standard"
            control={control}
            options={standardOptions}
          />
        </Grid>
        <Grid size={6}>
          <LNSTextField
            required
            label="Father Name"
            placeholder="Enter Father Name"
            {...register('fatherName')}
            error={!!errors.fatherName}
            helperText={errors.fatherName?.message?.toString()}
          />
        </Grid>
        <Grid size={6}>
          <LNSTextField
            required
            label="Father Phone"
            placeholder="Enter Father Phone Num"
            {...register('fatherPhone')}
            error={!!errors.fatherPhone}
            helperText={errors.fatherPhone?.message?.toString()}
          />
        </Grid>
        <Grid size={6}>
          <LNSTextField
            required
            label="Mother Name"
            placeholder="Enter Mother Name"
            {...register('motherName')}
            error={!!errors.motherName}
            helperText={errors.motherName?.message?.toString()}
          />
        </Grid>
        <Grid size={6}>
          <LNSTextField
            required
            label="Mother Phone"
            placeholder="Enter Mother Phone Num"
            {...register('motherPhone')}
            error={!!errors.motherPhone}
            helperText={errors.motherPhone?.message?.toString()}
          />
        </Grid>
      </Grid>
    </LNSDialog>
  );
};

export default CreateOrUpdateStudent;
