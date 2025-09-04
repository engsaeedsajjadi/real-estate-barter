import React, { useState } from 'react';
import type { View } from '../App';
import { CURRENT_USER } from '../constants';

interface HeaderProps {
    onNavigate: (view: View) => void;
}

const LocationIcon: React.FC<{className: string}> = ({className}) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
    </svg>
);


const Header: React.FC<HeaderProps> = ({ onNavigate }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleNavClick = (view: View) => {
    onNavigate(view);
    setIsMenuOpen(false);
  };

  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      <nav className="container mx-auto px-4 py-4 flex justify-between items-center">
        <div 
          className="text-2xl font-bold text-blue-600 cursor-pointer"
          onClick={() => handleNavClick('home')}
        >
          تهاتر ملک
        </div>
        
        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-x-8">
            <div className="flex items-center space-x-6 space-x-reverse">
                <button onClick={() => handleNavClick('home')} className="text-gray-600 hover:text-blue-600 transition-colors">صفحه اصلی</button>
                <button onClick={() => alert('صفحه لیست املاک در حال ساخت است.')} className="text-gray-600 hover:text-blue-600 transition-colors">همه املاک</button>
                <button onClick={() => handleNavClick('dashboard')} className="text-gray-600 hover:text-blue-600 transition-colors">داشبورد من</button>
            </div>
             {CURRENT_USER.city && (
                <div className="flex items-center text-sm text-gray-500 border-r border-gray-200 pr-6">
                    <LocationIcon className="w-5 h-5 ml-1 text-gray-400" />
                    <span>{CURRENT_USER.city}</span>
                </div>
             )}
        </div>

        <div className="flex items-center space-x-4 space-x-reverse">
          <button className="hidden md:block bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors">
            ورود / ثبت نام
          </button>
          
          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button onClick={() => setIsMenuOpen(!isMenuOpen)} aria-label="Open menu" className="p-2 rounded-md text-gray-600 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                {isMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7" />
                )}
              </svg>
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white border-t border-gray-200">
          <div className="px-4 pt-4 pb-4 space-y-2 flex flex-col">
             {CURRENT_USER.city && (
                <div className="flex items-center justify-center text-sm text-gray-600 mb-3 pb-3 border-b">
                    <LocationIcon className="w-5 h-5 ml-1 text-gray-400" />
                    <span>موقعیت فعلی: <span className="font-semibold">{CURRENT_USER.city}</span></span>
                </div>
             )}
            <button onClick={() => handleNavClick('home')} className="block w-full text-center px-4 py-3 rounded-md text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-100 transition-colors">صفحه اصلی</button>
            <button onClick={() => alert('صفحه لیست املاک در حال ساخت است.')} className="block w-full text-center px-4 py-3 rounded-md text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-100 transition-colors">همه املاک</button>
            <button onClick={() => handleNavClick('dashboard')} className="block w-full text-center px-4 py-3 rounded-md text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-100 transition-colors">داشبورد من</button>
            <div className="border-t border-gray-200 my-2"></div>
             <button className="w-full bg-blue-500 text-white px-4 py-3 rounded-lg hover:bg-blue-600 transition-colors font-semibold">
                ورود / ثبت نام
             </button>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;