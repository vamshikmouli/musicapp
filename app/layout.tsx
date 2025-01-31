import './globals.css';
import { auth } from '@/auth';
import NavBar from '@/components/NavBar';
import Providers from '@/components/Providers';

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
          <div className="mx-auto max-w-screen-lg h-screen flex flex-col">
            <div className="flex-grow">{children}</div>
          </div>
        </body>
      </Providers>
    </html>
  );
};

export default RootLayout;
