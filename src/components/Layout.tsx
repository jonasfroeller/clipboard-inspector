import React, { ReactNode } from 'react';
import Header from './Header';
import { useTheme } from '../contexts/ThemeContext';
import { Clipboard } from 'lucide-react';

interface LayoutProps {
  children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const { isDarkMode } = useTheme();
  
  return (
    <>
      <Header />
      <div className={`min-h-screen transition-colors duration-300 ${isDarkMode ? 'bg-gray-900 text-gray-100' : 'bg-gray-50 text-gray-900'}`}>
        <main className="container mx-auto px-4 py-6">
          {children}
        </main>
      </div>
      <footer className={`py-4 px-6 ${isDarkMode ? 'bg-gray-800 text-white' : 'bg-white border-t border-gray-200'}`}>
        <div className="container mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Clipboard size={18} className="text-blue-500" />
            <span className="text-sm opacity-70">Clipboard Inspector</span>
          </div>
          <p className="text-sm opacity-70">© {new Date().getFullYear()} Clipboard Inspector</p>
        </div>
      </footer>
    </>
  );
};

export default Layout;