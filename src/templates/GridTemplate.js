import React from 'react';
import styled from 'styled-components';

const StyledWrapper = styled.div`
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    grid-template-rows: auto 30px auto auto auto;
    gap: 10px;
    grid-auto-flow: row;
    margin: 40px auto;
    align-items: center;
    & * {
        margin: 5px;
    }
    & > button:first-of-type{
        grid-row: 3/4;
        grid-column: 1/3;
    }
    & > a:first-of-type{
        display: grid;
        grid-row: 4/5;
        grid-column: 1/3;
    }
    & > p:first-of-type{
        grid-row: 5/6;
    }
    & > p:last-of-type{
        grid-row: 5/6;
    }

    @media (min-width: 576px) {
    grid-template-columns: repeat(2, 244px);
    }

    @media (min-width: 992px) {
    grid-template-columns: repeat(3, 244px);
    & > button:first-of-type{
        grid-column: 1/2;
    }
    & > a:first-of-type{
        grid-column: 1/2;
    }
    & > p:first-of-type{
        grid-row: 3/4;
        grid-column: 3/4;
    }
    & > p:last-of-type{
        grid-row: 4/5;
        grid-column: 3/4;
    }
    & > h1:last-of-type{
        grid-row: 1/2;
        grid-column: 3/4;
    }
    }

    @media (min-width: 1560px) {
    grid-template-columns: repeat(6, 244px);
    & > p:first-of-type{
        grid-column: 6/7;
    }
    & > p:last-of-type{
        grid-column: 6/7;
    }
    & > h1:last-of-type{
        grid-column: 6/7;
    }
    }
`;

const GridTemplate = ({ children }) => (
    <StyledWrapper>
        {children}
    </StyledWrapper>
);
export default GridTemplate;
