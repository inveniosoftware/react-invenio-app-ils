import React from 'react';
import 'react-app-polyfill/ie11'; // For IE 11 support
import ReactDOM from 'react-dom';
import { OverridableContext } from 'react-overridable';
import { Provider } from 'react-redux';
import { Link } from 'react-router-dom';
import 'semantic-ui-less/semantic.less';
import { Item } from 'semantic-ui-react';
import { InvenioILSApp, store } from './lib';

const CustomHome = ({ ...props }) => {
  return <>And this is custom home</>;
};

const CustomCover = ({ size, url, isRestricted, asItem, linkTo }) => {
  const Cmp = asItem ? Item.Image : Image;
  const link = linkTo ? { as: Link, to: linkTo } : {};
  return (
    <Cmp
      centered
      disabled={isRestricted}
      {...link}
      onError={e => (e.target.style.display = 'none')}
      src={url}
      size="tiny"
    />
  );
};

const overriddenCmps = {
  // "Home.render": CustomHome
  // 'LiteratureCover.layout': CustomCover,
};

ReactDOM.render(
  <Provider store={store}>
    <OverridableContext.Provider value={overriddenCmps}>
      <InvenioILSApp />
    </OverridableContext.Provider>
  </Provider>,
  document.getElementById('app')
);
