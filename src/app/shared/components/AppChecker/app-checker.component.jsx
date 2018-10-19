/* eslint-disable no-restricted-globals */
import { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Rx from 'rxjs/Rx';
import { setClientSize, setUrl } from 'stores/app.action';

class AppChecker extends PureComponent {
  componentDidMount() {
    this.subscriptions = [
      Rx.Observable.fromEvent(window, 'resize')
        .debounceTime(100)
        .subscribe(this.handleWindowResize),
    ];
    this.handleWindowResize();
    this.checkUrl();
  }

  componentWillUnmount() {
    this.subscriptions.forEach(subscription => subscription.unsubscribe());
    cancelAnimationFrame(this._animationFrame);
  }

  handleWindowResize = () => {
    const width = document.documentElement.clientWidth;
    const height = document.documentElement.clientHeight;
    this.props.setClientSize(width, height);
  }

  checkUrl = () => {
    cancelAnimationFrame(this._animationFrame);
    this._animationFrame = requestAnimationFrame(() => {
      if (this._href !== location.href) {
        this._href = location.href;
        this.props.setUrl(location.href);
      }
      this.checkUrl();
    });
  }

  render() {
    return null;
  }
}

AppChecker.propTypes = {
  setClientSize: PropTypes.func.isRequired,
  setUrl: PropTypes.func.isRequired,
};

const mapDispatchToProps = dispatch => ({
  setClientSize: (width, height) => dispatch(setClientSize(width, height)),
  setUrl: url => dispatch(setUrl(url)),
});

export default connect(null, mapDispatchToProps)(AppChecker);
