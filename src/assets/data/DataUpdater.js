/* eslint-disable no-param-reassign */
import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { paymentsToUpdate } from 'assets/data/paymentsToUpdate';
import { setStartPayments } from 'actions';

const Button = styled.button`
  position: fixed;
  z-index: 10;
  bottom: 40px;
  right: 40px;
  padding: 10px 20px;
  background: none;
  border: 1px solid lime;
  color: lime;
  border-radius: 5px;
  font-weight: 600;
  text-transform: uppercase;
  cursor: pointer;
`;

const DataUpdater = ({ updateFn }) => {
  const handleUpdate = () => {
    const getToday = () => new Date().getTime();
    const getFutureDeadline = () => (getToday() + Math.floor((Math.random() * 8000000000)));
    const getPastDeadline = () => (getToday() - Math.floor((Math.random() * 1000000000)));
    const updatedPayments = paymentsToUpdate.map((payment) => ({ ...payment }));
    updatedPayments.forEach((payment, index) => {
      if (index < 2) payment.deadline = getPastDeadline();
      else if (index >= 2 && index < 4) payment.deadline = getToday();
      else payment.deadline = getFutureDeadline();
    });
    updatedPayments.sort((a, b) => a.deadline - b.deadline);
    updatedPayments.forEach((payment, index) => updateFn(payment, index));
  };

  return (
    <>
      {handleUpdate()}
      <Button onClick={handleUpdate}>update</Button>
    </>
  );
};

const mapDispatchToProps = (dispatch) => ({
  updateFn: (paymentObject, index) => dispatch(setStartPayments(paymentObject, index)),
});

DataUpdater.propTypes = {
  updateFn: PropTypes.func.isRequired,
};

export default connect(null, mapDispatchToProps)(DataUpdater);
