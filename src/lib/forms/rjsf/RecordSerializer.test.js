import { removeEmptyValues } from './RecordSerializer';

describe('removeEmptyValues', () => {
  it('should clean a simple object', () => {
    const object = {
      authors: [{ name: 'Joe', surname: '' }],
      authors2: { name: '', surname: '' },
      contributors: [{ identifiers: [] }],
      roles: [],
      version: 0,
      cool: false,
      creators: [null, undefined, {}],
      creators2: [1, null, 2, undefined, 3, {}],
      description: '',
    };

    const expectedObject = {
      authors: [{ name: 'Joe' }],
      creators2: [1, 2, 3],
      version: 0,
      cool: false,
    };
    const cleaned = removeEmptyValues(object);
    expect(cleaned).toEqual(expectedObject);
  });

  it('should clean a real example object', () => {
    const object = {
      authors: [
        {
          full_name: 'asd',
          alternative_names: [],
          affiliations: [],
        },
      ],
      conference_info: [
        {
          place: 'Spain',
          title: 'Ted talk',
          year: '',
          acronym: '',
          series: '',
          dates: '',
          identifiers: [],
        },
      ],
      curated: true,
      document_type: 'BOOK',
      other_authors: true,
      pid: 'c1dg5-6aj21',
      publication_year: '123',
      restricted: false,
      stock: {
        mediums: [],
      },
      title: 'Title',
      urls: [
        {
          value: 'http://localhost:3000/backoffice/documents/create',
        },
        {
          value: 'http://localhost:3000/backoffice/documents/c1dg5-6aj21/edit',
          description: '',
        },
      ],
      edition: '',
      number_of_pages: '',
      source: '',
      abstract: '',
      note: '',
      tags: [],
      table_of_content: [],
      subjects: [],
      _submitButton: 'submit',
    };

    const expectedObject = {
      authors: [
        {
          full_name: 'asd',
        },
      ],
      conference_info: [
        {
          place: 'Spain',
          title: 'Ted talk',
        },
      ],
      curated: true,
      document_type: 'BOOK',
      other_authors: true,
      pid: 'c1dg5-6aj21',
      publication_year: '123',
      restricted: false,
      title: 'Title',
      urls: [
        { value: 'http://localhost:3000/backoffice/documents/create' },
        {
          value: 'http://localhost:3000/backoffice/documents/c1dg5-6aj21/edit',
        },
      ],
      _submitButton: 'submit',
    };

    const cleaned = removeEmptyValues(object);
    expect(cleaned).toEqual(expectedObject);
  });
});
