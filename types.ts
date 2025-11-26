export type BinType = 'plastic' | 'paper' | 'glass' | 'organic' | 'general' | 'metal';

export type Language = 'fr' | 'en' | 'ar';

export interface WasteItem {
  id: string;
  name: string;
  emoji: string;
  type: BinType;
  description: string;
}

export interface BinInfo {
  type: BinType;
  name: string;
  color: string;
  bgColor: string;
  borderColor: string;
  icon: React.ReactNode;
  description: string;
  examples: string[];
}

export interface Badge {
  id: string;
  name: string;
  description: string;
  icon: string; // Emoji
  threshold: number; // Score needed to unlock
  color: string;
}

export type AppView = 'home' | 'learn' | 'game' | 'scanner' | 'parents';

export interface GameState {
  score: number;
  streak: number;
  currentRound: number;
  isGameOver: boolean;
  history: boolean[]; // true for correct, false for incorrect
}