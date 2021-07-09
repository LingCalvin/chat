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
import theme from '../common/constants/theme';
import useRemoveServerSideCSS from '../common/hooks/use-remove-server-side-css';
import DataChannelProvider from '../features/data-channel/components/data-channel.provider';
import PersistanceLoader from '../features/perisistance/components/peristance-loader';
import '../styles/globals.css';

function App({ Component, pageProps }: AppProps) {
  useRemoveServerSideCSS();

  return (
    <Provider store={store}>
      <PersistanceLoader />
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
