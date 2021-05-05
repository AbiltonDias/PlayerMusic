import { PlayerReducerData, Music } from "./types";
import { Reducer } from "redux";

const INITIAL_STATE: PlayerReducerData ={
    musicList: [],
    currentMusicIndex: 0,
    isPlaying: false,
    isLooping: false,
    isShuffling: false,
    isPlayer: false,
    hasNext: false,
    hasPrevious: false,
}

const player: Reducer<PlayerReducerData> = () => {
    return INITIAL_STATE;
}

export default player;