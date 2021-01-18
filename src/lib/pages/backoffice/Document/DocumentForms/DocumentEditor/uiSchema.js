import { invenioConfig } from '@config';
import React from 'react';
import { Header, Segment } from 'semantic-ui-react';

function formWrapper(children) {
  return (
    <>
      <Header as="h3" attached="top">
        Document editor
      </Header>
      <Segment attached>{children}</Segment>
    </>
  );
}

export const uiSchema = {
  alternative_titles: {
    items: {
      language: {
        'ui:widget': 'vocabularySearch',
        'ui:placeholder': 'Type a language...',
        'ui:options': {
          vocabularyType:
            invenioConfig.VOCABULARIES.document.alternativeTitle.language,
        },
      },
      type: {
        'ui:widget': 'vocabulary',
        'ui:placeholder': 'Select a type...',
        'ui:options': {
          vocabularyType:
            invenioConfig.VOCABULARIES.document.alternativeTitle.type,
        },
      },
    },
  },
  languages: {
    items: {
      'ui:widget': 'vocabularySearch',
      'ui:placeholder': 'Type a language...',
      'ui:options': {
        vocabularyType: invenioConfig.VOCABULARIES.language,
      },
    },
  },
  'custom:grid': [
    {
      title: 8,
      alternative_titles: 8,
    },
    {
      edition: 4,
      publication_year: 4,
      document_type: 8,
    },
    {
      'custom:divider': 16,
    },
    {
      languages: 4,
    },
  ],
  'custom:root': {
    'custom:wrapper': formWrapper,
  },
};
