import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Container, Divider, Grid, Ref, Sticky } from 'semantic-ui-react';
import { Error, Loader } from '@components';
import {
  ItemActionMenu,
  ItemCirculation,
  ItemMetadata,
  ItemPastLoans,
} from './index';

import { ItemHeader } from './ItemHeader';

export default class ItemDetails extends Component {
  constructor(props) {
    super(props);
    this.menuRef = React.createRef();
    this.headerRef = React.createRef();
  }

  componentDidMount() {
    const { fetchItemDetails } = this.props;
    fetchItemDetails(this.props.match.params.itemPid);
  }

  componentDidUpdate(prevProps) {
    const { fetchItemDetails } = this.props;

    const itemPid = this.props.match.params.itemPid;
    const samePidFromRouter = prevProps.match.params.itemPid === itemPid;
    if (!samePidFromRouter) {
      fetchItemDetails(itemPid);
    }
  }

  render() {
    const { isLoading, error, data } = this.props;
    return (
      <div ref={this.headerRef}>
        <Container fluid>
          <Loader isLoading={isLoading}>
            <Error error={error}>
              <Sticky context={this.headerRef} className="solid-background">
                <Container fluid className="spaced">
                  <ItemHeader data={data} />
                </Container>
                <Divider />
              </Sticky>
              <Container fluid>
                <Ref innerRef={this.menuRef}>
                  <Grid columns={2}>
                    <Grid.Column width={13}>
                      <Container className="spaced">
                        <Container className="spaced">
                          <ItemCirculation />
                          <ItemMetadata />
                          <ItemPastLoans />
                        </Container>
                      </Container>
                    </Grid.Column>
                    <Grid.Column width={3}>
                      <Sticky context={this.menuRef} offset={180}>
                        <ItemActionMenu offset={-180} />
                      </Sticky>
                    </Grid.Column>
                  </Grid>
                </Ref>
              </Container>
            </Error>
          </Loader>
        </Container>
      </div>
    );
  }
}

ItemDetails.propTypes = {
  fetchItemDetails: PropTypes.func.isRequired,
  data: PropTypes.object.isRequired,
  isLoading: PropTypes.bool,
  error: PropTypes.object,
};

ItemDetails.defaultProps = {
  isLoading: false,
  error: null,
};
