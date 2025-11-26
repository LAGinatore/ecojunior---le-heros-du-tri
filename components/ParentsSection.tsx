import React from 'react';
import { ArrowLeft, CheckCircle2 } from 'lucide-react';
import { Button } from './Button';
import { Language } from '../types';
import { TRANSLATIONS } from '../translations';

interface ParentsSectionProps {
  onBack: () => void;
  lang: Language;
}

export const ParentsSection: React.FC<ParentsSectionProps> = ({ onBack, lang }) => {
  const t = TRANSLATIONS[lang].parents;

  return (
    <div className="p-4 md:p-8 max-w-3xl mx-auto">
      <div className="flex items-center gap-4 mb-8">
        <Button onClick={onBack} variant="secondary" size="sm">
          <ArrowLeft className={`w-5 h-5 ${lang === 'ar' ? 'rotate-180' : ''}`} />
          {t.back}
        </Button>
        <h2 className="text-3xl font-bold text-slate-700">{t.title}</h2>
      </div>

      <div className="bg-white rounded-3xl p-8 shadow-lg border border-slate-100">
        <p className="text-slate-600 mb-6 text-lg">
          {t.intro}
        </p>

        <h3 className="text-xl font-bold text-green-600 mb-4">{t.tipsTitle}</h3>
        
        <ul className="space-y-4">
            {t.tips.map((tip, idx) => (
                <li key={idx} className="flex items-start gap-3">
                    <CheckCircle2 className="w-6 h-6 text-green-500 flex-shrink-0 mt-1" />
                    <span className="text-slate-700 font-medium">{tip}</span>
                </li>
            ))}
        </ul>

        <div className="mt-8 p-4 bg-sky-50 rounded-xl border border-sky-100 text-sm text-sky-800">
            <strong>{t.didYouKnow}</strong> {t.didYouKnowText}
        </div>
      </div>
    </div>
  );
};