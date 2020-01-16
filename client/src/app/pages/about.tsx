import {observable} from 'mobx';
import {observer} from 'mobx-react';
import React, {Component, ReactNode} from 'react';
import {Inject} from 'react-ts-di';
import styled from 'styled-components';

import {RouterAnimation} from '../animations';
import {
  PagePaper,
  // TreeViewGenerator,
} from '../components';
import {DialogService, DocService, Time} from '../services';
import {Catalog} from '../ui';
// import {TreeView} from '../ui';

const Wrapper = styled.div`
  display: flex;
  background: ${props => props.theme.shallowGray};
`;

// const Side = styled.div`
//   min-width: 290px;
//   margin-right: 25px;
//   padding: 10px;
//   min-height: 500px;
//   height: fit-content;
//   background: rgba(0, 0, 0, 0.04);
//   color: rgba(0, 0, 0, 0.87) !important;
//   position: sticky;
//   top: 70px;
// `;

// const SideTitle = styled.p`
//   font-size: 30px;
//   font-weight: 300;
// `;

// const Content = styled(MDRender)`
//   width: calc(100% - 310px);
// `;

// const ContentWrapper = styled.div`
//   display: flex;
//   flex-direction: column;
// `;

@observer
class TAbout extends Component {
  @Inject
  dialogService!: DialogService;

  @Inject
  docService!: DocService;

  @Inject
  time!: Time;

  @observable
  content: string = '';

  @observable
  isMounted = false;

  render(): ReactNode {
    return (
      <Wrapper>
        <Catalog content={this.content} title="关于我们" />
        <PagePaper
          isMounted={this.isMounted}
          content={this.content}
          title="关于我们"
        />
      </Wrapper>
    );
  }

  async componentDidMount(): Promise<void> {
    this.dialogService.loading(
      async (): Promise<void> => {
        this.content = await this.docService.getAboutWizard();

        await this.time.sleep(0.5);
        this.isMounted = true;
      },
    );
  }
}

export const About = RouterAnimation(TAbout);
