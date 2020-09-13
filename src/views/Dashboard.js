import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import CardsTemplate from 'templates/CardsTemplate';
import Card from 'components/molecules/Card/Card';
import Header from 'components/atoms/Header/Header';
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
    const monthsPayments = allPayments
      .filter((payment) => new Date(payment.deadline).getFullYear() === currentTime.getFullYear())
      .filter((payment) => new Date(payment.deadline).getMonth() === currentTime.getMonth())
      .filter((payment) => payment.closed === false)
      .sort((a, b) => a.deadline - b.deadline);
    const daysPayments = allPayments
      .filter((payment) => new Date(payment.deadline).getFullYear() === currentTime.getFullYear())
      .filter((payment) => new Date(payment.deadline).getMonth() === currentTime.getMonth())
      .filter((payment) => new Date(payment.deadline).getDate() === currentTime.getDate())
      .filter((payment) => payment.closed === false)
      .sort((a, b) => a.deadline - b.deadline);
    return (
      <>
        <SectionTemplate backtype="secondary">
          <Navigation />
        </SectionTemplate>
        <NavWave image={waveUpImage} />
        <SectionTemplate
          sectionname="still to pay in this month:"
          addButton={1}
        >
          <MonthsTitle />
          <CardsTemplate>
            {monthsPayments.length > 0
              ? (monthsPayments.map(({
                id, category, title, ammount, description, deadline, cycle, createDate, infoWhenPay, cycleElementNr, repeatNumer, closed, paidAmmount,
              }) => (
                <Card
                  id={id}
                  key={id}
                  category={category}
                  title={title}
                  ammount={ammount}
                  paidAmmount={paidAmmount}
                  description={description}
                  deadline={deadline}
                  cycle={cycle}
                  closed={closed}
                  createDate={createDate}
                  infoWhenPay={infoWhenPay}
                  cycleElementNr={cycleElementNr}
                  repeatNumer={repeatNumer}
                />
              ))
              ) : (
                <Header big style={{ marginLeft: '100px', marginTop: '10vh' }}>
                  Nothing to pay this month :)
                </Header>
              )}
          </CardsTemplate>
        </SectionTemplate>
        <Wave image={waveImage} />
        <SectionTemplate
          sectionname="today’s payments:"
          backtype="secondary"
        >
          <BackImage img={coinsImage} />
          <CardsTemplate>
            {monthsPayments.length > 0
              ? (daysPayments.map(({
                id, category, title, ammount, description, deadline, cycle, createDate, infoWhenPay, cycleElementNr, repeatNumer, closed, paidAmmount,
              }) => (
                <Card
                  id={id}
                  key={id}
                  category={category}
                  title={title}
                  ammount={ammount}
                  paidAmmount={paidAmmount}
                  description={description}
                  deadline={deadline}
                  cycle={cycle}
                  closed={closed}
                  createDate={createDate}
                  infoWhenPay={infoWhenPay}
                  cycleElementNr={cycleElementNr}
                  repeatNumer={repeatNumer}
                />
              ))
              ) : (
                <Header big style={{ marginLeft: '100px', marginTop: '10vh' }}>
                  Nothing to pay today :)
                </Header>
              )}
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
  context: PropTypes.objectOf(PropTypes.oneOfType([PropTypes.instanceOf(Date), PropTypes.number, PropTypes.func])).isRequired,
};

export default connect(mapStateToProps)(withContext(Dashboard));
