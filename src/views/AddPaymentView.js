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

const StyledLink = styled(Link)`
  text-decoration: none;
`;

const StyledDataPickerBox = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
`;

class AddPaymentView extends React.Component {
  state = {
    [dataShape.category]: '---',
    [dataShape.title]: '',
    [dataShape.description]: '',
    [dataShape.ammount]: '',
    [dataShape.deadline]: '',
    [dataShape.cycle]: '',
  };

  handleInputChange = (e) => {
    const changedInput = e.target;
    this.setState(() => {
      let changedInputValue = changedInput.value;
      if (changedInput.name === dataShape.ammount) changedInputValue = changedInput.value * 1;
      return { [changedInput.name]: changedInputValue };
    });
  };

  handleDeadlineInputChange = (date) => {
    this.setState({
      [dataShape.deadline]: date,
    });
  }

  render() {
    const { history: { goBack }, addNewPaymentFn } = this.props;
    const {
      [dataShape.category]: category, [dataShape.title]: title, [dataShape.description]: description, [dataShape.ammount]: ammount, [dataShape.deadline]: deadline, [dataShape.cycle]: cycle,
    } = this.state;
    return (
      <SectionTemplate backtype="secondary">
        <StyledWrapper>
          <StyledHead>
            <Logo />
            <Button round={1} />
          </StyledHead>
          <StyledForm onSubmit={(e) => e.preventDefault()}>
            <StyledHeader>add a new payment:</StyledHeader>

            <StyledInput
              select={['---', ...dataShape.categories.map((category) => [category])]}
              name={dataShape.category}
              id={dataShape.category}
              onChange={(e) => this.handleInputChange(e)}
              value={category}
              labelTxt="choose category"
            >
              payment's category:
            </StyledInput>

            <StyledInput
              name={dataShape.title}
              id={dataShape.title}
              onChange={(e) => this.handleInputChange(e)}
              value={title}
              labelTxt="short title"
            >
              payment's title:
            </StyledInput>

            <StyledInput
              name={dataShape.ammount}
              id={dataShape.ammount}
              onChange={(e) => this.handleInputChange(e)}
              value={ammount}
              labelTxt="value"
            >
              planned ammount:
            </StyledInput>

            <StyledInput
                datepicker
                name={dataShape.deadline}
                id={dataShape.deadline}
                onChange={this.handleDeadlineInputChange}
                value={deadline}
                minDate={new Date()}
                locale="en-EN"
                format="dd/MM/y"
            >
              choose deadline:
            </StyledInput>

            <StyledInput
              name={dataShape.cycle}
              id={dataShape.cycle}
              onChange={(e) => this.handleInputChange(e)}
              value={cycle}
              labelTxt="recurrence"
            >
              choose cycle:
            </StyledInput>

            <StyledInput
              textarea={1}
              name={dataShape.description}
              id={dataShape.description}
              onChange={(e) => this.handleInputChange(e)}
              value={description}
              labelTxt="some notes"
            >
              description:
            </StyledInput>

            <StyledButtonsBox>
              <Button
              onClick={() => addNewPaymentFn(this.state)}
              >add</Button>
              <Button
                onClick={goBack}
              >
                go back
              </Button>
            </StyledButtonsBox>
          </StyledForm>
        </StyledWrapper>
      </SectionTemplate>
    );
  }
}

const mapDispatchToProps = (dispatch) => (
  {addNewPaymentFn: (newPayment) => dispatch(addNewPayment(newPayment))}
)

export default connect(null, mapDispatchToProps)(AddPaymentView);
