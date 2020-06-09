import React from 'react';
import 'react-app-polyfill/ie11'; // For IE 11 support
import ReactDOM from 'react-dom';
import { OverridableContext } from 'react-overridable';
import { Link } from 'react-router-dom';
import 'semantic-ui-less/semantic.less';
import { Item } from 'semantic-ui-react';
import { InvenioILSApp } from './lib';

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
  // 'Home.layout': CustomHome,
  // 'LiteratureCover.layout': CustomCover,
};

ReactDOM.render(
  <OverridableContext.Provider value={overriddenCmps}>
    <InvenioILSApp />
  </OverridableContext.Provider>,
  document.getElementById('app')
);
