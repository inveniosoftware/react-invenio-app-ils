import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

configure({ adapter: new Adapter() });

jest.spyOn(Date, 'now').mockImplementation(() => 1572220800000);

// fail on console.warning
global.console.warn = (message) => {
  throw message;
};

// fail con console.error
global.console.error = (message) => {
  throw message;
};
