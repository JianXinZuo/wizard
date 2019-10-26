import AddIcon from '@material-ui/icons/Add';
import {observable} from 'mobx';
import {observer} from 'mobx-react';
import React, {Component, ReactNode} from 'react';
import {Inject} from 'react-ts-di';
import styled from 'styled-components';

import {
  NewOrganizationDialog,
  OrganizationCard,
  PageContent,
  PageHeader,
} from '../components';
import {
  DialogService,
  OrganizationCardData,
  OrganizationService,
} from '../services';
import {Carpet} from '../ui';
import OrganizationImg from '../assets/static/organization.png';

const Wrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
`;

@observer
export class Organization extends Component {
  @Inject
  organization!: OrganizationService;

  @Inject
  dialogService!: DialogService;

  @observable
  organizationCards: OrganizationCardData[] = [];

  async handleNewOrganizationClick(): Promise<void> {
    await this.dialogService.open(NewOrganizationDialog, {
      title: '创建自己的组织 :)',
      isClickAwayClose: true,
    });

    this.fetchOrganizations();
  }

  render(): ReactNode {
    const cards = this.organizationCards.map((data, index) => (
      <OrganizationCard
        seqIndex={index}
        organizationCardData={data}
        key={data.toString()}
      ></OrganizationCard>
    ));

    return (
      <Wrapper>
        <Carpet color="#eee"></Carpet>
        <PageHeader
          img={OrganizationImg}
          onFabClick={() => this.handleNewOrganizationClick()}
          title="组织"
          fabIcon={<AddIcon></AddIcon>}
        ></PageHeader>
        <PageContent>{cards}</PageContent>
      </Wrapper>
    );
  }

  async fetchOrganizations(): Promise<void> {
    this.organizationCards = await this.organization.getAllJoinOrganization();
  }

  async componentDidMount(): Promise<void> {
    this.fetchOrganizations();
  }
}
