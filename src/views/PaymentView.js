import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Navigation from 'components/organisms/Navigation/Navigation';
import SectionTemplate from 'templates/SectionTemplate';
import waveUpImage from 'assets/icons/waveup.svg';
import NavWave from 'components/atoms/NavWave/NavWave';
import withContext from 'hoc/withContext';
import Button from 'components/atoms/Button/Button';
import Card from 'components/molecules/Card/Card';
import ConfirmModal from 'components/molecules/ConfirmModal/ConfirmModal';
import { deletePayments } from 'actions';

const StyledCardWrapper = styled.div`
    width: 100%;
`;

const StyledButtonsWrapper = styled.div`
    width: 240px;
    margin: 30px auto;
    display: grid;
    grid-auto-rows: repeat(6, auto);
    grid-gap: 20px;
    &>button:last-child {
        grid-row: 6/7;
    }

    @media (min-width: 768px) {
        margin: 30px 10px;
    }
`;

const StyledLink = styled(Link)`
  text-decoration: none;
  display: grid;
`;

class PaymentView extends React.Component {
  state = {
    isDeleted: false,
    isModalOpen: false,
    modalInfoCycle: false,
    closingTime: 250,
  }

  handleOpenModal = (isCycle) => {
    document.body.style.overflow = 'hidden';
    this.setState({
      isModalOpen: true,
      modalInfoCycle: isCycle,
    });
  }

  handleCloseModal = (noDelay) => {
    const { closingTime } = this.state;
    document.body.style.overflow = 'auto';
    if (noDelay) {
      this.setState({
        isModalOpen: false,
      });
    } else {
      setTimeout(() => {
        this.setState({
          isModalOpen: false,
        });
      }, closingTime);
    }
  }

  handleDelete = (filteredPayment) => {
    const { deletePaymentFn, history: { goBack } } = this.props;
    const { modalInfoCycle } = this.state;
    const id = modalInfoCycle ? filteredPayment.createDate : filteredPayment.id;
    goBack();
    this.handleCloseModal(true);
    deletePaymentFn(id, modalInfoCycle);
    this.setState({
      isDeleted: true,
    });
  };

  render() {
    const {
      allPayments, match: { params: { paymentId } }, history: { goBack },
    } = this.props;
    const [filteredPayment = ''] = allPayments.filter((payment) => payment.id === paymentId * 1);
    const {
      isDeleted, isModalOpen, modalInfoCycle, closingTime,
    } = this.state;
    return (
      <>
        {
          isDeleted ? (
            <>
            </>
          ) : (
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
                  {filteredPayment.closed ? null : (
                    <>
                      <StyledLink to={`/proceed/${filteredPayment.id}`}><Button>mark as paied</Button></StyledLink>
                      <StyledLink to={{ pathname: '/addnew', state: { filteredPayment } }}><Button>edit this payment</Button></StyledLink>
                    </>
                  )}

                  <Button
                    onClick={() => this.handleOpenModal(false)}
                  >
                    delete this payment
                  </Button>
                  {filteredPayment.cycle && !filteredPayment.closed ? (
                    <Button
                      onClick={() => this.handleOpenModal(true)}
                    >
                      delete whole cycle
                    </Button>
                  ) : null}
                  <Button
                    onClick={goBack}
                  >
                    go back
                  </Button>
                </StyledButtonsWrapper>
              </SectionTemplate>
              {isModalOpen
                  && (
                    <ConfirmModal
                      no={this.handleCloseModal}
                      yes={() => this.handleDelete(filteredPayment)}
                      closingTime={closingTime}
                    >
                      Are you sure you want to delete
                      {modalInfoCycle ? 'whole payment cycle' : 'this payment'}
                      ?
                    </ConfirmModal>
                  )}
            </>
          )
        }
      </>
    );
  }
}

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
