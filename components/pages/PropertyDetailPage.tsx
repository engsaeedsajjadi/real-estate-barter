import React, { useState } from 'react';
import { Property } from '../../types';
import BarterProposalModal from '../BarterProposalModal';

interface PropertyDetailPageProps {
  property: Property;
  onBack: () => void;
}

const InfoPill: React.FC<{ icon: React.ReactNode; label: string; value: string | number }> = ({ icon, label, value }) => (
    <div className="bg-blue-50 text-blue-800 rounded-lg p-4 flex flex-col items-center justify-center text-center">
        <div className="text-blue-500 mb-2">{icon}</div>
        <span className="text-sm font-medium text-gray-600">{label}</span>
        <span className="text-lg font-bold">{value}</span>
    </div>
);

const PropertyDetailPage: React.FC<PropertyDetailPageProps> = ({ property, onBack }) => {
  const [mainImage, setMainImage] = useState(property.images[0]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const formatValue = (value: number) => {
    if (value >= 1000000000) {
      return `${(value / 1000000000).toLocaleString('fa-IR')} میلیارد تومان`;
    }
    return `${(value / 1000000).toLocaleString('fa-IR')} میلیون تومان`;
  };

  return (
    <div className="bg-white p-4 sm:p-8 rounded-2xl shadow-xl">
      <button onClick={onBack} className="mb-6 text-blue-600 hover:text-blue-800 flex items-center">
         <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
        بازگشت به لیست املاک
      </button>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
        {/* Image Gallery */}
        <div className="lg:col-span-3">
          <img src={mainImage} alt={property.title} className="w-full h-96 object-cover rounded-xl shadow-md mb-4" />
          <div className="flex flex-wrap gap-2">
            {property.images.map((img, index) => (
              <img
                key={index}
                src={img}
                alt={`${property.title} ${index + 1}`}
                className={`w-24 h-24 object-cover rounded-lg cursor-pointer border-2 ${mainImage === img ? 'border-blue-500' : 'border-transparent'}`}
                onClick={() => setMainImage(img)}
              />
            ))}
          </div>
        </div>

        {/* Property Info */}
        <div className="lg:col-span-2">
          <span className="bg-blue-100 text-blue-800 text-sm font-medium mr-2 px-2.5 py-0.5 rounded-full">{property.propertyType}</span>
          <h1 className="text-3xl font-bold mt-2 mb-2">{property.title}</h1>
          <p className="text-gray-600 mb-6">{property.city}, {property.address}</p>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mb-6">
              <InfoPill icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>} label="متراژ" value={`${property.area.toLocaleString('fa-IR')} متر`} />
              <InfoPill icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" /></svg>} label="اتاق" value={property.rooms} />
              <InfoPill icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>} label="سال ساخت" value={property.yearBuilt} />
          </div>

          <div className="bg-gray-100 p-4 rounded-lg">
            <p className="text-sm text-gray-600">ارزش تخمینی ملک</p>
            <p className="text-2xl font-bold text-green-600">{formatValue(property.estimatedValue)}</p>
          </div>
          
          <button 
            onClick={() => setIsModalOpen(true)}
            className="w-full mt-6 bg-green-500 text-white font-bold py-4 rounded-lg hover:bg-green-600 transition-all text-lg shadow-lg"
          >
            ارسال پیشنهاد تهاتر
          </button>
        </div>
      </div>
      
      {/* Description & Preferences */}
      <div className="mt-10 pt-6 border-t">
        <h2 className="text-2xl font-bold mb-4">توضیحات</h2>
        <p className="text-gray-700 leading-relaxed">{property.description}</p>
      </div>
       <div className="mt-8">
        <h2 className="text-2xl font-bold mb-4">ترجیحات تهاتر مالک</h2>
        <div className="flex flex-wrap gap-2">
            {property.barterPreferences.map((pref, i) => (
                <span key={i} className="bg-gray-200 text-gray-800 px-3 py-1 rounded-full text-sm">{pref}</span>
            ))}
        </div>
      </div>
      {isModalOpen && <BarterProposalModal property={property} onClose={() => setIsModalOpen(false)} />}
    </div>
  );
};

export default PropertyDetailPage;