
import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-800 text-white mt-12">
      <div className="container mx-auto px-4 py-6 text-center">
        <p>&copy; ۱۴۰۳ - پلتفرم تهاتر ملک. تمام حقوق محفوظ است.</p>
        <div className="flex justify-center space-x-4 space-x-reverse mt-4">
          <a href="#" className="hover:text-blue-400">درباره ما</a>
          <a href="#" className="hover:text-blue-400">تماس با ما</a>
          <a href="#" className="hover:text-blue-400">قوانین و مقررات</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
