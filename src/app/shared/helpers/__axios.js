/* eslint-disable */
import axios from 'axios';
import debounce from 'lodash/debounce';
import { getIn } from 'immutable';
// import { getCodeMap } from '@server/codes';
import { getStore } from '../helpers/util';

const sessionExpired = () => {
  alert('Please reconnect to Platform. Move to login page.');
  location.href = '/login';
};

/**
 * graphql요청이 동시에 날라가는경우 얼럿을 여러번 띄위게 되므로 debounce처리한다.
 */
const goLoginPage = debounce(sessionExpired, 1000);

/**
 * 모든 axios request에 타임아웃 10초를 설정한다.
 */
axios.defaults.timeout = 10000;
axios.defaults.headers.post['Content-Type'] = 'application/json';

axios.interceptors.request.use((config) => {
  // console.log('request intercentors');
  // console.log(config);
  const reduxData = getStore().getState();
  const language = getIn(reduxData, ['intl', '@intl', 'language']);
  config.headers['X-Accept-Language'] = language;
  return config;
}, error => Promise.reject(error));

/**
 * LAD_NEO_SES 쿠키 새션이 만료되었을경우에 얼럿을 띄우고 로그인페이지로 이동한다.
 */
axios.interceptors.response.use((response) => {
  const errors = _.get(response, 'data.errors', []);
  if (errors.length > 0) {
    const error = errors[0];
    const status = getIn(error, ['status']);
    if (status === 401) {
      return goLoginPage();
    }
    return Promise.reject(error);
  }
  return response;
}, (error) => {
  console.log('response intercentors error handler');
  console.log(error.response);
  const status = getIn(error.response, ['status']);
  const path = getIn(error.response, ['data', 'message', 'path'], '');
  const message = getIn(error.response, ['data', 'message'], '');
  const translationId = getIn(error.response, ['data', 'translationId'], '');
  const translation = getIn(error.response, ['data', 'translation'], '');
  if (status === 401 || path === '/v1/sessions/me' || message === 'INVALID_LOGIN') {
    return goLoginPage();
  }

  // server와 client validation을 동시에 활용하기위해서 reject전에 translationId값을 채워줌.
  if (error.response) {
    error.response.translationId = translationId;
    error.response.translation = translation;
  }

  return Promise.reject(error.response);
});

export default axios;
