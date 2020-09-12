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
import { deletePayments } from 'actions';

const StyledCardWrapper = styled.div`
    width: 100%;
`;

const StyledButtonsWrapper = styled.div`
    width: 240px;
    margin: 30px auto;
    display: grid;
    grid-auto-rows: 1fr 1fr 1fr 1fr 30px 1fr;
    grid-gap: 20px;
    &>button:last-child {
        grid-row: 6/7;
    }

    @media (min-width: 768px) {
        margin: 30px 10px;
    }
`;

const PaymentView = ({
  deletePaymentFn, allPayments, match: { params: { paymentId } }, history: { goBack },
}) => {
  const [filteredPayment = ''] = allPayments.filter((payment) => payment.id === paymentId * 1);

  const handleDelete = (id, isCycle) => {
    deletePaymentFn(id, isCycle);
    goBack();
  };

  return (
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
          {[filteredPayment]
            .map(({
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
            ))}
        </StyledCardWrapper>
        <StyledButtonsWrapper>
          <Button>mark as paied</Button>
          <Button>edit this payment</Button>
          <Button
            onClick={() => handleDelete(filteredPayment.id, false)}
          >
            delete this payment
          </Button>
          {filteredPayment.cycle
          && (
          <Button
            onClick={() => handleDelete(filteredPayment.createDate, true)}
          >
            delete whole cycle
          </Button>
          )}
          <Button
            onClick={goBack}
          >
            go back
          </Button>
        </StyledButtonsWrapper>
      </SectionTemplate>
    </>
  );
};

PaymentView.propTypes = {
  allPayments: PropTypes.arrayOf(PropTypes.object).isRequired,
  deletePaymentFn: PropTypes.func.isRequired,
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

const mapDispatchToProps = (dispatch) => ({
  deletePaymentFn: (id, isCycle) => dispatch(deletePayments(id, isCycle)),
});

export default connect(mapStateToProps, mapDispatchToProps)(withContext(PaymentView));
