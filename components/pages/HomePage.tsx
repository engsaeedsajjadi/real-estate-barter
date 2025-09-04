import React, { useState, useMemo } from 'react';
import PropertyCard from '../PropertyCard';
import SearchFilter from '../SearchFilter';
import { MOCK_PROPERTIES } from '../../constants';
import { Property, PropertyStatus } from '../../types';

interface HomePageProps {
  onSelectProperty: (property: Property) => void;
}

const HomePage: React.FC<HomePageProps> = ({ onSelectProperty }) => {
  const [searchResults, setSearchResults] = useState<Property[] | null>(null);
  const [hasSearched, setHasSearched] = useState(false);

  const featuredProperties = useMemo(() => 
    MOCK_PROPERTIES.filter(p => p.status === PropertyStatus.AVAILABLE).slice(0, 6),
    []
  );

  const handleSearch = (filters: { term: string; city: string; type: string }) => {
    const { term, city, type } = filters;
    let filtered = MOCK_PROPERTIES.filter(p => p.status === PropertyStatus.AVAILABLE);

    if (city !== 'همه شهرها') {
      filtered = filtered.filter(p => p.city === city);
    }
    
    if (type !== 'همه انواع') {
      filtered = filtered.filter(p => p.propertyType === type);
    }

    if (term.trim() !== '') {
      const lowercasedTerm = term.toLowerCase();
      filtered = filtered.filter(p => 
        p.title.toLowerCase().includes(lowercasedTerm) ||
        p.description.toLowerCase().includes(lowercasedTerm) ||
        p.barterPreferences.some(pref => pref.toLowerCase().includes(lowercasedTerm))
      );
    }
    
    setSearchResults(filtered);
    setHasSearched(true);
  };
  
  const propertiesToShow = hasSearched ? searchResults : featuredProperties;

  return (
    <div>
      <div className="bg-gray-700 h-64 rounded-lg flex items-center justify-center text-white text-center -mt-8" style={{backgroundImage: "url('https://picsum.photos/seed/bg/1200/400')", backgroundSize: 'cover', backgroundPosition: 'center'}}>
         <div className="bg-black bg-opacity-50 p-8 rounded-lg">
            <h1 className="text-4xl font-bold">بازار تخصصی تهاتر املاک</h1>
            <p className="mt-2 text-lg">ملک خود را با ملک رویایی‌تان معاوضه کنید</p>
         </div>
      </div>
      
      <SearchFilter onSearch={handleSearch} />

      <section className="mt-12">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">
          {hasSearched ? 'نتایج جستجو' : 'املاک ویژه برای تهاتر'}
        </h2>
        {propertiesToShow && propertiesToShow.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {propertiesToShow.map(property => (
                    <PropertyCard key={property.id} property={property} onSelect={onSelectProperty} />
                ))}
            </div>
        ) : (
            <div className="text-center py-12 px-6 bg-yellow-50 rounded-lg border border-yellow-200">
                <svg xmlns="http://www.w3.org/2000/svg" className="mx-auto h-12 w-12 text-yellow-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <h3 className="mt-2 text-lg font-medium text-yellow-800">هیچ ملکی یافت نشد</h3>
                <p className="mt-1 text-sm text-yellow-700">
                  معیارهای جستجوی خود را تغییر دهید و دوباره تلاش کنید.
                </p>
            </div>
        )}
      </section>

      <section className="mt-20">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">جدیدترین املاک ثبت شده</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {MOCK_PROPERTIES.filter(p => p.status === PropertyStatus.AVAILABLE).slice(-10).reverse().map(property => (
            <PropertyCard key={property.id} property={property} onSelect={onSelectProperty} />
          ))}
        </div>
      </section>
    </div>
  );
};

export default HomePage;