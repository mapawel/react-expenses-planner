import React from 'react';
import PropTypes from 'prop-types';
import styled, { ThemeProvider, css } from 'styled-components';
import Header from 'components/atoms/Header/Header';
import PlusButton from 'components/atoms/PlusButton/PlusButton';
import PageWrapper from 'templates/PageWrapper/PageWrapper';

const StyledSection = styled.section`
    background-color: ${
  ({ theme }) => {
    const color = theme.nav ? theme.color.lightblue : 'none';
    return (theme.backtype === 'secondary' ? theme.color.darkblue : color);
  }};
`;

const StyledHeader = styled(Header)`
    position: relative;
    display: flex;
    justify-content: space-between;
    width: 100%;
    margin: 20px 0 55px;
`;

const StyledAddBox = styled.div`
  width: 60px;
  height: 60px;
`;

const StyledInnerWrapper = styled.div`
    width: 100%;
    display: flex;
    justify-content: center;

    @media (max-width: 780px) {
      flex-wrap: wrap;
    }

    ${({ theme }) => theme.paymentview && css`
      justify-content: flex-start;
      flex-wrap: wrap;
    `}
`;

const SectionTemplate = ({
  children, backtype, sectionname, nav, paymentview, addButton,
}) => (
  <ThemeProvider theme={{ backtype, nav, paymentview }}>
    <StyledSection>
      <PageWrapper>
        {sectionname && (
        <StyledHeader>
          {sectionname}
          {addButton
          && (
          <>
            <StyledAddBox>
              <PlusButton />
            </StyledAddBox>
          </>
          )}
        </StyledHeader>
        )}
        <StyledInnerWrapper>
          {children}
        </StyledInnerWrapper>
      </PageWrapper>
    </StyledSection>
  </ThemeProvider>
);

SectionTemplate.propTypes = {
  children: PropTypes.node.isRequired,
  backtype: PropTypes.string,
  sectionname: PropTypes.string,
  nav: PropTypes.oneOf([0, 1]),
  paymentview: PropTypes.oneOf([0, 1]),
  addButton: PropTypes.oneOf([0, 1]),
};

SectionTemplate.defaultProps = {
  backtype: null,
  sectionname: null,
  nav: null,
  paymentview: null,
  addButton: null,
};

export default SectionTemplate;
