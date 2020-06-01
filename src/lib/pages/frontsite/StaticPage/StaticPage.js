import { Error } from '@components';
import {
  ILSHeaderPlaceholder,
  ILSParagraphPlaceholder,
} from '@components/ILSPlaceholder';
import { getStaticPageByRoute } from '@config/uiConfig';
import _isEmpty from 'lodash/isEmpty';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import Overridable from 'react-overridable';
import { Container, Header } from 'semantic-ui-react';

class StaticPage extends Component {
  componentDidMount() {
    const { fetchStaticPageDetails, match } = this.props;
    const staticPage = getStaticPageByRoute(match.path);
    const staticPageID = staticPage['apiURL'];
    fetchStaticPageDetails(staticPageID);
  }

  parseStaticPageContent = () => {
    const { data } = this.props;
    if (!_isEmpty(data)) {
      return <div dangerouslySetInnerHTML={{ __html: data.content }} />;
    }
    return null;
  };

  render() {
    const { isLoading, error, data } = this.props;

    return (
      <Overridable
        id="StaticPage.layout"
        isLoading={isLoading}
        error={error}
        data={data}
      >
        <Error boundary error={error}>
          <Container className="spaced">
            <ILSHeaderPlaceholder fluid isLoading={isLoading} image="false">
              <Header as="h1">{data.title}</Header>
            </ILSHeaderPlaceholder>
            <ILSParagraphPlaceholder
              fluid
              isLoading={isLoading}
              linesNumber={30}
            >
              {this.parseStaticPageContent(data.content)}
            </ILSParagraphPlaceholder>
          </Container>
        </Error>
      </Overridable>
    );
  }
}

StaticPage.propTypes = {
  /* ROUTER */
  match: PropTypes.shape({
    path: PropTypes.string,
  }),
  /* REDUX */
  fetchStaticPageDetails: PropTypes.func.isRequired,
  data: PropTypes.object.isRequired,
  error: PropTypes.object,
  isLoading: PropTypes.bool.isRequired,
};

StaticPage.defaultProps = {
  match: {
    path: '',
  },
  error: {},
};

export default Overridable.component('StaticPage', StaticPage);
