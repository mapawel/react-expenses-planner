import React from 'react';
import styled from 'styled-components';
import moment from 'moment';
import withContext from 'hoc/withContext';
import Header from 'components/atoms/Header/Header';

const StyledHeader = styled(Header)`
    margin: 0 auto;
    font-size: ${({ theme }) => theme.fontSize.l};
    color: ${({ theme }) => theme.color.darkblue};
    text-align: center;
`;

const DateHead = ({ currentTime }) => (
  <StyledHeader>
    {moment(currentTime).format('dddd')}
    <br />
    {moment(currentTime).format('DD/MM/YYYY')}
  </StyledHeader>
);
export default withContext(DateHead);
