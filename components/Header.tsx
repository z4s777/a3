import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../App';

interface HeaderProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  onFilterClick: () => void;
}

const FilterIcon: React.FC = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
    </svg>
);

export const Header: React.FC<HeaderProps> = ({ searchQuery, setSearchQuery, onFilterClick }) => {
  const { isLoggedIn, user, logout } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();
  
  return (
    <header className="fixed top-0 left-0 right-0 z-20 bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm shadow-sm">
      <div className="container mx-auto px-4 py-3">
        <div className="flex justify-between items-center mb-3">
          <h1 className="text-xl font-bold text-blue-600 dark:text-blue-400">App Hub</h1>
          
          {isLoggedIn && user ? (
            <div className="relative">
                <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="flex items-center space-x-2 space-x-reverse">
                    <img src={user.avatarUrl} alt="user avatar" className="w-8 h-8 rounded-full" />
                    <span className="hidden sm:inline text-sm font-semibold text-gray-600 dark:text-gray-300">{user.name}</span>
                </button>
                {isMenuOpen && (
                    <div className="absolute left-0 sm:right-0 sm:left-auto mt-2 w-48 bg-white dark:bg-gray-800 rounded-md shadow-lg py-1 z-20" onMouseLeave={() => setIsMenuOpen(false)}>
                        <button onClick={() => { navigate('/admin'); setIsMenuOpen(false); }} className="block w-full text-right px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700">
                           لوحة التحكم
                        </button>
                        <button onClick={() => { logout(); setIsMenuOpen(false); }} className="block w-full text-right px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700">
                            تسجيل الخروج
                        </button>
                    </div>
                )}
            </div>
          ) : (
            <button onClick={() => navigate('/login')} className="text-sm font-semibold text-gray-600 dark:text-gray-300 hover:text-blue-500 dark:hover:text-blue-400 transition-colors">
                تسجيل الدخول
            </button>
          )}

        </div>
        <div className="flex items-center space-x-2 space-x-reverse">
            <div className="relative flex-grow">
                <input
                    type="text"
                    placeholder="ابحث عن التطبيقات والألعاب..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-10 pr-4 py-2.5 border border-gray-200 dark:border-gray-700 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-shadow"
                />
                <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                </div>
            </div>
            <button
                onClick={onFilterClick}
                className="p-2.5 bg-gray-100 dark:bg-gray-800 rounded-full text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 hover:text-blue-500 dark:hover:text-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors"
                aria-label="Filter"
            >
                <FilterIcon />
            </button>
        </div>
      </div>
    </header>
  );
};