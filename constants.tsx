import React from 'react';
import { BinInfo, WasteItem, Language, Badge } from './types';
import { Leaf, FileText, Wine, Recycle, Trash2, Magnet } from 'lucide-react';
import { TRANSLATIONS } from './translations';

export const getBins = (lang: Language): BinInfo[] => {
  const t = TRANSLATIONS[lang].bins;
  
  return [
    {
      type: 'organic',
      name: t.organic.name,
      color: 'text-green-600',
      bgColor: 'bg-green-100',
      borderColor: 'border-green-500',
      icon: <Leaf className="w-8 h-8 text-green-600" />,
      description: t.organic.desc,
      examples: t.organic.examples
    },
    {
      type: 'paper',
      name: t.paper.name,
      color: 'text-blue-600',
      bgColor: 'bg-blue-100',
      borderColor: 'border-blue-500',
      icon: <FileText className="w-8 h-8 text-blue-600" />,
      description: t.paper.desc,
      examples: t.paper.examples
    },
    {
      type: 'plastic',
      name: t.plastic.name,
      color: 'text-yellow-600',
      bgColor: 'bg-yellow-100',
      borderColor: 'border-yellow-500',
      icon: <Recycle className="w-8 h-8 text-yellow-600" />,
      description: t.plastic.desc,
      examples: t.plastic.examples
    },
    {
      type: 'glass',
      name: t.glass.name,
      color: 'text-emerald-600',
      bgColor: 'bg-emerald-100',
      borderColor: 'border-emerald-500',
      icon: <Wine className="w-8 h-8 text-emerald-600" />,
      description: t.glass.desc,
      examples: t.glass.examples
    },
    {
      type: 'metal',
      name: t.metal.name,
      color: 'text-red-600',
      bgColor: 'bg-red-100',
      borderColor: 'border-red-500',
      icon: <Magnet className="w-8 h-8 text-red-600" />,
      description: t.metal.desc,
      examples: t.metal.examples
    },
    {
      type: 'general',
      name: t.general.name,
      color: 'text-gray-600',
      bgColor: 'bg-gray-100',
      borderColor: 'border-gray-500',
      icon: <Trash2 className="w-8 h-8 text-gray-600" />,
      description: t.general.desc,
      examples: t.general.examples
    }
  ];
};

export const getBadges = (lang: Language): Badge[] => {
  const t = TRANSLATIONS[lang].badges;
  return [
    { id: '1', threshold: 0, name: t[0].name, description: t[0].desc, icon: '🌱', color: 'bg-slate-200 text-slate-600' },
    { id: '2', threshold: 100, name: t[1].name, description: t[1].desc, icon: '⭐', color: 'bg-blue-100 text-blue-600' },
    { id: '3', threshold: 300, name: t[2].name, description: t[2].desc, icon: '🛡️', color: 'bg-green-100 text-green-600' },
    { id: '4', threshold: 600, name: t[3].name, description: t[3].desc, icon: '🎓', color: 'bg-purple-100 text-purple-600' },
    { id: '5', threshold: 1000, name: t[4].name, description: t[4].desc, icon: '👑', color: 'bg-yellow-100 text-yellow-600' },
  ];
};

export const getWasteItems = (lang: Language): WasteItem[] => {
  const t = TRANSLATIONS[lang].waste;
  
  // Define base items with emojis and types
  const rawItems = [
    // Original Items
    { id: '1', emoji: '🍎', type: 'organic' as const },
    { id: '2', emoji: '📰', type: 'paper' as const },
    { id: '3', emoji: '🥤', type: 'plastic' as const },
    { id: '4', emoji: '🍌', type: 'organic' as const },
    { id: '5', emoji: '📦', type: 'paper' as const },
    { id: '6', emoji: '🫙', type: 'glass' as const },
    { id: '7', emoji: '🍖', type: 'organic' as const },
    { id: '8', emoji: '🥫', type: 'metal' as const }, // Tin Can -> Metal
    { id: '9', emoji: '🛍️', type: 'general' as const },
    { id: '10', emoji: '🥀', type: 'organic' as const }, // Wilted flower
    { id: '11', emoji: '📓', type: 'paper' as const },
    { id: '12', emoji: '🍾', type: 'glass' as const },
    // New Items
    { id: '13', emoji: '🥚', type: 'organic' as const },
    { id: '14', emoji: '🍵', type: 'organic' as const },
    { id: '15', emoji: '✉️', type: 'paper' as const },
    { id: '16', emoji: '🧻', type: 'paper' as const },
    { id: '17', emoji: '🥡', type: 'general' as const }, // Crisp packet wrapper
    { id: '18', emoji: '🪥', type: 'general' as const },
    { id: '19', emoji: '🥣', type: 'plastic' as const }, // Yogurt pot
    { id: '20', emoji: '🧴', type: 'glass' as const }, // Perfume
    { id: '21', emoji: '🥤', type: 'plastic' as const }, // Straw 
    { id: '22', emoji: '📖', type: 'paper' as const },
    { id: '23', emoji: '🐟', type: 'organic' as const },
    { id: '24', emoji: '🍷', type: 'glass' as const }, // Broken glass
    { id: '25', emoji: '🖊️', type: 'general' as const },
    { id: '26', emoji: '🍕', type: 'paper' as const }, // Pizza box
    { id: '27', emoji: '🥫', type: 'metal' as const }, // Soda Can -> Metal
    { id: '28', emoji: '🧼', type: 'plastic' as const }, // Detergent
    { id: '29', emoji: '🤧', type: 'general' as const }, // Tissue
    { id: '30', emoji: '👂', type: 'general' as const }, // Cotton bud
  ];

  return rawItems.map((item, index) => ({
    ...item,
    name: t[index]?.name || "Unknown",
    description: t[index]?.desc || "..."
  }));
};