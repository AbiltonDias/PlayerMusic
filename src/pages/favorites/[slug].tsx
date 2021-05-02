import { format, parseISO } from 'date-fns';
import ptBR from 'date-fns/locale/pt-BR';
import { GetStaticPaths, GetStaticProps } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { api } from '../../services/api';
import { convertDurationToTimeString } from '../../utils/ConvertDurationToTimeString';
import styles from './favorite.module.scss';

type Music = {
    id: string;
    title: string;
    members: string;
    thumbnail: string;
    publisheAt: string;
    duration: number;
    durationAsString: string;
    description: string;
    url: string;
}

type MusicProps = {
    music: Music;
}

export default function Favorite({ music }: MusicProps) {

    return (
        <div className={styles.favorite}>
            <div className={styles.thumbnailContainer}>
                <Link href='/'>
                    <button type='button' >
                        <img src="/arrow-left.svg" alt="Voltar" />
                    </button>
                </Link>
                <Image
                    width={700}
                    height={160}
                    src={music.thumbnail}
                    objectFit='cover'
                />
                <button type='button'>
                    <img src="/play.svg" alt="Tocar Música" />
                </button>
            </div>
            <header>
                <h1>{music.title}</h1>
                <span>{music.members}</span>
                <span>{music.publisheAt}</span>
                <span>{music.durationAsString}</span>
            </header>

            <div className={styles.description} dangerouslySetInnerHTML={{ __html: music.description }} />
        </div>
    )
};

export const getStaticPaths: GetStaticPaths = async () => {
    const { data } = await api.get('musics', {
        params: {
            _limit: 2,
            _sort: 'published_at',
            _order: 'desc',
        }
    });

    const paths = data.map(music => {
        return {
            params: {
                slug: music.id
            }
        }
    });

    return {
        paths,
        fallback: 'blocking',
    }
}

export const getStaticProps: GetStaticProps = async (ctx) => {
    const { slug } = ctx.params;

    const { data } = await api.get(`/musics/${slug}`);

    const music = {
        id: data.id,
        title: data.title,
        thumbnail: data.thumbnail,
        members: data.members,
        publishedAt: format(parseISO(data.published_at), 'd MMM yy', { locale: ptBR }),
        duration: Number(data.file.duration),
        durationAsString: convertDurationToTimeString(Number(data.file.duration)),
        description: data.description,
        url: data.file.url,
    };


    return {
        props: {
            music
        },
        revalidate: 60 * 60 * 24, // 24hours
    }
}