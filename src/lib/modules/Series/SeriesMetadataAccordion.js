import LiteratureRelations from '@modules/Literature/LiteratureRelations';
import { LiteratureNotes } from '@modules/Literature/LiteratureNotes';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import Overridable from 'react-overridable';
import { Accordion, Icon } from 'semantic-ui-react';
import { Identifiers } from '@modules/Identifiers';
import { SeriesAllTitles } from './SeriesAllTitles';
import { SeriesAlternativeTitles } from './SeriesAlternativeTitles';
import { SeriesInfo } from './SeriesInfo';
import { SeriesLinks } from './SeriesLinks';

class SeriesMetadataAccordion extends Component {
  state = { activeIndex: 'details' };

  handleClick = (e, titleProps) => {
    const { index } = titleProps;
    const { activeIndex } = this.state;
    const newIndex = activeIndex === index ? '' : index;

    this.setState({ activeIndex: newIndex });
  };

  render() {
    const { metadata } = this.props;
    const { activeIndex } = this.state;
    return (
      <Accordion fluid styled>
        <Accordion.Title
          active={activeIndex === 'details'}
          index="details"
          onClick={this.handleClick}
        >
          <Icon name="dropdown" />
          Details
        </Accordion.Title>
        <Accordion.Content active={activeIndex === 'details'}>
          <LiteratureRelations relations={metadata.relations} />
          <SeriesInfo metadata={metadata} />
          <SeriesAlternativeTitles
            alternativeTitles={metadata.alternative_titles}
          />
        </Accordion.Content>

        <Accordion.Title
          active={activeIndex === 'identifiers'}
          index="identifiers"
          onClick={this.handleClick}
        >
          <Icon name="dropdown" />
          Identifiers
        </Accordion.Title>
        <Accordion.Content active={activeIndex === 'identifiers'}>
          <Identifiers identifiers={metadata.identifiers} />
        </Accordion.Content>

        <Accordion.Title
          active={activeIndex === 'titles'}
          index="titles"
          onClick={this.handleClick}
        >
          <Icon name="dropdown" />
          Titles
        </Accordion.Title>
        <Accordion.Content active={activeIndex === 'titles'}>
          <SeriesAllTitles
            title={metadata.title}
            alternativeTitles={metadata.alternative_titles}
          />
        </Accordion.Content>

        <Accordion.Title
          active={activeIndex === 'notes'}
          index="notes"
          onClick={this.handleClick}
        >
          <Icon name="dropdown" />
          Notes
        </Accordion.Title>
        <Accordion.Content active={activeIndex === 'notes'}>
          <LiteratureNotes content={metadata.note} />
        </Accordion.Content>

        <Accordion.Title
          active={activeIndex === 'links'}
          index="links"
          onClick={this.handleClick}
        >
          <Icon name="dropdown" />
          Links
        </Accordion.Title>
        <Accordion.Content active={activeIndex === 'links'}>
          <SeriesLinks accessUrls={metadata.access_urls} urls={metadata.urls} />
        </Accordion.Content>
      </Accordion>
    );
  }
}

SeriesMetadataAccordion.propTypes = {
  metadata: PropTypes.object.isRequired,
};

export default Overridable.component(
  'SeriesMetadataAccordion',
  SeriesMetadataAccordion
);
