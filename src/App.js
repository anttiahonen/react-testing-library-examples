import React from 'react';
import { Container } from '@material-ui/core';
import { ThemeProvider } from '@material-ui/core/styles';

import Foods from './foods/Foods'
import theme from './theme';

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <Container maxWidth='lg'>
        <Foods />
      </Container>
    </ThemeProvider>
  );
};

export default App;
