import '../styles/globals.css';
import type { AppProps } from 'next/app';
import React from 'react';
import Head from 'next/head';
import theme from '../theme';
import { ThemeProvider, CssBaseline } from '@material-ui/core';
import useRemoveServerSideCSS from '../hooks/use-remove-server-side-css';
import PeerConnectionContext from '../contexts/peer-connection.context';
import usePeerToPeerConnection from '../hooks/use-peer-to-peer-connection';

import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

function App({ Component, pageProps }: AppProps) {
  useRemoveServerSideCSS();

  const connection = usePeerToPeerConnection();

  return (
    <>
      <Head>
        <title>Chat</title>
      </Head>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <PeerConnectionContext.Provider value={connection}>
          <Component {...pageProps} />
        </PeerConnectionContext.Provider>
      </ThemeProvider>
    </>
  );
}
export default App;
