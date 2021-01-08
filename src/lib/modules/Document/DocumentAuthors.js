import PropTypes from 'prop-types';
import React, { Component } from 'react';
import Overridable from 'react-overridable';
import { Icon, List, Popup } from 'semantic-ui-react';
import { invenioConfig } from '@config';

const ET_AL_LABEL = 'et al.';

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
        Aff.:{' '}
        {affiliations
          .map((item) => {
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
    const { alternativeNames } = this.props;
    return (
      <>
        <br />
        <span>Alter. names: {alternativeNames.join(', ')}</span>
        <br />
      </>
    );
  }
}

AlternativeNames.propTypes = {
  alternativeNames: PropTypes.array.isRequired,
};

class Identifiers extends Component {
  render() {
    const { identifiers } = this.props;
    return (
      <>
        <span>
          Ids:{' '}
          {identifiers
            .map((item) => `${item.value} (${item.scheme})`)
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

class PopUpShowMoreFields extends Component {
  renderPopupContent = (author) => {
    const { showAllFields } = this.props;
    return (
      <>
        {author.full_name}
        <br />
        {author.roles && <Roles roles={author.roles} />}
        {author.affiliations && (
          <Affiliations affiliations={author.affiliations} />
        )}
        {showAllFields && (
          <>
            {author.alternative_names && (
              <AlternativeNames alternativeNames={author.alternative_names} />
            )}
            {author.identifiers && (
              <Identifiers identifiers={author.identifiers} />
            )}
            {author.type && <Type type={author.type} />}
          </>
        )}
      </>
    );
  };

  render() {
    const { author } = this.props;
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
  }
}

PopUpShowMoreFields.propTypes = {
  author: PropTypes.object.isRequired,
  showAllFields: PropTypes.bool,
};
PopUpShowMoreFields.defaultProps = {
  showAllFields: true,
};

class DocumentAuthors extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isExpanded: false,
    };
  }

  toggleShowAllAuthors = () => {
    const { isExpanded } = this.state;
    this.setState({ isExpanded: !isExpanded });
  };

  render() {
    const {
      authors,
      hasOtherAuthors,
      limit,
      prefix,
      delimiter,
      expandable,
      scrollLimit,
      withPopUpShowMoreFields,
      showAllFieldsInPopUp,
      listItemAs,
      withVerticalScroll,
    } = this.props;
    const { isExpanded } = this.state;

    const allAuthors = authors ? authors : [];
    let displayedAuthors = allAuthors;
    if (!isExpanded) {
      displayedAuthors = allAuthors.slice(0, limit);
    }

    const isShowingAllAuthors =
      allAuthors.slice(0, limit).length === allAuthors.length;
    const showAllAuthorsCmp =
      !isShowingAllAuthors && expandable ? (
        <div>
          {' '}
          <span
            className="button-show-more"
            onClick={this.toggleShowAllAuthors}
          >
            {isExpanded ? 'Show less' : `Show all ${allAuthors.length} authors`}
          </span>
        </div>
      ) : null;

    const scrollableClass =
      displayedAuthors.length > scrollLimit && isExpanded ? 'expanded' : '';
    return (
      <Overridable id="DocumentAuthors.layout" {...this.props}>
        <>
          <div
            className={
              !withVerticalScroll
                ? `default-margin-bottom`
                : `document-authors-list-wrapper ${scrollableClass}`
            }
          >
            {prefix}
            <List horizontal className="document-authors-list" as={listItemAs}>
              {displayedAuthors.map((author, index) => {
                const isLast = index === displayedAuthors.length - 1;
                return (
                  <List.Item key={author.full_name}>
                    {author.full_name}
                    {withPopUpShowMoreFields &&
                      allAuthors.length <
                        invenioConfig.LITERATURE.authors.maxDisplay && (
                        <PopUpShowMoreFields
                          author={author}
                          showAllFields={showAllFieldsInPopUp}
                        />
                      )}
                    {!isLast ? delimiter : null}
                  </List.Item>
                );
              })}
              {hasOtherAuthors && ET_AL_LABEL}
            </List>
          </div>
          {showAllAuthorsCmp}
        </>
      </Overridable>
    );
  }
}

DocumentAuthors.propTypes = {
  authors: PropTypes.array.isRequired,
  hasOtherAuthors: PropTypes.bool,
  limit: PropTypes.number,
  prefix: PropTypes.string,
  delimiter: PropTypes.string,
  expandable: PropTypes.bool,
  scrollLimit: PropTypes.number,
  withPopUpShowMoreFields: PropTypes.bool,
  showAllFieldsInPopUp: PropTypes.bool,
  listItemAs: PropTypes.oneOfType([PropTypes.string, PropTypes.elementType]),
  withVerticalScroll: PropTypes.bool,
};

DocumentAuthors.defaultProps = {
  hasOtherAuthors: false,
  limit: 5,
  prefix: null,
  delimiter: ';',
  expandable: false,
  scrollLimit: Infinity,
  withPopUpShowMoreFields: false,
  showAllFieldsInPopUp: true,
  listItemAs: null,
  withVerticalScroll: false,
};

export default Overridable.component('DocumentAuthors', DocumentAuthors);
