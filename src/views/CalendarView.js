import React from 'react';
import Navigation from 'components/organisms/Navigation/Navigation';
import SectionTemplate from 'templates/SectionTemplate';
import Calendar from 'components/organisms/Calendar/Calendar';
import NavWave from 'components/atoms/NavWave/NavWave';
import waveUpImage from 'assets/icons/waveup.svg';

const CalendarView = () => {
  return (
    <>
      <SectionTemplate backtype="secondary">
        <Navigation />
      </SectionTemplate>
      <NavWave image={waveUpImage} />
      <SectionTemplate>
        <Calendar />
      </SectionTemplate>
    </>
  );
};
export default CalendarView;
