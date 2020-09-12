import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import SectionTemplate from 'templates/SectionTemplate';
import Logo from 'components/atoms/Logo/Logo';
import Button from 'components/atoms/Button/Button';
import Header from 'components/atoms/Header/Header';
import Input from 'components/atoms/Input/Input';
import { dataShape } from 'assets/data/dataShape';
import { addNewPayment } from 'actions';
import { connect } from 'react-redux';
import { Formik, ErrorMessage } from 'formik';
import { validatorSchema } from 'validatorSchema/validatorSchema';

const StyledWrapper = styled.div`
    width: 100%;
`;

const StyledHead = styled.div`
    padding: 4px 0;
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
`;

const StyledForm = styled.form`
    max-width: 435px;
    margin: auto;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    & > div:nth-of-type(4) {
      z-index: 4;
    }
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

const StyledHeader = styled(Header)`
  margin-top: 80px;
  margin-bottom: 50px;
`;

const StyledInput = styled(Input)`
  margin-bottom: 30px;
`;

const StyledClose = styled.div`
  width: 30px;
  height: 30px;
  position: relative;
  &::after, &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 50%;
    height: 100%;
    width: 1px;
    background-color: ${({ theme }) => theme.color.darkblue};
  }
  &::after{
    transform: rotate(45deg);
  }
  &::before{
    transform: rotate(-45deg);
  }
`;

const StyledError = styled.p`
  position: absolute;
  width: 100%;
  bottom: -20px;
  left: 20px;
  font-size: ${({ theme }) => theme.fontSize.m};
  color: ${({ theme }) => theme.color.white};
  font-weight: ${({ theme }) => theme.fontWeight.bold};
  text-decoration: underline;
`;

const AddPaymentView = ({ history: { goBack }, addNewPaymentFn }) => (
  <SectionTemplate backtype="secondary">
    <StyledWrapper>
      <StyledHead>
        <Logo />
        <Button
          round={1}
          onClick={goBack}
        >
          <StyledClose />
        </Button>
      </StyledHead>

      <Formik
        initialValues={{
          [dataShape.category]: '', [dataShape.title]: '', [dataShape.ammount]: '', [dataShape.deadline]: '', [dataShape.cycle]: '', [dataShape.description]: '', [dataShape.repeatNumer]: '',
        }}
        validationSchema={validatorSchema}
        onSubmit={
          (values, { setSubmitting }) => {
            addNewPaymentFn(values);

            setTimeout(() => {
              setSubmitting(false);
              goBack();
            }, 200);
          }
        }
      >
        {({
          values,
          handleChange,
          handleSubmit,
          isSubmitting,
          setFieldValue,
          resetForm,
        }) => (

          <StyledForm
            onSubmit={(e) => e.preventDefault()}
          >
            <StyledHeader>add a new payment:</StyledHeader>
            <StyledInput
              select={['---', ...dataShape.categories.map((category) => [category, category])]}
              name={dataShape.category}
              id={dataShape.category}
              onChange={handleChange}
              value={values[dataShape.category]}
              labelTxt="choose category"
              headerTxt="payment's category:"
            >
              <ErrorMessage component={StyledError} name={dataShape.category} />
            </StyledInput>

            <StyledInput
              name={dataShape.title}
              id={dataShape.title}
              onChange={handleChange}
              value={values[dataShape.title]}
              labelTxt="short title"
              headerTxt="payment's title:"
            >
              <ErrorMessage component={StyledError} name={dataShape.title} />
            </StyledInput>

            <StyledInput
              name={dataShape.ammount}
              id={dataShape.ammount}
              onChange={handleChange}
              value={values[dataShape.ammount]}
              labelTxt="value"
              headerTxt="planned ammount:"
            >
              <ErrorMessage component={StyledError} name={dataShape.ammount} />
            </StyledInput>

            <StyledInput
              datepicker={1}
              name={dataShape.deadline}
              id={dataShape.deadline}
              onChange={(val) => {
                setFieldValue([dataShape.deadline], val);
              }}
              value={values[dataShape.deadline]}
              minDate={new Date()}
              locale="en-EN"
              format="dd/MM/y"
              headerTxt="choose deadline:"
              clearIcon={null}
            >
              <ErrorMessage component={StyledError} name={dataShape.deadline} />
            </StyledInput>

            <StyledInput
              select={['---', ...dataShape.cycles.map((cycle) => [cycle.cycleAddName, cycle.cycleName])]}
              name={dataShape.cycle}
              id={dataShape.cycle}
              onChange={handleChange}
              value={values[dataShape.cycle]}
              labelTxt="recurrence"
              headerTxt="choose cycle:"
            >
              <ErrorMessage component={StyledError} name={dataShape.cycle} />
            </StyledInput>

            {values[dataShape.cycle]
                && (
                  <StyledInput
                    name={dataShape.repeatNumer}
                    id={dataShape.repeatNumer}
                    onChange={handleChange}
                    value={values[dataShape.repeatNumer]}
                    labelTxt="quantity"
                    headerTxt="number of repetitions:"
                  >
                    <ErrorMessage component={StyledError} name={dataShape.repeatNumer} />
                  </StyledInput>
                )}

            <StyledInput
              textarea={1}
              name={dataShape.description}
              id={dataShape.description}
              onChange={handleChange}
              value={values[dataShape.description]}
              labelTxt="some notes"
              headerTxt="description:"
            >
              <ErrorMessage component={StyledError} name={dataShape.description} />
            </StyledInput>

            <StyledButtonsBox>
              <Button
                onClick={resetForm}
              >
                clear form
              </Button>
              <Button
                onClick={handleSubmit}
                disabled={isSubmitting}
                type="button"
              >
                add
              </Button>
              <Button
                onClick={goBack}
              >
                go back
              </Button>
            </StyledButtonsBox>
          </StyledForm>
        )}
      </Formik>
    </StyledWrapper>
  </SectionTemplate>
);

AddPaymentView.propTypes = {
  history: PropTypes.shape({
    goBack: PropTypes.func.isRequired,
  }).isRequired,
  addNewPaymentFn: PropTypes.func.isRequired,
};

const mapDispatchToProps = (dispatch) => (
  { addNewPaymentFn: (newPayment) => dispatch(addNewPayment(newPayment)) }
);

export default connect(null, mapDispatchToProps)(AddPaymentView);
