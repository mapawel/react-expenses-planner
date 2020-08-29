import React from 'react';
import styled from 'styled-components';
import Paragraph from 'components/atoms/Paragraph/Paragraph';

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

const InfoHeader = ({ children }) => (
    <StyledHeader>
        {children}
        <StyledAmmSpan>4567</StyledAmmSpan>
        <StyledCurSpan>pln</StyledCurSpan>
    </StyledHeader>
);
export default InfoHeader;
