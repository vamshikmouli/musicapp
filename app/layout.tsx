import './globals.css';
import { auth } from '@/auth';
import BottomNav from '@/components/ui/BottomNavBar';
import Providers from '@/components/Providers';
import LNSAppBar from '@/components/ui/LNSAppBar';

export const metadata = {
  title: 'Music App',
  description: 'Manage schools and students',
};

const RootLayout = async ({ children }: { children: React.ReactNode }) => {
  const session = await auth();
  return (
    <html lang="en">
      <Providers session={session}>
        <body className="font-sans">
          {session && <LNSAppBar />}
          <div className="mx-auto max-w-screen-lg h-screen flex flex-col">
            <div className="flex-grow">{children}</div>
          </div>
          {session && <BottomNav />}
        </body>
      </Providers>
    </html>
  );
};

export default RootLayout;
