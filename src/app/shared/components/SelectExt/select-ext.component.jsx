import { PureComponent } from 'react';
import Select from 'react-select';
import { List } from 'immutable';
import _ from 'lodash';
import entries from 'object.entries';
import memoize from 'memoize-one';
import { hashCode } from 'helpers/util';
import { getStyles } from './select-ext.styles';

// jsx
import template from './select-ext.component.pug';

class SelectExt extends PureComponent {
  state = {};

  _customStyles = memoize((readOnly, styles) => {
    const defaultStyles = getStyles(readOnly && 'readOnly');
    return styles
      .map((currentValue, index, array) =>
        (index % 2 !== 1 ? null : { k: array[index - 1], v: currentValue }))
      .filter(e => e && typeof e.v === 'function')
      .reduce((prev, { k, v }) => ({
        ...prev,
        [k]: (base, state) => v(typeof defaultStyles[k] === 'function' ? defaultStyles[k](base, state) : base, state),
      }), { ...defaultStyles });
  })

  customStyles = (readOnly, styles) =>
    this._customStyles(readOnly, [].concat(...entries(styles || {})))

  isMulti = memoize((multi, isMulti) => multi || isMulti)

  selectedValue = memoize((options, value, isMulti) => {
    const _options = (options || []).reduce((prev, curr) =>
      (Array.isArray(curr.options) ? [...prev, ...curr.options] : [...prev, curr]), []);
    let selectedValue;
    if (isMulti) {
      if (Array.isArray(value) && value.length > 0) {
        selectedValue = typeof value[0] === 'object' ? value : _options.filter(e => value.indexOf(e.value) !== -1);
      } else if (List.isList(value) && value.size > 0) {
        selectedValue = value
          .map(eachValue => options.filter(e => e.value === eachValue)[0])
          .filter(e => e).toArray();
      }
    } else if (!_.isNil(value)) {
      selectedValue = _options.find((e) => {
        if (typeof value === 'string') return e.value === value;
        if (typeof value === 'object' && value.value) return e.value === value.value;
        return false;
      });
    }
    return selectedValue;
  })

  key = memoize((options, isMulti) => `select-ext-${hashCode({ options, isMulti })}`)

  render() {
    const { props } = this;
    const customStyles = this.customStyles(props.readOnly, props.styles);
    const isMulti = this.isMulti(props.multi, props.isMulti);
    const isDisabled = props.readOnly || props.disabled || props.isDisabled;
    const selectedValue = this.selectedValue(props.options, props.value, isMulti);
    const key = this.key(props.options, isMulti);

    return template({
      // variables
      customStyles,
      isDisabled,
      isMulti,
      key,
      props,
      value: selectedValue,
      // components
      Select,
    });
  }
}

export default SelectExt;
