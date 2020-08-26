import React from 'react';
import moment from 'moment';
import styled from 'styled-components';
import Button from 'components/atoms/Button/Button';
import Header from 'components/atoms/Header/Header';
import Paragraph from 'components/atoms/Paragraph/Paragraph';
import lefArrowIcon from 'assets/icons/chevronleft.svg';
import rightArrowIcon from 'assets/icons/chevronright.svg';
import moneyImage from 'assets/images/moneybck.jpg';

const StyledWrapper = styled.div`
    align-self: flex-start;
    min-width: 15%;
    display: flex;
    flex-direction: column;
    align-content: center;
    padding-right: 15px;
    background-color: #FFFFFF50;
    background-blend-mode: lighten;
    background-image: url(${moneyImage});
    background-repeat: no-repeat;
    background-size: 80%;
    background-position: 20% 80%;
`;

const HeadWrapper = styled.div`
    display: flex;
    justify-content: space-between;
    margin-bottom: 30px;
`;

const StyledSpan = styled.span`
    font-size: ${({ theme }) => theme.fontSize.xl};
    font-weight: ${({ theme }) => theme.fontWeight.bold};
    color: ${({ theme }) => theme.color.darkblue};
`;

const StyledArrowButton = styled(Button)`
    min-width: 0;
    padding: 0 10px;
    background: none;
    box-shadow: none;
`;

const StyledHeader = styled(Header)`
    margin: 0 5px;
    font-size: ${({ theme }) => theme.fontSize.xl};
    text-align: center;
`;

const StyledParagraph = styled(Paragraph)`
    font-size: ${({ theme }) => theme.fontSize.m};
    font-weight: ${({ theme }) => theme.fontWeight.bold};
    color: ${({ theme }) => theme.color.darkgrey};
    text-transform: uppercase;
    text-align: center;
`;

const MonthsTitle = ({ time }) => (
  <StyledWrapper>
    <HeadWrapper>
      <StyledArrowButton icon={lefArrowIcon} resetmargin={1}/>
      <StyledHeader>
        {moment(time).format("MMMM")}
        <br />
        {moment(time).format("YYYY")}
      </StyledHeader>
      <StyledArrowButton icon={rightArrowIcon} resetmargin={1}/>
    </HeadWrapper>
    <StyledParagraph>
      still to pay <br />
      <StyledSpan>3250</StyledSpan>
      pln
    </StyledParagraph>
    <Paragraph small style={{textAlign: 'center', marginBottom: '20px'}}>this month</Paragraph>
    <StyledParagraph>
      <StyledSpan>1250</StyledSpan>
      pln
    </StyledParagraph>
    <Paragraph small style={{textAlign: 'center'}}>today</Paragraph>
  </StyledWrapper>
);
export default MonthsTitle;
