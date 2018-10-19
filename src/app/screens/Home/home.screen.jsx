import { PureComponent } from 'react';
import { default as testa } from '../../shared/styles/variables';

// jsx
import template from './home.screen.pug';
import { primary } from './home.screen.scss';


console.log(primary);
console.log(testa);

class Home extends PureComponent {
  render() {
    return template();
  }
}

export default Home;
