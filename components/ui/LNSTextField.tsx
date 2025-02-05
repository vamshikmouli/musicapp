import { TextField, TextFieldProps } from '@mui/material';

const LNSTextField: React.FC<TextFieldProps> = ({ sx, ...props }) => {
  return (
    <TextField
      fullWidth
      variant="outlined"
      margin="normal"
      {...props}
      sx={{
        backgroundColor: 'primary.contrastText',
        borderRadius: 1,
        '& .MuiOutlinedInput-root': {
          '& fieldset': { borderColor: 'primary.main' },
          '&:hover fieldset': { borderColor: 'primary.dark' },
          '&.Mui-focused fieldset': { borderColor: 'primary.main' },
        },
        ...sx, // Allow external styles to be merged
      }}
    />
  );
};

export default LNSTextField;
