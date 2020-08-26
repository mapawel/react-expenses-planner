import React from 'react';
import Navigation from 'components/organisms/Navigation/Navigation';
import SectionTemplate from 'templates/SectionTemplate';
import Calendar from 'components/organisms/Calendar/Calendar';

const CalendarView = () => {
  return (
    <>
      <SectionTemplate backtype="secondary">
        <Navigation />
      </SectionTemplate>
      <SectionTemplate>
        <Calendar />
      </SectionTemplate>
    </>
  );
};
export default CalendarView;
