import React from 'react';
import styled from 'styled-components';
import CalendarDay from 'components/atoms/CalendarDay/CalendarDay';

const StyledWrapper = styled.div`
    display: grid;
    grid-template-columns: repeat(6, 240px);
    grid-template-rows: repeat(7, 85px);
    gap: 12px;
    grid-auto-flow: column;
    margin: 40px 0;
`;

const Calendar = () => (
    <StyledWrapper>
        <CalendarDay />
        <CalendarDay />
        <CalendarDay />
        <CalendarDay />
        <CalendarDay />
        <CalendarDay />
        <CalendarDay />
        <CalendarDay />
        <CalendarDay />
        <CalendarDay />
        <CalendarDay />
        <CalendarDay />
        <CalendarDay />
        <CalendarDay />
        <CalendarDay />
        <CalendarDay />
        <CalendarDay />
        <CalendarDay />
        <CalendarDay />
        <CalendarDay />
        <CalendarDay />
        <CalendarDay />
        <CalendarDay />
        <CalendarDay />
        <CalendarDay />

    </StyledWrapper>
);
export default Calendar;
