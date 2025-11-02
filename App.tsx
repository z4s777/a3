import React, { useState, useEffect } from 'react';
import { Routes, Route, Outlet, useNavigate, useParams, useOutletContext } from 'react-router-dom';
import { MOCK_DATA } from './constants';
import type { AppItem, SortOption } from './types';
import { WelcomeScreen } from './components/WelcomeScreen';
import { Header } from './components/Header';
import { BottomNav } from './components/BottomNav';
import { AppList } from './components/AppList';
import { FilterModal } from './components/FilterModal';

const App: React.FC = () => {
  const [showWelcome, setShowWelcome] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowWelcome(false);
    }, 2500);
    return () => clearTimeout(timer);
  }, []);

  if (showWelcome) {
    return <WelcomeScreen />;
  }

  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route index element={<FilteredAppListPage category="all" />} />
        <Route path="games" element={<FilteredAppListPage category="game" />} />
        <Route path="apps" element={<FilteredAppListPage category="app" />} />
        <Route path="software" element={<FilteredAppListPage category="software" />} />
      </Route>
      <Route path="/details/:id" element={<DetailPage />} />
    </Routes>
  );
};

const MainLayout: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [isFilterModalOpen, setIsFilterModalOpen] = useState(false);
  const [sortBy, setSortBy] = useState<SortOption>('downloads');

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-800 dark:text-gray-200">
      <Header 
        searchQuery={searchQuery} 
        setSearchQuery={setSearchQuery} 
        onFilterClick={() => setIsFilterModalOpen(true)} 
      />
      <main className="pt-28 pb-24 px-4">
        <Outlet context={{ searchQuery, sortBy }} />
      </main>
      <BottomNav />
      <FilterModal
        isOpen={isFilterModalOpen}
        onClose={() => setIsFilterModalOpen(false)}
        currentSort={sortBy}
        onSortChange={(option) => {
            setSortBy(option);
            setIsFilterModalOpen(false);
        }}
      />
    </div>
  );
};

interface FilteredAppListPageProps {
  category: 'all' | 'game' | 'app' | 'software';
}

const FilteredAppListPage: React.FC<FilteredAppListPageProps> = ({ category }) => {
    const { searchQuery, sortBy } = useOutletContext<{ searchQuery: string; sortBy: SortOption }>();

    const filteredData = MOCK_DATA.filter(item => {
        const matchesCategory = category === 'all' || item.category === category;
        const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase());
        return matchesCategory && matchesSearch;
    });

    const sortedData = [...filteredData].sort((a, b) => {
        switch (sortBy) {
            case 'date':
                return new Date(b.uploadDate).getTime() - new Date(a.uploadDate).getTime();
            case 'name':
                return a.name.localeCompare(b.name, 'ar');
            case 'downloads':
            default:
                return b.downloads - a.downloads;
        }
    });

    return <AppList items={sortedData} />;
};

const DetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const item = MOCK_DATA.find(app => app.id === id);

  if (!item) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-800 dark:text-gray-200">
        <h1 className="text-2xl font-bold mb-4">التطبيق غير موجود</h1>
        <button onClick={() => navigate('/')} className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
          العودة إلى الرئيسية
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-800">
       <header className="bg-white dark:bg-gray-900 shadow-md p-4 flex items-center fixed top-0 w-full z-10">
        <button onClick={() => navigate(-1)} className="text-gray-600 dark:text-gray-300 hover:text-blue-500 dark:hover:text-blue-400">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l-8 8m0-8l8 8" />
          </svg>
        </button>
        <h1 className="text-lg font-bold text-gray-800 dark:text-gray-200 mr-4">{item.name}</h1>
      </header>

      <main className="pt-20 pb-28 p-4 md:p-6">
        <div className="max-w-4xl mx-auto bg-white dark:bg-gray-900 rounded-2xl shadow-lg overflow-hidden">
          <div className="p-6 flex flex-col sm:flex-row sm:space-x-6 sm:space-x-reverse items-center sm:items-start">
            <img className="h-28 w-28 sm:h-32 sm:w-32 flex-shrink-0 rounded-2xl object-cover shadow-lg" src={item.iconUrl} alt={`${item.name} icon`} />
            <div className="flex-grow mt-4 sm:mt-0 text-center sm:text-right">
              <div className="uppercase tracking-wide text-sm text-blue-500 dark:text-blue-400 font-semibold">{item.category}</div>
              <h1 className="block mt-1 text-2xl sm:text-3xl leading-tight font-bold text-black dark:text-white">{item.name}</h1>
              <div className="mt-4 flex flex-wrap gap-x-6 gap-y-2 justify-center sm:justify-start text-gray-500 dark:text-gray-400">
                <InfoChip icon={<DownloadIcon />} text={`${item.downloads.toLocaleString()} تحميل`} />
                <InfoChip icon={<VersionIcon />} text={`الإصدار ${item.version}`} />
                <InfoChip icon={<CalendarIcon />} text={item.uploadDate} />
              </div>
            </div>
          </div>
          <div className="p-6 pt-4 border-t border-gray-200 dark:border-gray-700">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">الوصف</h2>
            <p className="text-gray-600 dark:text-gray-300 leading-relaxed">{item.description}</p>
          </div>
        </div>
      </main>
      <div className="fixed bottom-0 left-0 right-0 p-4 bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm border-t border-gray-200 dark:border-gray-700">
        <button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 px-4 rounded-xl text-lg transition-transform duration-200 ease-in-out hover:scale-105">
          تحميل
        </button>
      </div>
    </div>
  );
};


interface InfoChipProps {
    icon: React.ReactNode;
    text: string;
}
const InfoChip: React.FC<InfoChipProps> = ({ icon, text }) => (
    <div className="flex items-center">
        <div className="text-blue-500 dark:text-blue-400">{icon}</div>
        <span className="mr-2 text-sm">{text}</span>
    </div>
);

const DownloadIcon: React.FC = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
        <path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clipRule="evenodd" />
    </svg>
);
const VersionIcon: React.FC = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
    </svg>
);
const CalendarIcon: React.FC = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
        <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
    </svg>
);

export default App;