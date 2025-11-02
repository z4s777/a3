import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useAppData } from '../../App';
import type { AppItem } from '../../types';
import { AppCategory } from '../../types';

export const AppFormPage: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const { addApp, updateApp, getAppById } = useAppData();

    const isEditing = Boolean(id);
    const [formData, setFormData] = useState<Omit<AppItem, 'id'>>({
        name: '',
        category: AppCategory.App,
        iconUrl: 'https://picsum.photos/seed/new/200/200',
        downloads: 0,
        version: '',
        uploadDate: new Date().toISOString().split('T')[0],
        description: ''
    });

    useEffect(() => {
        if (isEditing && id) {
            const appToEdit = getAppById(id);
            if (appToEdit) {
                setFormData(appToEdit);
            } else {
                // Handle case where app is not found
                navigate('/admin/apps');
            }
        }
    }, [id, isEditing, getAppById, navigate]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: name === 'downloads' ? parseInt(value, 10) || 0 : value
        }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (isEditing && id) {
            updateApp({ ...formData, id });
        } else {
            addApp(formData);
        }
        navigate('/admin/apps');
    };

    const inputClasses = "w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500";

    return (
        <div>
            <h1 className="text-3xl font-bold text-gray-800 dark:text-gray-200 mb-8">
                {isEditing ? 'تعديل التطبيق' : 'إضافة تطبيق جديد'}
            </h1>

            <div className="max-w-4xl mx-auto bg-white dark:bg-gray-800 p-8 rounded-xl shadow-md">
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">اسم التطبيق</label>
                        <input type="text" name="name" id="name" value={formData.name} onChange={handleChange} required className={inputClasses} />
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label htmlFor="category" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">الفئة</label>
                            <select name="category" id="category" value={formData.category} onChange={handleChange} className={inputClasses}>
                                <option value={AppCategory.App}>تطبيق</option>
                                <option value={AppCategory.Game}>لعبة</option>
                                <option value={AppCategory.Software}>برنامج</option>
                            </select>
                        </div>
                        <div>
                            <label htmlFor="version" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">الإصدار</label>
                            <input type="text" name="version" id="version" value={formData.version} onChange={handleChange} required className={inputClasses} placeholder="e.g., 1.2.3" />
                        </div>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label htmlFor="downloads" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">عدد التحميلات</label>
                            <input type="number" name="downloads" id="downloads" value={formData.downloads} onChange={handleChange} required className={inputClasses} />
                        </div>
                        <div>
                            <label htmlFor="uploadDate" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">تاريخ الرفع</label>
                            <input type="date" name="uploadDate" id="uploadDate" value={formData.uploadDate} onChange={handleChange} required className={inputClasses} />
                        </div>
                    </div>

                    <div>
                        <label htmlFor="iconUrl" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">رابط الأيقونة</label>
                        <input type="text" name="iconUrl" id="iconUrl" value={formData.iconUrl} onChange={handleChange} required className={inputClasses} />
                    </div>

                    <div>
                        <label htmlFor="description" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">الوصف</label>
                        <textarea name="description" id="description" value={formData.description} onChange={handleChange} required rows={5} className={inputClasses}></textarea>
                    </div>

                    <div className="flex justify-end space-x-4 space-x-reverse pt-4">
                        <button type="button" onClick={() => navigate('/admin/apps')} className="px-6 py-2.5 bg-gray-200 dark:bg-gray-600 text-gray-800 dark:text-gray-200 font-semibold rounded-lg hover:bg-gray-300 dark:hover:bg-gray-500 transition-colors">
                            إلغاء
                        </button>
                        <button type="submit" className="px-6 py-2.5 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors">
                            {isEditing ? 'حفظ التغييرات' : 'إضافة التطبيق'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};
