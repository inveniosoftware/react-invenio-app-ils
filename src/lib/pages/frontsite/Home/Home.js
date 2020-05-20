import React, { Component } from "react";
import PropTypes from "prop-types";
import { Headline } from "./Headline";
import Overridable from "react-overridable";
// import { SectionsWrapper } from "./Sections";

const OverridableHome = ({ ...props }) => {
  return (
    <Overridable id={"Home.render"} {...props}>
      <>
        <Headline testProp={"test"} />
        <Overridable id={"Home.content"}>
          <>Content</>
          {/*<SectionsWrapper sections={this.props.sections} />*/}
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

export default Overridable.component("Home", Home);

Home.propTypes = {};
