import React from 'react';
import Navigation from 'components/organisms/Navigation/Navigation';
import SectionTemplate from 'templates/SectionTemplate';
import Calendar from 'components/organisms/Calendar/Calendar';
import NavWave from 'components/atoms/NavWave/NavWave';
import waveUpImage from 'assets/icons/waveup.svg';
import MonthsTitle from 'components/molecules/MonthsTitle/MonthsTitle';
import Button from 'components/atoms/Button/Button';
import withContext from 'hoc/withContext';
import GridTemplate from 'templates/GridTemplate';
import DateHead from 'components/molecules/DateHead/DateHead';
import InfoHeader from 'components/molecules/InfoHeader/InfoHeader';

const CalendarView = ({ currentTime }) => (
  <>
    <SectionTemplate backtype="secondary">
      <Navigation />
    </SectionTemplate>
    <NavWave image={waveUpImage} />
    <SectionTemplate>
      <GridTemplate>
        <MonthsTitle short={1} />
        <DateHead />
        <Button>add new payment</Button>
        <Button>month's details</Button>
        <InfoHeader>month's total payments:</InfoHeader>
        <InfoHeader topay={1} >still to pay this month:</InfoHeader>
      </GridTemplate>
    </SectionTemplate>
    <SectionTemplate>
      <Calendar />
    </SectionTemplate>
  </>
);
export default withContext(CalendarView);
