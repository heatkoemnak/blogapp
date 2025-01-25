import { Nunito } from 'next/font/google';
import './globals.css';
import 'react-loading-skeleton/dist/skeleton.css';
import AuthProvider from './components/AuthProvider/AuthProvider';
import { getServerSession } from 'next-auth';
import Navbar from './components/Navbar';
import { BlogProvider } from './context/BlogProvider';
import BottomMenu from './components/ui/BottomMenu';
import Footer from './components/Footer';
import { SkeletonTheme } from 'react-loading-skeleton';

const inter = Nunito({ subsets: ['latin'], weight: ['400'] });

export const metadata = {
  title: 'JobSpace',
  description: 'Generated by create next app',
};

export default async function RootLayout({ children }) {
  const session = await getServerSession();

  return (
    <html lang="en" className={inter.className}>
      <body className="bg-gray-400  ">
        <SkeletonTheme baseColor="#202020" highlightColor="#444">
          <BlogProvider>
            <AuthProvider session={session}>
              <Navbar />
              <div className="lg:hidden">
                <BottomMenu />
              </div>
              <div className="">{children}</div>
              <div className="hidden lg:flex">
                <Footer />
              </div>
            </AuthProvider>
          </BlogProvider>
        </SkeletonTheme>
      </body>
    </html>
  );
}
