import styled from 'styled-components';

const Header = styled.h1`
    font-size: ${({ theme }) => theme.fontSize.xxl};
    font-weight: ${({ theme }) => theme.fontWeight.bold};
    color: ${({ theme }) => ((theme.backtype) === 'secondary' ? theme.color.white : theme.color.darkgrey)};
    letter-spacing: .1rem;
    text-transform: ${({ uppercase }) => uppercase && 'uppercase'};
`;
export default Header;
