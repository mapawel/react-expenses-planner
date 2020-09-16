/* eslint-disable no-param-reassign */
import React from 'react';
import styled, { keyframes } from 'styled-components';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { paymentsToUpdate } from 'assets/data/paymentsToUpdate';
import { setStartPayments } from 'actions';
import withContext from 'hoc/withContext';
import Paragraph from 'components/atoms/Paragraph/Paragraph';
import Button from 'components/atoms/Button/Button';
import Header from 'components/atoms/Header/Header';
import Logo from 'components/atoms/Logo/Logo';

const fadeIn = keyframes`
0%{
  opacity: 0;
}
100%{
  opacity: 1;
}
`;

const StyledModal = styled.div`
  position: fixed;
  z-index: 200;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  display: flex;
  justify-content: center;
  align-items: flex-start;
  background-color: ${({ theme }) => theme.color.blendBlack};
  overflow: auto;
  animation: .8s ${fadeIn} both;
`;
const StyledModalBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  width: 90%;
  min-height: 90%;
  margin-top: 2%;
  padding: 50px 15%;
  background-color: ${({ theme }) => theme.color.white};
  box-shadow: 10px 10px 45px -8px ${({ theme }) => theme.color.darkshadow};
  border-radius: 15px;
`;

const StyledButtonsContainer = styled.div`
width: 100%;
margin: 0 auto;
max-width: 250px;
height: 120px;
display: flex;
flex-direction: column;
justify-content: space-between;

@media screen and (min-width: 768px){
  max-width: 400px;
  flex-direction: row;
}
`;

const StyledParagraph = styled(Paragraph)`
margin: 20px 0;
line-height: 1.6;
`;

const DataUpdater = ({ context: { handleDataUpdaterShow }, updateFn }) => {
  document.body.style.overflowY = 'hidden';
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
    handleDataUpdaterShow();
  };

  return (
    <>
      <StyledModal>
        <StyledModalBox>
          <Logo />
          <Header style={{ margin: '30px 0' }}>Welcome to Expenses Planner App!</Header>
          <StyledParagraph>
            This App is to help you to manage your payments. Using this App you will never forget about your payments deadlines and you will gain a full payemnts history!
          </StyledParagraph>
          <StyledParagraph>
            Please notice: this is a demo version. There is neither user log-in funcionality nor data-base yet.
            To test this App you can start with blank, fresh version or you can allow me to create some example elements just to give you the image how it works.
          </StyledParagraph>
          <StyledParagraph style={{ width: '100%', textAlign: 'center' }}>
            Do you want to start with some examples?
          </StyledParagraph>
          <StyledButtonsContainer>
            <Button
              onClick={handleUpdate}
            >
              yes

            </Button>
            <Button
              onClick={handleDataUpdaterShow}
            >
              no
            </Button>
          </StyledButtonsContainer>
        </StyledModalBox>
      </StyledModal>
    </>
  );
};

const mapDispatchToProps = (dispatch) => ({
  updateFn: (paymentObject, index) => dispatch(setStartPayments(paymentObject, index)),
});

DataUpdater.propTypes = {
  updateFn: PropTypes.func.isRequired,
  context: PropTypes.shape({
    handleDataUpdaterShow: PropTypes.func.isRequired,
  }).isRequired,
};

export default connect(null, mapDispatchToProps)(withContext(DataUpdater));
