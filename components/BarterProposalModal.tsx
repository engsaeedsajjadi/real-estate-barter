
import React, { useState, useEffect } from 'react';
import { Property } from '../types';
import { MOCK_PROPERTIES, CURRENT_USER } from '../constants';

interface BarterProposalModalProps {
  property: Property; // The property the user wants to make an offer ON
  onClose: () => void;
}

const BarterProposalModal: React.FC<BarterProposalModalProps> = ({ property, onClose }) => {
  const [myProperties, setMyProperties] = useState<Property[]>([]);
  const [selectedPropertyId, setSelectedPropertyId] = useState<string>('');
  const [cashDifference, setCashDifference] = useState('');
  const [message, setMessage] = useState('');

  useEffect(() => {
    // In a real app, this would be an API call
    setMyProperties(MOCK_PROPERTIES.filter(p => p.owner.id === CURRENT_USER.id));
  }, []);
  
  // Close modal on Escape key press
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [onClose]);


  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedPropertyId) {
        alert('لطفاً یکی از املاک خود را برای تهاتر انتخاب کنید.');
        return;
    }
    // In a real app, you would submit this data to the backend API
    console.log({
      proposerPropertyId: selectedPropertyId,
      receiverPropertyId: property.id,
      message,
      cashDifference: cashDifference ? Number(cashDifference) : undefined,
    });
    alert('پیشنهاد شما با موفقیت ارسال شد!');
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50 p-4" onClick={onClose}>
      <div 
        className="bg-white rounded-lg shadow-2xl w-full max-w-2xl transform transition-all"
        onClick={e => e.stopPropagation()}
      >
        <div className="p-6 border-b">
            <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold text-gray-800">ارسال پیشنهاد تهاتر</h2>
                <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </button>
            </div>
            <p className="text-sm text-gray-500 mt-1">برای ملک: <span className="font-semibold">{property.title}</span></p>
        </div>

        <form onSubmit={handleSubmit}>
            <div className="p-6 space-y-6">
                <div>
                    <label htmlFor="my-property" className="block text-md font-medium text-gray-700 mb-2">
                        ملک شما برای معاوضه
                    </label>
                    <select
                    id="my-property"
                    value={selectedPropertyId}
                    onChange={(e) => setSelectedPropertyId(e.target.value)}
                    className="input-style bg-white"
                    >
                        <option value="" disabled>یکی از املاک خود را انتخاب کنید...</option>
                        {myProperties.map(p => (
                            <option key={p.id} value={p.id}>{p.title} ({p.city})</option>
                        ))}
                    </select>
                </div>
                <div>
                    <label htmlFor="cash-difference" className="block text-md font-medium text-gray-700 mb-2">
                        مابه‌التفاوت نقدی (تومان)
                    </label>
                     <input
                        type="number"
                        id="cash-difference"
                        name="cash-difference"
                        value={cashDifference}
                        onChange={(e) => setCashDifference(e.target.value)}
                        placeholder="مثبت (پرداختی شما)، منفی (دریافتی شما)"
                        className="input-style"
                    />
                </div>
                <div>
                    <label htmlFor="message" className="block text-md font-medium text-gray-700 mb-2">
                        پیام شما به مالک
                    </label>
                    <textarea
                        id="message"
                        rows={3}
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        placeholder="شرایط پیشنهادی خود را اینجا بنویسید..."
                        className="input-style"
                    ></textarea>
                </div>
            </div>

            <div className="bg-gray-50 p-6 flex justify-end space-x-4 space-x-reverse rounded-b-lg">
                <button type="button" onClick={onClose} className="px-6 py-2 text-gray-700 bg-gray-200 rounded-lg hover:bg-gray-300">
                    انصراف
                </button>
                <button type="submit" className="px-6 py-2 text-white bg-green-500 rounded-lg hover:bg-green-600">
                    ارسال پیشنهاد
                </button>
            </div>
        </form>
      </div>
    </div>
  );
};

export default BarterProposalModal;