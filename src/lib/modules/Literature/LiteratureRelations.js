import { SeparatedList } from '@components/SeparatedList';
import LiteratureTitle from '@modules/Literature/LiteratureTitle';
import { FrontSiteRoutes } from '@routes/urls';
import _get from 'lodash/get';
import _isEmpty from 'lodash/isEmpty';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Divider, List } from 'semantic-ui-react';
import LiteratureEdition from './LiteratureEdition';

export default class LiteratureRelations extends Component {
  constructor(props) {
    super(props);
    this.relations = props.relations;

    this.prefixes = {
      serial: 'This is part of the periodical:',
      multipart_monograph: 'This is part of the monograph:',
    };
  }

  getLinkTo = (relation) => {
    return relation.pid_type === 'docid'
      ? FrontSiteRoutes.documentDetailsFor(relation.pid_value)
      : FrontSiteRoutes.seriesDetailsFor(relation.pid_value);
  };

  renderLanguages = () => {
    const relations = _get(this.relations, 'language', []);
    if (!relations.length) return null;
    const items = relations.map((rel) => (
      <Link key={rel.pid_value} to={this.getLinkTo(rel)}>
        {rel.record_metadata.languages
          ? rel.record_metadata.languages.join(' ')
          : rel.record_metadata.series_type ||
            rel.record_metadata.mode_of_issuance}
      </Link>
    ));

    return (
      <List.Item>
        <SeparatedList
          items={items}
          prefix="See other languages: "
          separator=";"
          className="inline-list"
        />
      </List.Item>
    );
  };

  renderEditions = () => {
    const relations = _get(this.relations, 'edition', []);
    if (!relations.length) return null;

    const items = relations
      .sort(
        (rel1, rel2) =>
          rel1.record_metadata.edition - rel2.record_metadata.edition
      )
      .map((rel) => {
        const edition = rel.record_metadata.edition;
        return (
          edition && (
            <Link key={rel.pid_value} to={this.getLinkTo(rel)}>
              <LiteratureEdition edition={edition} />
            </Link>
          )
        );
      });

    return (
      <List.Item>
        <SeparatedList
          items={items}
          prefix="See other editions: "
          separator=";"
          className="inline-list"
        />
      </List.Item>
    );
  };

  renderOther = () => {
    const relations = _get(this.relations, 'other', []);
    if (!relations.length) return null;

    const items = relations.map((rel) => {
      const text = `${rel.record_metadata.title} (${rel.note})`;
      return (
        <Link key={rel.pid_value} to={this.getLinkTo(rel)}>
          <LiteratureTitle title={text} />
        </Link>
      );
    });

    return (
      <List.Item>
        <SeparatedList
          items={items}
          prefix="See other related: "
          separator=";"
          className="inline-list"
        />
      </List.Item>
    );
  };

  render() {
    return !_isEmpty(this.relations) ? (
      <>
        <Divider horizontal>Related</Divider>
        <List>
          <LiteratureRelationsField
            relationsData={this.relations}
            property="multipart_monograph"
            prefix={this.prefixes['multipart_monograph']}
          />
          <LiteratureRelationsField
            relationsData={this.relations}
            property="serial"
            prefix={this.prefixes['serial']}
          />
          {this.renderLanguages()}
          {this.renderEditions()}
          {this.renderOther()}
        </List>
      </>
    ) : null;
  }
}

LiteratureRelations.propTypes = {
  relations: PropTypes.object.isRequired,
};

const LiteratureRelationsField = ({ relationsData, property, prefix }) => {
  const relations = _get(relationsData, property, []);

  if (!relations.length) return null;

  const getLinkTo = (relation) => {
    return relation.pid_type === 'docid'
      ? FrontSiteRoutes.documentDetailsFor(relation.pid_value)
      : FrontSiteRoutes.seriesDetailsFor(relation.pid_value);
  };

  return (
    <List.Item>
      {prefix}
      <List bulleted>
        {relations.map((rel) => {
          const volume = _get(rel, 'volume');
          const text = volume
            ? `${rel.record_metadata.title} (vol: ${volume})`
            : rel.record_metadata.title;
          return (
            <List.Item bulleted key={rel.pid_value}>
              <Link to={getLinkTo(rel)}>
                <LiteratureTitle title={text} />
              </Link>
            </List.Item>
          );
        })}
      </List>
    </List.Item>
  );
};

LiteratureRelationsField.propTypes = {
  relationsData: PropTypes.object.isRequired,
  property: PropTypes.string.isRequired,
  prefix: PropTypes.string.isRequired,
};
