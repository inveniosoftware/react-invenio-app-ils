import PropTypes from 'prop-types';
import React, { Component } from 'react';
import Overridable from 'react-overridable';
import { Button, Table } from 'semantic-ui-react';
import DocumentItemBody from './DocumentItemBody';
import { invenioConfig } from '@config';
import { vocabularyApi } from '@api/vocabularies';

class DocumentItem extends Component {
  constructor(props) {
    super(props);

    const identifiersToDisplayInFrontside =
      invenioConfig.ITEMS.identifiersToDisplayInFrontside.map((identifier) => ({
        key: identifier,
        text: identifier,
      }));

    this.state = {
      isShowingAll: false,
      itemAmountLimit: 5,
      identifiersToDisplayInFrontside,
    };

    if (identifiersToDisplayInFrontside.length > 0) {
      this.fetchIdentifiersToDisplayInFrontsideTitles();
    }
  }

  get moreItemsToLoad() {
    const { items } = this.props;
    const { itemAmountLimit } = this.state;

    return items.length > itemAmountLimit;
  }

  fetchIdentifiersToDisplayInFrontsideTitles = () => {
    const query = vocabularyApi
      .query()
      .withType(invenioConfig.VOCABULARIES.item.identifier.scheme);
    vocabularyApi.list(query.qs()).then((response) => {
      const identifiersToDisplayInFrontside =
        this.state.identifiersToDisplayInFrontside.map((identifier) => {
          const vocabEntry = response.data.hits.find(
            (entry) => entry.metadata.key === identifier.key
          );
          return {
            ...identifier,
            text: vocabEntry ? vocabEntry.metadata.text : identifier.text,
          };
        });

      this.setState({ identifiersToDisplayInFrontside });
    });
  };

  toggleItems = () => {
    const { isShowingAll } = this.state;

    this.setState({ isShowingAll: !isShowingAll });
  };

  render() {
    const { internalLocationName, items, documentDetails, showTitle } =
      this.props;
    const { isShowingAll, itemAmountLimit, identifiersToDisplayInFrontside } =
      this.state;

    const previewArrayOfItems = items.slice(0, itemAmountLimit);
    const completeArrayOfItems = items;

    const shouldBeShownCompletely =
      items.length < itemAmountLimit || isShowingAll;

    const itemsToShow = shouldBeShownCompletely
      ? completeArrayOfItems
      : previewArrayOfItems;

    return (
      <>
        {showTitle && (
          <h3 className="document-item-internal-title">
            {internalLocationName}
          </h3>
        )}

        <Table stackable striped compact fixed className="document-item-table">
          <Table.Header>
            <Overridable id="DocumentDetails.DocumentItem.TableHeader">
              <Table.Row data-test="header">
                <Table.HeaderCell>Barcode</Table.HeaderCell>
                <Table.HeaderCell>Shelf</Table.HeaderCell>
                {identifiersToDisplayInFrontside.map((identifier) => (
                  <Table.HeaderCell key={identifier.key}>
                    {identifier.text}
                  </Table.HeaderCell>
                ))}
                <Table.HeaderCell>Status</Table.HeaderCell>
                <Table.HeaderCell>Medium</Table.HeaderCell>
                <Table.HeaderCell>Loan restriction</Table.HeaderCell>
              </Table.Row>
            </Overridable>
          </Table.Header>

          <Table.Body>
            <Overridable id="DocumentDetails.DocumentItemTableBody">
              <DocumentItemBody
                items={itemsToShow}
                documentDetails={documentDetails}
                identifiersToDisplayInFrontside={
                  identifiersToDisplayInFrontside
                }
              />
            </Overridable>
          </Table.Body>

          {this.moreItemsToLoad && (
            <Table.Footer
              fullWidth
              data-test="footer"
              className="document-item-footer"
            >
              <Table.Row>
                <Table.HeaderCell colSpan={5} textAlign="right">
                  <div className="document-item-footer-innerWrapper">
                    <p className="document-item-footer-text">
                      Showing entries 1-{itemsToShow.length} of {items.length}{' '}
                    </p>
                    <Button
                      compact
                      className="center"
                      onClick={this.toggleItems}
                    >
                      {isShowingAll ? 'See less' : 'See all'}
                    </Button>
                  </div>
                </Table.HeaderCell>
              </Table.Row>
            </Table.Footer>
          )}
        </Table>
      </>
    );
  }
}

DocumentItem.propTypes = {
  internalLocationName: PropTypes.object.isRequired,
  items: PropTypes.array.isRequired,
  documentDetails: PropTypes.object.isRequired,
  showTitle: PropTypes.bool.isRequired,
};

export default Overridable.component('DocumentItem', DocumentItem);
