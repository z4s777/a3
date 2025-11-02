import React from 'react';
import { useAuth, useAppData } from '../../App';
import { Link } from 'react-router-dom';

const Card: React.FC<{title: string, value: string | number, icon: React.ReactNode}> = ({ title, value, icon }) => (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md flex items-center space-x-4 space-x-reverse">
        <div className="bg-blue-100 dark:bg-blue-900/50 p-3 rounded-full">
            {icon}
        </div>
        <div>
            <p className="text-sm text-gray-500 dark:text-gray-400">{title}</p>
            <p className="text-2xl font-bold text-gray-900 dark:text-white">{value}</p>
        </div>
    </div>
);

const AppsIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" /></svg>;

export const DashboardPage: React.FC = () => {
    const { user } = useAuth();
    const { apps } = useAppData();

    return (
        <div>
            <h1 className="text-3xl font-bold text-gray-800 dark:text-gray-200 mb-2">مرحباً, {user?.name}!</h1>
            <p className="text-gray-500 dark:text-gray-400 mb-8">هنا نظرة سريعة على حالة موقعك.</p>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <Card title="إجمالي التطبيقات" value={apps.length} icon={<AppsIcon />} />
                {/* Add more cards here for other stats */}
            </div>

            <div className="mt-12 bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md">
                <h2 className="text-xl font-bold text-gray-800 dark:text-gray-200 mb-4">إجراءات سريعة</h2>
                <div className="flex flex-wrap gap-4">
                    <Link to="/admin/apps/new" className="px-5 py-2.5 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors">
                        إضافة تطبيق جديد
                    </Link>
                     <Link to="/admin/apps" className="px-5 py-2.5 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 font-semibold rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors">
                        عرض كل التطبيقات
                    </Link>
                </div>
            </div>
        </div>
    );
};
