import { auth } from '@/auth';
import DashBoard from '@/components/ui/DashBoard';
import Grid from '@mui/material/Grid2';

const HomePage = async () => {
  const session = await auth();

  if (session) {
    return (
      <Grid>
        <DashBoard />
      </Grid>
    );
  }

  return null;
};

export default HomePage;
