/* eslint-disable max-len */
import React from 'react';
import PropTypes from 'prop-types';
// import { ModalExt as Modal } from 'react-bootstrap';
import { Modal } from 'reactstrap';
// import { Rx, createObservable } from 'useRx';

// jsx, styles
import template from './modal-ext.component.pug';

// const CONTENT_HEIGHT_CHANGE = 'CONTENT_HEIGHT_CHANGE';

class ModalExt extends React.PureComponent {
  state = {
    minHeight: null,
    maxHeight: null,
  }

  // componentDidMount() {
  //   const { observer, observable } = createObservable();
  //   this.observer = observer;

  //   this.subscriptions = [
  //     Rx.Observable.merge(
  //       observable.filter(e => e.type === CONTENT_HEIGHT_CHANGE),
  //       Rx.Observable.fromEvent(window, 'resize'),
  //       Rx.Observable.fromEvent(window, 'scroll'),
  //     ).debounceTime(100).subscribe(this.handleResize),
  //   ];

  //   this.handleResize();
  //   this.checkContentHeight();
  //   setTimeout(this.handleResize, 100);
  // }

  // componentWillUnmount() {
  //   cancelAnimationFrame(this.animationFrame);
  //   this.subscriptions.forEach(subscription => subscription.unsubscribe());
  // }

  // checkContentHeight = () => {
  //   if (this.dialog) {
  //     const contentHeight = Math.max(...Array.prototype.slice.call(this.dialog.querySelectorAll('.content-wrap'))
  //       .map(e => e.getBoundingClientRect().height));
  //     if (this.contentHeight !== contentHeight) {
  //       this.contentHeight = contentHeight;
  //       this.observer(CONTENT_HEIGHT_CHANGE);
  //     }
  //   }
  //   this.animationFrame = requestAnimationFrame(this.checkContentHeight);
  // }

  // handleResize = () => {
  //   if (this.bodyEl) {
  //     if (!this.dialog) {
  //       this.dialog = this.bodyEl.closest('.modal-dialog');
  //     }
  //     const rect = {
  //       header: this.dialog.querySelector('.modal-header').getBoundingClientRect(),
  //       body: this.dialog.querySelector('.modal-body').getBoundingClientRect(),
  //       footer: this.dialog.querySelector('.modal-footer').getBoundingClientRect(),
  //     };
  //     const modalContent = this.dialog.querySelector('.modal-content');
  //     const modalBody = this.dialog.querySelector('.modal-body');
  //     const computedStyle = window.getComputedStyle(this.dialog);
  //     const marginTop = parseInt(computedStyle.marginTop, 10);
  //     const marginBottom = parseInt(computedStyle.marginBottom, 10);
  //     const dialogStyle = window.getComputedStyle(modalContent);

  //     const borderTop = parseInt(dialogStyle.borderTopWidth, 10);
  //     const borderBottom = parseInt(dialogStyle.borderBottomWidth, 10);
  //     const { clientHeight } = document.documentElement;
  //     const maxHeight = clientHeight
  //       - marginTop - marginBottom
  //       - rect.header.height - rect.footer.height
  //       - borderTop - borderBottom;

  //     if (this.contentHeight) {
  //       const minHeight = Math.min(maxHeight, this.contentHeight);
  //       modalBody.style.minHeight = `${minHeight}px`;
  //     }
  //     this.setState((prevState) => {
  //       const nextState = {
  //         ...prevState,
  //         maxHeight,
  //       };
  //       if (this.contentHeight) {
  //         nextState.minHeight = Math.min(maxHeight, this.contentHeight);
  //       }
  //       return nextState;
  //     });
  //   }
  // }

  render() {
    const {
      props: {
        children,
        Footer,
        Header,
        padding,
        show,
        size,
      },
      state: {
        maxHeight,
        minHeight,
      },
    } = this;

    return template.call(this, {
      // variables
      children,
      unused_maxHeight: maxHeight,
      unused_minHeight: minHeight,
      unused_padding: padding,
      unused_show: show,
      unused_size: size,
      unused_Footer: Footer,
      unused_Header: Header,
      // components
      Modal,
    });
  }
}

ModalExt.propTypes = {
  children: PropTypes.element,
  Footer: PropTypes.element,
  Header: PropTypes.element,
  padding: PropTypes.number,
  show: PropTypes.bool,
  size: PropTypes.string,
};

ModalExt.defaultProps = {
  children: null,
  Footer: () => null,
  Header: () => null,
  padding: 15,
  show: true,
  size: 'lg',
};

export default ModalExt;
