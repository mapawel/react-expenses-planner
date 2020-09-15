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
import Header from 'components/atoms/Header/Header';
import Card from 'components/molecules/Card/Card';
import Input from 'components/atoms/Input/Input';
import { dataShape } from 'assets/data/dataShape';
import { Formik, ErrorMessage } from 'formik';
import { validatorSchemaProceed } from 'validatorSchema/validatorSchema';
import { payPayment } from 'actions';
import backIcon from 'assets/icons/back.svg';
import checkIcon from 'assets/icons/check.svg';
import undoIcon from 'assets/icons/undo.svg';

const StyledCardWrapper = styled.div`
    width: 100%;
`;

const StyledButtonsBox = styled.div`
    width: 100%;
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-template-rows: 1fr 1fr;
    grid-gap: 45px;
    padding-bottom: 80px;
    &>button:first-of-type{
        grid-column-start: 2;
    }
`;

const StyledForm = styled.form`
    max-width: 435px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    & > div:nth-of-type(4) {
      z-index: 4;
    }

    @media screen and (max-width: 768px) {
        margin: auto;
    }
`;

const StyledHeader = styled(Header)`
  margin-top: 80px;
  margin-bottom: 50px;
`;

const StyledInput = styled(Input)`
  margin-bottom: 30px;
`;

const StyledError = styled.p`
  position: absolute;
  width: 100%;
  bottom: -20px;
  left: 20px;
  font-size: ${({ theme }) => theme.fontSize.m};
  color: ${({ theme }) => (theme.backtype ? theme.color.white : theme.color.almostblack)};
  font-weight: ${({ theme }) => theme.fontWeight.bold};
  text-decoration: underline;
`;

const PaymentView = ({
  payFn, allPayments, match: { params: { paymentId } }, history: { goBack },
}) => {
  const [filteredPayment = ''] = allPayments.filter((payment) => payment.id === paymentId * 1);

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

        <Formik
          initialValues={{
            [dataShape.paidAmmount]: '', [dataShape.infoWhenPay]: '',
          }}
          validationSchema={validatorSchemaProceed}
          onSubmit={
                        (values, { setSubmitting }) => {
                          payFn(filteredPayment.id, values);
                          setTimeout(() => {
                            setSubmitting(false);
                            goBack();
                          }, 1000);
                        }
                    }
        >
          {({
            values,
            handleChange,
            handleSubmit,
            isSubmitting,
            resetForm,
          }) => (

            <StyledForm
              onSubmit={(e) => e.preventDefault()}
            >
              <StyledHeader>proceed your payment:</StyledHeader>

              <StyledInput
                name={dataShape.paidAmmount}
                id={dataShape.paidAmmount}
                onChange={handleChange}
                value={values[dataShape.paidAmmount]}
                labelTxt="value"
                headerTxt="paid ammount:"
              >
                <ErrorMessage component={StyledError} name={dataShape.paidAmmount} />
              </StyledInput>

              <StyledInput
                textarea={1}
                name={dataShape.infoWhenPay}
                id={dataShape.infoWhenPay}
                onChange={handleChange}
                value={values[dataShape.infoWhenPay]}
                labelTxt="short text"
                headerTxt="add your note:"
              >
                <ErrorMessage component={StyledError} name={dataShape.infoWhenPay} />
              </StyledInput>

              <StyledButtonsBox>
                <Button
                  onClick={resetForm}
                  icon={undoIcon}
                >
                  clear form
                </Button>
                <Button
                  onClick={handleSubmit}
                  disabled={isSubmitting}
                  type="button"
                  icon={checkIcon}
                >
                  paid
                </Button>
                <Button
                  onClick={goBack}
                  icon={backIcon}
                >
                  go back
                </Button>
              </StyledButtonsBox>
            </StyledForm>
          )}
        </Formik>

      </SectionTemplate>
    </>

  );
};

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
  payFn: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  allPayments: state.payments,
});

const mapDispatchToProps = (dispatch) => ({
  payFn: (id, updateData) => dispatch(payPayment(id, updateData)),
});

export default connect(mapStateToProps, mapDispatchToProps)(withContext(PaymentView));
