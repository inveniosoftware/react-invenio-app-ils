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
      id="Banners.layout"
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

class Banners extends Component {
  componentDidMount() {
    const { fetchBanners, resetBanners } = this.props;
    resetBanners();
    fetchBanners();
    this.intervalfetchBannersId = setInterval(
      fetchBanners,
      FETCH_BANNER_EVERY_SECS * 1000
    );
  }

  componentWillUnmount() {
    this.intervalfetchBannersId && clearInterval(this.intervalfetchBannersId);
  }

  render() {
    const { banners, children } = this.props;

    return (
      <>
        {!_isEmpty(banners)
          ? banners.hits.map((banner) => (
              <BannerCmp key={banner.id} {...banner} />
            ))
          : null}{' '}
        {children}
      </>
    );
  }
}

Banners.propTypes = {
  children: PropTypes.node,
  /* REDUX */
  banners: PropTypes.shape({
    hits: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.string.isRequired,
        message: PropTypes.string.isRequired,
        category: PropTypes.string.isRequired,
      })
    ),
  }),
  fetchBanners: PropTypes.func.isRequired,
  resetBanners: PropTypes.func.isRequired,
};

Banners.defaultProps = {
  banners: null,
  children: null,
};

export default Overridable.component('Banners', Banners);
