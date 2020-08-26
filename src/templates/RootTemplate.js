import React from 'react';
import PropTypes from 'prop-types';
import { ThemeProvider } from 'styled-components';
import GlobalStyle from 'themes/GlobalStyle';
import mainTheme from 'themes/mainTheme';

const RootTemplate = ({ children }) => (
  <ThemeProvider theme={mainTheme}>
    <>
      <GlobalStyle />
      {children}
    </>
  </ThemeProvider>
);
export default RootTemplate;

RootTemplate.propTypes = {
  children: PropTypes.node.isRequired,
};
