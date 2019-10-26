import {Button} from '@material-ui/core';
import {ButtonProps} from '@material-ui/core/Button';
import {observable} from 'mobx';
import {observer} from 'mobx-react';
import React, {Component, ComponentType, ReactNode, createRef} from 'react';
import styled from 'styled-components';
import {Inject} from 'react-ts-di';

import {FormControl} from '../../ui';
import {CreateNewOrganization, OrganizationData} from '../register';
import {OrganizationService, Toast, WithDialog} from '../../services';

const Wrapper = styled.div`
  width: 345px;
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
`;

const Submit = styled(Button)`
  margin: 10px 0 20px 0 !important;
` as ComponentType<ButtonProps>;

@observer
export class NewOrganizationDialog extends Component<WithDialog> {
  @Inject
  organizationService!: OrganizationService;

  @observable
  organizationData!: OrganizationData;

  @Inject
  toast!: Toast;

  formControlRef = createRef<FormControl>();

  async handleCreateClick(): Promise<void> {
    const {current} = this.formControlRef;

    if (!current) {
      return;
    }

    current.validate();

    const {organizationName, organizationDescription} = this.organizationData;

    await this.organizationService.newOrganization(
      organizationName,
      organizationDescription!,
    );

    this.toast.success('创建组织成功!');
    this.props.close!(
      {},
      {
        isDestroy: true,
      },
    );
  }

  render(): ReactNode {
    return (
      <Wrapper>
        <CreateNewOrganization
          formControlRef={this.formControlRef}
          onOrganizationInfoChange={info => (this.organizationData = info)}
        ></CreateNewOrganization>
        <Submit
          variant="outlined"
          onClick={() => this.handleCreateClick()}
          color="primary"
        >
          立即创建
        </Submit>
      </Wrapper>
    );
  }
}
