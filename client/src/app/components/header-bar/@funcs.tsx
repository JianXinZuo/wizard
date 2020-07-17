import {SvgIcon, Badge, Divider} from '@material-ui/core';
import NotificationsIcon from '@material-ui/icons/Notifications';
import React, {Component, ReactNode} from 'react';
import WorkIcon from '@material-ui/icons/Work';
import {Inject} from '@wizardoc/injector';
import styled from 'styled-components';
import {RouteComponentProps, withRouter} from 'react-router-dom';
import {observer} from 'mobx-react';

import {Popover} from 'src/app/ui';

import {GitHubSvg} from '../../assets';
import {Links} from '../../constant';
import {DrawerService, User, NotifyService} from '../../services';
import {ProfileStore} from '../../store';
import {InjectStore} from '../../utils';
import {Todos} from '../optional-tip';
import {Avatar} from '../common';
import {userItems, systemItems, dangerItems, SettingItem} from '../user';

import {IconFunc, IconFuncs} from './@icon-funcs';

const StyledAvatar = styled(Avatar)`
  width: 35px !important;
  height: 35px !important;
  font-size: 15px !important;
  cursor: pointer;
`;

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  margin-left: 10px;
`;

const UserInfo = styled.div`
  height: 48px;
  display: flex;
  align-items: center;
  cursor: pointer;
  margin-left: 20px;
  transition: background-color 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,
    box-shadow 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,
    border 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
  padding: 0 10px;

  &:hover {
    background: ${props => props.theme.buttonHoverBg};
  }
`;

const UserName = styled.div`
  margin-left: 10px;
`;

const UserSettings = styled.div``;

const renderUserSettings = (): ReactNode => {
  const renderItems = (items: SettingItem[]): ReactNode =>
    items.map(item => <div>{item.text}</div>);

  return (
    <UserSettings>
      {renderItems(userItems)}
      <Divider />
      {renderItems(systemItems)}
      <Divider />
      {renderItems(dangerItems)}
    </UserSettings>
  );
  // const renderContainer = [userItems, systemItems, dangerItems].map(items => items.map(item => <div>{item.text}</div>))
};

@withRouter
@observer
export class Funcs extends Component<Partial<RouteComponentProps>> {
  @Inject
  userService!: User;

  @Inject
  drawerService!: DrawerService;

  @Inject
  notifyService!: NotifyService;

  iconFuncs: IconFunc[] = [
    {
      tooltip: 'GitHub',
      handler: () => this.handleGithubIconClick(),
      body: (
        <SvgIcon>
          <GitHubSvg />
        </SvgIcon>
      ),
    },
    {
      tooltip: '待办事项',
      handler: () => this.handleTodoClick(),
      isLogin: true,
      body: <WorkIcon />,
    },
    {
      tooltip: '消息中心',
      handler: () => this.handleNotifyClick(),
      isLogin: true,
      body: (
        <Badge
          badgeContent={this.notifyService.unreadMessageCount}
          max={99}
          color="secondary"
        >
          <NotificationsIcon />
        </Badge>
      ),
    },
  ];

  @InjectStore(ProfileStore)
  private profileStore!: ProfileStore;

  handleGithubIconClick(): void {
    window.open(Links.GitHub);
  }

  handleAvatarClick(): void {
    this.profileStore.toggleViewProfilePanel();
  }

  handleTodoClick(): void {
    this.drawerService.render(<Todos />, {anchor: 'right'});
  }

  handleNotifyClick(): void {
    this.props.history!.push('/center/messages');
  }

  render(): ReactNode {
    const {userInfo, isLogin} = this.userService;
    const {displayName, avatar} = userInfo ?? {};

    return (
      <Wrapper>
        <IconFuncs iconFuncs={this.iconFuncs} />
        {isLogin && (
          <Popover
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'left',
            }}
            trigger="hover"
            bind={
              <UserInfo onClick={() => this.handleAvatarClick()}>
                <StyledAvatar
                  lnk={avatar}
                  username={displayName}
                ></StyledAvatar>
                <UserName>{displayName}</UserName>
              </UserInfo>
            }
          >
            {renderUserSettings()}
          </Popover>
        )}
      </Wrapper>
    );
  }
}
