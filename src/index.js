import 'react-app-polyfill/ie11'; // For IE 11 support
import 'react-app-polyfill/stable';
import history from '@history';
import React from 'react';
import ReactDOM from 'react-dom';
import { OverridableContext } from 'react-overridable';
import { Router } from 'react-router-dom';
import 'semantic-ui-less/semantic.less';
import { InvenioILSApp } from './lib';
import { IEFallback } from './lib/components/Fallbacks/IEFallback';

const config = {};
const overriddenCmps = {};

// Checks if browser is IE (unsupported)
const isIE = !!document.documentMode;

if (!isIE) {
  ReactDOM.render(
    <Router history={history}>
      <OverridableContext.Provider value={overriddenCmps}>
        <InvenioILSApp config={config} />
      </OverridableContext.Provider>
    </Router>,
    document.getElementById('app')
  );
} else {
  IEFallback();
}
