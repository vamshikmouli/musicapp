import theme from '@/theme';
import { TextField as MuiTextField, TextFieldProps } from '@mui/material';

const LNSTextField: React.FC<TextFieldProps> = (props) => {
  return (
    <MuiTextField
      {...props}
      fullWidth
      variant="outlined"
      margin="normal"
      sx={{
        backgroundColor: theme.palette.primary.contrastText,
        borderRadius: 1,
        '& .MuiOutlinedInput-root': {
          '& fieldset': { borderColor: 'primary.main' },
          '&:hover fieldset': { borderColor: 'primary.dark' },
          '&.Mui-focused fieldset': { borderColor: 'primary.main' },
        },
      }}
    />
  );
};

export default LNSTextField;
