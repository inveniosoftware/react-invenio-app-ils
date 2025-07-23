import { connect } from 'react-redux';
import BannerComponent from './Banners';
import { fetchBanners, resetBanners } from './state/actions';

const mapStateToProps = (state) => ({
  banners: state.banners.data,
  error: state.banners.error,
});

const mapDispatchToProps = (dispatch) => ({
  fetchBanners: () => dispatch(fetchBanners()),
  resetBanners: () => dispatch(resetBanners()),
});

export const Banners = connect(
  mapStateToProps,
  mapDispatchToProps
)(BannerComponent);
