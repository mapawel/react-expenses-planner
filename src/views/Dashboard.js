import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import CardsTemplate from 'templates/CardsTemplate';
import Card from 'components/molecules/Card/Card';
import Navigation from 'components/organisms/Navigation/Navigation';
import SectionTemplate from 'templates/SectionTemplate';
import waveUpImage from 'assets/icons/waveup.svg';
import waveImage from 'assets/icons/wavedown.svg';
import Wave from 'components/atoms/Wave/Wave';
import NavWave from 'components/atoms/NavWave/NavWave';
import MonthsTitle from 'components/molecules/MonthsTitle/MonthsTitle';
import BackImage from 'components/atoms/BackImage/BackImage';
import coinsImage from 'assets/images/coins.png';
import withContext from 'hoc/withContext';

class Dashboard extends React.Component {
  componentDidMount() {
    const { context: { handleMonthShift } } = this.props;
    handleMonthShift(0);
  }

  render() {
    const { allPayments, context: { currentTime } } = this.props;
    return (
      <>
        <SectionTemplate backtype="secondary">
          <Navigation />
        </SectionTemplate>
        <NavWave image={waveUpImage} />
        <SectionTemplate
          sectionname="still to pay in this month:"
        >
          <MonthsTitle />
          <CardsTemplate>
            {
              allPayments
                .filter((payment) => new Date(payment.deadline).getFullYear() === currentTime.getFullYear())
                .filter((payment) => new Date(payment.deadline).getMonth() === currentTime.getMonth())
                .filter((payment) => payment.closed === false)
                .map((payment) => (
                  <Card
                    key={payment.id}
                    id={payment.id}
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
                .filter((payment) => new Date(payment.deadline).getFullYear() === currentTime.getFullYear())
                .filter((payment) => new Date(payment.deadline).getMonth() === currentTime.getMonth())
                .filter((payment) => new Date(payment.deadline).getDate() === currentTime.getDate())
                .filter((payment) => payment.closed === false)
                .map((payment) => (
                  <Card
                    key={payment.id}
                    id={payment.id}
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
  }
}

const mapStateToProps = (state) => ({
  allPayments: state.payments,
});

Dashboard.propTypes = {
  allPayments: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default connect(mapStateToProps)(withContext(Dashboard));
