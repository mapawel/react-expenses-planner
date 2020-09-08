/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import Paragraph from 'components/atoms/Paragraph/Paragraph';
import { inputMixin } from 'components/atoms/Input/inputMixin';
import DatePicker from 'react-date-picker/dist/entry.nostyle';
import 'components/atoms/Input/datePiskerStyle.css';

const StyledWrapper = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
`;

const StyledInputContainer = styled.div`
    width: 100%;
    position: relative;
    z-index: 0;
    &:focus-within {
      z-index: 1;
    }
`;

const StyledSelect = styled.select`
${inputMixin};
`;

const StyledInput = styled.input`
${inputMixin};
`;

const StyledTextArea = styled.textarea`
    ${inputMixin};
    border-radius: 10px;
    min-height: 100px;
    padding-top: 30px;
    &:focus ~label, &:not(:placeholder-shown) ~label {
        transform: scale(.6) translate(-40%, 0);
        top: 5px;
    }
`;

const StyledLabel = styled.label`
    position: absolute;
    left: 20px;
    top: 50%;
    transform: translate(0, -50%);
    color: ${({ theme }) => theme.color.lightgrey};
    letter-spacing: .05rem;
    font-style: italic;
    transition: .3s;
`;

const StyledOption = styled.option`
    color: ${({ theme }) => theme.color.white};
    background-color: ${({ theme }) => theme.color.darkblue};
`;

const StyledInputHeader = styled(Paragraph)`
    margin-left: 5px;
    margin-bottom: 10px;
    font-size: ${({ theme }) => theme.fontSize.m};
    letter-spacing: .05rem;
    color: ${({ theme }) => theme.color.white};
    text-transform: uppercase;
`;

const Input = ({
  select, textarea, id, onChange, value, labelTxt, children, className, name, minDate, locale, datepicker, format, headerTxt, ...props
}) => {
  let Tag = select ? StyledSelect : StyledInput;
  Tag = textarea ? StyledTextArea : Tag;
  Tag = datepicker ? DatePicker : Tag;
  const options = select ? select.map((sel) => <StyledOption key={sel} value={sel}>{sel}</StyledOption>) : null;

  return (
    <StyledWrapper
      className={className}
    >
      <StyledInputHeader>
        {headerTxt}
      </StyledInputHeader>
      <StyledInputContainer>
        <Tag
          key={id}
          name={name}
          type="text"
          id={id}
          placeholder=" "
          autoComplete="off"
          onChange={onChange}
          value={value}
          minDate={minDate}
          locale={locale}
          format={format}
          {...props}
        >
          {select && options}

        </Tag>

        <StyledLabel
          htmlFor={id}
        >
          {labelTxt}
        </StyledLabel>
        {children}
      </StyledInputContainer>
    </StyledWrapper>
  );
};

Input.propTypes = {
  select: PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.string, PropTypes.node])),
  textarea: PropTypes.oneOf([1]),
  id: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number, PropTypes.instanceOf(Date)]),
  labelTxt: PropTypes.string,
  children: PropTypes.node,
  className: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  minDate: PropTypes.instanceOf(Date),
  locale: PropTypes.string,
  datepicker: PropTypes.oneOf([1]),
  format: PropTypes.string,
  headerTxt: PropTypes.string,
};

Input.defaultProps = {
  select: null,
  textarea: null,
  value: undefined,
  labelTxt: null,
  children: null,
  minDate: null,
  locale: 'en-EN',
  datepicker: null,
  format: 'dd/MM/y',
  headerTxt: null,
};

export default Input;
