import React, { Component } from "react";
import { injectIntl } from "react-intl";
import {
  UncontrolledDropdown,
  DropdownItem,
  DropdownToggle,
  DropdownMenu,
  Input,
} from "reactstrap";
import { Redirect } from "react-router-dom";

import { NavLink } from "react-router-dom";

import {
  menuHiddenBreakpoint,
  searchPath,
} from "../../constants/defaultValues";

import { MobileMenuIcon, MenuIcon } from "../../components/svg";

//REDUX
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { logout } from "../../actions/auth";

class TopNav extends Component {
  propTypes = {
    logout: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
  };

  constructor(props) {
    super(props);

    this.state = {
      isInFullScreen: false,
      searchKeyword: "",
    };
  }

  isInFullScreen = () => {
    return (
      (document.fullscreenElement && document.fullscreenElement !== null) ||
      (document.webkitFullscreenElement &&
        document.webkitFullscreenElement !== null) ||
      (document.mozFullScreenElement &&
        document.mozFullScreenElement !== null) ||
      (document.msFullscreenElement && document.msFullscreenElement !== null)
    );
  };
  handleSearchIconClick = (e) => {
    if (window.innerWidth < menuHiddenBreakpoint) {
      let elem = e.target;
      if (!e.target.classList.contains("search")) {
        if (e.target.parentElement.classList.contains("search")) {
          elem = e.target.parentElement;
        } else if (
          e.target.parentElement.parentElement.classList.contains("search")
        ) {
          elem = e.target.parentElement.parentElement;
        }
      }

      if (elem.classList.contains("mobile-view")) {
        this.search();
        elem.classList.remove("mobile-view");
        this.removeEventsSearch();
      } else {
        elem.classList.add("mobile-view");
        this.addEventsSearch();
      }
    } else {
      this.search();
    }
  };
  addEventsSearch = () => {
    document.addEventListener("click", this.handleDocumentClickSearch, true);
  };
  removeEventsSearch = () => {
    document.removeEventListener("click", this.handleDocumentClickSearch, true);
  };

  handleDocumentClickSearch = (e) => {
    let isSearchClick = false;
    if (
      e.target &&
      e.target.classList &&
      (e.target.classList.contains("navbar") ||
        e.target.classList.contains("simple-icon-magnifier"))
    ) {
      isSearchClick = true;
      if (e.target.classList.contains("simple-icon-magnifier")) {
        this.search();
      }
    } else if (
      e.target.parentElement &&
      e.target.parentElement.classList &&
      e.target.parentElement.classList.contains("search")
    ) {
      isSearchClick = true;
    }

    if (!isSearchClick) {
      const input = document.querySelector(".mobile-view");
      if (input && input.classList) input.classList.remove("mobile-view");
      this.removeEventsSearch();
      this.setState({
        searchKeyword: "",
      });
    }
  };
  handleSearchInputChange = (e) => {
    this.setState({
      searchKeyword: e.target.value,
    });
  };
  handleSearchInputKeyPress = (e) => {
    if (e.key === "Enter") {
      this.search();
    }
  };

  search = () => {
    this.props.history.push(searchPath + "/" + this.state.searchKeyword);
    this.setState({
      searchKeyword: "",
    });
  };

  toggleFullScreen = () => {
    const isInFullScreen = this.isInFullScreen();

    var docElm = document.documentElement;
    if (!isInFullScreen) {
      if (docElm.requestFullscreen) {
        docElm.requestFullscreen();
      } else if (docElm.mozRequestFullScreen) {
        docElm.mozRequestFullScreen();
      } else if (docElm.webkitRequestFullScreen) {
        docElm.webkitRequestFullScreen();
      } else if (docElm.msRequestFullscreen) {
        docElm.msRequestFullscreen();
      }
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      } else if (document.webkitExitFullscreen) {
        document.webkitExitFullscreen();
      } else if (document.mozCancelFullScreen) {
        document.mozCancelFullScreen();
      } else if (document.msExitFullscreen) {
        document.msExitFullscreen();
      }
    }
    this.setState({
      isInFullScreen: !isInFullScreen,
    });
  };

  handleLogout = () => {
    //logout
    this.props.logout();

    return <Redirect to="/login" />;
  };

  menuButtonClick = (e, menuClickCount, containerClassnames) => {
    e.preventDefault();

    setTimeout(() => {
      var event = document.createEvent("HTMLEvents");
      event.initEvent("resize", false, false);
      window.dispatchEvent(event);
    }, 350);
    this.props.setContainerClassnames(
      ++menuClickCount,
      containerClassnames,
      this.props.selectedMenuHasSubItems
    );
  };
  mobileMenuButtonClick = (e, containerClassnames) => {
    e.preventDefault();
    this.props.clickOnMobileMenu(containerClassnames);
  };

  render() {
    const { containerClassnames, menuClickCount } = this.props;
    //const { messages } = this.props.intl;
    return (
      <nav className="navbar fixed-top">
        <div className="d-flex align-items-center navbar-left">
          <NavLink
            to="#"
            className="menu-button d-none d-md-block"
            onClick={() => this.props.togglesidebar(!this.props.showsidebar)}
          >
            <MenuIcon />
          </NavLink>
          <NavLink
            to="#"
            className="menu-button-mobile d-xs-block d-sm-block d-md-none"
            onClick={() => this.props.togglesidebar(!this.props.showsidebar)}
          >
            <MobileMenuIcon />
          </NavLink>

          <div className="search" data-search-path="/app/pages/search">
            <Input
              name="searchKeyword"
              id="searchKeyword"
              //placeholder={messages["menu.search"]}
              value={this.state.searchKeyword}
              // onChange={(e) => this.handleSearchInputChange(e)}
              // onKeyPress={(e) => this.handleSearchInputKeyPress(e)}
            />
            <span
              className="search-icon"
              //onClick={(e) => this.handleSearchIconClick(e)}
            >
              <i className="simple-icon-magnifier" />
            </span>
          </div>
          {this.props.user.role == "PRO" ||
          this.props.user.role == "admin" ||
          this.props.user.role == "DEFF" ? (
            ""
          ) : (
            <div className="position-relative d-none d-none d-lg-inline-block">
              <a
                className="btn btn-primary btn-sm ml-2"
                target="_top"
                href="/scan"
              >
                <i class="iconsminds-qr-code"></i>
                &nbsp; SCAN
              </a>
            </div>
          )}
        </div>
        <a className="navbar-logo" href="/">
          <span className="logo d-none d-xs-block" />
          <span className="logo-mobile d-block d-xs-none" />
        </a>
        <div className="navbar-right">
          {/* {isDarkSwitchActive && <TopnavDarkSwitch />} */}

          <div className="header-icons d-inline-block align-middle">
            {/* <TopnavEasyAccess /> */}
            {/* <TopnavNotifications /> */}
            <button
              className="header-icon btn btn-empty d-none d-sm-inline-block"
              type="button"
              id="fullScreenButton"
              onClick={this.toggleFullScreen}
            >
              {this.state.isInFullScreen ? (
                <i className="simple-icon-size-actual d-block" />
              ) : (
                <i className="simple-icon-size-fullscreen d-block" />
              )}
            </button>
          </div>
          <div className="user d-inline-block">
            <UncontrolledDropdown className="dropdown-menu-right">
              <DropdownToggle className="p-0" color="empty">
                <span className="name mr-1">{this.props.user.name}</span>
                <span>
                  <img alt="Profile" src="/assets/img/default-profile.jpg" />
                </span>
              </DropdownToggle>
              <DropdownMenu className="mt-3" right>
                <DropdownItem
                  onClick={() => (window.location = "/userprofile")}
                >
                  Account
                </DropdownItem>
                <DropdownItem onClick={() => (window.location = "/faq")}>
                  FAQ{" "}
                </DropdownItem>
                <DropdownItem divider />
                <DropdownItem onClick={() => this.handleLogout()}>
                  {}
                  {/*a way to link to another page */}
                  Sign out
                </DropdownItem>
              </DropdownMenu>
            </UncontrolledDropdown>
          </div>
        </div>
      </nav>
    );
  }
}
const mapStateToProps = (state) => ({
  auth: state.auth,
});

//injectIntl was taken out below
export default connect(mapStateToProps, { logout })(TopNav);
//export default TopNav;
