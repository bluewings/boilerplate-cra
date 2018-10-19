import { PureComponent } from 'react';
// import EntityEditPanel from 'components/EntityEditPanel';

// jsx, styles
import template from './error.screen.pug';

class Error extends PureComponent {
  render() {
    return template.call(this);
  }
}

export default Error;
