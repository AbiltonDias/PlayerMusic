import { ReactNode } from "react";

export interface Music{
    title: string;
    members: string;
    thumbnail: string;
    duration: number;
    url: string;
};
  
export interface PlayerReducerData{
    musicList: Music[];
    currentMusicIndex: number;
    isPlaying: boolean;
    isLooping: boolean;
    isShuffling: boolean;
    isPlayer: boolean;
    hasNext: boolean;
    hasPrevious: boolean;
}
  
export interface PlayerReducerProviderProps{
    children: ReactNode;
}