import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Container, Divider, Grid, Ref, Sticky } from 'semantic-ui-react';
import { Error } from '@components/Error';
import { Loader } from '@components/Loader';
import { EItemFiles, EItemHeader, EItemMetadata } from './index';
import { EItemActionMenu } from './EItemActionMenu';

export default class EItemDetails extends Component {
  constructor(props) {
    super(props);
    this.menuRef = React.createRef();
    this.headerRef = React.createRef();
  }

  componentDidMount() {
    const { fetchEItemDetails } = this.props;
    fetchEItemDetails(this.props.match.params.eitemPid);
  }

  componentDidUpdate(prevProps) {
    const { fetchEItemDetails } = this.props;
    const eitemPid = this.props.match.params.eitemPid;
    const samePidFromRouter = prevProps.match.params.eitemPid === eitemPid;
    if (!samePidFromRouter) {
      fetchEItemDetails(eitemPid);
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
                  <EItemHeader data={data} />
                </Container>
                <Divider />
              </Sticky>
              <Container fluid>
                <Ref innerRef={this.menuRef}>
                  <Grid columns={2}>
                    <Grid.Column width={13}>
                      <Container className="spaced">
                        <EItemMetadata />
                        <EItemFiles />
                      </Container>
                    </Grid.Column>
                    <Grid.Column width={3}>
                      <Sticky context={this.menuRef} offset={180}>
                        <EItemActionMenu offset={-180} />
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

EItemDetails.propTypes = {
  fetchEItemDetails: PropTypes.func.isRequired,
  isLoading: PropTypes.bool.isRequired,
  data: PropTypes.object.isRequired,
  error: PropTypes.object,
};

EItemDetails.defaultProps = {
  error: null,
};
