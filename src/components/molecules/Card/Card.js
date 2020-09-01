import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import Paragraph from 'components/atoms/Paragraph/Paragraph';
import Header from 'components/atoms/Header/Header';
import Button from 'components/atoms/Button/Button';
import moneyIcon from 'assets/icons/money.svg';
import infoIcon from 'assets/icons/info2.svg';
import HeroCardImage from 'components/atoms/HeroCardImage/HeroCardImage';

const StyledWrapper = styled.div`
    position: relative;
    margin: 0 10px;
`;

const StyledInnerWrapper = styled.div`
    position: relative;
    display: flex;
    flex-direction: column;
    justify-content: ${({ theme }) => (theme.paymentview ? 'flex-start' : 'center')};
    background-color: ${({ theme }) => (theme.backtype === 'secondary' ? theme.color.darkblue : theme.color.white)};
    border-radius: 15px;
    text-transform: ${({ theme }) => (theme.paymentview ? 'uppercase' : 'none')};
    box-shadow: ${({ theme }) => (theme.paymentview ? 'none' : `7px 7px 35px -12px ${(theme.backtype === 'secondary' ? theme.color.darkshadow : theme.color.lightshadow)}`)};
    overflow: hidden;

    @media (min-width: 768px) {
      flex-direction: row;
    }
`;

const StyledBlend = styled.div`
    position: absolute;
    z-index: 4;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    background-color: ${({ theme }) => theme.color.blendBlack};
`;

const StyledBoxWhenPayment = styled.div`
    display: ${({ theme }) => (theme.paymentview ? 'block' : 'none')};
    margin-bottom: 15px;
`;

const StyledTitleWrapper = styled.div`
    display: ${({ theme }) => (theme.paymentview ? 'none' : 'flex')};
    position: absolute;
    z-index: 5;
    top: -10px;
    right: -4%;
    align-items: center;
    width: 108%;
    height: 60px;
    background-color: ${({ theme }) => (theme.backtype === 'secondary' ? theme.color.lightblue : theme.color.darkblue)};
    border-radius: 36px;
    box-shadow: 4px 4px 18px -2px ${({ theme }) => (theme.backtype === 'secondary' ? theme.color.darkshadow : theme.color.darkshadow)};
    overflow: hidden;

    @media (min-width: 768px) {
      right: -10px;
      width: 70%;
    }
`;

const StyledLine = styled.div`
  width: 2px;
  height: 100%;
  background-color: ${({ theme }) => (theme.backtype === 'secondary' ? theme.color.darkblue : theme.color.lightblue)};
`;

const StyledImageHeader = styled(Header)`
    position: absolute;
    z-index: 3;
    top: 60%;
    left: 50%;
    transform: translate(-50%, -50%);

    @media (min-width: 768px) {
      top: 50%;
    }
`;

const StyledTextWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  height: 80%;
  padding: 0 30px;
  margin: 20px 0;
  
  @media (min-width: 768px) {
    padding: 0 20px;
    margin: ${({ theme }) => (theme.paymentview ? '20px' : '70px')} 0 10px;
    }
`;

const StyledButtonsWrapper = styled.div`
  display: ${({ theme }) => (theme.paymentview ? 'none' : 'flex')};
  flex-direction: row;
  justify-content: space-evenly;
  align-items: center;
  margin: 0;
  padding-right: 0;
  padding-bottom: 40px;

  @media (min-width: 768px) {
    flex-direction: column;
    margin: 60px 0 10px auto;
    padding-right: 25px;
    padding-bottom: 0;
    }
`;

const StyledTitleParagraph = styled(Paragraph)`
    width: ${({ theme }) => (theme.paymentview ? '100%' : '50%')};
    padding: ${({ theme }) => (theme.paymentview ? '0 0 5px' : '0 15px')};
    text-align: ${({ theme }) => (theme.paymentview ? 'left' : 'center')};
    text-decoration: ${({ closed }) => closed && 'line-through'};
    color: ${({ theme }) => theme.paymentview && theme.color.darkblue};
    text-transform: ${({ theme }) => (theme.paymentview ? 'uppercase' : 'none')};
`;

const StyledPaidTxt = styled(StyledTitleParagraph)`
    z-index: 5;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    align-items: center;
    color: ${({ theme }) => theme.color.lightblue};
    ::before{
      content: 'paid: ';
      width: 100%;
      font-size: ${({ theme }) => theme.fontSize.xs};
    }
`;

const StylenSpanPln = styled.span`
  color:  ${({ theme }) => (theme.backtype === 'secondary' ? theme.color.almostblack : theme.color.white)};
  color: ${({ closed, theme }) => closed && theme.color.lightblue};
  color: ${({ theme }) => theme.paymentview && theme.color.darkblue};
  text-transform: uppercase;
  font-weight:  ${({ theme }) => theme.fontWeight.bold};
  font-size:  ${({ theme }) => theme.fontSize.s};
  display: inline-block;
`;

const StyledParagraph = styled(Paragraph)`
  margin-bottom: 15px;
  font-weight:  ${({ theme }) => theme.fontWeight.semibold};
`;

const StyledDateParagraph = styled(Paragraph)`
  margin-bottom: 15px;
  font-weight:  ${({ theme }) => theme.fontWeight.semibold};
  font-size:  ${({ theme }) => theme.fontSize.xl};
`;

const Card = ({
  id, category, title, ammount, description, deadline, cycle, paidAmmount, closed,
}) => (
    <StyledWrapper>
      <StyledTitleWrapper>
        {closed && <StyledBlend />}
        <StyledTitleParagraph big>{title}</StyledTitleParagraph>
        <StyledLine />
        <StyledTitleParagraph big closed={closed}>
          {ammount}
          <StylenSpanPln>
            &nbsp;pln
        </StylenSpanPln>
        </StyledTitleParagraph>
        {closed
          && (
            <StyledPaidTxt big>
              {paidAmmount}
              <StylenSpanPln closed={closed}>
                &nbsp;pln
              </StylenSpanPln>
            </StyledPaidTxt>
          )}
      </StyledTitleWrapper>
      <StyledInnerWrapper>
        {closed && <StyledBlend />}
        <HeroCardImage category={category}>
          <StyledImageHeader uppercase>{category}</StyledImageHeader>
        </HeroCardImage>
        <StyledTextWrapper>

          <StyledBoxWhenPayment>
            <StyledTitleParagraph big>{title}</StyledTitleParagraph>
            <StyledTitleParagraph big>
              {ammount}
              <StylenSpanPln>
                &nbsp;pln
            </StylenSpanPln>
            </StyledTitleParagraph>
          </StyledBoxWhenPayment>

          <Paragraph small>description:</Paragraph>
          <StyledParagraph>{description}</StyledParagraph>
          <Paragraph small>deadline:</Paragraph>
          <StyledDateParagraph>{new Date(deadline).toLocaleDateString()}</StyledDateParagraph>
          <Paragraph small>cycle:</Paragraph>
          <StyledParagraph>{cycle}</StyledParagraph>
        </StyledTextWrapper>
        <StyledButtonsWrapper>
          <Button round={1} icon={moneyIcon} />
          <Link to={`/payment/${id}`}><Button round={1} icon={infoIcon} /></Link>
        </StyledButtonsWrapper>
      </StyledInnerWrapper>
    </StyledWrapper>
  );

Card.propTypes = {
  category: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  ammount: PropTypes.number.isRequired,
  description: PropTypes.string,
  deadline: PropTypes.number.isRequired,
  cycle: PropTypes.string,
};

Card.defaultProps = {
  description: '-',
  cycle: '-',
};

export default Card;
