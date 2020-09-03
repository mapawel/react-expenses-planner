import styled from 'styled-components';

const NavWave = styled.div`
    background-image: url(${({ image }) => image});
    background-repeat: no-repeat;
    background-size: contain;
    background-position: -235px 0%;
    width: 100%;
    height: 34px;
    margin-bottom: 0px;
    margin-top: -1px;
`;

export default NavWave;
