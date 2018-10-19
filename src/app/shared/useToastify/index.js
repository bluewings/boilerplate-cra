import React from 'react';
import { toast, ToastContainer as Original } from 'react-toastify';
import { css } from 'emotion';

const className = css({
  // border: '5px solid red',
  '> div': {
    // border: '5px solid blue',
  },
});

const ToastContainer = () => (
  <Original 
    closeButton={<div>x</div>} 
    position={toast.POSITION.BOTTOM_RIGHT}
    className={className}
  />
);

export {
  toast, ToastContainer,
};
