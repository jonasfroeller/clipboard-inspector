import React from 'react';
import { Clipboard, Sun, Moon } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';

const Header: React.FC = () => {
  const { isDarkMode, toggleTheme } = useTheme();

  return (
    <header className={`sticky top-0 z-10 transition-colors duration-300 ${isDarkMode ? 'bg-gray-800 border-b border-gray-700 text-white' : 'bg-white border-b border-gray-200'} shadow-sm`}>
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="p-2 bg-blue-500 rounded-lg">
              <Clipboard size={24} className="text-white" />
            </div>
            <h1 className="text-xl font-bold">Clipboard Inspector</h1>
          </div>
          <button
            onClick={toggleTheme}
            className={`p-2 rounded-full transition-colors ${isDarkMode ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-100 hover:bg-gray-200'}`}
            aria-label={isDarkMode ? 'Switch to light mode' : 'Switch to dark mode'}
          >
            {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;