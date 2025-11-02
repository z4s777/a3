
import React from 'react';
import type { AppItem } from '../types';
import { Link } from 'react-router-dom';

interface AppListProps {
  items: AppItem[];
}

export const AppList: React.FC<AppListProps> = ({ items }) => {
  if (items.length === 0) {
    return (
      <div className="text-center py-10 text-gray-500 dark:text-gray-400">
        <p>لم يتم العثور على نتائج.</p>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {items.map(item => (
        <AppListItem key={item.id} item={item} />
      ))}
    </div>
  );
};

interface AppListItemProps {
  item: AppItem;
}

const AppListItem: React.FC<AppListItemProps> = ({ item }) => {
  return (
    <div className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow-md flex items-center space-x-4 space-x-reverse">
      <img src={item.iconUrl} alt={item.name} className="w-16 h-16 rounded-lg object-cover" />
      <div className="flex-1 min-w-0">
        <p className="text-lg font-bold text-gray-900 dark:text-white truncate">{item.name}</p>
        <div className="flex items-center text-sm text-gray-500 dark:text-gray-400 mt-1 space-x-3 space-x-reverse">
          <span>{item.uploadDate}</span>
          <span className="w-1 h-1 bg-gray-400 rounded-full"></span>
          <span>{item.downloads.toLocaleString()} تحميل</span>
        </div>
      </div>
      <Link
        to={`/details/${item.id}`}
        className="px-4 py-2 text-sm font-semibold text-white bg-blue-600 rounded-full hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 dark:focus:ring-offset-gray-800 transition-colors"
      >
        تحميل
      </Link>
    </div>
  );
};
