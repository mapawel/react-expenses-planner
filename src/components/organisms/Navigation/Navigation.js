/* eslint-disable react/prefer-stateless-function */
import React from 'react';
import { NavLink, withRouter } from 'react-router-dom';
import styled from 'styled-components';
import Logo from 'components/atoms/Logo/Logo';
import BurgerButton from 'components/atoms/BurgerButton/BurgerButton';
import { ReactSVG } from 'react-svg';
import homeIcon from 'assets/icons/home.svg';
import calendarIcon from 'assets/icons/calendar.svg';
import chartIcon from 'assets/icons/chart.svg';
import leftTrimIcon from 'assets/icons/lefttrim.svg';
import rightTrimIcon from 'assets/icons/righttrim.svg';

const StyledMenuWrapper = styled.div`
    position: relative;
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    padding-top: 4px;
`;
const StyledUlList = styled.ul`
    position: fixed;
    z-index: 20;
    height: 100vh;
    width: 100vw;
    top: 0;
    left: 0;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background-color: ${({ theme }) => theme.backtype === 'secondary' ? theme.color.darkblue : theme.color.lightblue};
    transition: transform .2s;
    transform: translateY(${({ isMenuOpen }) => (isMenuOpen ? '0' : '-100vh')});
   
    @media (min-width: 992px) {
    position: relative;
    width: auto;
    height: auto;
    transform: translateY(0);
    flex-direction: row;
    flex-wrap: nowrap;
    align-self: flex-end;
  }

`;
const StyledBox = styled.div`
    @media (min-width: 992px) {
      display: flex;
      flex-direction: row;
      flex-wrap: nowrap;
  }
`;

const StyledLi = styled.li`
  list-style: none;
`;

const StyledNavLink = styled(NavLink)`
  display: flex;
  align-items: center;
  text-decoration: none;
  font-size: ${({ theme }) => theme.fontSize.xl};
  font-weight: ${({ theme }) => theme.fontWeight.normal};
  color: ${({ theme }) => theme.backtype === 'secondary' ? theme.color.white : theme.color.darkblue};

  & div {
    .navBckTrimLeft, .navBckTrimRight{
          display: none;
          position: absolute;
          bottom: -39px;
      }
  }

  @media (min-width: 992px) {
    & div{
      position: relative;
      width: 88px;
      height: 60px;
      border-radius: 42px 42px 0 0;
      .navIconElement>div{
        width: 30px;
        margin: auto;
      }
    }

    &.active>div{
      background-color: ${({ theme }) => theme.backtype === 'secondary' ? theme.color.white : theme.color.darkblue};
      .navIconElement{
        color: ${({ theme }) => theme.backtype === 'secondary' ? theme.color.darkblue : theme.color.white};
      }
      .navBckTrimLeft, .navBckTrimRight{
        display: block;
        color: ${({ theme }) => theme.backtype === 'secondary' ? theme.color.white : theme.color.darkblue};
      }
      .navBckTrimLeft{
        left: -23px;
      }
      .navBckTrimRight{
        right: -86px;
      }
    }
  }
`;

const StyledSvg = styled(ReactSVG)`
  color: ${({ theme }) => theme.backtype === 'secondary' ? theme.color.white : theme.color.darkblue};
  width: 60px;
  padding: 15px;
`;

const StyledBurgerButton = styled(BurgerButton)`
  @media (min-width: 992px) {
    display: none;
  }
`;

const StyledTxt = styled.p`
  @media (min-width: 992px) {
    display: none;
  }
`;

class Navigation extends React.Component {
  state = {
    isMenuOpen: false,
  }

  componentDidMount(){
    document.body.style.overflowY = 'auto';
  }

  handleMenuOpen = () => {
    this.setState((prevState) => ({
      isMenuOpen: !prevState.isMenuOpen,
    }));
    if (document.body.style.overflowY === 'hidden') {
      document.body.style.overflowY = 'auto';
    } else {
      document.body.style.overflowY = 'hidden';
    }
  }

  render() {
    const { isMenuOpen } = this.state;

    return (
      <StyledMenuWrapper>
        <Logo />
        <StyledUlList isMenuOpen={isMenuOpen}>
          <StyledBox>
            <StyledLi>
              <StyledNavLink
                to="/dashboard"
                activeClassName="active"
              >
                <div>
                  <ReactSVG className="navBckTrimLeft" src={leftTrimIcon} />
                  <StyledSvg className="navIconElement" src={homeIcon} />
                  <ReactSVG className="navBckTrimRight" src={rightTrimIcon} />
                </div>
                <StyledTxt>home</StyledTxt>
              </StyledNavLink>
            </StyledLi>
            <StyledLi>
              <StyledNavLink
                to="/calendar"
                activeClassName="active"
              >
                <div>
                  <ReactSVG className="navBckTrimLeft" src={leftTrimIcon} />
                  <StyledSvg className="navIconElement" src={calendarIcon} />
                  <ReactSVG className="navBckTrimRight" src={rightTrimIcon} />
                </div>
                <StyledTxt>calendar</StyledTxt>
              </StyledNavLink>
            </StyledLi>
            <StyledLi>
              <StyledNavLink
                to="/test3"
                activeClassName="active"
              >
                <div>
                  <ReactSVG className="navBckTrimLeft" src={leftTrimIcon} />
                  <StyledSvg className="navIconElement" src={chartIcon} />
                  <ReactSVG className="navBckTrimRight" src={rightTrimIcon} />
                </div>
                <StyledTxt>charts</StyledTxt>
              </StyledNavLink>
            </StyledLi>
          </StyledBox>
        </StyledUlList>
        <StyledBurgerButton onClick={this.handleMenuOpen} isMenuOpen={isMenuOpen} />
      </StyledMenuWrapper>
    );
  }
}
export default withRouter(Navigation);
