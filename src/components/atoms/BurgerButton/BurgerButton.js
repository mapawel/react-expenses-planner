import React from 'react';
import styled from 'styled-components';
import { keyframes, css } from 'styled-components';

const upperLineAnim = keyframes`
  from {
    transform: translate(-50%, -7px) rotate(0);
  }

  to {
    transform: translate(-50%, 0) rotate(135deg);
  }
`;
const lowerLineAnim = keyframes`
  from {
    transform: translate(-50%, -7px) rotate(0);
  }

  to {
    transform: translate(-50%, 0) rotate(225deg);
  }
`;

const StyledBurgerButton = styled.button`
    position: relative;
    z-index: 30;
    width: 70px;
    height: 48px;
    background: none;
    border: none;
    cursor: pointer;
    ::after, ::before {
        position: absolute;
        content: '';
        height: 2px;
        width: 60%;
        left: 50%;
        top: 50%;
        background-color: ${({ theme }) => theme.color.white}
    }
    ::after{
        transform: translate(-50%, 7px);
        ${({ isMenuOpen }) => isMenuOpen && css`
        animation: ${lowerLineAnim} .2s forwards;
        `
        }
    }
    ::before{
        transform: translate(-50%, -7px);
        ${({ isMenuOpen }) => isMenuOpen && css`
        animation: ${upperLineAnim} .2s forwards;
        `
        }
    }
`;

const BurgerButton = ({ className, onClick, isMenuOpen }) => (
    <StyledBurgerButton
    onClick={onClick}
    isMenuOpen={isMenuOpen}
    className={className}
    />
);

export default BurgerButton;
