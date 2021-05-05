import Image from 'next/image';
import { useRef, useEffect, useState } from 'react';
import { IoClose } from "react-icons/io5";
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';
import { usePlayer } from "../../contexts/PlayerContext";
import styles from './styles.module.scss';
import { convertDurationToTimeString } from '../../utils/ConvertDurationToTimeString';
export function Player() {
    const audioRef = useRef<HTMLAudioElement>(null);
    const [progress, setProgress] = useState(0);
    const {
        musicList,
        currentMusicIndex,
        isPlaying,
        isLooping,
        isShuffling,
        isPlayer,
        tooglePlay,
        tooglePlayer,
        toogleLoop,
        toogleShuffle,
        setPlayingState,
        playNext,
        playPrevious,
        hasNext,
        hasPrevious,
        clearPlayerState,
    } = usePlayer();
    useEffect(() => {
        if (!audioRef.current) {
            return;
        }
        if (isPlaying) {
            audioRef.current.play();
        } else {
            audioRef.current.pause();
        }
    }, [isPlaying])
    function setupProgressListener() {
        audioRef.current.currentTime = 0;
        audioRef.current.addEventListener('timeupdate', () => {
            setProgress(Math.floor(audioRef.current.currentTime));
        });
    }
    function handleSeek(amount: number) {
        audioRef.current.currentTime = amount;
        setProgress(amount);
    }
    function handleMusicEnded() {
        if (hasNext) {
            playNext();
        } else {
            clearPlayerState();
        }
    }
    const music = musicList[currentMusicIndex];
    const ativo = isPlayer ? styles.active : '';
    return (
        <div className={`${styles.playerContainer}  ${ativo}`}>
            <IoClose className={styles.buttonPlayerClose} onClick={tooglePlayer} />
            <header>
                <img src="/playing.svg" alt="Tocando agora" />
                <strong>Tocando agora {music?.title.substr(0, 11)}</strong>
            </header>
            { music ? (
                <div className={styles.currentMusic}>
                    <Image
                        width={592}
                        height={592}
                        src={music.thumbnail}
                        objectFit="cover"
                    />
                    <strong>{music.title}</strong>
                    <span>{music.members}</span>
                </div>
            ) : (
                <div className={styles.emptyPlayer}>
                    <strong>Selecione uma música para ouvir</strong>
                </div>
            )}
            <footer className={!music ? styles.empty : ''}>
                <div className={styles.progress}>
                    <span>{convertDurationToTimeString(progress)}</span>
                    <div className={styles.slider} >
                        {music ? (
                            <Slider
                                max={music.duration}
                                value={progress}
                                onChange={handleSeek}
                                trackStyle={{ backgroundColor: '#04d361' }}
                                railStyle={{ backgroundColor: '#9f75ff' }}
                                handleStyle={{ borderColor: '#04d361', borderWidth: 4 }}
                            />
                        ) : (
                            <div className={styles.emptySlider} />
                        )}
                    </div>
                    <span>{convertDurationToTimeString(music?.duration ?? 0)}</span>
                </div>
                {music && (
                    <audio
                        src={music.url}
                        ref={audioRef}
                        loop={isLooping}
                        autoPlay
                        onEnded={handleMusicEnded}
                        onPlay={() => setPlayingState(true)}
                        onPause={() => setPlayingState(false)}
                        onLoadedMetadata={setupProgressListener}
                    />
                )}
                <div className={styles.buttons}>
                    <button
                        type="button"
                        disabled={!music || musicList.length == 1}
                        onClick={toogleShuffle}
                        className={isShuffling ? styles.isActive : ''}
                    >
                        <img src="/shuffle.svg" alt="Embaralhar" />
                    </button>
                    <button type="button" onClick={playPrevious} disabled={!music || !hasPrevious}>
                        <img src="/play-previous.svg" alt="Tocar anterior" />
                    </button>
                    <button
                        type="button"
                        className={styles.playButton}
                        disabled={!music}
                        onClick={tooglePlay}
                    >
                        {isPlaying
                            ? <img src="/pause.svg" alt="Pausar" />
                            : <img src="/play.svg" alt="Tocar" />}
                    </button>
                    <button type="button" onClick={playNext} disabled={!music || !hasNext}>
                        <img src="/play-next.svg" alt="Tocar próxima" />
                    </button>
                    <button
                        type="button"
                        disabled={!music}
                        onClick={toogleLoop}
                        className={isLooping ? styles.isActive : ''}
                    >
                        <img src="/repeat.svg" alt="Repetir" />
                    </button>
                </div>
            </footer>
        </div>
    );
}