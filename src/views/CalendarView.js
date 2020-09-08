import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
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
import { Link } from 'react-router-dom';
import { routes } from 'routes';

const StyledLink = styled(Link)`
  text-decoration: none;
`;

const CalendarView = ({ context: { displiedDate } }) => {
  const redirectPath = `${new Date(displiedDate).getFullYear()}${new Date(displiedDate).getMonth()}`;
  return (
    <>
      <SectionTemplate backtype="secondary">
        <Navigation />
      </SectionTemplate>
      <NavWave image={waveUpImage} />
      <SectionTemplate>
        <GridTemplate>
          <MonthsTitle short={1} />
          <DateHead />
          <StyledLink to={routes.addnew}><Button>add new payment</Button></StyledLink>
          <StyledLink to={`/month/${redirectPath}`}><Button>month&apos;s details</Button></StyledLink>
          <InfoHeader>month&apos;s total payments:</InfoHeader>
          <InfoHeader topay={1}>still to pay this month:</InfoHeader>
        </GridTemplate>
      </SectionTemplate>
      <SectionTemplate>
        <Calendar />
      </SectionTemplate>
    </>
  );
};

CalendarView.propTypes = {
  context: PropTypes.objectOf(PropTypes.oneOfType([PropTypes.instanceOf(Date), PropTypes.number, PropTypes.func])).isRequired,
};

export default withContext(CalendarView);
