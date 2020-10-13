import _isEmpty from 'lodash/isEmpty';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import Overridable from 'react-overridable';
import { Message } from 'semantic-ui-react';

const FETCH_BANNER_EVERY_SECS = 60 * 5; // 5 minutes

const BannerCmp = ({ message, category }) => {
  const colorProp = {};
  switch (category) {
    case 'warning':
      colorProp['warning'] = true;
      break;
    case 'info':
      colorProp['info'] = true;
      break;
    default:
      break;
  }
  return (
    <Overridable
      id="ConfirmEmail.layout"
      message={message}
      category={category}
      colorProp={colorProp}
    >
      <Message className="center no-margin" {...colorProp}>
        <div dangerouslySetInnerHTML={{ __html: message }} />
      </Message>
    </Overridable>
  );
};

BannerCmp.propTypes = {
  message: PropTypes.string.isRequired,
  category: PropTypes.string.isRequired,
};

class Banner extends Component {
  componentDidMount() {
    const { fetchBanner, resetBanner } = this.props;
    resetBanner();
    fetchBanner();
    this.intervalFetchBannerId = setInterval(
      fetchBanner,
      FETCH_BANNER_EVERY_SECS * 1000
    );
  }

  componentWillUnmount() {
    this.intervalFetchBannerId && clearInterval(this.intervalFetchBannerId);
  }

  render() {
    const { banner, children } = this.props;
    return (
      <>
        {!_isEmpty(banner) ? <BannerCmp {...banner} /> : null} {children}
      </>
    );
  }
}

Banner.propTypes = {
  children: PropTypes.node,
  /* REDUX */
  banner: PropTypes.shape({
    message: PropTypes.string,
    category: PropTypes.string,
  }),
  fetchBanner: PropTypes.func.isRequired,
  resetBanner: PropTypes.func.isRequired,
};

Banner.defaultProps = {
  banner: null,
  children: null,
};

export default Overridable.component('Banner', Banner);
