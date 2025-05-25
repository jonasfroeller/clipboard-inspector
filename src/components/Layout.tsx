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
      <div className={`min-h-screen transition-colors duration-300 ${isDarkMode ? 'text-gray-100 bg-gray-900' : 'text-gray-900 bg-gray-50'}`}>
        <main className="container px-4 py-6 mx-auto">
          {children}
        </main>
      </div>
      <footer className={`py-4 px-6 ${isDarkMode ? 'text-white bg-gray-800' : 'bg-white border-t border-gray-200'}`}>
        <div className="container flex flex-col justify-between items-center mx-auto space-y-2 sm:flex-row sm:space-y-0">
          <div className="flex items-center space-x-2">
            <Clipboard size={18} className="text-blue-500" />
            <span className="text-sm opacity-70">Clipboard Inspector</span>
          </div>
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <img src="https://avatars.githubusercontent.com/u/121523551?v=4" alt="Jonas Fröller" className="w-6 h-6 rounded-full" />
              <span className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                Made by <a href="https://jonasfroeller.is-a.dev" target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">Jonas Fröller</a>
              </span>
            </div>
            <div className="flex items-center space-x-2">
              <img src="https://merginit.com/favicon.png" alt="Imprint" className="w-6 h-6" />
              <a href="https://merginit.com/legal/imprint" target="_blank" rel="noopener noreferrer" className={`text-sm ${isDarkMode ? 'text-blue-400' : 'text-blue-600'} hover:underline`}>
                Imprint
              </a>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Layout;