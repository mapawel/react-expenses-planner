import styled, { css } from 'styled-components';

const HeroCardImage = styled.div`
    position: relative;
    flex-shrink: 0;
    width: 100%;
    min-height: 220px;
    background-image: url(${({ theme, category }) => theme.images[category]});
    background-size: cover;
    background-repeat: no-repeat;
    background-position: 50% 50%;
    overflow: hidden;
    ::after {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: radial-gradient(circle, ${({ theme }) => theme.color.gradientWhiteStart} 50%, ${({ theme }) => theme.color.gradientWhiteFinish} 100%), ${({ theme }) => theme.color.blendWhite};
    }

    @media (min-width: 768px) {
      width: 240px;
      min-height: 260px;
    }

    ${({ theme: { backtype } }) => backtype === 'secondary' && css`
    ::after {
        background: radial-gradient(circle, ${({ theme }) => theme.color.gradientBlackStart} 50%, ${({ theme }) => theme.color.gradientBlackFinish} 100%), ${({ theme }) => theme.color.blendBlack};
    }
    `
    }
`;
export default HeroCardImage;
