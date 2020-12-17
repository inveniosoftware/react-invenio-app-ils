import { borrowingRequestApi } from '@api/ill';
import { EditButton } from '@components/backoffice/buttons/EditButton';
import { DeleteRecordModal } from '@components/backoffice/DeleteRecordModal';
import { DeleteButton } from '@components/backoffice/DeleteRecordModal/DeleteButton';
import { DetailsHeader } from '@components/backoffice/DetailsHeader';
import { ILLLibraryIcon } from '@components/backoffice/icons';
import { CopyButton } from '@components/CopyButton';
import { Error } from '@components/Error';
import { Loader } from '@components/Loader';
import { goTo } from '@history';
import { ILLRoutes } from '@routes/urls';
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
} from 'semantic-ui-react';
import { LibraryInformation } from './LibraryInformation';

const DeleteLibraryButton = (props) => {
  return (
    <DeleteButton
      fluid
      content="Delete library"
      labelPosition="left"
      {...props}
    />
  );
};

class ActionMenu extends React.Component {
  createRefProps(libraryPid) {
    const brwReqRefProps = {
      refType: 'Borrowing Requests',
      onRefClick: (brwReqPid) =>
        goTo(ILLRoutes.borrowinRequestDetailsFor(brwReqPid)),
      getRefData: () =>
        borrowingRequestApi.list(
          borrowingRequestApi.query().withLibraryPid(libraryPid).qs()
        ),
    };

    return [brwReqRefProps];
  }

  render() {
    const {
      data: { metadata: library },
      deleteLibraryHandler,
    } = this.props;

    return (
      <div className="bo-action-menu">
        <Sticky context={this.contextRef}>
          <EditButton fluid to={ILLRoutes.libraryEditFor(library.pid)} />
          <DeleteRecordModal
            deleteHeader={`Are you sure you want to delete the Library record
              with ID ${library.pid}?`}
            refProps={this.createRefProps(library.pid)}
            onDelete={() => deleteLibraryHandler(library.pid)}
            trigger={DeleteLibraryButton}
          />

          <Divider horizontal>Navigation</Divider>

          <Link
            to={ILLRoutes.borrowingRequestListWithQuery(
              borrowingRequestApi.query().withLibraryPid(library.pid).qs()
            )}
          >
            <Icon name="search" />
            See borrowing requests from {library.name}
          </Link>
        </Sticky>
      </div>
    );
  }
}

ActionMenu.propTypes = {
  data: PropTypes.object.isRequired,
  deleteLibraryHandler: PropTypes.func.isRequired,
};

class LibraryHeader extends React.Component {
  render() {
    const { data } = this.props;
    return (
      <DetailsHeader
        title={data.metadata.name}
        pid={data.metadata.pid}
        icon={<ILLLibraryIcon />}
        recordType="Library"
      >
        <label>Library</label> #{data.metadata.pid}
        <CopyButton text={data.metadata.pid} />
      </DetailsHeader>
    );
  }
}

LibraryHeader.propTypes = {
  data: PropTypes.object.isRequired,
};

class LibraryDetailsInner extends React.Component {
  constructor(props) {
    super(props);
    this.contextRef = React.createRef();
  }

  render() {
    const { data } = this.props;
    const panels = [
      {
        key: 'library-info',
        title: 'Library information',
        content: (
          <Accordion.Content>
            <div ref={this.libraryInfoRef}>
              <LibraryInformation library={data.metadata} />
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

LibraryDetailsInner.propTypes = {
  data: PropTypes.object.isRequired,
};

export default class LibraryDetails extends React.Component {
  constructor(props) {
    super(props);
    this.menuRef = React.createRef();
  }

  componentDidMount() {
    const { fetchLibraryDetails, match } = this.props;
    fetchLibraryDetails(match.params.libraryPid);
  }

  componentDidUpdate(prevProps) {
    const { fetchLibraryDetails, match } = this.props;
    const libraryPid = match.params.libraryPid;
    const samePidFromRouter = prevProps.match.params.libraryPid === libraryPid;
    if (!samePidFromRouter) {
      fetchLibraryDetails(libraryPid);
    }
  }

  render() {
    const { data, isLoading, error, deleteLibrary } = this.props;

    return (
      <div ref={this.headerRef}>
        <Container fluid>
          <Loader isLoading={isLoading}>
            <Error error={error}>
              <Sticky context={this.headerRef} className="solid-background">
                <Container fluid className="spaced">
                  <LibraryHeader data={data} />
                </Container>
                <Divider />
              </Sticky>
              <Container fluid>
                <Ref innerRef={this.menuRef}>
                  <Grid columns={2}>
                    <Grid.Column width={13}>
                      <Container className="spaced">
                        <LibraryDetailsInner data={data} />
                      </Container>
                    </Grid.Column>
                    <Grid.Column width={3}>
                      <Sticky context={this.menuRef} offset={150}>
                        <ActionMenu
                          data={data}
                          deleteLibraryHandler={deleteLibrary}
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

LibraryDetails.propTypes = {
  data: PropTypes.object.isRequired,
  error: PropTypes.object,
  isLoading: PropTypes.bool.isRequired,
  fetchLibraryDetails: PropTypes.func.isRequired,
  deleteLibrary: PropTypes.func.isRequired,
  match: PropTypes.shape({
    params: PropTypes.shape({
      libraryPid: PropTypes.string,
    }),
  }).isRequired,
};

LibraryDetails.defaultProps = {
  error: null,
};
