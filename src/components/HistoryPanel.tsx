import React from 'react';
import { History, Trash2, Clock, FileText, Image, Files } from 'lucide-react';
import { ClipboardItemData } from '../types/clipboard';
import { useTheme } from '../contexts/ThemeContext';

interface HistoryPanelProps {
  history: ClipboardItemData[];
  onSelectItem: (item: ClipboardItemData) => void;
  onClearHistory: () => void;
}

const HistoryPanel: React.FC<HistoryPanelProps> = ({ 
  history, 
  onSelectItem, 
  onClearHistory 
}) => {
  const { isDarkMode } = useTheme();

  const getItemIcon = (item: ClipboardItemData) => {
    // Check if any items are images
    const hasImage = item.items.some(i => i.type.includes('image'));
    if (hasImage) return <Image size={16} className="text-purple-500" />;
    
    // Check if any items are text
    const hasText = item.items.some(i => i.type.includes('text'));
    if (hasText) return <FileText size={16} className="text-blue-500" />;
    
    // Default icon
    return <Files size={16} className="text-gray-500" />;
  };

  const formatTime = (date: Date) => {
    return new Intl.DateTimeFormat('en-US', {
      hour: 'numeric',
      minute: 'numeric',
      second: 'numeric',
      hour12: true
    }).format(date);
  };

  return (
    <div className={`rounded-lg transition-colors duration-300 ${
      isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
    } border shadow-sm overflow-hidden`}>
      <div className="px-4 py-3 flex items-center justify-between border-b">
        <div className="flex items-center gap-2">
          <History size={18} className="text-blue-500" />
          <h3 className="font-medium">History</h3>
        </div>
        
        {history.length > 0 && (
          <button 
            onClick={onClearHistory}
            className={`p-1.5 rounded-md transition-colors ${
              isDarkMode ? 'hover:bg-gray-700 text-gray-400' : 'hover:bg-gray-100 text-gray-500'
            } hover:text-red-500`}
            title="Clear history"
          >
            <Trash2 size={16} />
          </button>
        )}
      </div>
      
      <div className="max-h-[500px] overflow-y-auto">
        {history.length === 0 ? (
          <div className="py-6 flex flex-col items-center justify-center">
            <Clock size={32} className={`${isDarkMode ? 'text-gray-600' : 'text-gray-300'} mb-2`} />
            <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>No history yet</p>
          </div>
        ) : (
          <ul className="divide-y">
            {history.map((item) => (
              <li key={item.id}>
                <button
                  onClick={() => onSelectItem(item)}
                  className={`w-full p-3 flex items-start gap-3 transition-colors text-left ${
                    isDarkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-50'
                  }`}
                >
                  <div className={`mt-1 p-1.5 rounded ${
                    isDarkMode ? 'bg-gray-700' : 'bg-gray-100'
                  }`}>
                    {getItemIcon(item)}
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between items-center">
                      <span className="font-medium truncate">
                        {item.items.length > 0 
                          ? (item.items[0].name || item.items[0].type.split('/')[0]) 
                          : 'Clipboard item'}
                      </span>
                      <span className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                        {formatTime(item.timestamp)}
                      </span>
                    </div>
                    
                    <div className="flex items-center mt-1">
                      <span className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                        {item.typesCount} {item.typesCount === 1 ? 'type' : 'types'} ·{' '}
                        {item.itemsCount} {item.itemsCount === 1 ? 'item' : 'items'}
                        {item.filesCount > 0 && ` · ${item.filesCount} ${item.filesCount === 1 ? 'file' : 'files'}`}
                      </span>
                    </div>
                  </div>
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default HistoryPanel;