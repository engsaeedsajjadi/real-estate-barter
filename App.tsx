
import React, { useState, useCallback } from 'react';
import { Property } from './types';
import Header from './components/Header';
import Footer from './components/Footer';
import HomePage from './components/pages/HomePage';
import PropertyDetailPage from './components/pages/PropertyDetailPage';
import DashboardPage from './components/pages/DashboardPage';

export type View = 'home' | 'detail' | 'dashboard';

const App: React.FC = () => {
  const [view, setView] = useState<View>('home');
  const [selectedProperty, setSelectedProperty] = useState<Property | null>(null);

  const handleSelectProperty = useCallback((property: Property) => {
    setSelectedProperty(property);
    setView('detail');
  }, []);

  const handleNavigate = useCallback((newView: View) => {
    setView(newView);
    window.scrollTo(0, 0);
  }, []);

  const renderContent = () => {
    switch (view) {
      case 'home':
        return <HomePage onSelectProperty={handleSelectProperty} />;
      case 'detail':
        return selectedProperty ? (
          <PropertyDetailPage property={selectedProperty} onBack={() => handleNavigate('home')} />
        ) : (
          <HomePage onSelectProperty={handleSelectProperty} />
        );
      case 'dashboard':
        return <DashboardPage />;
      default:
        return <HomePage onSelectProperty={handleSelectProperty} />;
    }
  };

  return (
    <div className="bg-gray-50 text-gray-800 min-h-screen flex flex-col">
      <Header onNavigate={handleNavigate} />
      <main className="flex-grow container mx-auto px-4 py-8">
        {renderContent()}
      </main>
      <Footer />
    </div>
  );
};

export default App;
