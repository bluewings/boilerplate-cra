// https://material.io/design/color/the-color-system.html#tools-for-picking-colors
const entries = require('object.entries');
const colors = require('./material-design-colors.json');

const styles = entries(colors).reduce((prevStyle, [_key, value]) => {
  const key = _key.replace(/\s+/g, '');
  return entries(value).reduce((prev, [level, rgb]) => ({
    ...prev,
    [`${key}_${level}`]: rgb,
  }), { ...prevStyle, [key]: value });
}, {});

module.exports = styles;
