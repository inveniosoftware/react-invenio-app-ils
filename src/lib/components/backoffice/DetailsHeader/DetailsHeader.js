import React from 'react';
import PropTypes from 'prop-types';
import { Grid, Header } from 'semantic-ui-react';

export class DetailsHeader extends React.Component {
  render() {
    const { icon, image, subTitle, title, recordInfo } = this.props;
    return (
      <Grid columns={2}>
        {image && <Grid.Column width={1}>{image}</Grid.Column>}
        <Grid.Column width={11}>
          <Header as="h1">
            {icon}
            <Header.Content>
              {title}
              <Header.Subheader>{subTitle}</Header.Subheader>
            </Header.Content>
          </Header>
          {this.props.children}
        </Grid.Column>
        <Grid.Column width={4} floated="right" textAlign="right">
          {recordInfo}
        </Grid.Column>
      </Grid>
    );
  }
}

DetailsHeader.propTypes = {
  image: PropTypes.element,
  icon: PropTypes.element,
  subTitle: PropTypes.any,
  recordInfo: PropTypes.node,
  title: PropTypes.any.isRequired,
  children: PropTypes.node,
};

DetailsHeader.defaultProps = {
  image: null,
  icon: null,
  subTitle: null,
  recordInfo: null,
};
