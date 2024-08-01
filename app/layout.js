import { Inter } from 'next/font/google';
import './globals.css';
import AuthProvider from './components/AuthProvider/AuthProvider';
import { getServerSession } from 'next-auth';
import Navbar from './components/Navbar';
import { BlogProvider } from './context/BlogProvider';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
};

export default async function RootLayout({ children }) {
  const session = await getServerSession();

  return (
    <html lang="en">
      <body className={inter.className}>
        <BlogProvider>
          <AuthProvider session={session}>
            <Navbar />
            <div className="max-w-6xl mx-auto px-5 py-5 ">{children}</div>
          </AuthProvider>
        </BlogProvider>
      </body>
    </html>
  );
}
