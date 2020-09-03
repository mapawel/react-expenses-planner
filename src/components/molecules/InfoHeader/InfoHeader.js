import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import Paragraph from 'components/atoms/Paragraph/Paragraph';
import withContext from 'hoc/withContext';
import { connect } from 'react-redux';

const StyledHeader = styled(Paragraph)`
    font-weight: ${({ theme }) => theme.fontWeight.bold};
    color: ${({ theme }) => theme.color.darkgrey};
    text-transform: uppercase;
    text-align: center;
`;

const StyledAmmSpan = styled.span`
    color: ${({ theme }) => theme.color.darkblue};
    font-size: ${({ theme }) => theme.fontSize.l};
`;

const StyledCurSpan = styled.span`
    color: ${({ theme }) => theme.color.darkgrey};
    font-size: ${({ theme }) => theme.fontSize.s};
    `;

const InfoHeader = ({
  children, allPayments, topay, context: { displiedDate },
}) => {
  let sumTotalMonth = 0;
  let sumToPayMonth = 0;
  allPayments
    .filter((payment) => new Date(payment.deadline).getFullYear() === new Date(displiedDate).getFullYear())
    .filter((payment) => new Date(payment.deadline).getMonth() === new Date(displiedDate).getMonth())
    .forEach((payment) => { sumTotalMonth = payment.closed ? (sumTotalMonth + payment.paidAmmount) : (sumTotalMonth + payment.ammount); });
  allPayments
    .filter((payment) => new Date(payment.deadline).getFullYear() === new Date(displiedDate).getFullYear())
    .filter((payment) => new Date(payment.deadline).getMonth() === new Date(displiedDate).getMonth())
    .filter((payment) => payment.closed === false)
    .forEach((payment) => { sumToPayMonth += payment.ammount; });
  return (
    <StyledHeader>
      {children}
      <StyledAmmSpan>{topay ? sumToPayMonth : sumTotalMonth}</StyledAmmSpan>
      <StyledCurSpan>pln</StyledCurSpan>
    </StyledHeader>
  );
};

InfoHeader.propTypes = {
  children: PropTypes.node.isRequired,
  allPayments: PropTypes.arrayOf(PropTypes.object).isRequired,
  context: PropTypes.shape({
    displiedDate: PropTypes.instanceOf(Date).isRequired,
  }).isRequired,
  topay: PropTypes.number,
};

InfoHeader.defaultProps = {
  topay: null,
};

const mapStateToProps = ({ payments }) => ({
  allPayments: payments,
});

export default connect(mapStateToProps)(withContext(InfoHeader));
