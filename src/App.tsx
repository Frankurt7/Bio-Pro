/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { DashboardView } from './components/dashboard';
import { AddEntryView } from './components/add-entry';
import { HistoryView } from './components/history';
import { ProfileView } from './components/profile';
import { BottomNavigation } from './components/navigation/bottom-navigation';
import { AppTour } from './components/app-tour';
import { Toaster } from 'sonner';
import { motion, AnimatePresence } from 'motion/react';

export default function App() {
  const [activeTab, setActiveTab] = useState('dashboard');

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return <DashboardView />;
      case 'add':
        return <AddEntryView onComplete={() => setActiveTab('dashboard')} />;
      case 'history':
        return <HistoryView />;
      case 'profile':
        return <ProfileView />;
      default:
        return <DashboardView />;
    }
  };

  return (
    <div className="flex flex-col min-h-screen max-w-md mx-auto relative bg-brand-bg pb-24 overflow-hidden">
      <Toaster 
        position="top-center" 
        expand={false} 
        richColors 
        toastOptions={{
          style: {
            backgroundColor: '#0d1526',
            border: '1px solid rgba(0, 242, 255, 0.2)',
            color: '#fff',
            fontFamily: '"Orbitron", sans-serif',
            textTransform: 'uppercase',
            fontSize: '10px',
            borderRadius: '12px',
          }
        }}
      />
      <AppTour onTabChange={setActiveTab} />
      
      <main className="flex-1 w-full px-6 pt-8 overflow-y-auto overflow-x-hidden">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="h-full w-full"
          >
            {renderContent()}
          </motion.div>
        </AnimatePresence>
      </main>
      
      <BottomNavigation activeTab={activeTab} onTabChange={setActiveTab} />
    </div>
  );
}
