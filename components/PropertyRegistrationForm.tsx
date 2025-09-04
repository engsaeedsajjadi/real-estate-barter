import React, { useState } from 'react';
import { PropertyType } from '../types';

interface PropertyRegistrationFormProps {
  onCancel: () => void;
  onSubmit: (formData: any) => void; 
}

const CITIES = ['تهران', 'مشهد', 'تبریز', 'شیراز', 'یزد', 'طبس', 'اقلید'];

const PropertyRegistrationForm: React.FC<PropertyRegistrationFormProps> = ({ onCancel, onSubmit }) => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    propertyType: PropertyType.APARTMENT,
    city: 'تهران',
    address: '',
    area: '',
    rooms: '',
    yearBuilt: '',
    estimatedValue: '',
    barterPreferences: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const requiredFields: (keyof typeof formData)[] = ['title', 'description', 'address', 'area', 'rooms', 'yearBuilt', 'estimatedValue'];
    
    for (const key of requiredFields) {
      if (!formData[key]) {
        alert(`لطفاً فیلد "${key}" را پر کنید.`);
        return;
      }
    }
    onSubmit(formData);
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">ثبت ملک جدید</h2>
        <button onClick={onCancel} className="text-sm text-blue-600 hover:underline">
          بازگشت به داشبورد
        </button>
      </div>
      <form onSubmit={handleSubmit} className="space-y-6 bg-gray-50 p-6 rounded-lg">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">عنوان آگهی</label>
            <input type="text" name="title" id="title" value={formData.title} onChange={handleChange} className="input-style" placeholder="مثلا: آپارتمان دو خوابه در مرکز شهر" required />
          </div>
          <div>
            <label htmlFor="propertyType" className="block text-sm font-medium text-gray-700 mb-1">نوع ملک</label>
            <select name="propertyType" id="propertyType" value={formData.propertyType} onChange={handleChange} className="input-style bg-white">
              {Object.values(PropertyType).map(type => <option key={type} value={type}>{type}</option>)}
            </select>
          </div>
        </div>
        
        <div>
          <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">توضیحات</label>
          <textarea name="description" id="description" value={formData.description} onChange={handleChange} rows={4} className="input-style" placeholder="جزئیات ملک خود را وارد کنید..." required></textarea>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label htmlFor="city" className="block text-sm font-medium text-gray-700 mb-1">شهر</label>
             <select name="city" id="city" value={formData.city} onChange={handleChange} className="input-style bg-white">
                {CITIES.map(city => <option key={city} value={city}>{city}</option>)}
            </select>
          </div>
          <div>
            <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-1">آدرس دقیق</label>
            <input type="text" name="address" id="address" value={formData.address} onChange={handleChange} className="input-style" required />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <label htmlFor="area" className="block text-sm font-medium text-gray-700 mb-1">متراژ (متر مربع)</label>
            <input type="number" name="area" id="area" value={formData.area} onChange={handleChange} className="input-style" required />
          </div>
          <div>
            <label htmlFor="rooms" className="block text-sm font-medium text-gray-700 mb-1">تعداد اتاق</label>
            <input type="number" name="rooms" id="rooms" value={formData.rooms} onChange={handleChange} className="input-style" required />
          </div>
          <div>
            <label htmlFor="yearBuilt" className="block text-sm font-medium text-gray-700 mb-1">سال ساخت</label>
            <input type="number" name="yearBuilt" id="yearBuilt" value={formData.yearBuilt} onChange={handleChange} className="input-style" placeholder="مثلا: ۱۳۹۵" required />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label htmlFor="estimatedValue" className="block text-sm font-medium text-gray-700 mb-1">ارزش تخمینی (تومان)</label>
            <input type="number" name="estimatedValue" id="estimatedValue" value={formData.estimatedValue} onChange={handleChange} className="input-style" placeholder="مثلا: ۵۰۰۰۰۰۰۰۰۰" required />
          </div>
          <div>
            <label htmlFor="barterPreferences" className="block text-sm font-medium text-gray-700 mb-1">ترجیحات تهاتر (اختیاری)</label>
            <input type="text" name="barterPreferences" id="barterPreferences" value={formData.barterPreferences} onChange={handleChange} className="input-style" placeholder="با ویرگول جدا کنید: خودرو, زمین" />
          </div>
        </div>

        <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">تصاویر ملک</label>
            <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
                <div className="space-y-1 text-center">
                    <svg className="mx-auto h-12 w-12 text-gray-400" stroke="currentColor" fill="none" viewBox="0 0 48 48" aria-hidden="true">
                        <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    <div className="flex text-sm text-gray-600 justify-center">
                        <label htmlFor="file-upload" className="relative cursor-pointer bg-white rounded-md font-medium text-blue-600 hover:text-blue-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-blue-500">
                            <span>آپلود فایل</span>
                            <input id="file-upload" name="file-upload" type="file" className="sr-only" multiple />
                        </label>
                        <p className="pr-1">یا بکشید و رها کنید</p>
                    </div>
                    <p className="text-xs text-gray-500">PNG, JPG (تا ۱۰ مگابایت)</p>
                </div>
            </div>
        </div>

        <div className="flex justify-end space-x-4 space-x-reverse pt-4">
            <button type="button" onClick={onCancel} className="px-6 py-2 text-gray-700 bg-gray-200 rounded-lg hover:bg-gray-300">
                انصراف
            </button>
            <button type="submit" className="px-6 py-2 text-white bg-blue-600 rounded-lg hover:bg-blue-700 font-semibold">
                ثبت ملک
            </button>
        </div>
      </form>
    </div>
  );
};

export default PropertyRegistrationForm;