import React, { useState, useEffect } from 'react';
import ClipboardViewer from './ClipboardViewer';
import PasteArea from './PasteArea';
import HistoryPanel from './HistoryPanel';
import { useTheme } from '../contexts/ThemeContext';
import { ClipboardItem, ClipboardItemData } from '../types/clipboard';

const ClipboardInspector: React.FC = () => {
  const { isDarkMode } = useTheme();
  const [currentItem, setCurrentItem] = useState<ClipboardItemData | null>(null);
  const [history, setHistory] = useState<ClipboardItemData[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const handlePastedContent = async (clipboardData: DataTransfer) => {
    setIsLoading(true);
    try {
      const newItemData = await processClipboardData(clipboardData);
      setCurrentItem(newItemData);
      
      // Add to history
      setHistory(prev => {
        const newHistory = [newItemData, ...prev];
        // Limit history to 10 items
        return newHistory.slice(0, 10);
      });
    } catch (error) {
      console.error('Error processing clipboard data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const processClipboardData = async (clipboardData: DataTransfer): Promise<ClipboardItemData> => {
    const types = clipboardData.types;
    const itemsCount = clipboardData.items.length;
    const filesCount = clipboardData.files.length;
    
    const items: ClipboardItem[] = [];
    
    // Process each format type
    for (const type of types) {
      const content = clipboardData.getData(type);
      items.push({
        type,
        content,
        size: content.length,
        isText: type.includes('text')
      });
    }
    
    // Process files
    for (let i = 0; i < clipboardData.files.length; i++) {
      const file = clipboardData.files[i];
      items.push({
        type: file.type || 'unknown',
        name: file.name,
        size: file.size,
        lastModified: file.lastModified,
        isFile: true
      });
    }
    
    return {
      id: Date.now().toString(),
      timestamp: new Date(),
      typesCount: types.length,
      itemsCount,
      filesCount,
      items
    };
  };

  const handleSelectFromHistory = (item: ClipboardItemData) => {
    setCurrentItem(item);
  };

  const handleClearHistory = () => {
    setHistory([]);
    setCurrentItem(null);
  };

  return (
    <div className={`grid grid-cols-1 md:grid-cols-4 gap-6 transition-colors duration-300 ${isDarkMode ? 'text-gray-100' : 'text-gray-800'}`}>
      <div className="md:col-span-3 space-y-6">
        <PasteArea onPaste={handlePastedContent} isLoading={isLoading} />
        
        {currentItem && (
          <ClipboardViewer clipboardData={currentItem} />
        )}
        
        {!currentItem && !isLoading && (
          <div className={`rounded-lg p-8 text-center ${isDarkMode ? 'bg-gray-800' : 'bg-white'} shadow-sm border ${isDarkMode ? 'border-gray-700' : 'border-gray-200'}`}>
            <h2 className="text-xl font-semibold mb-2">No Clipboard Data</h2>
            <p className="text-gray-500 dark:text-gray-400 mb-4">
              Paste content into the area above to inspect clipboard data.
            </p>
          </div>
        )}
      </div>
      
      <div className="md:col-span-1">
        <HistoryPanel 
          history={history} 
          onSelectItem={handleSelectFromHistory} 
          onClearHistory={handleClearHistory}
        />
      </div>
    </div>
  );
};

export default ClipboardInspector;