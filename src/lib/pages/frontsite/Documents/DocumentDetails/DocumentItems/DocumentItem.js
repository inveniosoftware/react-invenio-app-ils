import PropTypes from 'prop-types';
import React, { Component } from 'react';
import Overridable from 'react-overridable';
import { Button, Table } from 'semantic-ui-react';
import DocumentItemBody from './DocumentItemBody';

class DocumentItem extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isShowingAll: false,
      itemAmountLimit: 5,
    };
  }

  get moreItemsToLoad() {
    const { items } = this.props;
    const { itemAmountLimit } = this.state;

    return items.length > itemAmountLimit;
  }

  toggleItems = () => {
    const { isShowingAll } = this.state;

    this.setState({ isShowingAll: !isShowingAll });
  };

  render() {
    const { internalLocationName, items, showTitle } = this.props;
    const { isShowingAll, itemAmountLimit } = this.state;

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
                <Table.HeaderCell>Status</Table.HeaderCell>
                <Table.HeaderCell>Medium</Table.HeaderCell>
                <Table.HeaderCell>Loan restriction</Table.HeaderCell>
              </Table.Row>
            </Overridable>
          </Table.Header>

          <Table.Body>
            <Overridable id="DocumentDetails.DocumentItemTableBody">
              <DocumentItemBody items={itemsToShow} />
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
  showTitle: PropTypes.bool.isRequired,
};

export default Overridable.component('DocumentItem', DocumentItem);
