import {
  compose,
  // hoc
  mapProps,
  withProps,
  withPropsOnChange,
  withHandlers,
  defaultProps,
  renameProp,
  renameProps,
  flattenProp,
  withState,
  withStateHandlers,
  withReducer,
  branch,
  renderComponent,
  renderNothing,
  shouldUpdate,
  pure,
  onlyUpdateForKeys,
  onlyUpdateForPropTypes,
  withContext,
  getContext,
  lifecycle,
  toClass,
  withRenderProps,
} from 'recompose';
import { connect } from 'react-redux';
import fromStore from './from-store.hoc';
import forwardRef from './forward-ref.hoc';
import withModalExt from './withModalExt';
import withContainerRect from './with-container-rect.hoc';

export {
  // from recompose
  compose,
  mapProps,
  withProps,
  withPropsOnChange,
  withHandlers,
  defaultProps,
  renameProp,
  renameProps,
  flattenProp,
  withState,
  withStateHandlers,
  withReducer,
  branch,
  renderComponent,
  renderNothing,
  shouldUpdate,
  pure,
  onlyUpdateForKeys,
  onlyUpdateForPropTypes,
  withContext,
  getContext,
  lifecycle,
  toClass,
  withRenderProps,
  // // from recompose
  connect,
  fromStore,
  forwardRef,
  withModalExt,
  withContainerRect,
};
