import React, { Component } from "react";
import {
  Row,
  Button,
  UncontrolledDropdown,
  DropdownMenu,
  DropdownItem,
  DropdownToggle,
  Collapse
} from "reactstrap";

import { Colxx, Separator } from "../../../components/common/CustomBootstrap";

class ListPageHeading extends Component {
  constructor(props) {
    super();
    this.state = {
      dropdownSplitOpen: false,
      displayOptionsIsOpen: false
    };
  }

  toggleDisplayOptions = () => {
    this.setState(prevState => ({
      displayOptionsIsOpen: !prevState.displayOptionsIsOpen
    }));
  };
  toggleSplit =()=> {
    this.setState(prevState => ({
      dropdownSplitOpen: !prevState.dropdownSplitOpen
    }));
  }

  render() {
    const {
      setSortingStatus,
      selectedOrderOption,
      orderOptions,
      setstartDate,
      setEndDate
    } = this.props;

    const { displayOptionsIsOpen } = this.state;
    return (
      <Row>
        <Colxx xxs="12">
          <div className="mb-2">
            <h1>
              Bottles
            </h1>

            <div className="text-zero top-right-button-container">
              <Button
                color="primary"
                size="lg"
                className="top-right-button"
                onClick={() => window.location = "/scan"}>
                Scan a new bottle
              </Button>
              {"  "}
            </div>
          </div>

          <div className="mb-2">
            <Button
              color="empty"
              className="pt-0 pl-0 d-inline-block d-md-none"
              onClick={this.toggleDisplayOptions}
            >
              Filter Options
              <i className="simple-icon-arrow-down align-middle" />
            </Button>
            <Collapse
              isOpen={displayOptionsIsOpen}
              className="d-md-block"
              id="displayOptions">
             
              <div className="d-block d-md-inline-block pt-1">
                <UncontrolledDropdown className="mr-1 float-md-left btn-group mb-1">
                  <DropdownToggle caret color="outline-dark" size="xs">
                    Filter By Status: 
                    &nbsp;{selectedOrderOption}
                  </DropdownToggle>
                  <DropdownMenu>
                    {orderOptions.map((status, index) => {
                      return (
                        <DropdownItem
                          key={index}
                          onClick={() => setSortingStatus(status)}
                        >
                          {status}
                        </DropdownItem>
                      );
                    })}
                  </DropdownMenu>
                </UncontrolledDropdown>

                <div className="search-sm d-inline-block float-md-left mr-1 mb-1 align-top">
                    <label>Start Date: </label>
                    <input type="date" name="keyword" onChange={(e) => setstartDate(e.target.value)}/>

                    <label>End Date: </label>
                    <input type="date" name="keyword" onChange={(e) => setEndDate(e.target.value)}/>
                </div>
              </div>
              <div className="float-md-right pt-1">
                <span className="text-muted text-small mr-1">
                  Total number of bottles: {this.props.totalPage}
                </span>
              </div>
            </Collapse>
          </div>
          <Separator className="mb-5" />
        </Colxx>
      </Row>
    );
  }
}

export default ListPageHeading
