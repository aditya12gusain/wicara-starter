import * as React from 'react';
import {
  Switch,
  Route,
  RouteComponentProps,
  withRouter,
  Redirect
} from 'react-router';

import {
  Wrapper,
  Content,
  Topbar,
  SidebarAndContent,
  Sidebar,
  SidebarMain,
  SidebarMainMenu,
  SidebarSub
} from '@kata-kit/layout';
import Logo from './components/Logo';

import * as sidebar from './sidebar';

import HomeModule from '../home';
import HomeSidebar from '../home/sidebar';
import AboutModule from '../about';

class App extends React.Component<RouteComponentProps> {
  public render() {
    const currLoc = this.getCurrentLocation();

    return (
      <Wrapper>
        <Topbar leftContent={<Logo />} />
        <SidebarAndContent hasTop>
          <Sidebar hasTop collapsed={this.isSidebarCollapsed()}>
            <SidebarMain>
              {Object.keys(sidebar.menus).map(menu => (
                <React.Fragment key={menu}>
                  <SidebarMainMenu
                    exact={sidebar.menus[menu].isExact}
                    to={sidebar.menus[menu].path}
                    icon={sidebar.menus[menu].icon}
                  >
                    {sidebar.menus[menu].title}
                  </SidebarMainMenu>
                </React.Fragment>
              ))}
            </SidebarMain>
            {!this.isSidebarCollapsed() && (
              <React.Fragment>
                {currLoc ? this.getSidebarSub(currLoc) : null}
              </React.Fragment>
            )}
          </Sidebar>
          <Content>
            <Switch>
              <Route path="/first-demo" component={HomeModule} />
              <Route path="/second-demo" component={AboutModule} />
              <Route render={() => <Redirect to="/first-demo" />} />
            </Switch>
          </Content>
        </SidebarAndContent>
      </Wrapper>
    );
  }

  private isSidebarCollapsed() {
    return this.props.location.pathname.search(/first-demo/) === -1;
  }

  private getCurrentLocation() {
    const locations =
      this.props.location && this.props.location.pathname
        ? this.props.location.pathname.split('/')
        : [];
    return locations.length > 1 ? locations[1] : undefined;
  }

  private getSidebarSub(location: string) {
    switch (location) {
      case 'first-demo': {
        return <HomeSidebar />;
      }
      case 'second-demo': {
        return <SidebarSub>SecondSidebar</SidebarSub>;
      }
      default: {
        return null;
      }
    }
  }
}

export default withRouter(App);