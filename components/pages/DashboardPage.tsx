
import React, { useState } from 'react';
import { MOCK_PROPERTIES, MOCK_PROPOSALS, CURRENT_USER } from '../../constants';
import { Property, BarterProposal, ProposalStatus, PropertyStatus, VerificationStatus } from '../../types';
import PropertyRegistrationForm from '../PropertyRegistrationForm';

type Tab = 'myProperties' | 'receivedProposals' | 'sentProposals';

const getPropertyStatusColor = (status: PropertyStatus) => {
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

const getVerificationStatusPill = (status?: VerificationStatus) => {
    switch (status) {
        case VerificationStatus.VERIFIED:
            return { text: 'تأیید شده', className: 'bg-green-100 text-green-800' };
        case VerificationStatus.PENDING:
            return { text: 'در حال بررسی', className: 'bg-yellow-100 text-yellow-800' };
        case VerificationStatus.UNVERIFIED:
            return { text: 'تأیید نشده', className: 'bg-gray-100 text-gray-800' };
        default:
            return { text: 'نامشخص', className: 'bg-gray-100 text-gray-800' };
    }
};


const MyPropertiesTab: React.FC = () => {
    // State management for properties to allow UI updates
    const [myProperties, setMyProperties] = useState<Property[]>(
        MOCK_PROPERTIES.filter(p => p.owner.id === CURRENT_USER.id)
    );

    const handleSendForVerification = (propertyId: string) => {
        if (window.confirm('آیا برای ارسال ملک جهت تأیید کارشناسی اطمینان دارید؟')) {
            setMyProperties(prevProps =>
                prevProps.map(prop =>
                    prop.id === propertyId ? { ...prop, verificationStatus: VerificationStatus.PENDING } : prop
                )
            );
            alert('ملک شما با موفقیت برای بررسی ارسال شد. وضعیت به "در حال بررسی" تغییر یافت.');
        }
    };

    if (myProperties.length === 0) {
        return <p className="text-center text-gray-500 py-8">شما هیچ ملکی ثبت نکرده‌اید.</p>;
    }

    return (
        <div className="space-y-4">
            {myProperties.map(prop => {
                const verificationInfo = getVerificationStatusPill(prop.verificationStatus);
                return (
                    <div key={prop.id} className="bg-white p-4 rounded-lg shadow flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                        {/* Property Info */}
                        <div className="flex items-center grow w-full">
                            <img src={prop.images[0]} alt={prop.title} className="w-16 h-16 sm:w-20 sm:h-20 object-cover rounded-md" />
                            <div className="mr-4">
                                <h3 className="font-bold text-base sm:text-lg">{prop.title}</h3>
                                <p className="text-sm text-gray-500">{prop.city}</p>
                            </div>
                        </div>
                        
                        {/* Statuses and Actions */}
                        <div className="w-full sm:w-auto flex flex-col items-stretch sm:items-end gap-2 shrink-0">
                             {/* Trading Status */}
                            <span className={`text-xs font-semibold px-3 py-1 rounded-full whitespace-nowrap text-center ${getPropertyStatusColor(prop.status)}`}>
                                {prop.status}
                            </span>
                            
                            {/* Verification Status */}
                             <span className={`text-xs font-semibold px-3 py-1 rounded-full whitespace-nowrap text-center ${verificationInfo.className}`}>
                                {verificationInfo.text}
                            </span>

                            {/* Action Button */}
                            <div className="mt-1">
                                {prop.verificationStatus === VerificationStatus.UNVERIFIED && (
                                    <button 
                                        onClick={() => handleSendForVerification(prop.id)}
                                        className="w-full text-sm text-white px-4 py-2 rounded-lg bg-blue-500 hover:bg-blue-600 transition"
                                    >
                                        ارسال برای تأیید
                                    </button>
                                )}
                                {prop.verificationStatus === VerificationStatus.PENDING && (
                                    <button className="w-full text-sm px-4 py-2 rounded-lg bg-yellow-100 text-yellow-800 cursor-not-allowed" disabled>
                                        در حال بررسی...
                                    </button>
                                )}
                                {prop.verificationStatus === VerificationStatus.VERIFIED && (
                                    <button className="w-full text-sm px-4 py-2 rounded-lg bg-green-100 text-green-800 cursor-not-allowed flex items-center justify-center" disabled>
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" viewBox="0 0 20 20" fill="currentColor">
                                          <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm4.493 6.286a.75.75 0 00-1.06-1.06L7.25 11.44l-1.97-1.97a.75.75 0 00-1.06 1.06l2.5 2.5a.75.75 0 001.06 0l4-4z" clipRule="evenodd" />
                                        </svg>
                                        تأیید شده
                                    </button>
                                )}
                            </div>
                        </div>
                    </div>
                );
            })}
        </div>
    );
};

const ProposalCard: React.FC<{proposal: BarterProposal, type: 'sent' | 'received'}> = ({ proposal, type }) => {
    const getStatusColor = (status: ProposalStatus) => {
        switch (status) {
            case ProposalStatus.ACCEPTED: return 'bg-green-100 text-green-800';
            case ProposalStatus.REJECTED: return 'bg-red-100 text-red-800';
            case ProposalStatus.PENDING: return 'bg-yellow-100 text-yellow-800';
            default: return 'bg-gray-100 text-gray-800';
        }
    };

    const myProperty = type === 'sent' ? proposal.proposerProperty : proposal.receiverProperty;
    const theirProperty = type === 'sent' ? proposal.receiverProperty : proposal.proposerProperty;
    
    // Determine if the cash difference is a payment or receipt from the current user's perspective
    const isPaymentByUser = (type === 'sent' && (proposal.cashDifference ?? 0) > 0) || (type === 'received' && (proposal.cashDifference ?? 0) < 0);

    return (
        <div className="bg-white p-4 rounded-lg shadow">
            <div className="flex flex-col sm:flex-row justify-between sm:items-start mb-4 gap-2">
                <p className="text-sm text-gray-600">
                    {type === 'sent' ? `شما برای ملک "${theirProperty.title}" پیشنهاد ارسال کردید.` : `"${proposal.proposer.name}" برای ملک شما پیشنهاد ارسال کرده است.`}
                </p>
                <span className={`text-xs font-semibold px-2 py-1 rounded-full shrink-0 ${getStatusColor(proposal.status)}`}>
                    {proposal.status}
                </span>
            </div>

            <div className="grid grid-cols-3 items-center text-center gap-2">
                <div className="w-full">
                    <img src={myProperty.images[0]} alt={myProperty.title} className="w-16 h-16 sm:w-24 sm:h-24 object-cover rounded-md mx-auto mb-2" />
                    <h4 className="font-semibold text-xs sm:text-sm">ملک شما</h4>
                    <p className="text-xs text-gray-600 truncate">{myProperty.title}</p>
                </div>
                <div className="w-full flex flex-col items-center justify-center">
                   <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 sm:h-8 sm:w-8 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" /></svg>
                   {proposal.cashDifference != null && proposal.cashDifference !== 0 && (
                       <div className="text-center mt-2">
                           <p className="text-xs text-gray-500 font-medium">مابه‌التفاوت</p>
                           <p className={`text-sm font-bold ${isPaymentByUser ? 'text-red-600' : 'text-green-600'}`}>
                               {Math.abs(proposal.cashDifference).toLocaleString('fa-IR')} تومان
                           </p>
                           <p className="text-xs text-gray-500">
                               {isPaymentByUser ? '(پرداختی شما)' : '(دریافتی شما)'}
                           </p>
                       </div>
                   )}
                </div>
                <div className="w-full">
                    <img src={theirProperty.images[0]} alt={theirProperty.title} className="w-16 h-16 sm:w-24 sm:h-24 object-cover rounded-md mx-auto mb-2" />
                    <h4 className="font-semibold text-xs sm:text-sm">ملک پیشنهادی</h4>
                    <p className="text-xs text-gray-600 truncate">{theirProperty.title}</p>
                </div>
            </div>

            <div className="mt-4 pt-4 border-t border-gray-200">
                <p className="text-sm text-gray-700 italic">"{proposal.message}"</p>
            </div>
             {type === 'received' && proposal.status === ProposalStatus.PENDING && (
                <div className="mt-4 flex justify-end space-x-2 space-x-reverse">
                    <button className="px-4 py-2 text-sm bg-green-500 text-white rounded-lg hover:bg-green-600">پذیرفتن</button>
                    <button className="px-4 py-2 text-sm bg-red-500 text-white rounded-lg hover:bg-red-600">رد کردن</button>
                </div>
            )}
        </div>
    );
};


const ReceivedProposalsTab: React.FC = () => {
    const receivedProposals = MOCK_PROPOSALS.filter(p => p.receiver.id === CURRENT_USER.id);
    return (
        <div className="space-y-4">
            {receivedProposals.map(prop => <ProposalCard key={prop.id} proposal={prop} type="received" />)}
            {receivedProposals.length === 0 && <p className="text-center text-gray-500 py-8">شما هیچ پیشنهاد دریافتی ندارید.</p>}
        </div>
    );
};

const SentProposalsTab: React.FC = () => {
    const sentProposals = MOCK_PROPOSALS.filter(p => p.proposer.id === CURRENT_USER.id);
    return (
         <div className="space-y-4">
            {sentProposals.map(prop => <ProposalCard key={prop.id} proposal={prop} type="sent" />)}
            {sentProposals.length === 0 && <p className="text-center text-gray-500 py-8">شما هیچ پیشنهاد ارسالی ندارید.</p>}
        </div>
    );
};

const DashboardPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<Tab>('myProperties');
  const [isRegisteringProperty, setIsRegisteringProperty] = useState(false);

  const handleRegisterSubmit = (formData: any) => {
      console.log("New property data:", formData);
      // In a real app, this would be an API call to save the data.
      alert('ملک شما برای بررسی ثبت شد!');
      setIsRegisteringProperty(false);
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case 'myProperties':
        return <MyPropertiesTab />;
      case 'receivedProposals':
        return <ReceivedProposalsTab />;
      case 'sentProposals':
        return <SentProposalsTab />;
      default:
        return null;
    }
  };

  const TabButton: React.FC<{tabName: Tab; label: string}> = ({tabName, label}) => (
    <button
        onClick={() => setActiveTab(tabName)}
        className={`px-3 py-2 font-semibold text-sm sm:text-base rounded-t-lg transition-colors whitespace-nowrap ${
        activeTab === tabName
            ? 'border-b-2 border-blue-600 text-blue-600'
            : 'text-gray-500 hover:text-gray-700'
        }`}
    >
        {label}
    </button>
  );

  if (isRegisteringProperty) {
    return (
      <div className="bg-white p-4 sm:p-8 rounded-2xl shadow-xl">
        <PropertyRegistrationForm 
            onCancel={() => setIsRegisteringProperty(false)} 
            onSubmit={handleRegisterSubmit} 
        />
      </div>
    );
  }

  return (
    <div className="bg-white p-4 sm:p-8 rounded-2xl shadow-xl">
       <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4 mb-6">
        <h1 className="text-2xl sm:text-3xl font-bold">داشبورد کاربری</h1>
        <button 
            onClick={() => setIsRegisteringProperty(true)}
            className="bg-green-500 text-white font-semibold py-2 px-4 rounded-lg hover:bg-green-600 transition-all duration-300 shadow-md flex items-center justify-center w-full sm:w-auto"
        >
             <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
            </svg>
            ثبت ملک جدید
        </button>
      </div>
      <div className="border-b border-gray-200 mb-6">
        <nav className="-mb-px flex flex-wrap space-x-4 space-x-reverse">
            <TabButton tabName="myProperties" label="املاک من" />
            <TabButton tabName="receivedProposals" label="پیشنهادهای دریافتی" />
            <TabButton tabName="sentProposals" label="پیشنهادهای ارسالی" />
        </nav>
      </div>
      <div>
        {renderTabContent()}
      </div>
    </div>
  );
};

export default DashboardPage;
