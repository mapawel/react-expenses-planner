import React from 'react';
import PropTypes from 'prop-types';
import { ThemeProvider } from 'styled-components';
import GlobalStyle from 'themes/GlobalStyle';
import mainTheme from 'themes/mainTheme';
import { withRouter } from 'react-router-dom';
import { routes } from 'routes';

const RootTemplate = ({ children, location: { pathname } }) => {
  let darkbody = false;
  if (routes.month.includes(pathname.split('/')[1]) || routes.day.includes(pathname.split('/')[1]) || routes.addnew.includes(pathname.split('/')[1])) darkbody = true;
  return (
    <ThemeProvider theme={{ ...mainTheme, darkbody }}>
      <>
        <GlobalStyle />
        {children}
      </>
    </ThemeProvider>
  );
};

RootTemplate.propTypes = {
  children: PropTypes.node.isRequired,
  location: PropTypes.shape({
    pathname: PropTypes.string.isRequired,
  }).isRequired,
};

export default withRouter(RootTemplate);
