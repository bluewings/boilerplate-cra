const colors = require('./colors');

const modifyKeys = (object, prefix) => Object.keys(object).reduce((prev, level) => ({
  ...prev,
  [`${prefix}_${level}`]: object[level],
}), {});

const color_primary = colors.blue;

const bootstrap = {
  white: '#fff',
  black: '#000',
  // ...modifyKeys(colors.red, 'gray'),
  // ...modifyKeys(colors.blue, 'primary'),
  // ...modifyKeys(colors.blue, 'secondary'),
  // ...modifyKeys(colors.blue, 'danger'),
};

const styles = {
  color_primary,
  ...modifyKeys(colors, 'color'),
  ...bootstrap,
};


module.exports = styles;

// module.exports.default = styles;

// export default styles;


