'use client';

import { DatePicker, DatePickerProps } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { Controller } from 'react-hook-form';
import dayjs, { Dayjs } from 'dayjs';

interface LNSDatePickerProps
  extends Omit<DatePickerProps<Dayjs>, 'renderInput'> {
  label?: string;
  name: string;
  control: any;
}

const LNSDatePicker: React.FC<LNSDatePickerProps> = ({
  label,
  name,
  control,
  sx,
  ...props
}) => {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Controller
        name={name}
        control={control}
        render={({ field, fieldState }) => {
          const value = field.value ? field.value : null;

          return (
            <DatePicker
              {...field}
              {...props}
              label={label}
              value={value ? dayjs(value) : null}
              onChange={(newValue) =>
                field.onChange(newValue ? newValue.toISOString() : null)
              }
              slotProps={{
                textField: {
                  fullWidth: true,
                  variant: 'outlined',
                  margin: 'normal',
                  error: !!fieldState.error,
                  helperText: fieldState.error?.message,
                },
              }}
            />
          );
        }}
      />
    </LocalizationProvider>
  );
};

export default LNSDatePicker;
