import { useState, createContext, ReactNode, useContext } from 'react';
import { IoMusicalNotes } from "react-icons/io5";

type Music = {
  title: string;
  members: string;
  thumbnail: string;
  duration: number;
  url: string;
};

type PlayerContextData = {
  musicList: Music[];
  currentMusicIndex: number;
  isPlaying: boolean;
  play: (music: Music) => void;
  togglePlay: () => void;
  setPlayingState: (state: boolean) => void;
  isLooping: boolean;
  isShuffling: boolean;
  isPlayer: boolean;
  playList: (list: Music[], index: number) => void;
  tooglePlay: () => void;
  tooglePlayer: () => void;
  toogleLoop: () => void;
  toogleShuffle: () => void;
  playNext: () => void;
  playPrevious: () => void;
  clearPlayerState: () => void;
  hasNext: boolean;
  hasPrevious: boolean;

}

type PlayerContextProviderProps = {
  children: ReactNode;
}

export const PlayerContext = createContext({} as PlayerContextData);

export function PlayerContextProvider({ children }: PlayerContextProviderProps) {
  const [musicList, setMusicList] = useState([]);
  const [currentMusicIndex, setCurrentMusicIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLooping, setIsLooping] = useState(false);
  const [isShuffling, setIsShuffling] = useState(false);
  const [isPlayer, setIsPlayer] = useState(false);

  function play(music: Music) {
    setMusicList([music]);
    setCurrentMusicIndex(0);
    setIsPlaying(true);
  }

  function playList(list: Music[], index: number) {
    setMusicList(list);
    setCurrentMusicIndex(index);
    setIsPlaying(true);
  }

  function tooglePlay() {
    setIsPlaying(!isPlaying);
  }

  function toogleLoop() {
    setIsLooping(!isLooping);
  }
  function toogleShuffle() {
    setIsShuffling(!isShuffling);
  }

  function setPlayingState(state: boolean) {
    setIsPlaying(state);
  }

  function tooglePlayer() {
    setIsPlayer(!isPlayer)
  }

  function clearPlayerState() {
    setMusicList([]);
    setCurrentMusicIndex(0);
  }

  const hasPrevious = currentMusicIndex > 0;
  const hasNext = isShuffling || (currentMusicIndex + 1) < musicList.length;

  function playNext() {
    if (isShuffling) {
      const nextRandomMusicIndex = Math.floor(Math.random() * musicList.length);

      setCurrentMusicIndex(nextRandomMusicIndex);
    } else if (hasNext) {
      setCurrentMusicIndex(currentMusicIndex + 1);
    }
  }

  function playPrevious() {
    if (hasPrevious) {
      setCurrentMusicIndex(currentMusicIndex - 1);
    }
  }

  return (
    <PlayerContext.Provider 
        value= {
        {
    musicList,
      currentMusicIndex,
      play,
      playNext,
      playPrevious,
      playList,
      isPlaying,
      isLooping,
      isShuffling,
      isPlayer,
      tooglePlay,
      toogleLoop,
      toogleShuffle,
      setPlayingState,
      hasNext,
      hasPrevious,
      clearPlayerState,
      tooglePlayer,
        }
}>
  { children }
  < /PlayerContext.Provider>
    );
}

export const usePlayer = () => {
  return useContext(PlayerContext);
}

export const ButtonMediaPlayer = (classe: string, tgPlayer: () => void, statePlayer: boolean) => {
  return (
    <button className= { classe } onClick = { tgPlayer } > Mostrar Player < IoMusicalNotes /> </button>
  )
}



