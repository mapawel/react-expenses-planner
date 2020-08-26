import React from 'react';
import Paragraph from 'components/atoms/Paragraph/Paragraph';

const Decorator = ({ children }) => (
  <div style={{
    backgroundColor: 'white', width: '700px', height: '200px',
  }}
  >
    {children}
  </div>
);

export default {
  title: 'paragraphs',
  component: Paragraph,
};

export const normalBacktypeWhite = () => <Decorator><Paragraph>test paragraph hello hello World</Paragraph></Decorator>;
export const normalBacktypeDark = () => <Paragraph backtype="secondary">test paragraph hello hello World</Paragraph>;
export const smallBackTypeWhite = () => <Decorator><Paragraph small>test paragraph hello hello World</Paragraph></Decorator>;
export const smallBackTypeDark = () => <Paragraph small backtype="secondary">test paragraph hello hello World</Paragraph>;
export const bigBackTypeWhite = () => <Decorator><Paragraph big>test paragraph hello hello World</Paragraph></Decorator>;
export const bigBackTypeDark = () => <Paragraph big backtype="secondary">test paragraph hello hello World</Paragraph>;
