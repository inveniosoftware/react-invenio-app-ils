import React from 'react';
import PropTypes from 'prop-types';
import { Accordion, Header, Icon, Message } from 'semantic-ui-react';
import _isEmpty from 'lodash/isEmpty';
import { http } from '@api/base';
import _isEqual from 'lodash/isEqual';
import _get from 'lodash/get';
import { ReportDetails } from './ReportDetails';
import { Link } from 'react-router-dom';
import { BackOfficeRoutes } from '@routes/urls';
import { DocumentIcon } from '@components/backoffice/icons';

const importerURL = '/importer/check';

export class ImportedDocuments extends React.Component {
  state = {
    activeIndex: -1,
    importCompleted: false,
    count: 0,
    data: null,
  };

  componentDidMount() {
    var idVar = setInterval(() => this.checkForData(idVar), 3000);
  }

  checkForData = async idVar => {
    const { importCompleted, count, data } = this.state;

    if (!importCompleted) {
      const response = await http.get(`${importerURL}`);
      const reports = _get(data, 'reports', []);

      if (_isEqual(response.data.reports.length, reports.length)) {
        this.setState({
          importCompleted: true,
        });
      } else {
        this.setState({
          count: count + 1,
          data: response.data,
        });
      }
    } else {
      console.log('ClearInterval');
      clearInterval(idVar);
    }
  };

  handleClick = (e, titleProps) => {
    const { index } = titleProps;
    const { activeIndex } = this.state;
    const newIndex = activeIndex === index ? -1 : index;

    this.setState({ activeIndex: newIndex });
  };

  renderErrorMessage = error => {
    let message = _get(error, 'response.data.message');
    return (
      <Message negative>
        <Message.Header>Something went wrong</Message.Header>
        <p>{message}</p>
      </Message>
    );
  };

  renderData = isLoading => {
    const { count, data, activeIndex } = this.state;
    console.log(data, count);
    return (
      <>
        {isLoading ? (
          <>
            <Icon loading name="circle notch" />
            Importing documents... This may take a while.
          </>
        ) : (
          <>
            <Icon name="check" />
            Documents imported succesfully.
          </>
        )}
        {!_isEmpty(data) ? (
          <>
            <Header as="h2">Documents</Header>
            {!_isEmpty(data) &&
              ' Imported ' + data.reports.length + ' documents'}

            <Accordion>
              {data.reports.map((elem, index) => {
                const document = !_isEmpty(elem.created)
                  ? elem.created
                  : elem.updated;
                return (
                  <>
                    <Accordion.Title
                      active={activeIndex === index}
                      index={index}
                      onClick={this.handleClick}
                    >
                      <Icon name="dropdown" />
                      {!_isEmpty(document) ? (
                        <Link
                          to={BackOfficeRoutes.documentDetailsFor(document.pid)}
                          target="_blank"
                        >
                          <DocumentIcon />
                          {document.title}
                        </Link>
                      ) : (
                        'No document created or updated'
                      )}
                    </Accordion.Title>
                    <Accordion.Content active={activeIndex === index}>
                      <ReportDetails report={elem} />
                    </Accordion.Content>
                  </>
                );
              })}
            </Accordion>
          </>
        ) : null}
      </>
    );
  };

  render() {
    const { data, error, isLoading } = this.props;
    console.log('ImportedDocuments', data, error, isLoading);

    return (
      <>
        {!_isEmpty(error) ? this.renderErrorMessage(error) : null}
        {this.renderData(isLoading)}
      </>
    );
  }
}

ImportedDocuments.propTypes = {
  data: PropTypes.object.isRequired,
  error: PropTypes.object.isRequired,
  isLoading: PropTypes.object.isRequired,
};
