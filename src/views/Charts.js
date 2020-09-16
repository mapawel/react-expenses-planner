import React from 'react';
import Navigation from 'components/organisms/Navigation/Navigation';
import SectionTemplate from 'templates/SectionTemplate';
import NavWave from 'components/atoms/NavWave/NavWave';
import waveUpImage from 'assets/icons/waveup.svg';

const Charts = () => (
  <>
    <SectionTemplate backtype="secondary">
      <Navigation />
    </SectionTemplate>
    <NavWave image={waveUpImage} />
    <SectionTemplate
      sectionname="this section is under construction... give me a break :)"
    />
  </>
);

export default Charts;
