import React, { useState, useEffect, useMemo, useCallback, useRef } from 'react';
import { getWasteItems, getBins, getBadges } from '../constants';
import { WasteItem, BinType, Language, Badge } from '../types';
import { Button } from './Button';
import { ArrowLeft, Star, Trophy, X, Lock } from 'lucide-react';
import confetti from 'canvas-confetti';
import { TRANSLATIONS } from '../translations';

interface GameSectionProps {
  onBack: () => void;
  lang: Language;
}

// Memoized Bin Button Component with Accessibility Improvements
const BinButton = React.memo(({ bin, onClick, labelText }: { bin: any, onClick: (type: BinType) => void, labelText: string }) => (
  <button
    onClick={() => onClick(bin.type)}
    aria-label={labelText}
    className={`
        flex flex-col items-center justify-center p-3 md:p-4 rounded-2xl 
        border-b-4 transition-transform duration-75 active:border-b-0 active:translate-y-1 touch-manipulation
        focus-visible:ring-4 focus-visible:ring-offset-2 focus-visible:ring-slate-300 focus-visible:outline-none
        ${bin.bgColor} ${bin.borderColor}
        hover:brightness-95
        w-[45%] sm:w-[30%] md:w-[18%] 
        min-h-[100px] md:min-h-[140px]
    `}
  >
    <div className="mb-1 md:mb-2 transform transition-transform group-hover:scale-110 scale-75 md:scale-100 pointer-events-none" aria-hidden="true">
        {bin.icon}
    </div>
    <span className={`font-bold text-xs md:text-sm text-center leading-tight ${bin.color} pointer-events-none`}>
        {bin.name}
    </span>
  </button>
));

export const GameSection: React.FC<GameSectionProps> = ({ onBack, lang }) => {
  const [currentItem, setCurrentItem] = useState<WasteItem | null>(null);
  const [score, setScore] = useState(0); 
  const [totalXp, setTotalXp] = useState(0); 
  const [streak, setStreak] = useState(0);
  const [feedback, setFeedback] = useState<'correct' | 'wrong' | null>(null);
  const [showBadges, setShowBadges] = useState(false);
  const [newBadgeUnlocked, setNewBadgeUnlocked] = useState<Badge | null>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  
  const allWasteItems = useMemo(() => getWasteItems(lang), [lang]);
  const bins = useMemo(() => getBins(lang), [lang]);
  const badges = useMemo(() => getBadges(lang), [lang]);
  const t = TRANSLATIONS[lang].game;

  const [itemsPool, setItemsPool] = useState<WasteItem[]>([]);

  // Persistent AudioContext ref
  const audioCtxRef = useRef<AudioContext | null>(null);

  // Initialize AudioContext once on user interaction
  const initAudio = () => {
    if (!audioCtxRef.current) {
        const AudioContext = window.AudioContext || (window as any).webkitAudioContext;
        if (AudioContext) {
            audioCtxRef.current = new AudioContext();
        }
    }
    // Resume if suspended (browser policy)
    if (audioCtxRef.current?.state === 'suspended') {
        audioCtxRef.current.resume();
    }
  };

  const playSound = useCallback((type: 'correct' | 'wrong') => {
    initAudio();
    const ctx = audioCtxRef.current;
    if (!ctx) return;

    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    
    osc.connect(gain);
    gain.connect(ctx.destination);
    
    const now = ctx.currentTime;

    if (type === 'correct') {
      osc.type = 'sine';
      osc.frequency.setValueAtTime(523.25, now); // C5
      osc.frequency.setValueAtTime(659.25, now + 0.1); // E5
      osc.frequency.setValueAtTime(783.99, now + 0.2); // G5
      
      gain.gain.setValueAtTime(0, now);
      gain.gain.linearRampToValueAtTime(0.3, now + 0.05);
      gain.gain.exponentialRampToValueAtTime(0.01, now + 0.4);
      
      osc.start(now);
      osc.stop(now + 0.5);
    } else {
      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(150, now);
      osc.frequency.linearRampToValueAtTime(100, now + 0.2);
      
      gain.gain.setValueAtTime(0.3, now);
      gain.gain.exponentialRampToValueAtTime(0.01, now + 0.3);
      
      osc.start(now);
      osc.stop(now + 0.3);
    }
  }, []);

  useEffect(() => {
    const savedXp = localStorage.getItem('ecoJunior_xp');
    if (savedXp) {
      setTotalXp(parseInt(savedXp, 10));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('ecoJunior_xp', totalXp.toString());
  }, [totalXp]);

  useEffect(() => {
    setItemsPool([...allWasteItems]);
  }, [allWasteItems]);

  useEffect(() => {
    if (!currentItem && itemsPool.length > 0) {
        pickNewItem(itemsPool);
    }
  }, [itemsPool]);

  // Handle language switch dynamically for current item name
  useEffect(() => {
    if (currentItem) {
        const updatedItem = allWasteItems.find(i => i.id === currentItem.id);
        if (updatedItem) setCurrentItem(updatedItem);
    }
  }, [allWasteItems]);

  useEffect(() => {
    if (showBadges && closeButtonRef.current) {
      setTimeout(() => closeButtonRef.current?.focus(), 100);
    }
  }, [showBadges]);

  const pickNewItem = (pool: WasteItem[]) => {
    let currentPool = pool;
    if (currentPool.length === 0) {
       currentPool = [...allWasteItems];
       setItemsPool(currentPool);
    }
    const randomIndex = Math.floor(Math.random() * currentPool.length);
    const newItem = currentPool[randomIndex];
    setCurrentItem(newItem);
  };

  const handleBinClick = useCallback((selectedBinType: BinType) => {
    if (!currentItem || feedback === 'correct') return;

    if (selectedBinType === currentItem.type) {
      // Correct
      playSound('correct');
      const points = 10 + (streak * 2);
      
      // Calculate new state first
      const newXp = totalXp + points;
      const newStreak = streak + 1;

      // Batch updates
      setScore(s => s + points);
      setTotalXp(newXp);
      setStreak(newStreak);
      setFeedback('correct');
      
      const justUnlocked = badges.find(b => newXp >= b.threshold && totalXp < b.threshold);
      
      // Defer heavy animation slightly to allow UI update
      requestAnimationFrame(() => {
          if (justUnlocked && justUnlocked.threshold > 0) {
             setNewBadgeUnlocked(justUnlocked);
             confetti({ particleCount: 150, spread: 100, origin: { y: 0.6 } });
          } else {
             confetti({ particleCount: 50, spread: 60, origin: { y: 0.6 }, disableForReducedMotion: true });
          }
      });

      const newPool = itemsPool.filter(i => i.id !== currentItem.id);
      setItemsPool(newPool.length > 0 ? newPool : [...allWasteItems]); 
      
      setTimeout(() => {
        setFeedback(null);
        pickNewItem(newPool.length > 0 ? newPool : [...allWasteItems]);
      }, 1500);
    } else {
      // Wrong
      playSound('wrong');
      setStreak(0);
      setFeedback('wrong');
      setTimeout(() => {
        setFeedback(null);
      }, 1200);
    }
  }, [currentItem, feedback, streak, totalXp, itemsPool, allWasteItems, badges, playSound]);

  return (
    <div className="flex flex-col items-center min-h-[calc(100vh-80px)] p-2 md:p-4 max-w-5xl mx-auto w-full">
      {/* Header */}
      <div 
        role="region" 
        aria-label="Game Statistics"
        className="w-full flex justify-between items-center bg-white p-2 md:p-4 rounded-3xl shadow-sm border border-slate-100 mb-4 md:mb-6"
      >
        <Button onClick={onBack} variant="secondary" size="sm" className="px-3 md:px-4 h-10 md:h-auto focus-visible:ring-4 focus-visible:ring-slate-300 focus-visible:outline-none">
          <ArrowLeft className={`w-4 h-4 ${lang === 'ar' ? 'rotate-180' : ''}`} /> 
          <span className="hidden md:inline ms-1">{t.back}</span>
        </Button>

        <div className="flex items-center gap-3 md:gap-8">
            <button 
                onClick={() => setShowBadges(true)}
                aria-label={t.badgesTitle}
                className="flex flex-col items-center group active:scale-95 transition-transform focus-visible:ring-4 focus-visible:ring-purple-200 focus-visible:outline-none rounded-xl"
            >
                <span className="hidden md:block text-xs font-bold text-slate-600 uppercase tracking-wider">{t.totalXp}</span>
                <div className="flex items-center gap-1 md:gap-2 bg-purple-50 px-2 py-1 md:px-3 rounded-xl border border-purple-100 group-hover:bg-purple-100 transition-colors">
                    <Trophy className="w-4 h-4 md:w-5 md:h-5 text-purple-500" aria-hidden="true" />
                    <span className="text-lg md:text-xl font-black text-purple-700">{totalXp}</span>
                </div>
            </button>

            <div className="flex flex-col items-center">
                <span className="hidden md:block text-xs font-bold text-slate-600 uppercase tracking-wider">{t.score}</span>
                <span className="text-xl md:text-2xl font-black text-slate-800">{score}</span>
            </div>
            
            <div className="flex flex-col items-center">
                <span className="hidden md:block text-xs font-bold text-slate-600 uppercase tracking-wider">{t.streak}</span>
                <div className="flex items-center gap-1">
                    <span className={`text-xl md:text-2xl font-black ${streak > 2 ? 'text-orange-500' : 'text-slate-800'}`}>{streak}</span>
                    <Star aria-hidden="true" className={`w-4 h-4 md:w-5 md:h-5 ${streak > 2 ? 'fill-orange-500 text-orange-500 animate-spin-slow' : 'text-slate-200'}`} />
                </div>
            </div>
        </div>
      </div>

      {/* Game Area */}
      <div className="flex-1 flex flex-col items-center justify-center w-full relative gap-4 md:gap-8">
        
        {/* The Waste Item */}
        <div 
          aria-live="polite"
          className={`
            relative z-10 bg-white rounded-3xl shadow-2xl p-6 md:p-12 flex flex-col items-center border-4 w-full max-w-[280px] md:max-w-sm mx-auto
            transition-all duration-300 will-change-transform
            ${feedback === 'correct' ? 'border-green-500 scale-105' : ''}
            ${feedback === 'wrong' ? 'border-red-400 animate-shake bg-red-50' : 'border-sky-100'}
        `}>
           {currentItem && (
             <>
                <div className="text-7xl md:text-9xl mb-2 md:mb-4 animate-bounce-slow filter drop-shadow-lg select-none" aria-hidden="true">
                  {currentItem.emoji}
                </div>
                <h3 className="text-xl md:text-3xl font-black text-slate-800 text-center leading-tight">{currentItem.name}</h3>
                <p className="text-xs md:text-base text-slate-600 font-medium text-center mt-1 md:mt-2">{currentItem.description}</p>
             </>
           )}
           
           {feedback === 'correct' && (
             <div role="alert" className="absolute inset-0 flex items-center justify-center bg-green-500/95 rounded-2xl z-20 backdrop-blur-sm">
               <div className="flex flex-col items-center animate-pop-in">
                  <div className="text-white text-3xl md:text-5xl font-black mb-2">{t.congrats}</div>
                  <div className="text-green-100 text-lg md:text-xl font-bold">+ {10 + (streak * 2) - 2} XP</div>
               </div>
             </div>
           )}
           
           {feedback === 'wrong' && (
             <div role="alert" className="absolute -bottom-4 left-0 right-0 flex justify-center z-20">
                <div className="bg-red-500 text-white px-6 py-2 rounded-full font-bold shadow-lg animate-bounce border-2 border-white text-sm md:text-base">
                  {t.oops}
                </div>
             </div>
           )}
        </div>

        {/* The Bins */}
        <div role="group" aria-label="Waste Bins" className="w-full flex flex-wrap justify-center gap-2 md:gap-4 pb-4">
            {bins.map((bin) => (
                <BinButton 
                  key={bin.type} 
                  bin={bin} 
                  onClick={handleBinClick} 
                  labelText={`${t.sortInto} ${bin.name}`}
                />
            ))}
        </div>
      </div>

      {/* Badges Modal */}
      {showBadges && (
        <div 
          role="dialog"
          aria-modal="true"
          aria-labelledby="modal-title"
          className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4 backdrop-blur-sm animate-fade-in-up"
        >
            <div className="bg-white rounded-3xl shadow-2xl max-w-lg w-full max-h-[85vh] flex flex-col">
                <div className="p-4 md:p-6 border-b border-slate-100 flex justify-between items-center bg-sky-50 rounded-t-3xl">
                    <h2 id="modal-title" className="text-xl md:text-2xl font-black text-slate-700 flex items-center gap-2">
                        <Trophy className="text-yellow-500 fill-yellow-500 w-6 h-6" aria-hidden="true" />
                        {t.badgesTitle}
                    </h2>
                    <button 
                      ref={closeButtonRef}
                      onClick={() => setShowBadges(false)} 
                      aria-label={t.close}
                      className="p-2 hover:bg-white rounded-full transition-colors focus-visible:ring-4 focus-visible:ring-slate-300 focus-visible:outline-none"
                    >
                        <X className="w-6 h-6 text-slate-400" />
                    </button>
                </div>
                <div className="p-4 md:p-6 overflow-y-auto" tabIndex={0}>
                    <div className="space-y-3 md:space-y-4">
                        {badges.map((badge) => {
                            const isUnlocked = totalXp >= badge.threshold;
                            return (
                                <div key={badge.id} className={`flex items-center gap-3 md:gap-4 p-3 md:p-4 rounded-2xl border-2 transition-all ${isUnlocked ? 'border-sky-100 bg-white' : 'border-slate-100 bg-slate-50 opacity-70'}`}>
                                    <div className={`w-12 h-12 md:w-16 md:h-16 rounded-full flex items-center justify-center text-2xl md:text-3xl shadow-sm flex-shrink-0 ${isUnlocked ? badge.color : 'bg-slate-200 grayscale'}`} aria-hidden="true">
                                        {isUnlocked ? badge.icon : <Lock className="w-5 h-5 md:w-6 md:h-6 text-slate-400" />}
                                    </div>
                                    <div className="flex-1">
                                        <div className="flex justify-between items-start">
                                            <h3 className={`font-bold text-base md:text-lg ${isUnlocked ? 'text-slate-800' : 'text-slate-500'}`}>{badge.name}</h3>
                                            {isUnlocked && <span className="text-[10px] font-bold bg-green-100 text-green-600 px-2 py-0.5 rounded-full" aria-label="Unlocked">✓</span>}
                                        </div>
                                        <p className="text-xs md:text-sm text-slate-500 leading-snug">{badge.description}</p>
                                        {!isUnlocked && (
                                            <div className="mt-1 md:mt-2 text-[10px] md:text-xs font-bold text-sky-500 bg-sky-50 inline-block px-2 py-1 rounded-md">
                                                {badge.threshold - totalXp} XP left
                                            </div>
                                        )}
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
                <div className="p-3 md:p-4 bg-slate-50 text-center text-slate-400 text-xs md:text-sm font-medium border-t border-slate-100 rounded-b-3xl">
                    {t.keepPlaying}
                </div>
            </div>
        </div>
      )}

      {/* New Badge Unlock Popup */}
      {newBadgeUnlocked && (
        <div role="alert" aria-live="assertive" className="fixed inset-0 z-[60] flex items-center justify-center p-4 pointer-events-none">
            <div className="bg-white rounded-3xl p-6 md:p-8 shadow-2xl border-4 border-yellow-400 animate-bounce-slow pointer-events-auto flex flex-col items-center text-center max-w-xs md:max-w-sm mx-4">
                <div className="text-5xl md:text-6xl mb-4 animate-spin-slow" aria-hidden="true">
                    {newBadgeUnlocked.icon}
                </div>
                <h2 className="text-2xl md:text-3xl font-black text-yellow-500 mb-2">{t.newBadge}</h2>
                <h3 className="text-xl md:text-2xl font-bold text-slate-800 mb-2">{newBadgeUnlocked.name}</h3>
                <p className="text-sm md:text-base text-slate-500 mb-6">{newBadgeUnlocked.description}</p>
                <Button onClick={() => setNewBadgeUnlocked(null)} variant="primary" className="w-full focus-visible:ring-4 focus-visible:ring-green-300">
                    {t.awesome}
                </Button>
            </div>
        </div>
      )}
    </div>
  );
};