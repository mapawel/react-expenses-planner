import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import CardsTemplate from 'templates/CardsTemplate';
import Card from 'components/molecules/Card/Card';
import Navigation from 'components/organisms/Navigation/Navigation';
import SectionTemplate from 'templates/SectionTemplate';
import waveUpLightImage from 'assets/icons/waveuplight.svg';
import NavWave from 'components/atoms/NavWave/NavWave';
import Button from 'components/atoms/Button/Button';
import withContext from 'hoc/withContext';
import { Link } from 'react-router-dom';

const StyledLink = styled(Link)`
  text-decoration: none;
`;

const StyledLeftBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 50px;
  padding-right: 15px;
`;

const DaysView = ({ allPayments, match: { params: { dayId } } }) => (
  <>
    <SectionTemplate nav={1}>
      <Navigation />
    </SectionTemplate>
    <NavWave image={waveUpLightImage} />
    <SectionTemplate
      sectionname="days's details:"
      backtype="secondary"
    >
      <StyledLeftBox>
        <StyledLink to="/calendar"><Button>go back</Button></StyledLink>
      </StyledLeftBox>
      <CardsTemplate>
        {
          allPayments
            .filter((payment) => new Date(payment.deadline).getFullYear() === new Date(dayId * 1).getFullYear())
            .filter((payment) => new Date(payment.deadline).getMonth() === new Date(dayId * 1).getMonth())
            .filter((payment) => new Date(payment.deadline).getDate() === new Date(dayId * 1).getDate())
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
                paidAmmount={payment.paidAmmount}
                closed={payment.closed}
              />
            ))
        }
      </CardsTemplate>
    </SectionTemplate>
  </>
);

DaysView.propTypes = {
  allPayments: PropTypes.arrayOf(PropTypes.object).isRequired,
  match: PropTypes.shape({
    params: PropTypes.shape({
      dayId: PropTypes.string.isRequired,
    }),
  }).isRequired,
};

const mapStateToProps = (state) => ({
  allPayments: state.payments,
});

export default connect(mapStateToProps)(withContext(DaysView));
