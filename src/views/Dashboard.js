import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { connect } from 'react-redux';
import CardsTemplate from 'templates/CardsTemplate';
import Card from 'components/organisms/Card/Card';
import Navigation from 'components/organisms/Navigation/Navigation';
import SectionTemplate from 'templates/SectionTemplate';
import waveUpImage from 'assets/icons/waveup.svg';
import waveImage from 'assets/icons/wavedown.svg';
import Wave from 'components/atoms/Wave/Wave';
import MonthsTitle from 'components/molecules/MonthsTitle/MonthsTitle';
import BackImage from 'components/atoms/BackImage/BackImage';
import coinsImage from 'assets/images/coins.png';
import withContext from 'hoc/withContext';

const StyledUpWave = styled(Wave)`
    background-repeat: no-repeat;
    background-size: contain;
    background-position: -235px 0%;
    width: 100%;
    height: 34px;
    margin-bottom: 0px;
    margin-top: -1px;
`;

const Dashboard = ({ allPayments, context: {currentTime} }) => (

      <>
        <SectionTemplate backtype="secondary">
          <Navigation />
        </SectionTemplate>
        <StyledUpWave image={waveUpImage} />
        <SectionTemplate
          sectionname="still to pay in this month:"
        >
          <MonthsTitle time={currentTime} />
          <CardsTemplate>
            {
              allPayments.filter((payment) => new Date(payment.deadline).getMonth() === currentTime.getMonth())
                .map((payment) => (
                  <Card
                    key={payment.id}
                    category={payment.category}
                    title={payment.title}
                    ammount={payment.ammount}
                    description={payment.description}
                    deadline={payment.deadline}
                    cycle={payment.cycle}
                  />
                ))
            }
          </CardsTemplate>
        </SectionTemplate>
        <Wave image={waveImage} />
        <SectionTemplate
          sectionname="today’s payments:"
          backtype="secondary"
        >
          <BackImage img={coinsImage} />
          <CardsTemplate>
            {
              allPayments
                .filter((payment) => new Date(payment.deadline).getMonth() === currentTime.getMonth())
                .filter((payment) => new Date(payment.deadline).getDate() === currentTime.getDate())
                .map((payment) => (
                  <Card
                    key={payment.id}
                    category={payment.category}
                    title={payment.title}
                    ammount={payment.ammount}
                    description={payment.description}
                    deadline={payment.deadline}
                    cycle={payment.cycle}
                  />
                ))
            }
          </CardsTemplate>
        </SectionTemplate>
      </>
);

const mapStateToProps = (state) => ({
  allPayments: state.payments,
});

Dashboard.propTypes = {
  allPayments: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default connect(mapStateToProps)(withContext(Dashboard));
