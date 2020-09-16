import React from 'react';
import styled from 'styled-components';
import Header from 'components/atoms/Header/Header';
import { Link } from 'react-router-dom';
import { routes } from 'routes';

const StyledInfo = styled(Header)`
    text-align: center;

`;

const StyledWrapper = styled.div`
    min-height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
`;

const StyledLink = styled(Link)`
    text-decoration: none;
&>*{
    color: ${({ theme }) => theme.color.darkblue};
}
`;

const Page404 = () => (
  <>
    <StyledWrapper>
      <StyledInfo>
        Something went wrong... Please
      </StyledInfo>
      <StyledLink to={routes.home}>
        <StyledInfo>&nbsp;click here.</StyledInfo>
      </StyledLink>
    </StyledWrapper>
  </>
);
export default Page404;
