import { connect } from 'react-redux';
import { getIn } from 'immutable';

const defined = {
  clientWidth: state => getIn(state, ['app', 'clientSize', 'width']),
  clientHeight: state => getIn(state, ['app', 'clientSize', 'height']),
  url: state => getIn(state, ['app', 'url']),
  env: state => getIn(state, ['app', 'env']),
};

export default (names = []) => {
  const mapStateToProps = state => names.reduce(
    (prev, name) => 
      ({ ...prev, [name]: defined[name](state) })
    , {},
  );
  return connect(mapStateToProps);
};
