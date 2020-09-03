import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { connect } from 'react-redux';
import Navigation from 'components/organisms/Navigation/Navigation';
import SectionTemplate from 'templates/SectionTemplate';
import waveUpImage from 'assets/icons/waveup.svg';
import NavWave from 'components/atoms/NavWave/NavWave';
import withContext from 'hoc/withContext';
import Button from 'components/atoms/Button/Button';
import Card from 'components/molecules/Card/Card';

const StyledCardWrapper = styled.div`
    width: 100%;
`;

const StyledButtonsWrapper = styled.div`
    width: 240px;
    margin: 30px auto;
    display: grid;
    grid-auto-rows: 1fr 1fr 1fr 30px 1fr;
    grid-gap: 20px;
    &>button:last-child {
        grid-row: 5/6;
    }

    @media (min-width: 768px) {
        margin: 30px 10px;
    }
`;

const PaymentView = ({ allPayments, match: { params: { paymentId } }, history: { goBack } }) => (
  <>
    <SectionTemplate backtype="secondary">
      <Navigation />
    </SectionTemplate>
    <NavWave image={waveUpImage} />
    <SectionTemplate
      sectionname="payment's details:"
      paymentview={1}
    >
      <StyledCardWrapper>
        {allPayments
          .filter((payment) => payment.id === paymentId * 1)
          .map((payment) => (
            <Card
              id={payment.id}
              key={payment.id}
              category={payment.category}
              title={payment.title}
              ammount={payment.ammount}
              description={payment.description}
              deadline={payment.deadline}
              cycle={payment.cycle}
            />
          ))}
      </StyledCardWrapper>
      <StyledButtonsWrapper>
        <Button>mark as paied</Button>
        <Button>add similar payment</Button>
        <Button>edit this payment</Button>
        <Button
          onClick={goBack}
        >
          go back
        </Button>
      </StyledButtonsWrapper>
    </SectionTemplate>
  </>
);

PaymentView.propTypes = {
  allPayments: PropTypes.arrayOf(PropTypes.object).isRequired,
  match: PropTypes.shape({
    params: PropTypes.shape({
      paymentId: PropTypes.string.isRequired,
    }),
  }).isRequired,
  history: PropTypes.shape({
    goBack: PropTypes.func.isRequired,
  }).isRequired,
};

const mapStateToProps = (state) => ({
  allPayments: state.payments,
});

export default connect(mapStateToProps)(withContext(PaymentView));
