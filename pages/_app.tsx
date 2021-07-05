import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import { CssBaseline, ThemeProvider } from '@material-ui/core';
import type { AppProps } from 'next/app';
import Head from 'next/head';
import { Provider } from 'react-redux';
import { UIDReset } from 'react-uid';
import { store } from '../app/store';
import useRemoveServerSideCSS from '../common/hooks/use-remove-server-side-css';
import DataChannelProvider from '../features/data-channel/components/data-channel.provider';
import '../styles/globals.css';
import theme from '../theme';

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
