import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import moment from 'moment';
import withContext from 'hoc/withContext';
import Header from 'components/atoms/Header/Header';

const StyledHeader = styled(Header)`
    margin: 0 auto;
    font-size: ${({ theme }) => theme.fontSize.l};
    color: ${({ theme }) => theme.color.darkblue};
    text-align: center;
`;

const DateHead = ({ context: { currentTime } }) => (
  <StyledHeader>
    {moment(currentTime).format('dddd')}
    <br />
    {moment(currentTime).format('DD/MM/YYYY')}
  </StyledHeader>
);

DateHead.propTypes = {
  context: PropTypes.shape({
    currentTime: PropTypes.instanceOf(Date).isRequired,
  }).isRequired,
};

export default withContext(DateHead);
