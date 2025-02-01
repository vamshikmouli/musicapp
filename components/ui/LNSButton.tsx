import theme from '@/theme';
import { Button as MuiButton, ButtonProps } from '@mui/material';

interface BaseButtonProps extends ButtonProps {
  loading?: boolean;
}

const BaseButton: React.FC<BaseButtonProps> = ({
  loading,
  children,
  ...props
}) => {
  return (
    <MuiButton
      {...props}
      variant="contained"
      disabled={loading || props.disabled}
      sx={{
        backgroundColor: loading
          ? theme.palette.background.default
          : theme.palette.primary.main,
        height: 40,
      }}
    >
      {loading ? 'Loading...' : children}
    </MuiButton>
  );
};

export default BaseButton;
