import holiday from 'assets/images/paradise-1110498_640.jpg';
import home from 'assets/images/furniture-3042835_640.jpg';
import car from 'assets/images/steering-wheel-1130626_640.jpg';
import family from 'assets/images/child-1111818_640.jpg';

const mainTheme = {
  color: {
    darkblue: '#116285',
    secondary: '#116285',
    lightblue: '#A7D0E1',
    almostblack: '#0F2027',
    white: '#FFFFFF',
    darkgrey: '#676767',
    lightgrey: '#C9C9C9',
    lightshadow: '#00000060',
    darkshadow: '#000000aa',
    gradientWhiteStart: '#FFFFFF00',
    gradientWhiteFinish: '#FFFFFFEA',
    blendWhite: '#ffffff85',
    gradientBlackStart: '#00000000',
    gradientBlackFinish: '#000000EA',
    blendBlack: '#00000085',
  },
  fontSize: {
    xs: '1rem',
    s: '1.2rem',
    m: '1.4rem',
    l: '2rem',
    xl: '2.4rem',
    xxl: '3.6rem',
    xxxl: '4.4rem',
  },
  fontWeight: {
    normal: '400',
    semibold: '500',
    bold: '600',
  },
  images: {
    holiday,
    home,
    car,
    family,
  },
};

export default mainTheme;
