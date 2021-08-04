import React, { Component } from 'react';
import { Nav, NavItem } from 'reactstrap';
import { NavLink } from 'react-router-dom';
import PerfectScrollbar from 'react-perfect-scrollbar';

import IntlMessages from '../../helpers/IntlMessages';



import menuItems from '../../constants/menu';


class Sidebar extends Component {
  state = {
    currentPage:"",
  }
  componentDidMount = () => {
    const currentPage = window.location.pathname;
    this.setState({
      currentPage: currentPage
    })
  }
  render() {
    return (
      <div className="sidebar">
        <div className="main-menu">
          <div className="scroll">
            <PerfectScrollbar
              options={{ suppressScrollX: true, wheelPropagation: false }}
            >
              <Nav vertical className="list-unstyled">
                {menuItems &&
                  menuItems.map(item => {
                    return (
                      <NavItem
                        key={item.id}
                        className={`${item.to === this.state.currentPage && 'active'}`}
                      >
                        {item.newWindow ? (
                          <a
                            href={item.to}
                            rel="noopener noreferrer"
                            target="_blank"
                          >
                            <i className={item.icon} />{' '}
                            <IntlMessages id={item.label} />
                          </a>
                        ) : (
                          <NavLink
                            to={item.to}
                            data-flag={item.id}
                          >
                            <i className={item.icon} />{' '}
                            <IntlMessages id={item.label} />
                          </NavLink>
                        )}
                      </NavItem>
                    );
                  })}
              </Nav>
            </PerfectScrollbar>
          </div>
        </div>

        <div className="sub-menu">

        </div>
      </div>
    );
  }
}


export default Sidebar
