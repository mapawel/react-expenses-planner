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
import Paragraph from 'components/atoms/Paragraph/Paragraph';
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

const StyledModal = styled.div`
    position: fixed;
    z-index: 100;
    top: 0;
    left: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
    background-color: ${({ theme }) => theme.color.blendBlack};
`;
const StylecModalBox = styled.div`
    min-width: 340px;
    width: 40vw;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    padding: 70px 10px;
    border-radius: 10px;
    box-shadow: 7px 7px 25px -5px ${({ theme }) => theme.color.lightshadow};
    background-color: ${({ theme }) => theme.color.almostblack};
    &>p:first-of-type{
      text-align: center;
      width: 100%;
      margin-bottom: 50px;
    }
    &>div{
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      flex-wrap: wrap;
      width: 100%;
      max-width: 600px;
    }
`;

class PaymentView extends React.Component {
  state = {
    isDeleted: false,
    isModalOpen: false,
    modalInfoCycle: false,
  }

  handleOpenModal = (isCycle) => {
    this.setState({
      isModalOpen: true,
      modalInfoCycle: isCycle,
    });
  }

  handleCloseModal = () => {
    this.setState({
      isModalOpen: false,
    });
  }

  handleDelete = (filteredPayment) => {
    const { deletePaymentFn, history: { goBack } } = this.props;
    const { modalInfoCycle } = this.state;
    const id = modalInfoCycle ? filteredPayment.createDate : filteredPayment.id;
    goBack();
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
    const { isDeleted, isModalOpen, modalInfoCycle } = this.state;
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
                  <Button>mark as paied</Button>
                  <Button>edit this payment</Button>
                  <Button
                    onClick={() => this.handleOpenModal(false)}
                    // onClick={() => this.handleOpenModal(filteredPayment.id, false)}
                  >
                    delete this payment
                  </Button>
                  {filteredPayment.cycle
                      && (
                        <Button
                          onClick={() => this.handleOpenModal(true)}
                          // onClick={() => this.handleOpenModal(filteredPayment.createDate, true)}
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
              {isModalOpen
                  && (
                    <StyledModal>
                      <StylecModalBox>
                        <Paragraph big>
                          Are you sure you want to delete
                          {' '}
                          {modalInfoCycle ? 'whole payment cycle' : 'this payment'}
                          ?
                        </Paragraph>
                        <div>
                          <Button
                            onClick={this.handleCloseModal}
                          >
                            No
                          </Button>
                          <Button
                            onClick={() => this.handleDelete(filteredPayment)}
                          >
                            Yes
                          </Button>
                        </div>
                      </StylecModalBox>
                    </StyledModal>
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
