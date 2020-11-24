import React, { Component } from 'react';
import {
  Container,
  Header,
  Segment,
  Button,
  Form,
  Modal,
  Icon,
  Label,
  Message,
} from 'semantic-ui-react';
import { invenioConfig } from '@config';
import PropTypes from 'prop-types';
import { ImportedDocuments } from './ImportedDocuments';
import _isEmpty from 'lodash/isEmpty';
import _get from 'lodash/get';

export default class Importer extends Component {
  constructor(props) {
    super(props);
    this.filesRef = React.createRef();
    this.state = {
      provider: '',
      mode: '',
      file: null,
      openModal: false,
      postDone: false,
      providerMissing: false,
      modeMissing: false,
      fileMissing: false,
    };
  }

  handleChange = (e, { name, value }) =>
    this.setState({
      [name]: value,
      providerMissing: false,
      modeMissing: false,
      fileMissing: false,
    });

  handleSubmit = async () => {
    const { provider, mode, file } = this.state;
    const { postData } = this.props;
    if (!_isEmpty(provider) && !_isEmpty(mode) && file) {
      var formData = new FormData();
      formData.append('provider', provider);
      formData.append('mode', mode);
      formData.append('file', file);
      postData(formData);
      this.setState({
        provider: '',
        mode: '',
        file: null,
        postDone: true,
      });
    } else {
      if (_isEmpty(provider)) {
        this.setState({ providerMissing: true });
      }
      if (_isEmpty(mode)) {
        this.setState({ modeMissing: true });
      }
      if (!file) {
        this.setState({ fileMissing: true });
      }
    }
  };

  cleanData = () => {
    this.setState({
      provider: '',
      mode: '',
      file: null,
      openModal: false,
      postDone: false,
      providerMissing: false,
      modeMissing: false,
      fileMissing: false,
    });
  };

  onFileChange = async event => {
    const file = this.filesRef.current.files[0];
    this.setState({
      file: file,
      providerMissing: false,
      modeMissing: false,
      fileMissing: false,
    });
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

  renderData = () => {
    return <ImportedDocuments cleanData={this.cleanData} />;
  };

  renderModal = () => {
    const { openModal } = this.state;

    return (
      <Modal
        onClose={() => this.setState({ openModal: false })}
        onOpen={() => this.setState({ openModal: true })}
        open={openModal}
        size="small"
        trigger={<Button primary>Import</Button>}
      >
        <Header>Deleting Records</Header>
        <Modal.Content>
          <p>Are you sure you want to delete records?</p>
        </Modal.Content>
        <Modal.Actions>
          <Button
            color="red"
            onClick={() => this.setState({ openModal: false })}
          >
            <Icon name="remove" /> No
          </Button>
          <Button
            primary
            onClick={() => {
              this.setState({ openModal: false });
              this.handleSubmit();
            }}
          >
            <Icon name="checkmark" /> Yes
          </Button>
        </Modal.Actions>
      </Modal>
    );
  };

  renderForm = () => {
    const {
      provider,
      mode,
      file,
      providerMissing,
      modeMissing,
      fileMissing,
    } = this.state;
    return (
      <Form onSubmit={mode !== 'delete' ? this.handleSubmit : null}>
        <Segment>
          <Form.Group widths="equal">
            <Form.Select
              placeholder="Select a provider ..."
              label="Provider"
              search
              selection
              name="provider"
              value={provider}
              options={invenioConfig.IMPORTER.providers}
              onChange={this.handleChange}
              required
              error={providerMissing ? 'Please enter a provider' : null}
            />
            <Form.Select
              placeholder="Select a mode ..."
              label="Mode"
              search
              selection
              name="mode"
              value={mode}
              options={invenioConfig.IMPORTER.modes}
              onChange={this.handleChange}
              required
              error={modeMissing ? 'Please enter a mode' : null}
            />
          </Form.Group>
          <Form.Group widths="equal">
            <Form.Field className="default-margin-top">
              <Button
                icon="file"
                content="Choose File"
                labelPosition="left"
                onClick={e => {
                  e.preventDefault();
                  this.filesRef.current.click();
                }}
              />
              <input
                hidden
                ref={this.filesRef}
                id="upload"
                type="file"
                accept=".xml"
                onChange={this.onFileChange}
              />
              <Label basic prompt={fileMissing} pointing="left">
                {file ? file.name : 'No file selected.'}
              </Label>
            </Form.Field>
          </Form.Group>
        </Segment>
        {mode === 'delete' ? (
          this.renderModal()
        ) : (
          <Form.Button primary content="Import" />
        )}
      </Form>
    );
  };

  render() {
    const { postDone } = this.state;
    const { error } = this.props;
    return (
      <Container id="importer" className="spaced">
        <>
          <Header as="h1">Documents Importer</Header>
          <p>
            {!postDone || !_isEmpty(error)
              ? 'Fill in the form below to import documents.'
              : null}
          </p>
        </>
        {!_isEmpty(error) ? this.renderErrorMessage(error) : null}
        {postDone && _isEmpty(error) ? this.renderData() : this.renderForm()}
      </Container>
    );
  }
}

Importer.propTypes = {
  postData: PropTypes.func.isRequired,
  error: PropTypes.object.isRequired,
};
