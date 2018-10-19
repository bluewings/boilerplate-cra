/* eslint-disable no-unused-vars */
import { Fragment, PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import memoize from 'memoize-one';

// jsx, styles
import template from './header.component.pug';

class Header extends PureComponent {
  fixed = memoize((fixed) => {
    if (!fixed) {
      return null;  
    }
    return fixed === 'bottom' ? 'fixed-bottom' : 'fixed-top';
  })

  render() {
    const fixed = this.fixed(this.props.fixed);

    return template({
      // variables
      fixed,
      // components
      Fragment,
      Link,
    });
  }
}

Header.propTypes = {
  fixed: PropTypes.oneOfType([
    PropTypes.bool,
    PropTypes.oneOf(['top', 'bottom']),
  ]),
};

Header.defaultProps = {
  fixed: false,
};

const mapStateToProps = state => ({ });

const mapDispatchToProps = dispatch => ({ });

const enhance = connect(mapStateToProps, mapDispatchToProps);

export default enhance(Header);
