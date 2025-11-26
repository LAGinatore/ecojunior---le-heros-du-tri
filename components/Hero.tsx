import React from 'react';
import { Button } from './Button';
import { Play, BookOpen, Camera } from 'lucide-react';
import { Language } from '../types';
import { TRANSLATIONS } from '../translations';

interface HeroProps {
  onStart: () => void;
  onLearn: () => void;
  onScan: () => void;
  lang: Language;
}

export const Hero: React.FC<HeroProps> = ({ onStart, onLearn, onScan, lang }) => {
  const t = TRANSLATIONS[lang].hero;

  return (
    <div className="flex flex-col items-center justify-center min-h-[80vh] text-center p-4 md:p-6 space-y-6 md:space-y-8 animate-fade-in-up">
      <div className="relative mt-4 md:mt-0">
        <div className="absolute top-0 start-1/2 -translate-x-1/2 rtl:translate-x-1/2 w-48 h-48 md:w-64 md:h-64 bg-green-200 rounded-full blur-3xl opacity-50 -z-10"></div>
        <h1 className="text-5xl md:text-8xl font-black text-green-600 tracking-tight drop-shadow-sm mb-4">
          {lang === 'ar' ? 'إيكو' : 'Eco'}<span className="text-sky-500">{lang === 'ar' ? ' جونيور' : 'Junior'}</span>
        </h1>
        <p className="text-lg md:text-2xl text-slate-600 max-w-xs md:max-w-lg mx-auto font-medium leading-relaxed">
          {t.subtitle}
        </p>
      </div>

      <div className="flex flex-col sm:flex-row gap-3 md:gap-4 w-full max-w-xs sm:max-w-md md:max-w-2xl justify-center mt-4 md:mt-8">
        <Button onClick={onStart} variant="accent" size="lg" className="w-full sm:w-auto animate-bounce-slow text-lg md:text-xl py-4">
          <Play className={`w-6 h-6 ${lang === 'ar' ? 'rotate-180' : ''}`} />
          {t.play}
        </Button>
        <Button onClick={onLearn} variant="secondary" size="lg" className="w-full sm:w-auto text-lg md:text-xl py-4">
          <BookOpen className="w-6 h-6" />
          {t.learn}
        </Button>
      </div>
      
      <div className="mt-8 p-6 bg-white rounded-3xl shadow-xl border-2 border-sky-100 max-w-xs md:max-w-md w-full transform hover:scale-105 transition-transform duration-300">
        <h3 className="text-lg font-bold text-sky-600 mb-2">{t.detectiveTitle}</h3>
        <p className="text-slate-500 mb-4 text-sm">{t.detectiveDesc}</p>
        <Button onClick={onScan} variant="primary" size="md" className="w-full">
          <Camera className="w-5 h-5" />
          {t.scan}
        </Button>
      </div>
    </div>
  );
};