import React from 'react';
import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import { useAuth } from '../../App';

const AdminIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-6-3a2 2 0 11-4 0 2 2 0 014 0zm-2 4a5 5 0 00-4.546 2.916A5.986 5.986 0 0010 16a5.986 5.986 0 004.546-2.084A5 5 0 0010 11z" clipRule="evenodd" /></svg>;
const AppsIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path d="M5 3a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2V5a2 2 0 00-2-2H5zM5 11a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2v-2a2 2 0 00-2-2H5zM11 5a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V5zM11 13a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" /></svg>;
const LogoutIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M3 3a1 1 0 00-1 1v12a1 1 0 102 0V5.414l7.293 7.293a1 1 0 001.414-1.414L5.414 4H13a1 1 0 100-2H4a1 1 0 00-1 1z" clipRule="evenodd" /></svg>;
const SiteIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" /></svg>;


export const AdminLayout: React.FC = () => {
    const { user, logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/');
    }

    const navLinkClasses = "flex items-center px-4 py-2.5 rounded-lg text-gray-300 hover:bg-gray-700 hover:text-white transition-colors space-x-2 space-x-reverse";
    const activeNavLinkClasses = "bg-gray-700 text-white";

    return (
        <div className="flex h-screen bg-gray-200 dark:bg-gray-900 font-sans">
            <aside className="w-64 flex-shrink-0 bg-gray-800 dark:bg-gray-900/50 p-4 flex-col hidden md:flex">
                <div className="text-white text-2xl font-bold mb-8 text-center">
                    لوحة التحكم
                </div>
                <nav className="flex-grow space-y-2">
                    <NavLink to="/admin" end className={({isActive}) => `${navLinkClasses} ${isActive ? activeNavLinkClasses : ''}`}><AdminIcon /><span>نظرة عامة</span></NavLink>
                    <NavLink to="/admin/apps" className={({isActive}) => `${navLinkClasses} ${isActive ? activeNavLinkClasses : ''}`}><AppsIcon /><span>إدارة التطبيقات</span></NavLink>
                </nav>
                <div className="border-t border-gray-700 pt-4 mt-4">
                    <button onClick={() => navigate('/')} className={`${navLinkClasses} w-full`}><SiteIcon /> <span>عرض الموقع</span></button>
                    <div className="flex items-center p-2 mt-4 text-gray-400">
                        <img src={user?.avatarUrl} alt="admin" className="h-10 w-10 rounded-full" />
                        <div className="mr-3">
                            <p className="font-semibold text-white">{user?.name}</p>
                            <button onClick={handleLogout} className="text-xs text-red-400 hover:underline">تسجيل الخروج</button>
                        </div>
                    </div>
                </div>
            </aside>

            <main className="flex-1 flex flex-col overflow-hidden">
                <header className="bg-white dark:bg-gray-800 shadow-sm p-4 md:hidden flex justify-between items-center">
                    <h1 className="text-xl font-bold text-gray-800 dark:text-gray-200">لوحة التحكم</h1>
                    {/* Add a mobile menu button here if needed */}
                </header>
                <div className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-100 dark:bg-gray-900 p-4 md:p-8">
                   <Outlet />
                </div>
            </main>
        </div>
    );
};
