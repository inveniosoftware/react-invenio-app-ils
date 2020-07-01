import history from '@history';
import React from 'react';
import 'react-app-polyfill/ie11'; // For IE 11 support
import ReactDOM from 'react-dom';
import { OverridableContext } from 'react-overridable';
import { Router } from 'react-router-dom';
import 'semantic-ui-less/semantic.less';
import { InvenioILSApp } from './lib';

// const CustomHome = ({ ...props }) => {
//   return <>And this is custom home</>;
// };
//
// const CustomCover = ({ size, url, isRestricted, asItem, linkTo }) => {
//   const Cmp = asItem ? Item.Image : Image;
//   const link = linkTo ? { as: Link, to: linkTo } : {};
//   return (
//     <Cmp
//       centered
//       disabled={isRestricted}
//       {...link}
//       onError={e => (e.target.style.display = 'none')}
//       src={url}
//       size="tiny"
//     />
//   );
// };

const overriddenCmps = {
  // 'Home.layout': CustomHome,
  // 'LiteratureCover.layout': CustomCover,
};

const config = {
  invenioConfig: {
    authors: {
      maxDisplay: 42,
    },
  },
  uiConfig: {},
  searchConfig: {},
};

ReactDOM.render(
  <Router history={history}>
    <OverridableContext.Provider value={overriddenCmps}>
      <InvenioILSApp config={config} />
    </OverridableContext.Provider>
  </Router>,
  document.getElementById('app')
);
