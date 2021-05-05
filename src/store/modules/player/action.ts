import { Music } from "./types"

export function tooglePlay (){
    return{
        type: 'TOOGLE_PLAY',
        payload: {}
    }
}

export function tooglePlayer (){
    return{
        type: 'TOOGLE_PLAYER',
        payload: {}
    }
};

export function toogleLoop (){
    return{
        type: 'TOOGLE_LOOP',
        payload: {}
    }
};

export function toogleShuffle (){
    return{
        type: 'TOOGLE_SHUFFLE',
        payload: {}
    }
};

export function playNext (){
    return{
        type: 'PLAY_NEXT',
        payload: {}
    }
};

export function playPrevious (){
    return{
        type: 'PLAY_PREVIOUS',
        payload: {}
    }
};

export function clearPlayerState(){
    return{
        type: 'CLEAR_PLAYER_STATE',
        payload: {}
    }
};

export function playList(list: Music[], index: number){
    return{
        type: 'PLAY_LIST',
        payload: {
            list,
            index
        }
    }
};

export function play(music: Music){
    return{
        type: 'PLAY',
        payload: {
            music,
        }
    }
};

export function setPlayingState(state: boolean){
    return{
        type: 'SET_PLAYING_STATE',
        payload: {
            state,
        }
    }
};
