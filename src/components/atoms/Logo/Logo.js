import React from 'react';
import styled from 'styled-components';
import { ReactSVG } from 'react-svg';
import logoIcon from 'assets/icons/logoicon.svg';

const StyledLogoWrappper = styled.div`
    z-index: 30;
    display: flex;
    align-items: center;
`;

const StyledLogoText = styled.h1`
    font-weight: ${({theme}) => theme.fontWeight.normal};
    font-size: 2.4rem;
    margin-left: 15px;
    letter-spacing: 1.5px;
    line-height: 1.2;
    span {
        font-weight: ${({theme}) => theme.fontWeight.bold};
        letter-spacing: 5px;
        line-height: .8;
    }
`;

const StyledSvg = styled(ReactSVG)`
  height: 35px;
  width: 30px;
`;

const Logo = () => (
  <StyledLogoWrappper>
    <StyledSvg src={logoIcon} />
    <StyledLogoText>
      expenses
      <br />
      <span>Planner</span>
    </StyledLogoText>
  </StyledLogoWrappper>
);

export default Logo;
