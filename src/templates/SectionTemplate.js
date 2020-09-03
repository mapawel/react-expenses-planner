import React from 'react';
import PropTypes from 'prop-types';
import styled, { ThemeProvider, css } from 'styled-components';
import Header from 'components/atoms/Header/Header';
import PageWrapper from 'templates/PageWrapper/PageWrapper';

const StyledSection = styled.section`
    background-color: ${
  ({ theme }) => {
    const color = theme.nav ? theme.color.lightblue : 'none';
    return (theme.backtype === 'secondary' ? theme.color.darkblue : color);
  }};
`;

const StyledHeader = styled(Header)`
    width: 100%;
    margin: 0 0 55px;
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
  children, backtype, sectionname, nav, paymentview,
}) => (
  <ThemeProvider theme={{ backtype, nav, paymentview }}>
    <StyledSection>
      <PageWrapper>
        {sectionname && <StyledHeader>{sectionname}</StyledHeader>}
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
};

SectionTemplate.defaultProps = {
  backtype: null,
  sectionname: null,
  nav: 0,
  paymentview: 0,
};

export default SectionTemplate;
