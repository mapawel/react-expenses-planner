import React from 'react';
import moment from 'moment';
import styled, { css } from 'styled-components';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import Paragraph from 'components/atoms/Paragraph/Paragraph';
import DetectableOverflow from 'react-detectable-overflow';

const StyledWrapper = styled.div`
    display: flex;
    border-radius: 10px;
    box-shadow: 4px 4px 15px -2px ${({ isPayment, theme }) => (isPayment !== 0 ? theme.color.lightblue : theme.color.lightshadow)};
    overflow: hidden;
    cursor: pointer;
`;

const StyledDateWrapper = styled.div`
    width: 25%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background-color: ${({ daytype, theme }) => (daytype ? theme.color.lightgrey : theme.color.darkgrey)};
    ${({ isPayment }) => isPayment !== 0 && css`
    background-color: ${({ daytype, theme }) => (daytype ? theme.color.lightblue : theme.color.darkblue)};
    `}
`;

const StyledDateParagraph = styled(Paragraph)`
    text-transform: uppercase;
    color: ${({ theme }) => theme.color.white};
    font-size: ${({ theme }) => theme.fontSize.s};
`;

const StyledPaymentsList = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;
    padding: 10px;
    background-color: ${({ theme }) => theme.color.white};
`;

const StyledPaymentParagraph = styled(Paragraph)`
    color: ${({ theme }) => theme.color.darkblue};
    font-weight: ${({ theme }) => theme.fontWeight.bold};
    text-decoration: ${({ isPaid }) => (isPaid === true && 'line-through')};
`;

const StyledAmoSpan = styled.span`
    color: ${({ theme }) => theme.color.darkgrey};
    text-decoration: underline;
`;

const StyledCurrSpan = styled.span`
    font-size: ${({ theme }) => theme.fontSize.xs};
`;

class CalendarDay extends React.Component {
  state = {
    isOverflowed: false,
    redirect: false,
  };

  handleOverflow = () => {
    this.setState({
      isOverflowed: true,
    });
  };

  handleElementClick = () => {
    this.setState({
      redirect: true,
    });
  };

  render() {
    const { day, allPayments } = this.props;
    const { isOverflowed, redirect } = this.state;
    let daytype;
    if (moment(day).weekday() === 6 || moment(day).weekday() === 0) {
      daytype = 'weekday';
    }
    let sum = 0;
    allPayments
      .filter((payment) => new Date(payment.deadline).getFullYear() === new Date(day).getFullYear())
      .filter((payment) => new Date(payment.deadline).getMonth() === new Date(day).getMonth())
      .filter((payment) => new Date(payment.deadline).getDate() === new Date(day).getDate())
      .filter((payment) => payment.closed === false)
      .forEach((payment) => { sum += payment.ammount; });
    const redirectPath = new Date(day).getTime();
    return (
      <>
        {redirect ? (<Redirect to={`/day/${redirectPath}`} />) : (
          <StyledWrapper
            onClick={this.handleElementClick}
            isPayment={sum}
          >
            <StyledDateWrapper daytype={daytype} isPayment={sum}>
              <StyledDateParagraph>{moment(day).format('ddd')}</StyledDateParagraph>
              <StyledDateParagraph>{moment(day).format('DD/MM')}</StyledDateParagraph>
            </StyledDateWrapper>
            <DetectableOverflow
              onChange={this.handleOverflow}
              style={{
                width: '100%',
                display: 'flex',
                textOverflow: 'ellipsis',
                whiteSpace: 'wrap',
                overflow: 'hidden',
              }}
            >
              <StyledPaymentsList>
                {(isOverflowed && sum !== 0) ? (
                  <StyledPaymentParagraph style={{ textAlign: 'center', marginRight: '8px' }}>
                    {'Ammount of '}
                    <StyledAmoSpan>{sum}</StyledAmoSpan>
                    <StyledCurrSpan>PLN</StyledCurrSpan>
                    {' here. Click to check'}
                  </StyledPaymentParagraph>
                ) : (
                  allPayments
                    .filter((payment) => new Date(payment.deadline).getFullYear() === new Date(day).getFullYear())
                    .filter((payment) => new Date(payment.deadline).getMonth() === new Date(day).getMonth())
                    .filter((payment) => new Date(payment.deadline).getDate() === new Date(day).getDate())
                    .map((payment) => (
                      <StyledPaymentParagraph key={payment.id} isPaid={payment.closed}>
                        {`${payment.title}: `}
                        <StyledAmoSpan>{payment.closed ? payment.paidAmmount : payment.ammount}</StyledAmoSpan>
                        <StyledCurrSpan>PLN</StyledCurrSpan>
                      </StyledPaymentParagraph>
                    )))}
              </StyledPaymentsList>
            </DetectableOverflow>
          </StyledWrapper>
        )}
      </>
    );
  }
}

CalendarDay.propTypes = {
  day: PropTypes.instanceOf(Date).isRequired,
  allPayments: PropTypes.arrayOf(Object).isRequired,
};

const mapStateToProps = ({ payments }) => ({
  allPayments: payments,
});

export default connect(mapStateToProps)(CalendarDay);
