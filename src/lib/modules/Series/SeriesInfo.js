import { SeriesAuthors } from '@modules/Series/SeriesAuthors';
import { SeriesLanguages } from '@modules/Series/SeriesLanguages';
import { SeriesModeOfIssuance } from '@modules/Series/SeriesModeOfIssuance';
import PropTypes from 'prop-types';
import React from 'react';
import { Divider, Table } from 'semantic-ui-react';
import LiteratureKeywords from '@modules/Literature/LiteratureKeywords';

export const SeriesInfo = ({ metadata }) => {
  return (
    <>
      <Divider horizontal>Details</Divider>
      <Table definition>
        <Table.Body>
          <Table.Row>
            <Table.Cell>Title</Table.Cell>
            <Table.Cell>{metadata.title}</Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.Cell>Authors</Table.Cell>
            <Table.Cell>
              <SeriesAuthors authors={metadata.authors} />
            </Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.Cell>Mode of issuance</Table.Cell>
            <Table.Cell>
              <SeriesModeOfIssuance
                modeOfIssuance={metadata.mode_of_issuance}
              />
            </Table.Cell>
          </Table.Row>
          {metadata.publisher && (
            <Table.Row>
              <Table.Cell>Publisher</Table.Cell>
              <Table.Cell>{metadata.publisher}</Table.Cell>
            </Table.Row>
          )}
          {metadata.publication_year && (
            <Table.Row>
              <Table.Cell>Publication year</Table.Cell>
              <Table.Cell>{metadata.publication_year}</Table.Cell>
            </Table.Row>
          )}
          {metadata.edition && (
            <Table.Row>
              <Table.Cell>Edition</Table.Cell>
              <Table.Cell>{metadata.edition}</Table.Cell>
            </Table.Row>
          )}
          {metadata.languages && (
            <Table.Row>
              <Table.Cell>Languages</Table.Cell>
              <Table.Cell>
                <SeriesLanguages languages={metadata.languages} />
              </Table.Cell>
            </Table.Row>
          )}
          {metadata.keywords && (
            <Table.Row>
              <Table.Cell>Keywords</Table.Cell>
              <Table.Cell>
                <LiteratureKeywords keywords={metadata.keywords} />
              </Table.Cell>
            </Table.Row>
          )}
          {metadata.electronic_volumes_description && (
            <Table.Row>
              <Table.Cell>Electronic volumes description</Table.Cell>
              <Table.Cell>{metadata.electronic_volumes_description}</Table.Cell>
            </Table.Row>
          )}
          {metadata.physical_volumes && (
            <Table.Row>
              <Table.Cell>Physical volumes</Table.Cell>
              <Table.Cell>
                {metadata.physical_volumes.map((elem, index) => {
                  return (
                    <ul key={index} className="frontsite-list">
                      <li>
                        <strong>Description:</strong> {elem.description}
                      </li>
                      <li>
                        <strong>Location: </strong>
                        {elem.location}
                      </li>
                    </ul>
                  );
                })}
              </Table.Cell>
            </Table.Row>
          )}
        </Table.Body>
      </Table>
    </>
  );
};

SeriesInfo.propTypes = {
  metadata: PropTypes.object.isRequired,
};
