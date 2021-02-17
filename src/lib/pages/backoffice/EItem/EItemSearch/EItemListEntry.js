import { DocumentIcon, EItemIcon } from '@components/backoffice/icons';
import { OpenAccessLabel } from '@components/backoffice/OpenAccessLabel';
import LiteratureTitle from '@modules/Literature/LiteratureTitle';
import { BackOfficeRoutes } from '@routes/urls';
import _isEmpty from 'lodash/isEmpty';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Grid, Header, Icon, Item, List } from 'semantic-ui-react';

export default class EItemListEntry extends Component {
  render() {
    const { record: eitem } = this.props;

    return (
      <Item>
        <Item.Content>
          <Item.Header
            as={Link}
            to={BackOfficeRoutes.eitemDetailsFor(eitem.metadata.pid)}
            data-test={`navigate-${eitem.metadata.pid}`}
          >
            <EItemIcon /> {eitem.metadata.pid}
          </Item.Header>

          <Grid columns={4}>
            <Grid.Column computer={6} largeScreen={5}>
              <Item.Meta className="document-authors">
                <Header as="h5">
                  <LiteratureTitle
                    title={eitem.metadata.document.title}
                    truncateLines={1}
                  />
                </Header>
              </Item.Meta>
              {eitem.metadata.doi && (
                <>
                  <label>DOI</label> {eitem.metadata.doi}
                </>
              )}
            </Grid.Column>
            <Grid.Column computer={4} largeScreen={4}>
              <Item.Meta>
                <List>
                  <List.Item>
                    {!_isEmpty(eitem.metadata.files) && (
                      <List.Content>
                        {eitem.metadata.files.length} file(s) attached{' '}
                        <Icon name="file" />
                      </List.Content>
                    )}
                  </List.Item>
                  <List.Item>
                    <List.Content>
                      {!_isEmpty(eitem.metadata.urls) && (
                        <List.Content>
                          {eitem.metadata.urls.length} linked resources{' '}
                          <Icon name="external" />
                        </List.Content>
                      )}
                    </List.Content>
                  </List.Item>
                </List>
              </Item.Meta>
            </Grid.Column>
            <Grid.Column computer={4} largeScreen={4}>
              <List>
                <List.Item>
                  <List.Content>
                    <OpenAccessLabel
                      openAccess={eitem.metadata.open_access}
                      size="tiny"
                    />
                  </List.Content>
                </List.Item>
              </List>
            </Grid.Column>
            <Grid.Column computer={2} largeScreen={2} textAlign="right">
              <Link
                to={BackOfficeRoutes.documentDetailsFor(
                  eitem.metadata.document_pid
                )}
              >
                Document <DocumentIcon />
              </Link>
            </Grid.Column>
          </Grid>
        </Item.Content>
        <div className="pid-field">#{eitem.metadata.pid}</div>
      </Item>
    );
  }
}

EItemListEntry.propTypes = {
  record: PropTypes.object.isRequired,
};
