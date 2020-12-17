import { connect } from 'react-redux';
import BannerComponent from './Banner';
import { fetchBanner, resetBanner } from './state/actions';

const mapStateToProps = (state) => ({
  banner: state.banner.data,
  error: state.banner.error,
});

const mapDispatchToProps = (dispatch) => ({
  fetchBanner: () => dispatch(fetchBanner()),
  resetBanner: () => dispatch(resetBanner()),
});

export const Banner = connect(
  mapStateToProps,
  mapDispatchToProps
)(BannerComponent);
