import { ReactNode } from 'react';
import { BottomNavigation } from '../navigation/bottom-navigation';

interface LayoutProps {
  children: ReactNode;
}

export const Layout = ({ children }: LayoutProps) => {
  return (
    <div className="flex flex-col min-h-screen max-w-md mx-auto relative bg-brand-bg pb-24">
      <main className="flex-1 w-full px-6 pt-8">
        {children}
      </main>
      <BottomNavigation />
    </div>
  );
};
