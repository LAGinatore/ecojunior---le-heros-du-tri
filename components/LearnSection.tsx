import React from 'react';
import { getBins } from '../constants';
import { ArrowLeft } from 'lucide-react';
import { Button } from './Button';
import { Language } from '../types';
import { TRANSLATIONS } from '../translations';

interface LearnSectionProps {
  onBack: () => void;
  lang: Language;
}

export const LearnSection: React.FC<LearnSectionProps> = ({ onBack, lang }) => {
  const bins = getBins(lang);
  const t = TRANSLATIONS[lang].learn;

  return (
    <div className="p-4 md:p-8 max-w-6xl mx-auto">
      <div className="flex items-center gap-4 mb-8">
        <Button onClick={onBack} variant="secondary" size="sm">
          <ArrowLeft className={`w-5 h-5 ${lang === 'ar' ? 'rotate-180' : ''}`} />
          {t.back}
        </Button>
        <h2 className="text-3xl md:text-4xl font-bold text-slate-700">{t.title}</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {bins.map((bin) => (
          <div 
            key={bin.type}
            className={`relative overflow-hidden rounded-3xl border-4 ${bin.borderColor} bg-white shadow-xl flex flex-col`}
          >
            <div className={`${bin.bgColor} p-6 flex items-center justify-between`}>
              <h3 className={`text-2xl font-black ${bin.color}`}>{bin.name}</h3>
              <div className="p-3 bg-white rounded-full shadow-sm">
                {bin.icon}
              </div>
            </div>
            
            <div className="p-6 flex-1 flex flex-col gap-4">
              <p className="text-lg font-medium text-slate-600 leading-relaxed">
                {bin.description}
              </p>
              
              <div className="mt-auto">
                <h4 className="font-bold text-slate-400 text-sm uppercase tracking-wider mb-2">{t.examples}</h4>
                <div className="flex flex-wrap gap-2">
                  {bin.examples.map((ex, i) => (
                    <span 
                      key={i} 
                      className={`px-3 py-1 rounded-full text-sm font-bold border ${bin.bgColor} ${bin.color} border-opacity-50`}
                    >
                      {ex}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};