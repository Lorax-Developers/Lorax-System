import React, { Component, useState } from "react";
import { Row } from "reactstrap";
import Select from "react-select";
import IntlMessages from "../../../../src/helpers/IntlMessages";
import CustomSelectInput from "../../../../src/components/common/CustomSelectInput";
import { Colxx } from "../../../../src/components/common/CustomBootstrap";
import axios from "axios";
import { useSelector } from "react-redux";
import DEFFDashboard from "..";
import { HelpOutline } from "@material-ui/icons";


export default class ReactSelectExample extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedOptions: [],
      id: "",
      name: ''
    }
  }

  async getOptions() {
    let server = 'http://localhost:5000';
    const res = await axios.get(`${server}/api/User/manufacturerlist`)
    const data = res.data

    const options = data.map(d => ({
      "value": d._id,
      "label": d.name
    }))
    this.setState({ selectOptions: options })
  }

  // handle selected value 
  // take e as a parameter and after that change the value of id and name using the setState function

  handleChange(e) {
    this.setState({ id: e.value, name: e.label })
  }

  componentDidMount() {
    this.getOptions()
  }

  render() {
    console.log(this.state.selectOptions)
    return (
      <div>
        {/* assign  handleChange event on onChange method inside select tag and bind it. */}
        <Select options={this.state.selectOptions} onChange={this.handleChange.bind(this)} />
        {/* <p>You have selected <strong>{this.state.name}</strong> whose id is <strong>{this.state.id}</strong></p> */}
      </div>
    )
  }
}


//VERSION ONE 

// const selectData = [
//   { label: "Coca Cola", value: "coke", key: 0 },
//   { label: "Pepsi", value: "pepsi", key: 1 },
//   { label: "Bonaqua", value: "bonaqua", key: 2 }
// ];


// export default class ReactSelectExample extends Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       selectedOptions: [],
//       selectedOption: ""
//     };
//   }

//   handleChangeMulti = selectedOptions => {
//     this.setState({ selectedOptions });
//   };

//   handleChange = selectedOption => {
//     this.setState({ selectedOption });

//   };

//   componentDidMount() {
//     let server = 'http://localhost:5000';
//     axios.get(`${server}/api/User/manufacturerlist`).then(res => {
//       const manufacturers = res.data;
//       console.log(manufacturers)
//       this.setState({ manufacturers });
//     });

//   }

//   render() {
//     return (
//       <Row>
//         <Colxx xxs="12" md="6" className="mb-5">
//           <label>
//             {/* <IntlMessages id="form-components.state-single" /> */}
//             Please select a manufacturer
//           </label>
//           <Select
//             components={{ Input: CustomSelectInput }}
//             className="react-select"
//             classNamePrefix="react-select"
//             name="form-field-name"
//             value={this.state.selectedOption}
//             onChange={this.handleChange}
//             options={selectData}
//           />
//         </Colxx>
//       </Row>
//     );
//   }
// }

// VERSION TWO

// import React, { Component, useState} from "react";
// import { Row } from "reactstrap";
// import Select from "react-select";
// import IntlMessages from "../../../../src/helpers/IntlMessages";
// import CustomSelectInput from "../../../../src/components/common/CustomSelectInput";
// import { Colxx } from "../../../../src/components/common/CustomBootstrap";
// import axios from "axios";
// import { useSelector } from "react-redux";
// import DEFFDashboard from "..";
// import { HelpOutline } from "@material-ui/icons";


// export default class ReactSelectExample extends Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       selectedOptions: [],
//       id: "",
//       name: ''
//     }
//   }

//   async getOptions() {
//     let server = 'http://localhost:5000';
//     const res = await axios.get(`${server}/api/User/manufacturerlist`)
//     const data = res.data

//     const options = data.map(d => ({
//       "value": d._id,
//       "label": d.name
//     }))
//     this.setState({ selectOptions: options })
//   }

//   // handle selected value 
//   // take e as a parameter and after that change the value of id and name using the setState function

//   handleChange(e) {
//     this.setState({ id: e.value, name: e.label })
//   }

//   componentDidMount() {
//     this.getOptions()
//   }


//   render() {
//     console.log(this.state.selectOptions)
//     return (
//       <div>
//         {/* assign  handleChange event on onChange method inside select tag and bind it. */}
//         <Select options={this.state.selectOptions} onChange={this.handleChange.bind(this)} />
//         <p>You have selected <strong>{this.state.name}</strong> whose id is <strong>{this.state.id}</strong></p>
//       </div>
//     )
//   }
// }

