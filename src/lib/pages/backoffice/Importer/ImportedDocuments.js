import React from 'react';
import PropTypes from 'prop-types';
import { Accordion, Button, Header, Icon } from 'semantic-ui-react';
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
  constructor(props) {
    super(props);
    this.state = {
      activeIndex: -1,
      importCompleted: false,
      data: null,
      intervalId: null,
      isLoading: true,
    };
  }

  componentDidMount() {
    //TODO: Define how much we wait until the next call (currently 30 sec)
    var idVar = setInterval(() => this.checkForData(idVar), 30000);
    // eslint-disable-next-line react/no-did-mount-set-state
    this.setState({ intervalId: idVar });
    window.addEventListener('beforeunload', this.onCloseWarning);
  }

  componentWillUnmount = () => {
    const { intervalId } = this.state;
    window.removeEventListener('beforeunload', this.onCloseWarning);
    clearInterval(intervalId);
  };

  onCloseWarning = e => {
    const { isLoading } = this.state;
    if (isLoading) {
      var confirmationMessage =
        'Importing in progress. Are you sure you want to leave?';

      (e || window.event).returnValue = confirmationMessage; //Gecko + IE
      return confirmationMessage; //Webkit, Safari, Chrome
    }
  };

  checkForData = async idVar => {
    const { importCompleted, data } = this.state;

    if (!importCompleted) {
      const response = await http.get(`${importerURL}`);
      const reports = _get(data, 'reports', []);
      //TODO: After endpoint is updated check for status of task, instead of comparing data
      if (_isEqual(response.data.reports.length, reports.length)) {
        this.setState({
          importCompleted: true,
          isLoading: false,
        });
      } else {
        this.setState({
          data: response.data,
          isLoading: true,
        });
      }
    } else {
      clearInterval(idVar);
    }
  };

  handleClick = (e, titleProps) => {
    const { index } = titleProps;
    const { activeIndex } = this.state;
    const newIndex = activeIndex === index ? -1 : index;

    this.setState({ activeIndex: newIndex });
  };

  render() {
    const { data, activeIndex, isLoading } = this.state;
    const { cleanData } = this.props;
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
        <div>
          <Button
            className="default-margin-top"
            labelPosition="left"
            loading={isLoading}
            icon="left arrow"
            onClick={() => cleanData()}
            content="Import other files"
          />
        </div>
        {!_isEmpty(data) ? (
          <>
            <Header as="h2">Documents</Header>
            {!_isEmpty(data) &&
              ' Imported ' + data.reports.length + ' documents.'}

            <Accordion styled fluid>
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
  }
}

ImportedDocuments.propTypes = {
  cleanData: PropTypes.func.isRequired,
};
