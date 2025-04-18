import React, { useState } from 'react';
import { Copy, Check, ChevronDown, ChevronUp, Files, FileText, Image, LayoutGrid } from 'lucide-react';
import { ClipboardItemData, ClipboardItem } from '../types/clipboard';
import { useTheme } from '../contexts/ThemeContext';

interface ClipboardViewerProps {
  clipboardData: ClipboardItemData;
}

// Move getTypeIcon function outside of component scope so it can be used by both components
const getTypeIcon = (type: string) => {
  if (type.includes('image')) return <Image size={16} className="text-purple-500" />;
  if (type.includes('html')) return <LayoutGrid size={16} className="text-orange-500" />;
  if (type.includes('text')) return <FileText size={16} className="text-blue-500" />;
  return <Files size={16} className="text-gray-500" />;
};

const ClipboardViewer: React.FC<ClipboardViewerProps> = ({ clipboardData }) => {
  const { isDarkMode } = useTheme();
  const [expandedSections, setExpandedSections] = useState<{ [key: string]: boolean }>({
    summary: true,
    details: true
  });
  const [copiedProperty, setCopiedProperty] = useState<string | null>(null);

  const handleToggleSection = (section: string) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  const handleCopyProperty = (property: string, value: string) => {
    navigator.clipboard.writeText(value);
    setCopiedProperty(property);
    setTimeout(() => setCopiedProperty(null), 2000);
  };

  const formatTimestamp = (date: Date) => {
    return new Intl.DateTimeFormat('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
      second: 'numeric',
      hour12: true
    }).format(date);
  };

  return (
    <div className={`rounded-lg transition-colors duration-300 ${isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} border shadow-sm overflow-hidden`}>
      {/* Header */}
      <div className={`px-6 py-4 border-b ${isDarkMode ? 'border-gray-700' : 'border-gray-200'}`}>
        <h2 className="text-xl font-semibold">Clipboard Inspector</h2>
        <p className={`mt-1 text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
          Inspected at {formatTimestamp(clipboardData.timestamp)}
        </p>
      </div>
      
      {/* Summary Section */}
      <div className="border-b last:border-0 transition-colors duration-300">
        <button 
          className={`w-full px-6 py-4 flex items-center justify-between ${isDarkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-50'}`}
          onClick={() => handleToggleSection('summary')}
        >
          <div className="flex items-center gap-2">
            <span className="p-1.5 rounded-md bg-blue-100 dark:bg-blue-900">
              <Files size={18} className="text-blue-500" />
            </span>
            <span className="font-medium">Summary</span>
          </div>
          {expandedSections.summary ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
        </button>
        
        {expandedSections.summary && (
          <div className={`px-6 py-4 ${isDarkMode ? 'bg-gray-750' : 'bg-gray-50'} grid grid-cols-1 md:grid-cols-2 gap-4`}>
            <PropertyItem
              label="Types Count"
              value={clipboardData.typesCount.toString()}
              onCopy={handleCopyProperty}
              isCopied={copiedProperty === 'typesCount'}
              isDarkMode={isDarkMode}
            />
            <PropertyItem
              label="Items Count"
              value={clipboardData.itemsCount.toString()}
              onCopy={handleCopyProperty}
              isCopied={copiedProperty === 'itemsCount'}
              isDarkMode={isDarkMode}
            />
            <PropertyItem
              label="Files Count"
              value={clipboardData.filesCount.toString()}
              onCopy={handleCopyProperty}
              isCopied={copiedProperty === 'filesCount'}
              isDarkMode={isDarkMode}
            />
            <PropertyItem
              label="Timestamp"
              value={formatTimestamp(clipboardData.timestamp)}
              onCopy={handleCopyProperty}
              isCopied={copiedProperty === 'timestamp'}
              isDarkMode={isDarkMode}
            />
          </div>
        )}
      </div>
      
      {/* Details Section */}
      <div className="border-b last:border-0 transition-colors duration-300">
        <button 
          className={`w-full px-6 py-4 flex items-center justify-between ${isDarkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-50'}`}
          onClick={() => handleToggleSection('details')}
        >
          <div className="flex items-center gap-2">
            <span className="p-1.5 rounded-md bg-purple-100 dark:bg-purple-900">
              <LayoutGrid size={18} className="text-purple-500" />
            </span>
            <span className="font-medium">Clipboard Items</span>
          </div>
          {expandedSections.details ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
        </button>
        
        {expandedSections.details && (
          <div className={`px-6 py-4 ${isDarkMode ? 'bg-gray-750' : 'bg-gray-50'} space-y-4`}>
            {clipboardData.items.map((item, index) => (
              <ClipboardItemCard 
                key={`${index}-${item.type}`} 
                item={item} 
                index={index}
                onCopy={handleCopyProperty}
                copiedProperty={copiedProperty}
                isDarkMode={isDarkMode}
              />
            ))}
            
            {clipboardData.items.length === 0 && (
              <div className="text-center py-4">
                <p className="text-gray-500 dark:text-gray-400">No detailed information available</p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

interface PropertyItemProps {
  label: string;
  value: string;
  onCopy: (property: string, value: string) => void;
  isCopied: boolean;
  isDarkMode: boolean;
}

const PropertyItem: React.FC<PropertyItemProps> = ({ label, value, onCopy, isCopied, isDarkMode }) => {
  return (
    <div className={`p-3 rounded-md ${isDarkMode ? 'bg-gray-700' : 'bg-white'} shadow-sm border transition-colors ${isDarkMode ? 'border-gray-600' : 'border-gray-200'}`}>
      <div className="flex justify-between items-center mb-1">
        <h4 className={`text-xs uppercase font-semibold ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>{label}</h4>
        <button
          onClick={() => onCopy(label, value)}
          className={`p-1 rounded transition-colors ${isCopied ? 'text-green-500' : isDarkMode ? 'text-gray-400 hover:text-gray-300' : 'text-gray-500 hover:text-gray-700'}`}
          title={isCopied ? 'Copied!' : 'Copy to clipboard'}
        >
          {isCopied ? <Check size={14} /> : <Copy size={14} />}
        </button>
      </div>
      <p className={`font-mono text-sm ${isDarkMode ? 'text-gray-200' : 'text-gray-700'} break-all`}>{value}</p>
    </div>
  );
};

interface ClipboardItemCardProps {
  item: ClipboardItem;
  index: number;
  onCopy: (property: string, value: string) => void;
  copiedProperty: string | null;
  isDarkMode: boolean;
}

const ClipboardItemCard: React.FC<ClipboardItemCardProps> = ({ 
  item, 
  index, 
  onCopy, 
  copiedProperty,
  isDarkMode
}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  
  const formatSize = (size: number) => {
    if (size < 1024) return `${size} bytes`;
    if (size < 1024 * 1024) return `${(size / 1024).toFixed(2)} KB`;
    return `${(size / (1024 * 1024)).toFixed(2)} MB`;
  };
  
  return (
    <div className={`rounded-lg border transition-colors ${isDarkMode ? 'border-gray-700 bg-gray-700' : 'border-gray-200 bg-white'} overflow-hidden`}>
      <div className="px-4 py-3 flex justify-between items-center">
        <div className="flex items-center space-x-2">
          {getTypeIcon(item.type)}
          <span className="font-medium">{item.isFile ? 'File' : 'Data'} #{index + 1}</span>
          {item.isFile && item.name && (
            <span className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
              ({item.name})
            </span>
          )}
        </div>
        <div className="flex items-center gap-2">
          <span className={`text-xs px-2 py-0.5 rounded-full ${
            isDarkMode ? 'bg-gray-600 text-gray-300' : 'bg-gray-200 text-gray-700'
          }`}>
            {item.size !== undefined ? formatSize(item.size) : 'Unknown size'}
          </span>
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className={`p-1 rounded transition-colors ${isDarkMode ? 'hover:bg-gray-600' : 'hover:bg-gray-100'}`}
          >
            {isExpanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
          </button>
        </div>
      </div>
      
      {isExpanded && (
        <div className={`px-4 py-3 border-t ${isDarkMode ? 'border-gray-600' : 'border-gray-200'} space-y-3`}>
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <h4 className={`text-xs uppercase font-semibold ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                MIME Type
              </h4>
              <button
                onClick={() => onCopy(`type-${index}`, item.type)}
                className={`p-1 rounded transition-colors ${
                  copiedProperty === `type-${index}` ? 'text-green-500' : isDarkMode ? 'text-gray-400 hover:text-gray-300' : 'text-gray-500 hover:text-gray-700'
                }`}
                title={copiedProperty === `type-${index}` ? 'Copied!' : 'Copy to clipboard'}
              >
                {copiedProperty === `type-${index}` ? <Check size={14} /> : <Copy size={14} />}
              </button>
            </div>
            <p className={`font-mono text-sm ${isDarkMode ? 'text-gray-200' : 'text-gray-700'} break-all`}>
              {item.type}
            </p>
          </div>
          
          {item.isFile ? (
            <>
              {item.name && (
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <h4 className={`text-xs uppercase font-semibold ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                      File Name
                    </h4>
                    <button
                      onClick={() => onCopy(`name-${index}`, item.name || '')}
                      className={`p-1 rounded transition-colors ${
                        copiedProperty === `name-${index}` ? 'text-green-500' : isDarkMode ? 'text-gray-400 hover:text-gray-300' : 'text-gray-500 hover:text-gray-700'
                      }`}
                      title={copiedProperty === `name-${index}` ? 'Copied!' : 'Copy to clipboard'}
                    >
                      {copiedProperty === `name-${index}` ? <Check size={14} /> : <Copy size={14} />}
                    </button>
                  </div>
                  <p className={`font-mono text-sm ${isDarkMode ? 'text-gray-200' : 'text-gray-700'} break-all`}>
                    {item.name}
                  </p>
                </div>
              )}
              
              {item.lastModified && (
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <h4 className={`text-xs uppercase font-semibold ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                      Last Modified
                    </h4>
                    <button
                      onClick={() => onCopy(`lastModified-${index}`, new Date(item.lastModified).toISOString())}
                      className={`p-1 rounded transition-colors ${
                        copiedProperty === `lastModified-${index}` ? 'text-green-500' : isDarkMode ? 'text-gray-400 hover:text-gray-300' : 'text-gray-500 hover:text-gray-700'
                      }`}
                      title={copiedProperty === `lastModified-${index}` ? 'Copied!' : 'Copy to clipboard'}
                    >
                      {copiedProperty === `lastModified-${index}` ? <Check size={14} /> : <Copy size={14} />}
                    </button>
                  </div>
                  <p className={`font-mono text-sm ${isDarkMode ? 'text-gray-200' : 'text-gray-700'} break-all`}>
                    {new Date(item.lastModified).toLocaleString()}
                  </p>
                </div>
              )}
            </>
          ) : (
            item.content && (
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <h4 className={`text-xs uppercase font-semibold ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                    Content
                  </h4>
                  <button
                    onClick={() => onCopy(`content-${index}`, item.content || '')}
                    className={`p-1 rounded transition-colors ${
                      copiedProperty === `content-${index}` ? 'text-green-500' : isDarkMode ? 'text-gray-400 hover:text-gray-300' : 'text-gray-500 hover:text-gray-700'
                    }`}
                    title={copiedProperty === `content-${index}` ? 'Copied!' : 'Copy to clipboard'}
                  >
                    {copiedProperty === `content-${index}` ? <Check size={14} /> : <Copy size={14} />}
                  </button>
                </div>
                <div className={`p-2 rounded ${isDarkMode ? 'bg-gray-800' : 'bg-gray-50'} overflow-x-auto max-h-48`}>
                  <pre className={`font-mono text-xs ${isDarkMode ? 'text-gray-300' : 'text-gray-700'} whitespace-pre-wrap break-all`}>
                    {item.content}
                  </pre>
                </div>
              </div>
            )
          )}
        </div>
      )}
    </div>
  );
};

export default ClipboardViewer;