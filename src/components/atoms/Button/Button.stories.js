import React from 'react';
import Button from 'components/atoms/Button/Button';
import lefArrowIcon from 'assets/icons/chevronleft.svg';

export default {
  title: 'buttones',
  component: Button,
};

const Decorator = ({ children }) => (
  <div style={{
    backgroundColor: 'white', width: '700px', height: '200px', padding: '40px',
  }}
  >
    {children}
  </div>
);

export const normalWhiteBck = () => <Decorator><Button>month`s details</Button></Decorator>;
export const normalDarkBck = () => <Button>month`s details</Button>;

export const iconWhiteBck = () => <Decorator><Button icon={lefArrowIcon}>month`s details</Button></Decorator>;
export const iconDarkBck = () => <Button icon={lefArrowIcon}>month`s details</Button>;

export const roundWhiteBck = () => <Decorator><Button round={1} icon={lefArrowIcon} /></Decorator>;
export const roundDarkBck = () => <Button round={1} icon={lefArrowIcon} />;
