import history from '@history';
import React from 'react';
import 'react-app-polyfill/ie11'; // For IE 11 support
import ReactDOM from 'react-dom';
import { OverridableContext } from 'react-overridable';
import { Router } from 'react-router-dom';
import 'semantic-ui-less/semantic.less';
import { InvenioILSApp } from './lib';

const config = {};
const overriddenCmps = {};

ReactDOM.render(
  <Router history={history}>
    <OverridableContext.Provider value={overriddenCmps}>
      <InvenioILSApp config={config} />
    </OverridableContext.Provider>
  </Router>,
  document.getElementById('app')
);
