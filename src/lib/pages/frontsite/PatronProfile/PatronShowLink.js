import React from 'react';
import PropTypes from 'prop-types';
import { Grid, Icon, Divider } from 'semantic-ui-react';

export const PatronShowLink = ({
  items,
  onShowAllClick,
  onShowLessClick,
  rowsPerPage,
}) => {
  const allHits = items.total === items.hits.length ? true : false;
  return (
    items.total > 0 &&
    items.total > rowsPerPage && (
      <Grid>
        <Grid.Column textAlign="center">
          {!allHits ? (
            <>
              <Divider hidden />
              <div className="link-like" onClick={() => onShowAllClick()}>
                SHOW ALL <Icon name="caret right" />
              </div>
            </>
          ) : (
            <div className="link-like" onClick={() => onShowLessClick()}>
              SHOW LESS <Icon name="caret right" />
            </div>
          )}
        </Grid.Column>
      </Grid>
    )
  );
};

PatronShowLink.propTypes = {
  items: PropTypes.object.isRequired,
  onShowAllClick: PropTypes.func.isRequired,
  onShowLessClick: PropTypes.func.isRequired,
  rowsPerPage: PropTypes.number,
};

PatronShowLink.defaultProps = {
  rowsPerPage: 5,
};
