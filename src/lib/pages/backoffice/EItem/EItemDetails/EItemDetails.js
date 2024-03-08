import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Container, Divider, Grid, Ref, Sticky } from 'semantic-ui-react';
import { Error } from '@components/Error';
import { Loader } from '@components/Loader';
import { EItemFiles } from './EItemFiles';
import { EItemHeader } from './EItemHeader';
import { EItemMetadata } from './EItemMetadata';
import { EItemActionMenu } from './EItemActionMenu';

export default class EItemDetails extends Component {
  constructor(props) {
    super(props);
    this.menuRef = React.createRef();
    this.headerRef = React.createRef();
  }

  componentDidMount() {
    const { fetchEItemDetails, match } = this.props;
    fetchEItemDetails(match.params.eitemPid);
  }

  componentDidUpdate(prevProps) {
    const { fetchEItemDetails, match } = this.props;
    const eitemPid = match.params.eitemPid;
    const samePidFromRouter = prevProps.match.params.eitemPid === eitemPid;
    if (!samePidFromRouter) {
      fetchEItemDetails(eitemPid);
    }

    const { renderTabTitle, data } = this.props;
    if (renderTabTitle) {
      renderTabTitle({
        title: data.metadata.title,
      });
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
  match: PropTypes.shape({
    params: PropTypes.shape({
      eitemPid: PropTypes.string,
    }),
  }).isRequired,
  renderTabTitle: PropTypes.func,
};

EItemDetails.defaultProps = {
  error: null,
  renderTabTitle: null,
};
