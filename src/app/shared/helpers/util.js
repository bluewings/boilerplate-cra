/* eslint-disable no-param-reassign, no-bitwise */
import React from 'react';
import { Map, List } from 'immutable';

let _storeRef = null;

const safeStringify = (obj, options = {}) => {
  const { ignoreReact = true } = options;
  if (typeof obj !== 'object') {
    return obj;
  }
  return JSON.stringify(obj, (key, value) => {
    if (ignoreReact && typeof value === 'object' && value !== null && React.isValidElement(value)) {
      return undefined;
    }
    return value;
  });
};

const arrayUnique = myArray => myArray.filter((v, i, a) => a.indexOf(v) === i);

const flattenMessages = (nestedMessages, prefix = '') => Object.keys(nestedMessages).reduce((messages, key) => {
  const value = nestedMessages[key];
  const prefixedKey = prefix ? `${prefix}.${key}` : key;
  if (typeof value !== 'object' || value === null) {
    messages[prefixedKey] = value;
  } else {
    Object.assign(messages, flattenMessages(value, prefixedKey));
  }
  return messages;
}, {});

const getAttrFromClosest = (source, attrName) => {
  const target = source.getAttribute(attrName) ? source : source.closest(`[${attrName}]`);
  if (target) {
    return target.getAttribute(attrName);
  }
  return null;
};

const getPropsWhenChanged = (nextProps = {}, prevState = {}, watch = []) => {
  const changed = watch.reduce((prev, name) => {
    if (prev === false) {
      if (Map.isMap(nextProps[name]) || Map.isMap(prevState[name]) ||
        List.isList(nextProps[name]) || List.isList(prevState[name])
      ) {
        if (nextProps[name] !== prevState[name]) {
          return true;
        }
      } else if (nextProps[name] !== prevState[name] || 
        safeStringify(nextProps[name]) !== safeStringify(prevState[name])
      ) {
        return true;
      }
    }
    return prev;
  }, false);

  // if there are no changes, returns false.
  if (!changed) {
    return false;
  }

  let _changedFields = null;

  const getChangedFields = () => {
    if (!_changedFields) {
      _changedFields = watch.reduce((prev, name) => {
        if (Map.isMap(nextProps[name]) || Map.isMap(prevState[name]) ||
             List.isList(nextProps[name]) || List.isList(prevState[name])
        ) {
          if (nextProps[name] !== prevState[name]) {
            return [...prev, name];
          }
        } else if (safeStringify(nextProps[name]) !== safeStringify(prevState[name])) {
          return [...prev, name];
        }
        return prev;
      }, []);
    }
    return _changedFields;
  };

  // provide a ObservedProps class that contains methods to check for changed fields.
  class ObservedProps {
    constructor() {
      watch.forEach((name) => {
        this[name] = nextProps[name];
      });
    }
  }

  ObservedProps.prototype.constructor = Object;

  ObservedProps.prototype.getChangedFields = getChangedFields;

  ObservedProps.prototype.hasChanged = (fields) => {
    const query = Array.isArray(fields) ? fields : [fields];
    const changedFields = getChangedFields();
    return query.reduce((prev, name) => {
      if (!prev && changedFields.indexOf(name) !== -1) {
        return true;
      }
      return prev;
    }, false);
  };

  return new ObservedProps();
};

const getStore = () => _storeRef;

const hashCode = (str) => {
  let hash = 0;
  if (typeof str === 'object' && str !== null) {
    str = safeStringify(str);
  }
  if (!str || str.length === 0) {
    return hash;
  }
  let i = 0;
  const len = str.length;
  while (i < len) {
    const chr = str.charCodeAt(i);
    hash = ((hash << 5) - hash) + chr;
    hash |= 0;
    i += 1;
  }
  const base16 = hash.toString(16).replace(/[^a-z0-9]/g, '');
  const base36 = hash.toString(36).replace(/[^a-z0-9]/g, '');
  hash = (parseInt(base16.substr(0, 1), 16) + 10).toString(36) + base36;
  return hash;
};

const randomId = (prefix = 'tmp-', length) => {
  let key;
  if (length == null) {
    length = 8;
  }
  key = parseInt(Math.random() * 1000000, 10).toString(36) +
    parseInt(Math.random() * 1000000, 10).toString(36);
  if (prefix) {
    key = prefix + key;
  }
  return key.substr(0, 8);
};

const setStore = (store) => {
  _storeRef = store;
};

const wait = ms => (new Promise(r => setTimeout(r, ms)));

export {
  arrayUnique,
  flattenMessages,
  getAttrFromClosest,
  getPropsWhenChanged,
  getStore,
  hashCode,
  randomId,
  setStore,
  wait,
};

export default {
  arrayUnique,
  flattenMessages,
  getAttrFromClosest,
  getPropsWhenChanged,
  getStore,
  hashCode,
  randomId,
  setStore,
  wait,
};
