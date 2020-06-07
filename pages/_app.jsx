import React from 'react';
import { ThemeProvider } from 'styled-components';
import { theme } from '~/styles';

// eslint-disable-next-line import/no-mutable-exports, react/prop-types
const MyApp = ({ Component, pageProps }) => (
  <ThemeProvider theme={theme}>
    <Component {...pageProps} />
  </ThemeProvider>
);

export default MyApp;
