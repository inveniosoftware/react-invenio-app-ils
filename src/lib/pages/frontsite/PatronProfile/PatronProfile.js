import { AuthenticationGuard } from '@authentication/components/AuthenticationGuard';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Overridable from 'react-overridable';
import { Container, Header, Icon, Menu, Tab } from 'semantic-ui-react';
import { PatronCurrentDocumentRequests } from './PatronCurrentDocumentRequests';
import { PatronCurrentLoans } from './PatronCurrentLoans';
import { PatronOverview } from './PatronOverview';
import { PatronPastDocumentRequests } from './PatronPastDocumentRequests';
import { PatronPastLoans } from './PatronPastLoans';
import { PatronPendingLoans } from './PatronPendingLoans';

class PatronProfile extends Component {
  constructor(props) {
    super(props);
    this.anchors = {
      currentLoansRef: React.createRef(),
      pendingLoansRef: React.createRef(),
      currentDoqRequestsRef: React.createRef(),
    };
  }

  tabs = () => {
    const { user: currentUser } = this.props;
    return [
      {
        menuItem: 'Current',
        render: () => (
          <Tab.Pane>
            <div ref={this.anchors.currentLoansRef} id="patron-current-loans">
              <PatronCurrentLoans patronPid={currentUser.id} />
            </div>
            <div ref={this.anchors.pendingLoansRef} id="patron-pending-loans">
              <PatronPendingLoans patronPid={currentUser.id} />
            </div>
            <div
              ref={this.anchors.currentDoqRequestsRef}
              id="patron-current-doqreqs"
            >
              <PatronCurrentDocumentRequests patronPid={currentUser.id} />
            </div>
          </Tab.Pane>
        ),
      },
      {
        menuItem: (
          <Menu.Item key="history">
            History <Icon name="history" className="float-right" />
          </Menu.Item>
        ),
        render: () => (
          <Tab.Pane>
            <PatronPastLoans patronPid={currentUser.id} />
            <PatronPastDocumentRequests patronPid={currentUser.id} />
          </Tab.Pane>
        ),
      },
    ];
  };

  renderWhenAuthorised = () => {
    return (
      <Container className="spaced">
        <Header as="h2">Your activity</Header>
        <PatronOverview anchors={this.anchors} />
        <Tab
          menu={{ secondary: true, pointing: true, size: 'huge' }}
          panes={this.tabs()}
          className="patron-profile-tab"
        />
      </Container>
    );
  };

  render() {
    return (
      <AuthenticationGuard
        authorizedComponent={() => this.renderWhenAuthorised()}
      />
    );
  }
}

PatronProfile.propTypes = {
  user: PropTypes.object.isRequired,
};

export default Overridable.component('Patron', PatronProfile);
