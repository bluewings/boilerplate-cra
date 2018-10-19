/* eslint-disable react/prop-types */
import React from 'react';

export default (type = 'outer') => (BaseComponent) => {
  if (type === 'outer') {
    return React.forwardRef((props, ref) => <BaseComponent {...props} __forwardRef={ref} />);
  }

  function ForwardRef(props) {
    const { __forwardRef } = props;
    const nextProps = { ...props };
    delete nextProps.__forwardRef;
    return (
      <BaseComponent {...nextProps} ref={__forwardRef} />
    );
  }

  return ForwardRef;
};

