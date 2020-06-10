import React from 'react';
import 'react-app-polyfill/ie11'; // For IE 11 support
import ReactDOM from 'react-dom';
import { OverridableContext } from 'react-overridable';
import 'semantic-ui-less/semantic.less';
import { InvenioILSApp } from './lib';
import {
  DocumentFormExtensions,
  DocumentListEntryExtensions,
  DocumentMetadataExtensions,
} from './overrides';

const overriddenCmps = {
  'DocumentForm.Extensions': DocumentFormExtensions,
  'DocumentListEntry.Extensions': DocumentListEntryExtensions,
  'DocumentMetadataTabs.Extensions': DocumentMetadataExtensions,
};

ReactDOM.render(
  <OverridableContext.Provider value={overriddenCmps}>
    <InvenioILSApp />
  </OverridableContext.Provider>,
  document.getElementById('app')
);
