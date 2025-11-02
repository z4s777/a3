
import React from 'react';

export const WelcomeScreen: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-900 text-white animate-fade-in">
      <div className="w-24 h-24 mb-6 bg-blue-500 rounded-full flex items-center justify-center animate-pulse">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
        </svg>
      </div>
      <h1 className="text-4xl font-bold mb-2">App Hub</h1>
      <p className="text-lg text-gray-300">مركزك الأول للتطبيقات والألعاب</p>
    </div>
  );
};
