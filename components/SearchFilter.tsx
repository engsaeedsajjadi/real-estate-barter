import React, { useState } from 'react';
import { PropertyType } from '../types';

interface SearchFilterProps {
  onSearch: (filters: { term: string; city: string; type: string }) => void;
}

const CITIES = ['تهران', 'مشهد', 'تبریز', 'شیراز', 'یزد', 'همه شهرها'];
const PROPERTY_TYPES = [PropertyType.APARTMENT, PropertyType.VILLA, PropertyType.LAND, PropertyType.COMMERCIAL, 'همه انواع'];


const SearchFilter: React.FC<SearchFilterProps> = ({ onSearch }) => {
  const [term, setTerm] = useState('');
  const [city, setCity] = useState('همه شهرها');
  const [propertyType, setPropertyType] = useState('همه انواع');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch({ term, city, type: propertyType });
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow-lg -mt-16 relative z-10">
      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-end">
          <div className="md:col-span-2">
            <label htmlFor="search-term" className="block text-sm font-medium text-gray-700 mb-1">
              جستجوی ملک یا ترجیحات تهاتر
            </label>
            <input
              type="text"
              id="search-term"
              placeholder="مثلاً 'ویلا در شمال' یا 'آپارتمان در شیراز'"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 transition"
              value={term}
              onChange={(e) => setTerm(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="city" className="block text-sm font-medium text-gray-700 mb-1">
              شهر
            </label>
            <select
              id="city"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-white focus:ring-blue-500 focus:border-blue-500 transition"
              value={city}
              onChange={(e) => setCity(e.target.value)}
            >
              {CITIES.map(c => <option key={c} value={c}>{c}</option>)}
            </select>
          </div>
          <div>
            <label htmlFor="property-type" className="block text-sm font-medium text-gray-700 mb-1">
              نوع ملک
            </label>
            <select
              id="property-type"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-white focus:ring-blue-500 focus:border-blue-500 transition"
              value={propertyType}
              onChange={(e) => setPropertyType(e.target.value)}
            >
              {PROPERTY_TYPES.map(type => <option key={type} value={type}>{type}</option>)}
            </select>
          </div>
          <div className="md:col-start-4">
            <button type="submit" className="w-full bg-blue-600 text-white font-semibold py-3 px-4 rounded-lg hover:bg-blue-700 transition-all duration-300 shadow-md flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              جستجو
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default SearchFilter;