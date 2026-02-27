import React, { ReactElement, ReactNode } from 'react';
import { Grid, Header } from 'semantic-ui-react';

interface DetailsHeaderProps {
  title: ReactNode;
  subTitle?: ReactNode;
  icon?: ReactElement;
  image?: ReactElement;
  recordInfo?: ReactNode;
  children?: ReactNode;
}

export class DetailsHeader extends React.Component<DetailsHeaderProps> {
  static defaultProps = {
    image: null,
    icon: null,
    subTitle: null,
    recordInfo: null,
    children: null,
  };

  render() {
    const { children, icon, image, subTitle, title, recordInfo } = this.props;
    return (
      <Grid columns={2}>
        {image && <Grid.Column width={1}>{image}</Grid.Column>}
        <Grid.Column width={11}>
          <Header as="h1">
            {icon}
            <Header.Content>
              {title}
              <Header.Subheader>{subTitle}</Header.Subheader>
            </Header.Content>
          </Header>
          {children}
        </Grid.Column>
        <Grid.Column width={4} floated="right" textAlign="right">
          {recordInfo}
        </Grid.Column>
      </Grid>
    );
  }
}
