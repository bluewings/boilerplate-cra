import { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { css } from 'emotion';
import Header from './Header';
/* eslint-disable no-unused-vars */
import Loading from '../Loading';
import SelectExt from '../SelectExt';


// jsx
import template from './layout.component.pug';

const bodyClass = css({
  /* ... */
});

class Layout extends PureComponent {
  componentDidMount() {
    document.body.classList.add(bodyClass);
  }

  componentWillUnmount() {
    document.body.classList.remove(bodyClass);
  }

  render() {
    const { children } = this.props;

    return template({
      // variables
      children,
      // components
      Header,
    });
  }
}

Layout.propTypes = {
  children: PropTypes.element.isRequired,
};

export default Layout;
