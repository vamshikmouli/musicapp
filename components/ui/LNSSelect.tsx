import { SelectOption } from '@/utils/helper';
import {
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  SelectProps,
} from '@mui/material';
import { Controller } from 'react-hook-form';

interface LNSSelectProps extends Omit<SelectProps, 'variant'> {
  label?: string;
  options: SelectOption[];
  name: string;
  control: any;
  sx?: any;
}

const LNSSelect: React.FC<LNSSelectProps> = ({
  label,
  options,
  name,
  control,
  sx,
  ...props
}) => {
  return (
    <FormControl
      fullWidth
      margin="normal"
      sx={{
        backgroundColor: 'primary.contrastText',
        borderRadius: 1,
        '& .Mui-focused .MuiOutlinedInput-notchedOutline': {
          borderColor: 'primary.main',
          borderWidth: '2px',
        },
        '&:hover .MuiOutlinedInput-notchedOutline': {
          borderColor: 'primary.dark',
        },
        ...sx,
      }}
    >
      {label && (
        <InputLabel sx={{ color: 'text.primary', fontSize: 14 }}>
          {label}
        </InputLabel>
      )}
      <Controller
        name={name}
        control={control}
        defaultValue=""
        render={({ field }) => (
          <Select
            {...field}
            {...props}
            label={label}
            value={field.value || ''} // Ensure an empty string when no value is selected
            onChange={(e) => field.onChange(e.target.value)}
            variant="outlined"
            displayEmpty
            sx={{
              backgroundColor: 'white',
              fontSize: 14,
              paddingY: 1, // Adjust vertical padding
              '& .MuiOutlinedInput-root': {
                '& fieldset': { borderColor: 'grey.400' },
                '&:hover fieldset': { borderColor: 'primary.main' },
                '&.Mui-focused fieldset': { borderColor: 'primary.main' },
              },
              '& .MuiSelect-select': {
                paddingY: 1.2, // Adjust padding inside the select box
                display: 'flex',
                alignItems: 'center',
              },
              // Ensure InputLabel is vertically aligned with the select options
              '& .MuiInputLabel-root': {
                transform: 'translate(14px, 20px) scale(1)', // Fix the label position
                '&.Mui-focused': {
                  transform: 'translate(14px, -6px) scale(0.75)', // Adjust when focused
                },
              },
              ...sx,
            }}
          >
            {options.map((option) => (
              <MenuItem
                key={option.value}
                value={option.value}
                sx={{
                  paddingY: 1,
                  fontSize: 14,
                  '&:hover': { backgroundColor: 'primary.light' },
                }}
              >
                {option.label}
              </MenuItem>
            ))}
          </Select>
        )}
      />
    </FormControl>
  );
};

export default LNSSelect;
