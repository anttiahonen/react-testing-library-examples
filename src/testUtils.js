import React from 'react';
import { ThemeProvider } from '@material-ui/core/styles';
import { I18nextProvider } from 'react-i18next';

import theme from './theme';
import i18n from './i18n';

const TestApp = (elementToRender) => {
  return (
    <ThemeProvider theme={theme}>
      <I18nextProvider i18n={i18n}>
        { elementToRender }
      </I18nextProvider>
    </ThemeProvider>
  );
};

const t = (key) => {
  return i18n.t(key);
};

export { TestApp, t };
