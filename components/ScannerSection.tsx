import React, { useState, useRef } from 'react';
import { Button } from './Button';
import { ArrowLeft, Camera, Loader2, Sparkles, AlertTriangle } from 'lucide-react';
import { analyzeWasteImage } from '../services/geminiService';
import { getBins } from '../constants';
import { Language } from '../types';
import { TRANSLATIONS } from '../translations';

interface ScannerSectionProps {
  onBack: () => void;
  lang: Language;
}

// Utility to resize image before sending to API to improve performance
const resizeImage = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = (event) => {
      const img = new Image();
      img.src = event.target?.result as string;
      img.onload = () => {
        const canvas = document.createElement('canvas');
        const MAX_WIDTH = 800; // Limit width to 800px
        const MAX_HEIGHT = 800;
        let width = img.width;
        let height = img.height;

        if (width > height) {
          if (width > MAX_WIDTH) {
            height *= MAX_WIDTH / width;
            width = MAX_WIDTH;
          }
        } else {
          if (height > MAX_HEIGHT) {
            width *= MAX_HEIGHT / height;
            height = MAX_HEIGHT;
          }
        }

        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d');
        ctx?.drawImage(img, 0, 0, width, height);
        resolve(canvas.toDataURL('image/jpeg', 0.8)); // 80% quality jpeg
      };
      img.onerror = reject;
    };
    reader.onerror = reject;
  });
};

export const ScannerSection: React.FC<ScannerSectionProps> = ({ onBack, lang }) => {
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<{ wasteName: string; binType: string; message: string } | null>(null);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const t = TRANSLATIONS[lang].scanner;
  const bins = getBins(lang);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setResult(null);
    setError(null);
    setIsLoading(true); // Show local loading state while processing image

    try {
        const resizedImage = await resizeImage(file);
        setImagePreview(resizedImage);
    } catch (e) {
        console.error("Error processing image", e);
        // Fallback to original if resize fails
        const reader = new FileReader();
        reader.onloadend = () => setImagePreview(reader.result as string);
        reader.readAsDataURL(file);
    } finally {
        setIsLoading(false);
    }
  };

  const handleIdentify = async () => {
    if (!imagePreview) return;

    setIsLoading(true);
    setError(null);
    try {
      const data = await analyzeWasteImage(imagePreview, lang);
      if (data) {
        setResult(data);
      } else {
        setError(t.unknown);
      }
    } catch (err) {
      setError(t.error);
    } finally {
      setIsLoading(false);
    }
  };

  const reset = () => {
    setImagePreview(null);
    setResult(null);
    setError(null);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const getBinInfo = (type: string) => {
    return bins.find(b => b.type === type) || bins.find(b => b.type === 'general');
  };

  return (
    <div className="p-4 md:p-8 max-w-3xl mx-auto flex flex-col min-h-[calc(100vh-80px)]">
       <div className="flex items-center gap-4 mb-4 md:mb-8">
        <Button onClick={onBack} variant="secondary" size="sm">
          <ArrowLeft className={`w-5 h-5 ${lang === 'ar' ? 'rotate-180' : ''}`} />
          {t.back}
        </Button>
        <h2 className="text-2xl md:text-3xl font-bold text-slate-700 flex items-center gap-2">
            <Sparkles className="text-yellow-400 fill-yellow-400" />
            {t.title}
        </h2>
      </div>

      <div className="bg-white rounded-3xl shadow-xl p-4 md:p-8 border border-slate-100 flex-1 flex flex-col items-center justify-center">
        
        {!imagePreview ? (
            <div className="text-center space-y-6">
                <div className="w-24 h-24 md:w-32 md:h-32 bg-sky-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Camera className="w-10 h-10 md:w-12 md:h-12 text-sky-500" />
                </div>
                <h3 className="text-xl md:text-2xl font-bold text-slate-700">{t.uploadTitle}</h3>
                <p className="text-sm md:text-base text-slate-500 max-w-xs md:max-w-md mx-auto">
                    {t.uploadDesc}
                </p>
                <div className="pt-4 w-full">
                    <input 
                        ref={fileInputRef}
                        type="file" 
                        accept="image/*" 
                        capture="environment"
                        className="hidden" 
                        onChange={handleFileChange}
                    />
                    <Button onClick={() => fileInputRef.current?.click()} size="lg" variant="primary" className="w-full md:w-auto">
                        <Camera className="w-6 h-6 me-2" />
                        {t.btnPhoto}
                    </Button>
                </div>
            </div>
        ) : (
            <div className="w-full flex flex-col items-center h-full">
                <div className="relative w-full max-w-xs aspect-square bg-slate-100 rounded-2xl overflow-hidden shadow-inner mb-4 md:mb-6 flex-shrink-0">
                    <img src={imagePreview} alt="Preview" className="w-full h-full object-cover" />
                    {isLoading && (
                        <div className="absolute inset-0 bg-black/40 flex items-center justify-center backdrop-blur-sm">
                            <div className="text-center text-white">
                                <Loader2 className="w-10 h-10 md:w-12 md:h-12 animate-spin mx-auto mb-2" />
                                <p className="font-bold">{t.analyzing}</p>
                            </div>
                        </div>
                    )}
                </div>

                {!result && !isLoading && !error && (
                    <div className="flex flex-col sm:flex-row gap-3 md:gap-4 w-full max-w-xs sm:max-w-md">
                         <Button onClick={reset} variant="secondary" className="w-full">
                            {t.change}
                        </Button>
                        <Button onClick={handleIdentify} variant="accent" className="animate-pulse w-full">
                            <Sparkles className="w-5 h-5 me-2" />
                            {t.identify}
                        </Button>
                    </div>
                )}

                {error && (
                    <div className="bg-red-50 text-red-600 p-4 rounded-xl flex items-center gap-3 mb-6 animate-shake w-full max-w-md">
                        <AlertTriangle className="w-6 h-6 flex-shrink-0" />
                        <p className="font-medium text-sm">{error}</p>
                        <button onClick={reset} className="underline text-sm ms-auto flex-shrink-0">{t.retry}</button>
                    </div>
                )}

                {result && (
                    <div className="bg-green-50 border-2 border-green-200 rounded-2xl p-4 md:p-6 w-full max-w-md animate-fade-in-up flex flex-col items-center">
                        <h3 className="text-xl md:text-2xl font-black text-slate-800 text-center mb-1">{result.wasteName}</h3>
                        <p className="text-sm md:text-base text-slate-600 text-center mb-4 md:mb-6 italic">"{result.message}"</p>
                        
                        <div className="bg-white rounded-xl p-3 md:p-4 shadow-sm border border-slate-100 w-full">
                            <p className="text-xs font-bold text-slate-400 uppercase text-center mb-2">{t.binLabel}</p>
                            
                            {(() => {
                                const bin = getBinInfo(result.binType);
                                return bin ? (
                                    <div className={`flex items-center gap-3 md:gap-4 p-3 md:p-4 rounded-xl ${bin.bgColor} ${bin.color}`}>
                                        <div className="bg-white p-2 rounded-full shadow-sm flex-shrink-0">{bin.icon}</div>
                                        <div className="text-start">
                                            <p className="font-black text-lg md:text-xl leading-none">{bin.name}</p>
                                        </div>
                                    </div>
                                ) : (
                                    <p>{t.unknownType}</p>
                                );
                            })()}
                        </div>
                        <Button onClick={reset} variant="primary" className="w-full mt-4 md:mt-6">
                            {t.scanAgain}
                        </Button>
                    </div>
                )}
            </div>
        )}
      </div>
    </div>
  );
};