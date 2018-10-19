import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import ModalExt from './ModalExt';

export default (options = {}) => {
  const {
    size = 'md',
  } = options;

  return (BaseComponent) => {
    class WithModalExt extends PureComponent {
      state = { isOpen: true }
  
      handleClose = () => {
        const { type, result, reason } = this.state.callback || {};
        setTimeout(() => {
          if (type === 'close') {
            this.props.onClose(result);
          } else {
            this.props.onDismiss(reason);
          }
        });
      }
  
      close = (result) => {
        if (this.state.isOpen) {
          this.setState(prevState => ({
            ...prevState,
            isOpen: false,
            callback: {
              type: 'close',
              result,
            },
          }));
        }
      }

      dismiss = (reason) => {
        if (this.state.isOpen) {
          this.setState(prevState => ({
            ...prevState,
            isOpen: false,
            callback: {
              type: 'dismiss',
              reason,
            },
          }));
        }
      }
  
      toggle = () => {}
  
      render() {
        const {
          isOpen,
        } = this.state;
  
        return (
          <ModalExt
            isOpen={isOpen}
            onClosed={this.handleClose}
            size={size}
            toggle={this.toggle}
          >
            <BaseComponent
              {...this.props}
              ModalHeader={ModalHeader}
              ModalBody={ModalBody}
              ModalFooter={ModalFooter}
              close={this.close}
              dismiss={this.dismiss}
            />
          </ModalExt>
        );
      }
    }
  
    WithModalExt.propTypes = {
      onClose: PropTypes.func,
      onDismiss: PropTypes.func,
    };
  
    WithModalExt.defaultProps = {
      onClose: () => {},
      onDismiss: () => {},
    };
  
    return WithModalExt;
  };
};
