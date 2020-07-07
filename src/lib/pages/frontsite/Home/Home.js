import React, { Component } from 'react';
import Overridable from 'react-overridable';
import { Headline } from './Headline';
import { SectionsWrapper } from './Sections';

const OverridableHome = ({ ...props }) => {
  return (
    <Overridable id="Home.layout" {...props}>
      <>
        <Headline />
        <Overridable id="Home.content">
          <SectionsWrapper />
        </Overridable>
      </>
    </Overridable>
  );
};

class Home extends Component {
  render() {
    return <OverridableHome {...this.props} />;
  }
}

export default Overridable.component('Home', Home);
