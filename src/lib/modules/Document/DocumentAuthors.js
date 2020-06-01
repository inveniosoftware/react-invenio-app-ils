import Overridable from 'react-overridable';
import { List, Popup, Icon } from 'semantic-ui-react';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import _isEmpty from 'lodash/isEmpty';

class Roles extends Component {
  render() {
    const { roles } = this.props;
    return (
      <>
        <span>{roles.join(', ')}</span>
        <br />
      </>
    );
  }
}

Roles.propTypes = {
  roles: PropTypes.array.isRequired,
};

class Affiliations extends Component {
  render() {
    const { affiliations } = this.props;
    return (
      <span>
        Aff. :{' '}
        {affiliations
          .map(item => {
            return item.name;
          })
          .join(', ')}
      </span>
    );
  }
}

Affiliations.propTypes = {
  affiliations: PropTypes.array.isRequired,
};

class AlternativeNames extends Component {
  render() {
    const { alternative_names } = this.props;
    return (
      <>
        <br />
        <span>Alter. names: {alternative_names.join(', ')}</span>
        <br />
      </>
    );
  }
}

AlternativeNames.propTypes = {
  alternative_names: PropTypes.array.isRequired,
};

class Identifiers extends Component {
  render() {
    const { identifiers } = this.props;
    return (
      <>
        <span>
          Ids:{' '}
          {identifiers
            .map(item => {
              return `${item.value} (${item.scheme})`;
            })
            .join(', ')}
        </span>
        <br />
      </>
    );
  }
}

Identifiers.propTypes = {
  identifiers: PropTypes.array.isRequired,
};

class Type extends Component {
  render() {
    const { type } = this.props;
    return (
      <>
        <span>Type: {type}</span>;
        <br />
      </>
    );
  }
}

Type.propTypes = {
  type: PropTypes.string.isRequired,
};

class DocumentAuthors extends Component {
  constructor(props) {
    super(props);
    this.state = {
      expanded: false,
    };
  }

  renderPopupContent = author => {
    const { allFields } = this.props;
    return (
      <>
        {author.full_name}
        <br />
        {author.roles ? <Roles roles={author.roles} /> : null}
        {author.affiliations ? (
          <Affiliations affiliations={author.affiliations} />
        ) : null}
        {allFields && (
          <>
            {author.alternative_names ? (
              <AlternativeNames alternative_names={author.alternative_names} />
            ) : null}
            {author.identifiers ? (
              <Identifiers identifiers={author.identifiers} />
            ) : null}
            {author.type ? <Type type={author.type} /> : null}
          </>
        )}
      </>
    );
  };

  renderPopup = author => {
    return (
      <>
        {' '}
        <Popup
          content={this.renderPopupContent(author)}
          position="top center"
          flowing
          trigger={<Icon name="info circle" />}
        />
      </>
    );
  };

  toggleExpandedState = () => {
    this.setState({ expanded: !this.state.expanded });
  };

  renderExpandButton = () => {
    const { expanded } = this.state;
    return (
      <>
        {' '}
        <span className="button-show-more" onClick={this.toggleExpandedState}>
          {expanded ? 'Show less' : 'et al.'}
        </span>
      </>
    );
  };

  render() {
    const {
      metadata,
      prefix,
      otherAuthorsDisplay,
      popupDisplay,
      delimiter,
      authorsLimit,
      scrollLimit,
      expandable,
      listItemAs,
    } = this.props;
    const { expanded } = this.state;
    const otherAuthors = otherAuthorsDisplay ? otherAuthorsDisplay : 'et al.';

    let scrollableClass;
    const { authors: docAuthors } = metadata;
    let authors = docAuthors;

    if (!_isEmpty(authors)) {
      scrollableClass =
        authors.length > scrollLimit && expanded ? 'expanded' : '';
      if (authorsLimit && !expanded) {
        authors = authors.slice(0, authorsLimit);
      }
    }
    return (
      <Overridable id="DocumentAuthors.layout" {...this.props}>
        <div className={`document-authors-list-wrapper ${scrollableClass}`}>
          {prefix ? prefix + ' ' : null}
          {authors ? (
            <List horizontal className="document-authors-list" as={listItemAs}>
              {authors.map((author, index) => (
                <List.Item key={`Key${index}`}>
                  {author.full_name}
                  {popupDisplay &&
                    (!_isEmpty(author.roles) ||
                      !_isEmpty(author.affiliations)) &&
                    this.renderPopup(author)}
                  {index !== authors.length - 1 ? delimiter : null}
                </List.Item>
              ))}
              {metadata.other_authors ? otherAuthors : null}
            </List>
          ) : null}

          {authors &&
            authorsLimit &&
            authorsLimit < authors.length &&
            (expandable ? this.renderExpandButton() : ' et al.')}
        </div>
      </Overridable>
    );
  }
}

DocumentAuthors.propTypes = {
  metadata: PropTypes.object.isRequired,
  prefix: PropTypes.string,
  otherAuthorsDisplay: PropTypes.string,
  listItemAs: PropTypes.oneOfType([PropTypes.string, PropTypes.elementType]),
  delimiter: PropTypes.string,
  popupDisplay: PropTypes.bool,
  expandable: PropTypes.bool,
  scrollLimit: PropTypes.number,
  authorsLimit: PropTypes.number,
  allFields: PropTypes.bool,
};

DocumentAuthors.defaultProps = {
  delimiter: '; ',
  listItemAs: null,
  otherAuthorsDisplay: null,
  prefix: '',
  scrollLimit: Infinity,
  allFields: false,
};

export default Overridable.component('DocumentAuthors', DocumentAuthors);
