import React from 'react';
import moment from 'moment';
import styled, { css } from 'styled-components';
import Paragraph from 'components/atoms/Paragraph/Paragraph';
import { connect } from 'react-redux';
import DetectableOverflow from 'react-detectable-overflow';

const StyledWrapper = styled.div`
    display: flex;
    border-radius: 10px;
    box-shadow: 4px 4px 15px -2px ${({ ispayment, theme }) => ispayment !== 0 ? theme.color.lightblue : theme.color.lightshadow};
    overflow: hidden;
`;

const StyledDateWrapper = styled.div`
    width: 25%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background-color: ${({ daytype, theme }) => (daytype ? theme.color.lightgrey : theme.color.darkgrey)};
    ${({ ispayment }) => ispayment !== 0 && css`
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
  };

  handleOverflow = () => {
    this.setState({
      isOverflowed: true,
    });
  };

  render() {
    const { day, allPayments } = this.props;
    const { isOverflowed } = this.state;
    let daytype;
    if (moment(day).weekday() === 6 || moment(day).weekday() === 0) {
      daytype = 'weekday';
    }
    let sum = 0;
    allPayments
      .filter((payment) => new Date(payment.deadline).getFullYear() === new Date(day).getFullYear())
      .filter((payment) => new Date(payment.deadline).getMonth() === new Date(day).getMonth())
      .filter((payment) => new Date(payment.deadline).getDate() === new Date(day).getDate())
      .forEach((payment) => sum += payment.ammount);
    return (
      <StyledWrapper ispayment={sum}>
        <StyledDateWrapper daytype={daytype} ispayment={sum}>
          <StyledDateParagraph>{moment(day).format('ddd')}</StyledDateParagraph>
          <StyledDateParagraph>{moment(day).format('DD/MM/YY')}</StyledDateParagraph>
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
                  <StyledPaymentParagraph key={payment.id}>
                    {`${payment.title}: `}
                    <StyledAmoSpan>{payment.ammount}</StyledAmoSpan>
                    <StyledCurrSpan>PLN</StyledCurrSpan>
                  </StyledPaymentParagraph>
                )))}
          </StyledPaymentsList>
        </DetectableOverflow>
      </StyledWrapper>
    );
  }
};

const mapStateToProps = ({ payments }) => ({
  allPayments: payments,
});

export default connect(mapStateToProps)(CalendarDay);
