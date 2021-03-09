import { borrowingRequestApi } from '@api/ill';
import { orderApi } from '@api/acquisition';
import { EditButton } from '@components/backoffice/buttons/EditButton';
import { DeleteRecordModal } from '@components/backoffice/DeleteRecordModal';
import { DeleteButton } from '@components/backoffice/DeleteRecordModal/DeleteButton';
import { DetailsHeader } from '@components/backoffice/DetailsHeader';
import { ProviderIcon } from '@components/backoffice/icons';
import { CopyButton } from '@components/CopyButton';
import { Error } from '@components/Error';
import { Loader } from '@components/Loader';
import { goTo } from '@history';
import { ILLRoutes, ProviderRoutes, AcquisitionRoutes } from '@routes/urls';
import PropTypes from 'prop-types';
import React from 'react';
import { Link } from 'react-router-dom';
import {
  Accordion,
  Container,
  Divider,
  Grid,
  Icon,
  Ref,
  Sticky,
  List,
} from 'semantic-ui-react';
import { ProviderInformation } from './ProviderInformation';

const DeleteProviderButton = (props) => {
  return (
    <DeleteButton
      fluid
      content="Delete provider"
      labelPosition="left"
      {...props}
    />
  );
};

class ActionMenu extends React.Component {
  createRefProps(providerPid) {
    const createRefPropsObject = (refType, path, query) => {
      return {
        refType: refType,
        onRefClick: (pid) => goTo(path(pid)),
        getRefData: () => query,
      };
    };

    const brwReqRefProps = createRefPropsObject(
      'Borrowing Request',
      ILLRoutes.borrowinRequestDetailsFor,
      borrowingRequestApi.list(
        borrowingRequestApi.query().withProviderPid(providerPid).qs()
      )
    );

    const orderRefProps = createRefPropsObject(
      'Order',
      AcquisitionRoutes.orderDetailsFor,
      orderApi.list(orderApi.query().withProviderPid(providerPid).qs())
    );

    return [brwReqRefProps, orderRefProps];
  }

  renderLink = (provider, api, route, text) => {
    const query = api.query().withProviderPid(provider.pid).qs();
    const path = route(query);
    return (
      <List.Item>
        <List.Content>
          <Link to={path}>
            <Icon name="search" />
            See {text}
          </Link>
        </List.Content>
      </List.Item>
    );
  };

  render() {
    const {
      data: { metadata: provider },
      deleteProviderHandler,
    } = this.props;

    return (
      <div className="bo-action-menu">
        <Sticky context={this.contextRef}>
          <EditButton fluid to={ProviderRoutes.providerEditFor(provider.pid)} />
          <DeleteRecordModal
            deleteHeader={`Are you sure you want to delete the Provider record
              with ID ${provider.pid}?`}
            refProps={this.createRefProps(provider.pid)}
            onDelete={() => deleteProviderHandler(provider.pid)}
            trigger={DeleteProviderButton}
          />

          <Divider horizontal>Navigation</Divider>

          <List>
            {this.renderLink(
              provider,
              borrowingRequestApi,
              ILLRoutes.borrowingRequestListWithQuery,
              'borrowing requests'
            )}
            {this.renderLink(
              provider,
              orderApi,
              AcquisitionRoutes.ordersListWithQuery,
              'purchase orders'
            )}
          </List>
        </Sticky>
      </div>
    );
  }
}

ActionMenu.propTypes = {
  data: PropTypes.object.isRequired,
  deleteProviderHandler: PropTypes.func.isRequired,
};

class ProviderHeader extends React.Component {
  render() {
    const { data } = this.props;
    return (
      <DetailsHeader
        title={data.metadata.name}
        pid={data.metadata.pid}
        icon={<ProviderIcon />}
        recordType="Provider"
      >
        <label>Provider</label> #{data.metadata.pid}
        <CopyButton text={data.metadata.pid} />
      </DetailsHeader>
    );
  }
}

ProviderHeader.propTypes = {
  data: PropTypes.object.isRequired,
};

class ProviderDetailsInner extends React.Component {
  constructor(props) {
    super(props);
    this.contextRef = React.createRef();
  }

  render() {
    const { data } = this.props;
    const panels = [
      {
        key: 'provider-info',
        title: 'Provider information',
        content: (
          <Accordion.Content>
            <div ref={this.providerInfoRef}>
              <ProviderInformation provider={data.metadata} />
            </div>
          </Accordion.Content>
        ),
      },
    ];

    return (
      <Accordion
        fluid
        styled
        className="highlighted"
        panels={panels}
        exclusive={false}
        defaultActiveIndex={[0]}
      />
    );
  }
}

ProviderDetailsInner.propTypes = {
  data: PropTypes.object.isRequired,
};

export default class ProviderDetails extends React.Component {
  constructor(props) {
    super(props);
    this.menuRef = React.createRef();
  }

  componentDidMount() {
    const { fetchProviderDetails, match } = this.props;
    fetchProviderDetails(match.params.providerPid);
  }

  componentDidUpdate(prevProps) {
    const { fetchProviderDetails, match } = this.props;
    const providerPid = match.params.providerPid;
    const samePidFromRouter =
      prevProps.match.params.providerPid === providerPid;
    if (!samePidFromRouter) {
      fetchProviderDetails(providerPid);
    }
  }

  render() {
    const { data, isLoading, error, deleteProvider } = this.props;

    return (
      <div ref={this.headerRef}>
        <Container fluid>
          <Loader isLoading={isLoading}>
            <Error error={error}>
              <Sticky context={this.headerRef} className="solid-background">
                <Container fluid className="spaced">
                  <ProviderHeader data={data} />
                </Container>
                <Divider />
              </Sticky>
              <Container fluid>
                <Ref innerRef={this.menuRef}>
                  <Grid columns={2}>
                    <Grid.Column width={13}>
                      <Container className="spaced">
                        <ProviderDetailsInner data={data} />
                      </Container>
                    </Grid.Column>
                    <Grid.Column width={3}>
                      <Sticky context={this.menuRef} offset={150}>
                        <ActionMenu
                          data={data}
                          deleteProviderHandler={deleteProvider}
                        />
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

ProviderDetails.propTypes = {
  data: PropTypes.object.isRequired,
  error: PropTypes.object,
  isLoading: PropTypes.bool.isRequired,
  fetchProviderDetails: PropTypes.func.isRequired,
  deleteProvider: PropTypes.func.isRequired,
  match: PropTypes.shape({
    params: PropTypes.shape({
      providerPid: PropTypes.string,
    }),
  }).isRequired,
};

ProviderDetails.defaultProps = {
  error: null,
};
