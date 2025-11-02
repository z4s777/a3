import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppData } from '../../App';

const EditIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path d="M17.414 2.586a2 2 0 00-2.828 0L7 10.172V13h2.828l7.586-7.586a2 2 0 000-2.828z" /><path fillRule="evenodd" d="M2 6a2 2 0 012-2h4a1 1 0 010 2H4v10h10v-4a1 1 0 112 0v4a2 2 0 01-2 2H4a2 2 0 01-2-2V6z" clipRule="evenodd" /></svg>;
const DeleteIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" /></svg>;


export const ManageAppsPage: React.FC = () => {
    const { apps, deleteApp } = useAppData();
    const navigate = useNavigate();

    const handleDelete = (id: string, name: string) => {
        if (window.confirm(`هل أنت متأكد من حذف "${name}"؟ لا يمكن التراجع عن هذا الإجراء.`)) {
            deleteApp(id);
        }
    };

    return (
        <div>
            <div className="flex justify-between items-center mb-8">
                <h1 className="text-3xl font-bold text-gray-800 dark:text-gray-200">إدارة التطبيقات</h1>
                <button
                    onClick={() => navigate('/admin/apps/new')}
                    className="px-5 py-2.5 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors"
                >
                    إضافة تطبيق جديد
                </button>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-x-auto">
                <table className="w-full text-sm text-right text-gray-500 dark:text-gray-400">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                        <tr>
                            <th scope="col" className="px-6 py-3">الاسم</th>
                            <th scope="col" className="px-6 py-3">الفئة</th>
                            <th scope="col" className="px-6 py-3">الإصدار</th>
                            <th scope="col" className="px-6 py-3">التحميلات</th>
                            <th scope="col" className="px-6 py-3">إجراءات</th>
                        </tr>
                    </thead>
                    <tbody>
                        {apps.map(app => (
                            <tr key={app.id} className="bg-white dark:bg-gray-800 border-b dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                                <th scope="row" className="px-6 py-4 font-medium text-gray-900 dark:text-white whitespace-nowrap">
                                    <div className="flex items-center space-x-3 space-x-reverse">
                                        <img src={app.iconUrl} alt={app.name} className="w-10 h-10 rounded-md object-cover" />
                                        <span>{app.name}</span>
                                    </div>
                                </th>
                                <td className="px-6 py-4">{app.category}</td>
                                <td className="px-6 py-4">{app.version}</td>
                                <td className="px-6 py-4">{app.downloads.toLocaleString()}</td>
                                <td className="px-6 py-4">
                                    <div className="flex space-x-2 space-x-reverse">
                                        <button onClick={() => navigate(`/admin/apps/edit/${app.id}`)} className="p-2 text-blue-500 hover:text-blue-700" aria-label="Edit"><EditIcon /></button>
                                        <button onClick={() => handleDelete(app.id, app.name)} className="p-2 text-red-500 hover:text-red-700" aria-label="Delete"><DeleteIcon /></button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                 {apps.length === 0 && (
                    <p className="text-center p-8 text-gray-500 dark:text-gray-400">
                        لا توجد تطبيقات لعرضها. ابدأ بإضافة تطبيق جديد.
                    </p>
                 )}
            </div>
        </div>
    );
};
