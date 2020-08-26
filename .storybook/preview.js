import React from 'react';
import { addDecorator } from '@storybook/react';
import { ThemeProvider } from 'styled-components';
import GlobalStyle from 'themes/GlobalStyle';
import theme from 'themes/mainTheme.js';

export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
};

addDecorator(story => (
  <>
    <ThemeProvider theme={theme}>
    <GlobalStyle />
      {story()}
    </ThemeProvider>
  </>
));


