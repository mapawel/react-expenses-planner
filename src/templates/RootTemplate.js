import React from 'react';
import PropTypes from 'prop-types';
import styled, { ThemeProvider } from 'styled-components';
import GlobalStyle from 'themes/GlobalStyle';
import mainTheme from 'themes/mainTheme';
import { withRouter } from 'react-router-dom';
import { routes } from 'routes';

const StyledMainWrapper = styled.div`
  min-height: calc(100vh - 50px);
`;
const StyledLink = styled.a`
  color: ${({ theme }) => theme.color.white};
`;
const StyledFooter = styled.div`
  padding-top: 10px;
  min-height: 40px;
  line-height: 40px;
  text-align: center;
  background-color: ${({ theme }) => theme.color.darkblue};
  box-shadow: 0 5px 15px -3px ${({ theme }) => theme.color.darkshadow};
  color: ${({ theme }) => theme.color.white};
`;

const RootTemplate = ({ children, location: { pathname } }) => {
  let darkbody = false;
  if (routes.month.includes(pathname.split('/')[1]) || routes.day.includes(pathname.split('/')[1]) || routes.addnew.includes(pathname.split('/')[1])) darkbody = true;
  return (
    <ThemeProvider theme={{ ...mainTheme, darkbody }}>
      <>
        <GlobalStyle />
        <StyledMainWrapper>
          {children}
        </StyledMainWrapper>
        <StyledFooter>
          &copy;
          {' '}
          <StyledLink href="https://github.com/mapawel">mapawel</StyledLink>
          , All rights reserved
        </StyledFooter>
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
