import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { routes } from 'routes';

const StyledLink = styled(Link)`
  text-decoration: none;
`;

const StyledButton = styled.button`
    position: fixed;
    z-index: 9;
    width: 60px;
    height: 60px;
    border: none;
    border-radius: 50%;
    box-shadow: 5px 5px 22px -9px ${({ theme }) => (theme.backtype === 'secondary' ? theme.color.darkshadow : theme.color.lighthadow)};
    cursor: pointer;
    &::after{
        content: '+';
        position: absolute;
        top: 0;
        right: 0;
        width: 100%;
        height: 100%;
        border-radius: 50%;
        background-color: ${({ theme }) => theme.color.lightblue};
        color: ${({ theme }) => theme.color.darkblue};
        font-weight: ${({ theme }) => theme.fontWeight.normal};
        font-size: ${({ theme }) => theme.fontSize.xxxl};
        line-height: 60px;
        text-align: center;
    }
`;

const PlusButton = () => (
  <StyledLink to={routes.addnew}><StyledButton /></StyledLink>
);

export default PlusButton;
