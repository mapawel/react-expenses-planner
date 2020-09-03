/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import AppContext from 'context';

const withContext = (Component) => function contextComponent(props) {
  return (
    <AppContext.Consumer>
      {(context) => <Component {...props} context={context} />}
    </AppContext.Consumer>
  );
};
export default withContext;
