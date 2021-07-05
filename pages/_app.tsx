import '../styles/globals.css';
import type { AppProps } from 'next/app';
import Head from 'next/head';
import theme from '../theme';
import { ThemeProvider, CssBaseline } from '@material-ui/core';
import useRemoveServerSideCSS from '../hooks/use-remove-server-side-css';
import { Provider } from 'react-redux';
import { store } from '../store';
import DataChannelProvider from '../components/data-channel.provider';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import { UIDReset } from 'react-uid';

function App({ Component, pageProps }: AppProps) {
  useRemoveServerSideCSS();

  return (
    <Provider store={store}>
      <DataChannelProvider>
        <Head>
          <title>Chat</title>
        </Head>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <UIDReset prefix="uid">
            <Component {...pageProps} />
          </UIDReset>
        </ThemeProvider>
      </DataChannelProvider>
    </Provider>
  );
}
export default App;
