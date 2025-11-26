import React, { useState, useEffect, memo } from 'react';
import { Hero } from './components/Hero';
import { LearnSection } from './components/LearnSection';
import { GameSection } from './components/GameSection';
import { ScannerSection } from './components/ScannerSection';
import { ParentsSection } from './components/ParentsSection';
import { AppView, Language } from './types';
import { Users } from 'lucide-react';

// Memoized background to prevent re-renders when switching views
const Background = memo(() => (
  <div className="fixed inset-0 overflow-hidden pointer-events-none -z-10">
    <div className="blob bg-purple-300 w-48 h-48 md:w-64 md:h-64 rounded-full top-20 start-0 mix-blend-multiply filter blur-xl opacity-30 animate-blob"></div>
    <div className="blob bg-yellow-300 w-48 h-48 md:w-64 md:h-64 rounded-full top-20 end-0 mix-blend-multiply filter blur-xl opacity-30 animate-blob animation-delay-2000"></div>
    <div className="blob bg-pink-300 w-48 h-48 md:w-64 md:h-64 rounded-full bottom-20 start-1/3 mix-blend-multiply filter blur-xl opacity-30 animate-blob animation-delay-4000"></div>
  </div>
));

export default function App() {
  const [currentView, setCurrentView] = useState<AppView>('home');
  const [language, setLanguage] = useState<Language>('fr');

  useEffect(() => {
    document.documentElement.dir = language === 'ar' ? 'rtl' : 'ltr';
    document.documentElement.lang = language;
  }, [language]);

  const renderView = () => {
    switch (currentView) {
      case 'home':
        return (
          <Hero 
            onStart={() => setCurrentView('game')} 
            onLearn={() => setCurrentView('learn')} 
            onScan={() => setCurrentView('scanner')} 
            lang={language}
          />
        );
      case 'learn':
        return <LearnSection onBack={() => setCurrentView('home')} lang={language} />;
      case 'game':
        return <GameSection onBack={() => setCurrentView('home')} lang={language} />;
      case 'scanner':
        return <ScannerSection onBack={() => setCurrentView('home')} lang={language} />;
      case 'parents':
        return <ParentsSection onBack={() => setCurrentView('home')} lang={language} />;
      default:
        return <Hero onStart={() => setCurrentView('game')} onLearn={() => setCurrentView('learn')} onScan={() => setCurrentView('scanner')} lang={language} />;
    }
  };

  const LangButton = ({ code, flag, label }: { code: Language, flag: string, label: string }) => (
    <button
      onClick={() => setLanguage(code)}
      className={`px-2 py-1 md:px-3 md:py-1 rounded-full text-xs md:text-sm font-bold flex items-center gap-1 transition-all ${language === code ? 'bg-white shadow-md text-sky-600' : 'bg-transparent text-slate-500 hover:bg-white/50'}`}
    >
      <span className="text-lg leading-none">{flag}</span>
      <span className="hidden sm:inline">{label}</span>
    </button>
  );

  return (
    <div className={`min-h-screen bg-sky-50 flex flex-col font-sans ${language === 'ar' ? 'font-arabic' : ''}`}>
      {/* Navbar */}
      <nav className="w-full p-3 md:p-4 flex justify-between items-center max-w-7xl mx-auto z-50 relative bg-sky-50/80 backdrop-blur-sm sticky top-0">
         <div 
           className="font-black text-xl md:text-2xl text-green-600 cursor-pointer flex items-center gap-2 select-none"
           onClick={() => setCurrentView('home')}
         >
            <span className="bg-green-100 p-1.5 md:p-2 rounded-xl text-lg md:text-xl">🌱</span>
            <span className="tracking-tight">{language === 'ar' ? 'إيكو جونيور' : 'EcoJunior'}</span>
         </div>

         <div className="flex items-center gap-2 md:gap-4">
            <div className="flex items-center bg-slate-100/80 rounded-full p-1 border border-slate-200">
               <LangButton code="fr" flag="🇫🇷" label="FR" />
               <LangButton code="en" flag="🇬🇧" label="EN" />
               <LangButton code="ar" flag="🇩🇿" label="AR" />
            </div>

            {currentView === 'home' && (
                <button 
                    onClick={() => setCurrentView('parents')}
                    className="text-slate-500 font-bold hover:text-sky-600 transition-colors flex items-center gap-2 text-xs md:text-base bg-white px-3 py-2 md:px-4 rounded-full shadow-sm hover:shadow-md border border-slate-100"
                >
                    <Users className="w-4 h-4" />
                    <span className="hidden md:inline">{language === 'ar' ? 'الآباء' : (language === 'en' ? 'Parents' : 'Parents')}</span>
                </button>
            )}
         </div>
      </nav>

      {/* Main Content */}
      <main className="flex-1 w-full relative overflow-x-hidden">
        <Background />
        {renderView()}
      </main>

      {/* Footer */}
      <footer className="py-6 text-center text-slate-400 text-xs md:text-sm px-4">
        <p>Mini Projet L3 Informatique 2025 - Université Oran 1 </p> <p> by BENHACHEM Mounis Karim Elghali</p>
      </footer>
    </div>
  );
}