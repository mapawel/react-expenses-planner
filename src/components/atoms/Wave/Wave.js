import styled from 'styled-components';

const Wave = styled.div`
    background-image: url(${({ image }) => image});
    background-repeat: no-repeat;
    background-size: cover;
    background-position: 50% 100%;
    width: 100%;
    height: 165px;
    margin-bottom: -30px;
    margin-top: 60px;
`;

export default Wave;