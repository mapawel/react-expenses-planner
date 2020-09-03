import styled, { css } from 'styled-components';

const Paragraph = styled.p`
    color: ${({ theme }) => (theme.backtype === 'secondary' ? theme.color.almostblack : theme.color.darkblue)};
    font-weight: ${({ theme }) => theme.fontWeight.semibold};
    font-size: ${({ theme }) => theme.fontSize.m};

    ${({ small }) => small && css`
        color: ${({ theme }) => (theme.backtype === 'secondary' ? theme.color.lightgrey : theme.color.darkgrey)};
        font-weight: ${({ theme }) => theme.fontWeight.normal};
        font-size: ${({ theme }) => theme.fontSize.xs};
    `
}

    ${({ big }) => big && css`
        color: ${({ theme }) => (theme.backtype === 'secondary' ? theme.color.almostblack : theme.color.white)};
        font-weight: ${({ theme }) => theme.fontWeight.bold};
        font-size: ${({ theme }) => theme.fontSize.l};
    `
}
`;

export default Paragraph;
