import React from 'react';
import { Property, PropertyStatus } from '../types';

interface PropertyCardProps {
  property: Property;
  onSelect: (property: Property) => void;
}

const LocationIcon: React.FC<{className: string}> = ({className}) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
    </svg>
);

const AreaIcon: React.FC<{className: string}> = ({className}) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
    </svg>
);

const PropertyCard: React.FC<PropertyCardProps> = ({ property, onSelect }) => {
    
  const formatValue = (value: number) => {
    if (value >= 1000000000) {
      return `${(value / 1000000000).toLocaleString('fa-IR')} میلیارد تومان`;
    }
    return `${(value / 1000000).toLocaleString('fa-IR')} میلیون تومان`;
  };

  const getStatusColor = (status: PropertyStatus) => {
    switch (status) {
        case PropertyStatus.AVAILABLE:
            return 'bg-green-100 text-green-800';
        case PropertyStatus.PENDING_DEAL:
            return 'bg-yellow-100 text-yellow-800';
        case PropertyStatus.EXCHANGED:
            return 'bg-gray-200 text-gray-800';
        default:
            return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div 
      className="bg-white rounded-lg shadow-lg overflow-hidden transform hover:-translate-y-1 transition-all duration-300 cursor-pointer flex flex-col"
      onClick={() => onSelect(property)}
    >
      <img src={property.images[0]} alt={property.title} className="w-full h-56 object-cover" />
      <div className="p-4 flex flex-col flex-grow">
        <div className="flex justify-between items-start">
            <h3 className="text-lg font-bold text-gray-800 mb-2 truncate">{property.title}</h3>
            <span className={`text-xs font-semibold px-2 py-1 rounded-full whitespace-nowrap ${getStatusColor(property.status)}`}>
                {property.status}
            </span>
        </div>
        <div className="flex items-center text-gray-600 text-sm mb-4">
          <LocationIcon className="w-4 h-4 ml-1 text-gray-500" />
          <span>{property.city}</span>
          <span className="mx-2">|</span>
          <AreaIcon className="w-4 h-4 ml-1 text-gray-500" />
          <span>{property.area.toLocaleString('fa-IR')} متر مربع</span>
        </div>
        
        <p className="text-sm text-gray-500 mb-4 min-h-[40px] flex-grow">
          {property.description.substring(0, 80)}...
        </p>

        <div className="border-t border-gray-200 pt-3 flex justify-between items-center">
            <span className="text-base font-semibold text-blue-600">{formatValue(property.estimatedValue)}</span>
            <button className="text-sm text-white bg-blue-500 px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors">مشاهده جزئیات</button>
        </div>
      </div>
    </div>
  );
};

export default PropertyCard;