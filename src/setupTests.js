import { configure } from 'enzyme';
import Adapter from '@cfaester/enzyme-adapter-react-18';

configure({ adapter: new Adapter() });

jest.spyOn(Date, 'now').mockImplementation(() => 1572220800000);

// React 18 + Enzyme adapter produces some expected warnings that we should ignore
const IGNORED_PATTERNS = [
  /Warning: %s: Support for defaultProps will be removed from function components/,
  /Warning: findDOMNode is deprecated/,
];

const shouldIgnore = (message) => {
  const msg = typeof message === 'string' ? message : String(message);
  return IGNORED_PATTERNS.some((pattern) => pattern.test(msg));
};

// fail on console.warning (except ignored patterns)
global.console.warn = (message) => {
  if (!shouldIgnore(message)) {
    throw message;
  }
};

// fail on console.error (except ignored patterns)
global.console.error = (message) => {
  if (!shouldIgnore(message)) {
    throw message;
  }
};

//Mocking matchMedia: https://jestjs.io/docs/en/manual-mocks#mocking-methods-which-are-not-implemented-in-jsdom
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: (query) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: jest.fn(), // deprecated
    removeListener: jest.fn(), // deprecated
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    dispatchEvent: jest.fn(),
  }),
});
