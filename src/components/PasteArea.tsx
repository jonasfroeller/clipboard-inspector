import React, { useState } from 'react';
import { ClipboardPaste, Loader2, Info } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';

interface PasteAreaProps {
  onPaste: (clipboardData: DataTransfer) => void;
  isLoading: boolean;
}

const PasteArea: React.FC<PasteAreaProps> = ({ onPaste, isLoading }) => {
  const { isDarkMode } = useTheme();
  const [isDragging, setIsDragging] = useState(false);

  const handlePaste = (e: React.ClipboardEvent<HTMLDivElement>) => {
    e.preventDefault();
    const clipboardData = e.clipboardData;
    onPaste(clipboardData);
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
    const clipboardData = e.dataTransfer;
    onPaste(clipboardData);
  };

  return (
    <div 
      className={`rounded-lg transition-all duration-300 ${
        isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
      } ${
        isDragging ? 'border-blue-500 border-2' : 'border'
      } shadow-sm relative overflow-hidden`}
    >
      <div 
        className={`p-8 flex flex-col items-center justify-center min-h-[200px] transition-colors cursor-pointer ${
          isLoading ? 'opacity-50' : ''
        }`}
        onPaste={handlePaste}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        tabIndex={0}
      >
        {isLoading ? (
          <Loader2 size={40} className="text-blue-500 animate-spin mb-4" />
        ) : (
          <div className="p-4 rounded-full bg-blue-100 mb-4 transition-transform hover:scale-110 dark:bg-blue-900">
            <ClipboardPaste size={32} className="text-blue-500" />
          </div>
        )}
        
        <h2 className="text-xl font-semibold mb-2">
          {isLoading ? 'Processing...' : 'Paste Content Here'}
        </h2>
        
        <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-500'} max-w-md text-center`}>
          {isLoading 
            ? 'Analyzing your clipboard data...'
            : 'Press Ctrl+V to inspect clipboard content'}
        </p>
      </div>
      
      <div className={`px-4 py-3 flex items-center gap-2 text-sm ${
        isDarkMode ? 'bg-gray-700 text-gray-300' : 'bg-gray-50 text-gray-600'
      } border-t ${isDarkMode ? 'border-gray-700' : 'border-gray-200'}`}>
        <Info size={14} />
        <span>All data is processed locally - nothing leaves your browser</span>
      </div>
    </div>
  );
};

export default PasteArea;