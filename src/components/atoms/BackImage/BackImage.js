import styled from 'styled-components';


const BackImage = styled.div`
    /* align-self: flex-start; */
    min-width: 15%;
    min-height: 550px;
    display: flex;
    flex-direction: column;
    align-content: center;
    padding-right: 15px;
    background-image: url(${({img}) => img});
    background-repeat: no-repeat;
    background-size: 80%;
    background-position: 50% 0%;
    opacity: 20%;

    @media (max-width: 780px) {
      display: none;
    }
`;

export default BackImage;
