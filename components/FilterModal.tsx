import React from 'react';
import type { SortOption } from '../types';

interface FilterModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentSort: SortOption;
  onSortChange: (option: SortOption) => void;
}

const sortOptions: { key: SortOption; label: string }[] = [
  { key: 'downloads', label: 'الأكثر تحميلاً' },
  { key: 'date', label: 'الأحدث' },
  { key: 'name', label: 'الاسم (أ-ي)' },
];

export const FilterModal: React.FC<FilterModalProps> = ({ isOpen, onClose, currentSort, onSortChange }) => {
  if (!isOpen) {
    return null;
  }

  return (
    <div 
      className="fixed inset-0 z-50 flex items-end justify-center bg-black bg-opacity-60 backdrop-blur-sm transition-opacity duration-300 ease-in-out"
      style={{ animation: 'fadeIn 0.3s' }}
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="filter-modal-title"
    >
      <div 
        className="bg-white dark:bg-gray-800 rounded-t-2xl shadow-xl w-full max-w-md p-6 transition-transform duration-300 ease-in-out"
        style={{ animation: 'slideInUp 0.3s' }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between items-center mb-6">
          <h2 id="filter-modal-title" className="text-xl font-bold text-gray-900 dark:text-white">
            ترتيب حسب
          </h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        
        <div className="space-y-3">
          {sortOptions.map((option) => (
            <button
              key={option.key}
              onClick={() => onSortChange(option.key)}
              className={`w-full text-right px-4 py-3 rounded-lg text-lg transition-colors duration-200 flex items-center justify-between ${
                currentSort === option.key
                  ? 'bg-blue-600 text-white font-semibold'
                  : 'bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-600'
              }`}
            >
              <span>{option.label}</span>
              {currentSort === option.key && (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
              )}
            </button>
          ))}
        </div>
      </div>
      <style>{`
        @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
        @keyframes slideInUp { from { transform: translateY(100%); } to { transform: translateY(0); } }
      `}</style>
    </div>
  );
};
