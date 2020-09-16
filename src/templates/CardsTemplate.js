import styled from 'styled-components';

const CardsTemplate = styled.div`
    display: grid;
    grid-template-columns: minmax(330px, 420px);
    grid-column-gap: 35px;
    grid-row-gap: 45px;
    min-height: 50vh;
    &>div:first-of-type{
        grid-column-start: 1;
    }

    @media (min-width: 768px) {
        grid-template-columns: minmax(555px, 750px);
        grid-row-gap: 65px;
    }

    @media (min-width: 1350px) {
        grid-template-columns: repeat(2, minmax(480px, 650px));
    }
`;
export default CardsTemplate;
