import { removeEmptyValues } from './RecordSerializer';

describe('removeEmptyValues', () => {
  it('should clean a simple object', () => {
    const object = {
      authors: [{ name: 'Joe', surname: '' }],
      contributors: [{ identifiers: [] }],
      roles: [],
      version: 0,
      cool: false,
      creators: [null, undefined, {}],
      description: '',
    };

    const expectedObject = {
      authors: [{ name: 'Joe', surname: undefined }],
      contributors: [undefined],
      roles: undefined,
      version: 0,
      cool: false,
      creators: undefined,
      description: undefined,
    };
    removeEmptyValues(object);
    expect(object).toEqual(expectedObject);
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
      conference_info: {
        place: 'Spain',
        title: 'Ted talk',
        year: '',
        acronym: '',
        series: '',
        dates: '',
        identifiers: [],
      },
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
          alternative_names: undefined,
          affiliations: undefined,
        },
      ],
      conference_info: {
        place: 'Spain',
        title: 'Ted talk',
        year: undefined,
        acronym: undefined,
        series: undefined,
        dates: undefined,
        identifiers: undefined,
      },
      curated: true,
      document_type: 'BOOK',
      other_authors: true,
      pid: 'c1dg5-6aj21',
      publication_year: '123',
      restricted: false,
      stock: undefined,
      title: 'Title',
      urls: [
        { value: 'http://localhost:3000/backoffice/documents/create' },
        {
          value: 'http://localhost:3000/backoffice/documents/c1dg5-6aj21/edit',
          description: undefined,
        },
      ],
      edition: undefined,
      number_of_pages: undefined,
      source: undefined,
      abstract: undefined,
      note: undefined,
      tags: undefined,
      table_of_content: undefined,
      subjects: undefined,
      _submitButton: 'submit',
    };
    removeEmptyValues(object);

    expect(object).toEqual(expectedObject);
  });
});
