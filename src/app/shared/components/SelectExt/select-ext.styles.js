import entries from 'object.entries';
// import styles from 'styles/variables';

const styles = {};

// https://deploy-preview-2289--react-select.netlify.com/styles
const defaultStyle = {
  menu: base => ({
    ...base,
    zIndex: 1040,
  }),

  menuPortal: base => ({
    ...base,
    zIndex: 9999,
  }),

  input: base => ({
    ...base,
    height: '21px',
    paddingTop: 0,
    paddingBottom: 0,
  }),

  valueContainer: base => ({
    ...base,
    maxHeight: '129px',
  }),

  loadingIndicator: base => ({
    ...base,
    span: {
      backgroundColor: styles.inputBorderColor,
    },
  }),

  indicatorSeparator: base => ({
    ...base,
    backgroundColor: styles.inputBorderColor,
  }),

  dropdownIndicator: base => ({
    ...base,
    minHeight: '21px',
    paddingTop: '4px',
    paddingBottom: '5px',
    color: styles.inputBorderColor,
  }),

  control: (base, state) => {
    let newStyles = {
      ...base,
      minHeight: '31px',
      backgroundColor: 'transparent',
      borderColor: styles.inputBorderColor,
      '&:hover': {
        borderColor: styles.inputBorderColor,
      },
    };
    if (state.isFocused) {
      const focusStyle = {
        borderColor: styles.inputBorderColor,
        boxShadow: styles.boxShadow,
      };
      newStyles = {
        ...newStyles,
        ...focusStyle,
        '&:hover': { ...focusStyle },
      };
    }
    return newStyles;
  },

  singleValue: base => ({
    ...base,
    color: styles.fontColor,
  }),

  multiValue: base => ({
    ...base,
    backgroundColor: styles.primary_50,
    border: `1px solid ${styles.inputBorderColor}`,
  }),

  multiValueLabel: base => ({
    ...base,
    color: styles.fontColor,
    padding: '1px 2px 1px 6px',
  }),

  multiValueRemove: base => ({
    ...base,
    color: styles.fontColor,
    cursor: 'pointer',
    ':hover': undefined,
  }),

  clearIndicator: base => ({
    ...base,
    paddingTop: 0,
    paddingBottom: 0,
  }),

  option: (base, { isFocused, isSelected }) => {
    let backgroundColor = 'transparent';
    if (isSelected) {
      backgroundColor = styles.primary_600;
    } else if (isFocused) {
      backgroundColor = styles.primary_100;
    }
    return {
      ...base,
      backgroundColor,
      ':active': {
        color: '#fff',
        backgroundColor: styles.primary_600,
      },
    };
  },
};

const readOnlyStyle = {
  control: base => ({
    ...base,
    borderColor: 'transparent',
  }),

  valueContainer: base => ({
    ...base,
    paddingLeft: 0,
    paddingRight: 0,
    maxHeight: 'none',
  }),

  singleValue: base => ({
    ...base,
    marginLeft: 0,
  }),

  multiValue: base => ({
    ...base,
    marginLeft: 0,
    marginRight: '4px',
  }),

  multiValueLabel: base => ({
    ...base,
    padding: '1px 6px 1px 6px',
  }),

  multiValueRemove: base => ({
    ...base,
    display: 'none',
  }),

  indicatorSeparator: base => ({
    ...base,
    display: 'none',
  }),

  dropdownIndicator: base => ({
    ...base,
    display: 'none',
  }),

  clearIndicator: base => ({
    ...base,
    display: 'none',
  }),

  placeholder: base => ({
    ...base,
    display: 'none',
  }),
};

const _styleDefs = {
  default: defaultStyle,
  readonly: readOnlyStyle,
};

const getStyles = names =>
  ['default', ...(Array.isArray(names) ? names : [names])]
    .filter(e => e)
    .reduce((prev, name) => {
      const styleDef = _styleDefs[name.toLowerCase()];
      if (!styleDef) {
        return prev;
      }
      return entries(styleDef).reduce((prevStyle, [k, v]) => {
        const prevFn = prevStyle[k];
        return {
          ...prevStyle,
          [k]: (base, state) => v(typeof prevFn === 'function' ? prevFn(base, state) : base, state),
        };
      }, prev);
    }, {});

export default defaultStyle;

export {
  defaultStyle,
  readOnlyStyle,
  getStyles,
};
