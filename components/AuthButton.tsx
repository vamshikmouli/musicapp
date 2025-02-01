'use client';

import LNSButton from './ui/LNSButton';

interface AuthButtonProps {
  loading: boolean;
}

const AuthButton: React.FC<AuthButtonProps> = ({ loading }) => {
  return (
    <LNSButton type="submit" loading={loading}>
      Sign in
    </LNSButton>
  );
};

export default AuthButton;
