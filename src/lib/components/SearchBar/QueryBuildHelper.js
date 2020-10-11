import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { List, Grid } from 'semantic-ui-react';
import { withState } from 'react-searchkit';

class _QueryBuildHelper extends Component {
  addToQuery = field => {
    const { currentQueryState, updateQueryState } = this.props;
    const { queryString } = currentQueryState;

    const defaultVal = field.defaultValue ? field.defaultValue : '*';
    const newCriteriaString = `${field.field}:${defaultVal}`;
    const previousQueryString = queryString;

    if (previousQueryString === '') {
      updateQueryState({ queryString: newCriteriaString });
    } else {
      updateQueryState({
        queryString: `${previousQueryString} AND ${newCriteriaString}`,
      });
    }
  };

  renderListItems = fields => {
    let components = [];

    for (let i = 0; i < fields.length; i++) {
      components.push(
        <List.Item
          key={fields[i].field}
          as="a"
          onClick={() => {
            this.addToQuery(fields[i]);
          }}
        >
          {fields[i].name}
        </List.Item>
      );
    }

    return components;
  };

  renderHelperFields = fields => {
    return (
      <List bulleted horizontal>
        {this.renderListItems(fields)}
      </List>
    );
  };

  render() {
    const { fields } = this.props;

    return (
      <Grid>
        <Grid.Row columns={1}>
          <Grid.Column width={16}>
            Search by: {this.renderHelperFields(fields)}
          </Grid.Column>
        </Grid.Row>
      </Grid>
    );
  }
}

_QueryBuildHelper.propTypes = {
  fields: PropTypes.array.isRequired,
  updateQueryState: PropTypes.func.isRequired,
  currentQueryState: PropTypes.object.isRequired,
};

export const QueryBuildHelper = withState(_QueryBuildHelper);
