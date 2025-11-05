import { ReactNode } from 'react';
import BottomNav from './BottomNav';
import CacheIndicator from '../CacheIndicator';

interface LayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <div className="min-h-screen bg-dark-primary text-white pb-20">
      <CacheIndicator />
      <main className="max-w-7xl mx-auto px-4 py-6">
        {children}
      </main>
      <BottomNav />
    </div>
  );
};

export default Layout;