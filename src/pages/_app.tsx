import '../styles/global.scss';
//import { Provider } from 'react-redux';
//import store from '../store';

import { Header } from '../Components/Header';
import { Player } from '../Components/Player';

import styles from '../styles/app.module.scss';
import { ThemeContextProvider } from '../contexts/ThemeContext';
import { PlayerContextProvider } from '../contexts/PlayerContext';

function MyApp({ Component, pageProps }) {

  return (
    // <Provider store={store}>
    <ThemeContextProvider>
      <PlayerContextProvider>
        <div className={styles.wrapper}>
          <main>
            <Header />
            <Component {...pageProps} />
          </main>
          <Player />
        </div>
      </PlayerContextProvider>
    </ThemeContextProvider>
    // </Provider>
  )
}

export default MyApp
