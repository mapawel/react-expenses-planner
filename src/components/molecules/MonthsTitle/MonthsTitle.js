import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import styled from 'styled-components';
import Button from 'components/atoms/Button/Button';
import Header from 'components/atoms/Header/Header';
import Paragraph from 'components/atoms/Paragraph/Paragraph';
import lefArrowIcon from 'assets/icons/chevronleft.svg';
import rightArrowIcon from 'assets/icons/chevronright.svg';
import moneyImage2 from 'assets/images/moneybck2.png';
import withContext from 'hoc/withContext';
import { connect } from 'react-redux';

const StyledWrapper = styled.div`
    position: relative;
    align-self: flex-start;
    min-width: 15%;
    display: flex;
    flex-direction: column;
    align-content: center;
    padding-right: ${({ short }) => !short && '15px'};
    margin-bottom: 50px;
    background-image: url(${moneyImage2});
    background-repeat: no-repeat;
    background-size: 80%;
    background-position: 30% 98%;
    &::after{
      content: '';
      position: absolute;
      z-index: 0;
      width: 100%;
      height: 100%;
      top: 0;
      left: 0;
      background-color: ${({ theme }) => ((theme.backtype === 'secondary') ? theme.color.darkblue : theme.color.white)};
      opacity: .87;
    }
`;

const HeadWrapper = styled.div`
    z-index: 1;
    display: flex;
    justify-content: space-between;
    
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
    color: red;
`;

const StyledHeader = styled(Header)`
    margin: 0 auto;
    font-size: ${({ theme }) => theme.fontSize.xl};
    text-align: center;
`;

const StyledParagraph = styled(Paragraph)`
    z-index: 1;
    font-size: ${({ theme }) => theme.fontSize.m};
    font-weight: ${({ theme }) => theme.fontWeight.bold};
    color: ${({ theme }) => theme.color.darkgrey};
    text-transform: uppercase;
    text-align: center;
    &:first-of-type{
      margin-top: 30px;
    }
`;

const MonthsTitle = ({ allPayments, short, context: { handleMonthShift, displiedDate, currentTime } }) => {
  let sumTotalDay = 0;
  let sumToPayMonth = 0;
  allPayments
    .filter((payment) => new Date(payment.deadline).getFullYear() === new Date(displiedDate).getFullYear())
    .filter((payment) => new Date(payment.deadline).getMonth() === new Date(displiedDate).getMonth())
    .filter((payment) => new Date(payment.deadline).getDate() === new Date(currentTime).getDate())
    .filter((payment) => payment.closed === false)
    .forEach((payment) => { sumTotalDay += payment.ammount; });
  allPayments
    .filter((payment) => new Date(payment.deadline).getFullYear() === new Date(displiedDate).getFullYear())
    .filter((payment) => new Date(payment.deadline).getMonth() === new Date(displiedDate).getMonth())
    .filter((payment) => payment.closed === false)
    .forEach((payment) => { sumToPayMonth += payment.ammount; });

  return (
    <StyledWrapper short={short}>
      <HeadWrapper>
        {short && (
          <StyledArrowButton
            icon={lefArrowIcon}
            resetmargin={1}
            onClick={() => handleMonthShift(-1)}
          />
        )}
        <StyledHeader>
          {moment(displiedDate).format('MMMM')}
          <br />
          {moment(displiedDate).format('YYYY')}
        </StyledHeader>
        {short && (
          <StyledArrowButton
            icon={rightArrowIcon}
            resetmargin={1}
            onClick={() => handleMonthShift(1)}
          />
        )}
      </HeadWrapper>
      {!short && (
        <>
          <StyledParagraph>
            still to pay
            {' '}
            <br />
            <StyledSpan>{sumToPayMonth}</StyledSpan>
            pln
          </StyledParagraph>
          <Paragraph small style={{ textAlign: 'center', marginBottom: '20px', zIndex: '1' }}>this month</Paragraph>
          <StyledParagraph>
            <StyledSpan>{sumTotalDay}</StyledSpan>
            pln
          </StyledParagraph>
          <Paragraph small style={{ textAlign: 'center', zIndex: '1' }}>today</Paragraph>
        </>
      )}
    </StyledWrapper>
  );
};

MonthsTitle.propTypes = {
  short: PropTypes.oneOf([0, 1]),
  allPayments: PropTypes.arrayOf(PropTypes.object).isRequired,
  context: PropTypes.shape({
    displiedDate: PropTypes.instanceOf(Date).isRequired,
    currentTime: PropTypes.instanceOf(Date).isRequired,
    handleMonthShift: PropTypes.func.isRequired,
  }).isRequired,
};

MonthsTitle.defaultProps = {
  short: 0,
};

const mapStateToProps = ({ payments }) => ({
  allPayments: payments,
});

export default connect(mapStateToProps)(withContext(MonthsTitle));
