import React from 'react';
import styled, { ThemeProvider } from 'styled-components';
import Header from 'components/atoms/Header/Header';
import PageWrapper from 'components/atoms/PageWrapper/PageWrapper';

const StyledSection = styled.section`
    background-color: ${({ theme }) => (theme.backtype === 'secondary' ? theme.color.darkblue : 'none')};
`;

const StyledHeader = styled(Header)`
    width: 100%;
    margin: 0 0 55px;
`;

const StyledInnerWrapper = styled(Header)`
    width: 100%;
    display: flex;
    justify-content: center;

    @media (max-width: 780px) {
      flex-wrap: wrap;
    }
`;

const SectionTemplate = ({ children, backtype, sectionname }) => (
  <ThemeProvider theme={{ backtype }}>
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

export default SectionTemplate;
