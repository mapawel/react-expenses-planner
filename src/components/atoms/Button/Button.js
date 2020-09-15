/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import PropTypes from 'prop-types';
import { ReactSVG } from 'react-svg';
import styled, { css } from 'styled-components';

const BaseButton = styled.button`
    position: relative;
    min-width: 160px;
    height: 44px;
    display: flex;
    column-gap: 10px;
    align-items: center;
    padding: 10px 15px;
    background-color: ${({ theme }) => theme.color.lightblue};
    color: ${({ theme }) => theme.color.darkblue};
    text-transform: uppercase;
    white-space: nowrap;
    border: none;
    border-radius: 10px;
    box-shadow: 3px 3px 15px -2px ${({ theme }) => (theme.backtype === 'secondary' ? theme.color.darkshadow : theme.color.lighthadow)};
    cursor: pointer;
    transition: transform .2s;

    &:hover{
      transform: translate(-2px, -2px);
    }

    ${({ icon, round }) => ((icon && !round) ? css`
    display: grid;
    grid-template-rows: 24px;
    grid-template-columns: 25px auto;
    margin: 0;
    ` : null)}

    ${({ icon, round }) => ((!icon && !round) ? css`
    justify-content: center;
    ` : null)}

    ${({ round }) => round && css`
    justify-content: center;
    min-width: 50px;
    width: 50px;
    height: 50px;
    border-radius: 50%;
    padding: 0;
    `}
`;

const StyledSvg = styled(ReactSVG)`
    width: ${({ round }) => (round ? '50%' : '70%')};
    display: ${({ resetmargin }) => (resetmargin ? 'flex' : 'block')};
    justify-content: center;
    margin-right: ${({ resetmargin }) => (resetmargin ? '0' : '10px')};

    ${({ resetmargin }) => resetmargin && css`
    color: ${({ theme }) => (theme.backtype === 'secondary' ? theme.color.white : theme.color.darkgrey)};
    `}

    ${({ round }) => round && css`
    color: ${({ theme }) => theme.color.darkblue};
    margin-right: 0;
    margin-top: 2px;
    `}
`;

const Button = ({
  className, children, round, icon, resetmargin, ...props
}) => (
  <BaseButton className={className} icon={icon} round={round} {...props}>
    {icon ? (
      <>
        <StyledSvg resetmargin={resetmargin} src={icon} round={round} />
        {children}
      </>
    ) : children}
  </BaseButton>
);

Button.propTypes = {
  children: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
  icon: PropTypes.string,
  className: PropTypes.string,
  round: PropTypes.oneOf([0, 1]),
  resetmargin: PropTypes.oneOf([0, 1]),
};

Button.defaultProps = {
  children: null,
  icon: null,
  round: 0,
  resetmargin: 0,
  className: null,
};

export default Button;
