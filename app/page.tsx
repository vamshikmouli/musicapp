import { auth } from '@/auth';
import Logout from '@/components/Logout';

export default async function Home() {
  const session = await auth();

  return (
    <div>
      <h1>Home Page</h1>
      <h3>Welcome {session?.user?.email}</h3>
      <Logout />
    </div>
  );
}
