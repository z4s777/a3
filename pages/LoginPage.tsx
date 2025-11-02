import React, { useState } from 'react';
import { useAuth } from '../App';
import { useNavigate, useLocation } from 'react-router-dom';

export const LoginPage: React.FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const { login, error } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const from = location.state?.from?.pathname || '/';

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (login(username, password)) {
      navigate(from, { replace: true });
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900">
      <div className="w-full max-w-md p-8 space-y-8 bg-white dark:bg-gray-800 rounded-2xl shadow-lg">
        <div className="text-center">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">تسجيل الدخول</h1>
            <p className="mt-2 text-gray-500 dark:text-gray-400">أدخل بيانات الاعتماد للوصول إلى لوحة التحكم</p>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="rounded-md shadow-sm -space-y-px">
            <div>
              <label htmlFor="username" className="sr-only">اسم المستخدم</label>
              <input
                id="username"
                name="username"
                type="text"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-3 border border-gray-300 dark:border-gray-600 placeholder-gray-500 text-gray-900 dark:text-white bg-white dark:bg-gray-700 rounded-t-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                placeholder="اسم المستخدم"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="password"className="sr-only">كلمة المرور</label>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-3 border border-gray-300 dark:border-gray-600 placeholder-gray-500 text-gray-900 dark:text-white bg-white dark:bg-gray-700 rounded-b-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                placeholder="كلمة المرور"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>

            {error && <p className="text-sm text-red-500 text-center">{error}</p>}
            <p className="text-xs text-center text-gray-400">للتجربة: <br/> اسم المستخدم: <span className="font-mono">admin</span> <br/> كلمة المرور: <span className="font-mono">password123</span></p>

          <div>
            <button
              type="submit"
              className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 dark:focus:ring-offset-gray-800"
            >
              تسجيل الدخول
            </button>
          </div>
        </form>
         <button onClick={() => navigate('/')} className="w-full text-center text-sm text-blue-600 dark:text-blue-400 hover:underline">
            العودة إلى الصفحة الرئيسية
        </button>
      </div>
    </div>
  );
};
