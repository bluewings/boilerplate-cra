/* eslint-disable no-return-assign */
import React, { PureComponent } from 'react';
import debounceFn from 'lodash/debounce';
import fromStore from './from-store.hoc';

const watch = ['top', 'left', 'right', 'bottom', 'width', 'height'];

export default (options = {}) => (BaseComponent) => {
  const { debounce = 0 } = options;

  class WithContainerRect extends PureComponent {
    state = { ready: false }

    componentDidMount() {
      this.checkRect();
    }

    componentWillUnmount() {
      cancelAnimationFrame(this.animationFrame);
    }
    
    updateRect = () => {
      const nextState = watch.reduce((prev, key) => {
        if (this.state[key] !== this.state[`_${key}`]) {
          return { ...prev, [key]: this.state[`_${key}`] };
        }
        return prev;
      }, {});
      if (Object.keys(nextState).length > 0) {
        this.setState(prevState => ({ ...prevState, ...nextState }));
      }
    }

    debounceUpdate = debounceFn(this.updateRect, debounce)

    checkRect = () => {
      cancelAnimationFrame(this.animationFrame);
      this.animationFrame = requestAnimationFrame(() => {
        if (this.wrapEl) {
          const rect = this.wrapEl && this.wrapEl.getBoundingClientRect();
          const nextState = watch.reduce((prev, key) => {
            const _key = `_${key}`;
            if (this.state[_key] !== rect[key]) {
              return { ...prev, [_key]: rect[key] };
            }
            return prev;
          }, {});
          if (Object.keys(nextState).length > 0) {
            this.setState(prevState => ({ ...prevState, ...nextState, ready: true }));
            this.debounceUpdate();
          }
        }
        this.checkRect();
      });
    }

    render() {
      return (
        <div ref={wrapEl => this.wrapEl = wrapEl}>
          {this.state.ready && (
          <BaseComponent
            {...this.props}
            containerTop={this.state.top || this.state._top || 0}
            containerLeft={this.state.left || this.state._left || 0}
            containerRight={this.state.right || this.state._right || 0}
            containerBottom={this.state.bottom || this.state._bottom || 0}
            containerWidth={this.state.width || this.state._width || 0}
            containerHeight={this.state.height || this.state._height || 0}
          />
          )}
        </div>
      );
    }
  }

  const enhance = fromStore(['clientWidth', 'clientHeight']);

  return enhance(WithContainerRect);
};
