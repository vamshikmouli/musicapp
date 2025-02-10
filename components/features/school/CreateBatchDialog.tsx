'use client';

import { useForm, useFieldArray } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { IconButton } from '@mui/material';
import Grid from '@mui/material/Grid2';
import { PlusCircle, Trash } from 'lucide-react';
import LNSDialog from '@/components/ui/LNSDialog';
import LNSTextField from '@/components/ui/LNSTextField';
import LNSButton from '@/components/ui/LNSButton';
import { createdBatches, deleteBatch } from '@/actions/schoolService';
import { Batch } from '@prisma/client';
import { useNotification } from '@/context/NotificationContext';

const batchSchema = z.object({
  id: z.string().optional(),
  name: z.string().min(1, 'Batch name is required'),
  startTime: z.string().min(1, 'Start time is required'),
  endTime: z.string().min(1, 'End time is required'),
});

const batchesSchema = z.object({
  batches: z.array(batchSchema).min(1, 'At least one batch is required'),
});

interface AddBatchDialogProps {
  open: boolean;
  onClose: () => void;
  schoolId: string;
  onBatchAdded: () => void;
  initialBatches?: Batch[];
}

const AddBatchDialog = ({
  open,
  onClose,
  schoolId,
  onBatchAdded,
  initialBatches = [],
}: AddBatchDialogProps) => {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
    reset,
  } = useForm({
    resolver: zodResolver(batchesSchema),
    defaultValues: {
      batches: initialBatches.length
        ? initialBatches
        : [{ name: '', startTime: '', endTime: '' }],
    },
  });
  const { showNotification } = useNotification();
  const { fields, append, remove } = useFieldArray({
    control,
    name: 'batches',
  });

  const onSubmit = async (data: any) => {
    try {
      await createdBatches(data.batches, schoolId);
      reset();
      onClose();
      onBatchAdded();
      showNotification('Batches added successfully', 'success');
    } catch (error) {
      showNotification('Error adding batches', 'error');
    }
  };

  const handleDelete = async (index: number) => {
    const id = initialBatches[index].id;
    if (id) {
      try {
        await deleteBatch(id);
        remove(index);
        showNotification('Batches deleted successfully', 'success');
      } catch (error) {
        showNotification('Failed to delete batch', 'error');
      }
    } else {
      remove(index);
    }
  };

  return (
    <LNSDialog
      open={open}
      onClose={onClose}
      title={initialBatches.length ? 'Update Batches' : 'Add Batches'}
      onSubmit={handleSubmit(onSubmit)}
    >
      {fields.map((field, index) => (
        <Grid container spacing={1} key={field.id} alignItems="center">
          <Grid size={4}>
            <LNSTextField
              required
              label="Batch Name"
              {...register(`batches.${index}.name`)}
              error={!!errors.batches?.[index]?.name}
              helperText={errors.batches?.[index]?.name?.message?.toString()}
            />
          </Grid>
          <Grid size={3}>
            <LNSTextField
              required
              label="Start Time"
              type="time"
              {...register(`batches.${index}.startTime`)}
              error={!!errors.batches?.[index]?.startTime}
              helperText={errors.batches?.[
                index
              ]?.startTime?.message?.toString()}
              slotProps={{
                inputLabel: {
                  shrink: true,
                },
              }}
            />
          </Grid>
          <Grid size={3}>
            <LNSTextField
              required
              label="End Time"
              type="time"
              {...register(`batches.${index}.endTime`)}
              error={!!errors.batches?.[index]?.endTime}
              helperText={errors.batches?.[index]?.endTime?.message?.toString()}
              slotProps={{
                inputLabel: {
                  shrink: true,
                },
              }}
            />
          </Grid>
          <Grid size={2}>
            <IconButton
              onClick={() => handleDelete(index)}
              color="error"
              disabled={fields.length === 1}
            >
              <Trash />
            </IconButton>
          </Grid>
        </Grid>
      ))}
      <LNSButton
        onClick={() => append({ name: '', startTime: '', endTime: '' })}
        startIcon={<PlusCircle />}
      >
        Add Another Batch
      </LNSButton>
    </LNSDialog>
  );
};

export default AddBatchDialog;
