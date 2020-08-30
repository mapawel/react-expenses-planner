import React from 'react';
import PropTypes from 'prop-types';
import { ReactSVG } from 'react-svg';
import styled, { css } from 'styled-components';

const BaseButton = styled.button`
    position: relative;
    min-width: ${({ icon }) => (icon ? '190px' : '160px')};
    height: 44px;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 10px 15px;
    background-color: ${({ theme }) => theme.color.lightblue};
    color: ${({ theme }) => theme.color.darkblue};
    text-transform: uppercase;
    white-space: nowrap;
    border: none;
    border-radius: 10px;
    box-shadow: 3px 3px 15px -2px ${({ theme }) => (theme.backtype === 'secondary' ? theme.color.darkshadow : theme.color.lighthadow)};
    cursor: pointer;

    ${({ round }) => round && css`
    min-width: 50px;
    width: 50px;
    height: 50px;
    border-radius: 50%;
    padding: 0;
    `}
`;

const StyledSvg = styled(ReactSVG)`
    display: inline-block;
    width: 50%;
    display: ${({ resetmargin }) => (resetmargin ? 'flex' : 'block')};
    justify-content: center;
    margin-right: ${({ resetmargin }) => (resetmargin ? '0' : '10px')};
    color: ${({ theme }) => theme.color.darkblue};

    ${({ round }) => round && css`
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
  children: PropTypes.string,
  icon: PropTypes.string,
  className: PropTypes.string,
  round: PropTypes.oneOf([0, 1]),
  resetmargin: PropTypes.oneOf([0, 1]),
};

Button.defaultProps = {
  children: null,
  icon: null,
  round: null,
  resetmargin: null,
};

export default Button;
