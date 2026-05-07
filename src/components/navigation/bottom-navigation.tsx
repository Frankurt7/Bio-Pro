import { LayoutDashboard, History, PlusCircle, User } from 'lucide-react';
import { motion } from 'motion/react';
import { cn } from '../../lib/utils';

interface NavItemProps {
  icon: typeof LayoutDashboard;
  label: string;
  isActive?: boolean;
  onClick: () => void;
}

const NavItem = ({ icon: Icon, label, isActive, onClick }: NavItemProps) => (
  <button 
    onClick={onClick}
    className={cn(
      "flex flex-col items-center justify-center gap-1 transition-all duration-300",
      isActive ? "text-brand-cyan" : "text-gray-500"
    )}
  >
    <div className={cn(
      "p-2 rounded-xl transition-all duration-300",
      isActive && "bg-brand-cyan/10"
    )}>
      <Icon size={24} />
    </div>
    <span className="text-[10px] font-medium uppercase tracking-wider">{label}</span>
    {isActive && (
      <motion.div 
        layoutId="nav-indicator"
        className="w-1 h-1 rounded-full bg-brand-cyan mt-0.5"
      />
    )}
  </button>
);

interface BottomNavigationProps {
  activeTab?: string;
  onTabChange?: (tab: string) => void;
}

export const BottomNavigation = ({ activeTab = 'dashboard', onTabChange }: BottomNavigationProps) => {
  return (
    <nav className="fixed bottom-4 left-6 right-6 h-20 glass-card flex items-center justify-around px-4 z-50">
      <NavItem 
        icon={LayoutDashboard} 
        label="Inicio" 
        isActive={activeTab === 'dashboard'} 
        onClick={() => onTabChange?.('dashboard')} 
      />
      <NavItem 
        icon={PlusCircle} 
        label="Registro" 
        isActive={activeTab === 'add'} 
        onClick={() => onTabChange?.('add')} 
      />
      <NavItem 
        icon={History} 
        label="Historial" 
        isActive={activeTab === 'history'} 
        onClick={() => onTabChange?.('history')} 
      />
      <NavItem 
        icon={User} 
        label="Perfil" 
        isActive={activeTab === 'profile'} 
        onClick={() => onTabChange?.('profile')} 
      />
    </nav>
  );
};
