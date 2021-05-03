import Link from 'next/link';
import format from 'date-fns/format';
import ptBr from 'date-fns/locale/pt-BR';
import { IoSunny, IoMoon } from "react-icons/io5";
import { useTheme } from '../../contexts/ThemeContext';

import styles from './styles.module.scss';

export function Header() {
    const currentDate = format(new Date(), 'EEEEEE, d MMMM', {
        locale: ptBr,
    })
    const { theme, toogleTheme } = useTheme();

    return (
        <header className={`
                    ${styles.headerContainer}
                    ${theme === "light" ?
                styles.light
                : styles.dark
            }`
        }>
            <Link href="/">
                <a>
                    <img src="/logo.svg" alt="Podcastr" />
                </a>
            </Link>
            <p>O melhor para você ouvir, sempre</p>
            <span>{currentDate}</span>
            <button className={styles.buttonTheme}
                onClick={toogleTheme}
            >
                {theme === "light" ? (
                    <IoSunny />
                ) : (
                    <IoMoon />
                )
                }

            </button>
        </header>
    )
}