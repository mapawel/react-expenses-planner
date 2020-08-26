// import styled from 'styled-components';
import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
    *, *::before, *::after {
        box-sizing: border-box;
        padding: 0;
        margin: 0;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;     
    }

    html {
        font-size: 62.5%;
    }

    body {
        background-color: ${({ theme }) => theme.color.white};
        font-family: 'Raleway', sans-serif;
        font-size: ${({ theme }) => theme.fontSize.m};
        overflow-x: hidden;
    }
`;
export default GlobalStyle;
