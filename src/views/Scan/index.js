import React, { useState } from "react";
import AppLayout from '../../layout/AppLayout';
import { Row } from "reactstrap";
import { Colxx, Separator } from "../../components/common/CustomBootstrap";
import './scan.scss';

const Scan = (props) => {
  const [activeScan, setActiveScan] = useState("single");
    return(
        <AppLayout>
            <Row>
              <Colxx xxs="12">
                <h1>Scan a new product</h1>
                <Separator className="mb-5" />
              </Colxx>
            </Row>
            <div className="row scan_row">
                <div className="glide__track" data-glide-el="track">
                    <h5 className="mb-4">&nbsp;&nbsp;&nbsp;Select Scan Type</h5>
                    <ul className="glide__slides scan_options" style={{minWidth:320,flexDirection: "column"}}>
                        <li className="glide__slide" onClick={() => setActiveScan("single")}>
                            <div className={`card ${activeScan === "single" && "active"}`}>
                                <div className="card-body text-center">
                                    <i className="iconsminds-basket-coins"></i>
                                    <p className="card-text mb-0">Single Item</p>
                                </div>
                            </div>
                        </li>
                        <li className="glide__slide" onClick={() => setActiveScan("multiple")}>
                        <div className={`card ${activeScan === "multiple" && "active"}`}>
                                <div className="card-body text-center">
                                    <div style={{textAlign:"center",justifyContent:"center",display: "flex"}}>
                                        <i className="iconsminds-basket-coins"></i>
                                        <i className="iconsminds-basket-coins"></i>
                                    </div>
                                    <p className="card-text mb-0">Multiple Items</p>
                                </div>
                            </div>
                        </li>
                    </ul>
                </div>


                <div className="col-12 col-xl-8 mb-4">
                    <div className="card mb-4">
                        <div className="card-body">
                            <h5 className="mb-4">Product Details</h5>
                            <form>
                                <div className="form-group row">
                                    <label className="col-sm-2 col-form-label">Product Title</label>
                                    <div className="col-sm-10">
                                        <input type="text" className="form-control" />
                                    </div>
                                </div>
                                <div className="form-group row">
                                    <label className="col-sm-2 col-form-label">Status</label>
                                    <div className="col-sm-10">
                                        <select className="form-control">
                                            <option>Manufactured</option>
                                            <option>Outgoing</option>
                                            <option>Delivered</option>
                                            <option>Purchased</option>
                                            <option>Deposited</option>
                                            <option>Recycled</option>
                                        </select>
                                    </div>
                                </div>
                                <div className="form-group row">
                                    <label className="col-sm-2 col-form-label">Product Description</label>
                                    <div className="col-sm-10">
                                        <textarea style={{height:173}} className="form-control" ></textarea>
                                    </div>
                                </div>
                                <fieldset className="form-group">
                                    <div className="row">
                                        <label className="col-form-label col-sm-2 pt-0">Product Type</label>
                                        <div className="col-sm-10">
                                            <div className="form-check">
                                                <input className="form-check-input" type="radio" name="gridRadios"
                                                    id="gridRadios1" value="option1" checked />
                                                <label className="form-check-label" for="gridRadios1">
                                                    Incoming
                                                </label>
                                            </div>
                                            <div className="form-check">
                                                <input className="form-check-input" type="radio" name="gridRadios"
                                                    id="gridRadios2" value="option2" />
                                                <label className="form-check-label" for="gridRadios2">
                                                    Outgoing
                                                </label>
                                            </div>
                                        
                                        </div>
                                    </div>
                                </fieldset>
                            
                                <div className="form-group row mb-0">
                                    <div className="col-sm-10">
                                        <button type="submit" className="btn btn-primary mb-0"><i className="iconsminds-qr-code"></i> Begin Scan</button>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>

                    
            </div>
        </AppLayout>
    )
}

export default Scan;