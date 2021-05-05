import { GetStaticProps } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import Head from 'next/head';
import { format, parseISO } from 'date-fns';
import ptBR from 'date-fns/locale/pt-BR';
import InfiniteScroll from 'react-infinite-scroll-component';

import { api } from '../services/api';
import { convertDurationToTimeString } from '../utils/ConvertDurationToTimeString';
import styles from './home.module.scss';
import { useContext } from 'react';
import { PlayerContext } from '../contexts/PlayerContext';
import { useTheme } from '../contexts/ThemeContext';
import { usePlayer, ButtonMediaPlayer } from '../contexts/PlayerContext';
import {Homepage} from './styles';

type Music = {
  id: string;
  title: string;
  members: string;
  thumbnail: string;
  publisheAt: string;
  duration: number;
  durationAsString: string;
  url: string;
}

type HomeProps = {
  latestMusics: Music[];
  allMusics: Music[];
}

export default function Home({ latestMusics, allMusics }: HomeProps) {
  const { play } = useContext(PlayerContext);
  const { playList, tooglePlayer, isPlayer } = usePlayer();
  const { theme } = useTheme();
  const musicList = [...latestMusics, ...allMusics];
  
  // Aplicando Redux não finalizado
  // const musics = useSelector(state => state);
  // const dispatch = useDispatch();
  // //const [musicList, setMusicList] = useState([]);
  // const [currentMusicIndex, setCurrentMusicIndex] = useState(0);
  // const [isPlaying, setIsPlaying] = useState(false);
  // const [isLooping, setIsLooping] = useState(false);
  // const [isShuffling, setIsShuffling] = useState(false);
  // const [isPlayer, setIsPlayer] = useState(false);

  // const play = useCallback((musicList:Music)=> {
  //   dispatch(play(musicList) => {
  //     setMusicList([music]);
  //     setCurrentMusicIndex(0);
  //     setIsPlaying(true);
  //   })
  // },[]);

  // const playList = useCallback((musicList: Music[], index: number) =>{
  //   dispatch
  // }, [])
  
  return (
    <div className={`
    ${styles.homepage}
    ${theme === "light" ?
        styles.light
        : styles.dark
      }`
    }>

      <Head>
        <title>Home | Musics</title>
      </Head>
      <section className={`
        ${styles.latestMusics}
        ${theme === "light" ?
          styles.light
          : styles.dark
        }`}>
        {ButtonMediaPlayer("buttonMedia", tooglePlayer, isPlayer)}

        <h2> Últimos lançamentos</h2>
        <ul>
          {latestMusics.map((music, index) => {
            return (
              
                <li key={music.id}>
                  <Image
                    width={192}
                    height={192}
                    src={music.thumbnail}
                    alt={music.title}
                    objectFit='cover'
                  />

                  <div className={styles.musicDetails}>
                    <Link href={`/favorites/${music.id}`} >
                      <a>{music.title}</a>
                    </Link>
                    <p>{music.members}</p>
                    <span>{music.publisheAt}</span>
                    <span>{music.durationAsString}</span>
                  </div>

                  <button type='button' onClick={() => playList(musicList, index)}>
                    <img src="/play-green.svg" alt="Tocar música" />
                  </button>

                </li>
              
            )
          })}
        </ul>
      </section>

      <section className={`
        ${styles.allMusics}
        ${theme === "light" ?
          styles.light
          : styles.dark
        }`}>

        <h2>Todos episódios</h2>
        <div className={styles.table}>
          <table cellSpacing={0}>
            <thead>
              <tr>
                <th></th>
                <th>Músicas</th>
                <th>Artistas</th>
                <th>Data</th>
                <th>Duração</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {allMusics.map((music, index) => {
                return (
                  <InfiniteScroll
                    dataLength={allMusics.length}
                    next={music[index]}
                    hasMore={true}
                    loader={music[index-1] ? <h4>Loading...</h4> : ''}
                  >
                  <tr key={music.id}>
                    <td style={{ width: 72 }}>
                      <Image
                        width={120}
                        height={120}
                        src={music.thumbnail}
                        alt={music.title}
                        objectFit="cover"
                      />
                    </td>
                    <td>
                      <Link href={`/favorites/${music.id}`}>
                        <a >{music.title}</a>
                      </Link>
                    </td>
                    <td>{music.members}</td>
                    <td style={{ width: 100 }}>{music.publisheAt}</td>
                    <td>{music.durationAsString}</td>
                    <td>
                      <button type='button' onClick={() => playList(musicList, index + latestMusics.length)}>
                        <img src="/play-green.svg" alt="Tocar música" />
                      </button>
                    </td>
                  </tr>
                 </InfiniteScroll>
                )
              })}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  )
}


export const getStaticProps: GetStaticProps = async () => {

  const { data } = await api.get("musics", {
    params: {
      _limit: 12,
      _sort: 'published_at',
      _order: 'desc'
    }
  });

  const musics = data.map(music => {
    return {
      id: music.id,
      title: music.title,
      thumbnail: music.thumbnail,
      members: music.members,
      publishedAt: format(parseISO(music.published_at), 'd MMM yy', { locale: ptBR }),
      duration: Number(music.file.duration),
      durationAsString: convertDurationToTimeString(Number(music.file.duration)),
      url: music.file.url,
    }
  })

  const latestMusics = musics.slice(0, 2);
  const allMusics = musics.slice(2, musics.length);

  return {
    props: {
      latestMusics,
      allMusics,
    },
    revalidate: 60 * 60 * 8,
  }
}



