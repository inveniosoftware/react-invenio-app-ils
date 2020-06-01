import PropTypes from 'prop-types';

export const SeriesModeOfIssuance = ({ modeOfIssuance }) => {
  switch (modeOfIssuance) {
    case 'SERIAL':
      return 'SERIAL';
    case 'MULTIPART_MONOGRAPH':
      return 'MULTIPART MONOGRAPH';
    default:
      return null;
  }
};

SeriesModeOfIssuance.propTypes = {
  modeOfIssuance: PropTypes.string.isRequired,
};
