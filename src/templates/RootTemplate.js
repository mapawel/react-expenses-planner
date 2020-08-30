import React from 'react';
import PropTypes from 'prop-types';
import { ThemeProvider } from 'styled-components';
import GlobalStyle from 'themes/GlobalStyle';
import mainTheme from 'themes/mainTheme';
import { withRouter } from 'react-router-dom';
import { routes } from 'routes'

const RootTemplate = ({ children, location: { pathname } }) => {
  const monthView = routes.month.includes(pathname.split('/')[1])
return(
  <ThemeProvider theme={{...mainTheme, monthView}}>
    <>
      <GlobalStyle />
      {children}
    </>
  </ThemeProvider>
)
};

RootTemplate.propTypes = {
  children: PropTypes.node.isRequired,
};

export default withRouter(RootTemplate);