import React from 'react';
import PropTypes, { string } from 'prop-types';
import styled, { css, keyframes } from 'styled-components';
import Button from 'components/atoms/Button/Button';
import Paragraph from 'components/atoms/Paragraph/Paragraph';

const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

const fadeOut = keyframes`
  from {
    opacity: 1;
  }
  to {
    opacity: 0;
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
    animation: .25s ${fadeIn} both;
    ${({ isClosing, closingTime }) => isClosing && css`
    animation: ${`${closingTime / 1000}s`} ${fadeOut} both;
    `}


`;
const StylecModalBox = styled.div`
    min-width: 320px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    margin: 0 10px;
    padding: 70px 50px;
    border-radius: 10px;
    box-shadow: 7px 7px 25px -5px ${({ theme }) => theme.color.lightshadow};
    background-color: ${({ theme }) => theme.color.almostblack};
    &>p:first-of-type{
      text-align: center;
      width: 100%;
      margin-bottom: 50px;
    }
    &>div{
      height: 120px;
      display: flex;
      flex-direction: column;
      flex-wrap: wrap;
      justify-content: space-between;
      align-items: center;
      max-width: 600px;
    }

    @media screen and (min-width: 992px) {
      &>div{
      height: auto;
      width: 360px;
      display: flex;
      flex-direction: row;
      flex-wrap: nowrap;
      justify-content: space-between;
      align-items: center;
      max-width: 600px;
    }
    }
`;

class ConfirmModal extends React.Component {
  state = {
    isClosing: false,
  }

  fadeOut = () => {
    this.setState({
      isClosing: true,
    });
  }

  render() {
    const {
      children, yes, no, closingTime,
    } = this.props;
    const { isClosing } = this.state;
    return (
      <StyledModal isClosing={isClosing} closingTime={closingTime}>
        <StylecModalBox>
          <Paragraph big>
            {children}
          </Paragraph>
          <div>
            <Button
              onClick={() => { this.fadeOut(); no(); }}
            >
              No
            </Button>
            <Button
              onClick={yes}
            >
              Yes
            </Button>
          </div>
        </StylecModalBox>
      </StyledModal>
    );
  }
}

ConfirmModal.propTypes = {
  children: PropTypes.oneOfType([PropTypes.string, PropTypes.arrayOf(string)]).isRequired,
  yes: PropTypes.func.isRequired,
  no: PropTypes.func.isRequired,
  closingTime: PropTypes.number.isRequired,
};

export default ConfirmModal;
