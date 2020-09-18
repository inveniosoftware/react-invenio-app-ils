import { connect } from 'react-redux';
import OpeningHoursComponent from './OpeningHours';
import { fetchAllLocations } from '@pages/backoffice/Location/LocationList/state/actions';

const mapStateToProps = state => ({
  data: state.locations.data,
  error: state.locations.error,
  isLoading:
    state.locations.isLoading || state.authenticationManagement.isLoading,
});

const mapDispatchToProps = dispatch => ({
  fetchAllLocations: () => dispatch(fetchAllLocations()),
});

export const OpeningHours = connect(
  mapStateToProps,
  mapDispatchToProps
)(OpeningHoursComponent);

export { LocationOpeningHours } from './LocationOpeningHours';
