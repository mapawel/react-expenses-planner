import React from 'react';
import Header from 'components/atoms/Header/Header';
import theme from 'themes/mainTheme';

export default {
  title: 'Headers',
  component: Header,
};

const Decorator = ({ children }) => (
  <div style={{
    backgroundColor: 'white', width: '700px', height: '200px',
  }}
  >
    {children}
  </div>
);

export const UppercaseBacktypeDark = () => <Header uppercase backtype="secondary">test big header</Header>;
export const UppercaseBacktypeWhite = () => <Decorator><Header uppercase>test big header</Header></Decorator>;
export const LowercaseBacktypeDark = () => <Header backtype="secondary">test middle dark header</Header>;
export const LowercaseBacktypeWhite = () => <Decorator><Header>test middle light header</Header></Decorator>;
