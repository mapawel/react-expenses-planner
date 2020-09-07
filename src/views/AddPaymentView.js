import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import SectionTemplate from 'templates/SectionTemplate';
import Logo from 'components/atoms/Logo/Logo';
import Button from 'components/atoms/Button/Button';
import Header from 'components/atoms/Header/Header';
import Input from 'components/atoms/Input/Input';
import { dataShape } from 'assets/data/dataShape';
import { addNewPayment } from 'actions';
import { connect } from 'react-redux';
import { Formik } from 'formik';
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
margin-top: 40px;
    width: 100%;
    display: flex;
    justify-content: space-between;
`;

const StyledHeader = styled(Header)`
  margin-top: 80px;
  margin-bottom: 50px;
`;

const StyledInput = styled(Input)`
  margin-bottom: 20px;
`;

const AddPaymentView = ({ history: { goBack }, addNewPaymentFn, ...props }) => (
  <SectionTemplate backtype="secondary">
    <StyledWrapper>
      <StyledHead>
        <Logo />
        <Button round={1} />
      </StyledHead>

      <Formik
        initialValues={{
          [dataShape.category]: '', [dataShape.title]: '', [dataShape.ammount]: '', [dataShape.deadline]: '', [dataShape.cycle]: '', [dataShape.description]: '',
        }}
          // validationSchema={validatorSchema}
        onSubmit={
            (values, { setSubmitting }) => {
              console.log(values);
              addNewPaymentFn(values);
              setTimeout(() => {
                setSubmitting(false);
              }, 400);
            }
          }
      >
        {({
          values,
          handleChange,
          handleSubmit,
          isSubmitting,
          setFieldValue,
        }) => (

          <StyledForm
            onSubmit={(e) => e.preventDefault()}
          >
            <StyledHeader>add a new payment:</StyledHeader>

            <StyledInput
              select={['---', ...dataShape.categories.map((category) => [category])]}
              name={dataShape.category}
              id={dataShape.category}
              onChange={handleChange}
              value={values[dataShape.category]}
              labelTxt="choose category"
            >
              payment's category:
            </StyledInput>

            <StyledInput
              name={dataShape.title}
              id={dataShape.title}
              onChange={handleChange}
              value={values[dataShape.title]}
              labelTxt="short title"
            >
              payment's title:
            </StyledInput>

            <StyledInput
              name={dataShape.ammount}
              id={dataShape.ammount}
              onChange={handleChange}
              value={values[dataShape.ammount]}
              labelTxt="value"
            >
              planned ammount:
            </StyledInput>

            <StyledInput
              datepicker
              name={dataShape.deadline}
              id={dataShape.deadline}
              onChange={(val) => {
                setFieldValue([dataShape.deadline], val);
              }}
              value={values[dataShape.deadline]}
              minDate={new Date()}
              locale="en-EN"
              format="dd/MM/y"
            >
              choose deadline:
            </StyledInput>

            <StyledInput
              name={dataShape.cycle}
              id={dataShape.cycle}
              onChange={handleChange}
              value={values[dataShape.cycle]}
              labelTxt="recurrence"
            >
              choose cycle:
            </StyledInput>

            <StyledInput
              textarea={1}
              name={dataShape.description}
              id={dataShape.description}
              onChange={handleChange}
              value={values[dataShape.description]}
              labelTxt="some notes"
            >
              description:
            </StyledInput>

            <StyledButtonsBox>
              <Button
                onClick={handleSubmit}
                disabled={isSubmitting}
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

const mapDispatchToProps = (dispatch) => (
  { addNewPaymentFn: (newPayment) => dispatch(addNewPayment(newPayment)) }
);

export default connect(null, mapDispatchToProps)(AddPaymentView);
