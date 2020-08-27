import React from 'react';
import moment from 'moment';
import styled from 'styled-components';
import Paragraph from 'components/atoms/Paragraph/Paragraph';

const StyledWrapper = styled.div`
    display: flex;
    border-radius: 10px;
    box-shadow: 4px 4px 15px -2px ${({ theme }) => theme.color.lightshadow};
    overflow: hidden;
`;

const StyledDateWrapper = styled.div`
    width: 25%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background-color: ${({ daytype, theme }) => (daytype ? theme.color.lightgrey : theme.color.darkgrey)};
`;

const StyledDateParagraph = styled(Paragraph)`
    text-transform: uppercase;
    color: ${({ theme }) => theme.color.white};
`;

const StyledPaymentsList = styled.ul`
    width: 75%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;
    padding: 15px;
    background-color: ${({ theme }) => theme.color.white};
`;

const StyledPaymentElement = styled.li`
    display: flex;
`;

const StyledPaymentParagraph = styled(Paragraph)`
    color: ${({ theme }) => theme.color.darkblue};
`;

const CalendarDay = ({ day }) => {
  let daytype;
  if (moment(day).weekday() === 6 || moment(day).weekday() === 0) {
    daytype = 'weekday';
  }
  return (
    <StyledWrapper>
      <StyledDateWrapper daytype={daytype}>
        <StyledDateParagraph>{moment(day).format('ddd')}</StyledDateParagraph>
        <StyledDateParagraph>{moment(day).format('DD/MM')}</StyledDateParagraph>
      </StyledDateWrapper>
      <StyledPaymentsList>
        <StyledPaymentElement>
          <StyledPaymentParagraph>insurance: 2450 PLN</StyledPaymentParagraph>
        </StyledPaymentElement>
        <StyledPaymentElement>
          <StyledPaymentParagraph>car tires: 1000 PLN</StyledPaymentParagraph>
        </StyledPaymentElement>
      </StyledPaymentsList>

    </StyledWrapper>
  );
};
export default CalendarDay;
