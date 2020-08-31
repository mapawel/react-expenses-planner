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
import MonthsTitle from 'components/molecules/MonthsTitle/MonthsTitle';
import Button from 'components/atoms/Button/Button';
import withContext from 'hoc/withContext';
import lefArrowIcon from 'assets/icons/chevronleft.svg';
import { Link } from 'react-router-dom';

const StyledLink = styled(Link)`
  text-decoration: none;
`;

const StyledLeftBox = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 50px;
  padding-right: 15px;
`;

const MonthView = ({ allPayments, context: {currentTime, displiedDate} }) => (
    <>
    <SectionTemplate nav={1}>
      <Navigation />
    </SectionTemplate>
    <NavWave image={waveUpLightImage} />
    <SectionTemplate
      sectionname="month's details:"
      backtype="secondary"
    >
      <StyledLeftBox>
      <MonthsTitle short={1} />
      <StyledLink to='/calendar'><Button>go back</Button></StyledLink>
      </StyledLeftBox>
      <CardsTemplate>
        {
          allPayments
            .filter((payment) => new Date(payment.deadline).getFullYear() === new Date(displiedDate).getFullYear())
            .filter((payment) => new Date(payment.deadline).getMonth() === new Date(displiedDate).getMonth())
            .map((payment) => (
              <Card
                key={payment.id}
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
const mapStateToProps = (state) => ({
    allPayments: state.payments,
  });
  
export default connect(mapStateToProps)(withContext(MonthView));
