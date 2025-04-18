export interface ClipboardItem {
  type: string;
  content?: string;
  size?: number;
  name?: string;
  lastModified?: number;
  isText?: boolean;
  isFile?: boolean;
}

export interface ClipboardItemData {
  id: string;
  timestamp: Date;
  typesCount: number;
  itemsCount: number;
  filesCount: number;
  items: ClipboardItem[];
}