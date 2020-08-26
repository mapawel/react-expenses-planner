import React from 'react';
import Card from 'components/organisms/Card/Card';

export default {
  title: 'cards',
  component: Card,
};

const Decorator = ({ children }) => (
  <div style={{
    backgroundColor: 'white', width: '375px', height: '700px', padding: '5px',
  }}
  >
    {children}
  </div>
);

export const backtypeWhite = () => (
  <Decorator>
    <Card
      category="car"
      title="insurance"
      ammount={2450}
      description="some short desription about something to have 2 lines of textsome short desription about"
      deadline={1597938472403}
      cycle="each year"
    />
  </Decorator>
);
