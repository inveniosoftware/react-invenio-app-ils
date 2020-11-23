import React, { Component } from 'react';
import {
  Container,
  Header,
  Segment,
  Button,
  Form,
  Modal,
  Icon,
} from 'semantic-ui-react';
import { invenioConfig } from '@config';
import PropTypes from 'prop-types';
import { ImportedDocuments } from './ImportedDocuments';

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
    };
  }

  handleChange = (e, { name, value }) => this.setState({ [name]: value });

  handleSubmit = async () => {
    const { provider, mode, file } = this.state;
    const { postData } = this.props;
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
  };

  onChange = async event => {
    const file = this.filesRef.current.files[0];
    this.setState({
      file: file,
    });
  };

  renderData = () => {
    const { data, error, isLoading } = this.props;
    return (
      <ImportedDocuments data={data} error={error} isLoading={isLoading} />
    );
  };

  renderModal = () => {
    const { openModal } = this.state;

    return (
      <Modal
        onClose={() => this.setState({ openModal: false })}
        onOpen={() => this.setState({ openModal: true })}
        open={openModal}
        size="small"
        trigger={<Button primary>Submit</Button>}
      >
        <Header>Deleting Records</Header>
        <Modal.Content>
          <p>Are you sure you want to delete these records?</p>
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
    const { provider, mode, file } = this.state;
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
                onChange={this.onChange}
              />
              {file ? file.name : 'No file selected.'}
            </Form.Field>
          </Form.Group>
        </Segment>
        {mode === 'delete' ? (
          this.renderModal()
        ) : (
          <Form.Button primary content="Submit" />
        )}
      </Form>
    );
  };

  render() {
    const { postDone } = this.state;
    return (
      <Container id="importer" className="spaced">
        <>
          <Header as="h1">Documents Importer</Header>
          <p>
            {!postDone ? 'Fill in the form below to import documents.' : null}
          </p>
        </>
        {postDone ? this.renderData() : this.renderForm()}
      </Container>
    );
  }
}

Importer.propTypes = {
  postData: PropTypes.func.isRequired,
  data: PropTypes.object.isRequired,
  isLoading: PropTypes.bool.isRequired,
  error: PropTypes.object.isRequired,
};
