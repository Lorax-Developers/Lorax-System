import React from "react";
import AppLayout from '../../layout/AppLayout';
//import { Row } from "reactstrap";
//import { Colxx, Separator } from "../../components/common/CustomBootstrap";
import './userprofile.css'

const UserProfile = () => {
  return (
    <AppLayout>
      <div>
        <div className="container pt-3 border">
          <div className="row gutters">
            <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
              <div className="card h-100">
                <div className="card-body">
                  <div className="account-settings">
                    <div className="user-profile">
                      <div className="user-avatar">
                        <img alt="Profile Pic" src={"/assets/img/loraxprofiletransparent.png"} />
                      </div>
                      <h5 className="user-name">Jenna Jones</h5>
                      <h6 className="user-role">Waste Picker </h6>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="container pt-3 border">
            <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
              <div className="card h-100">
                <div className="card-body">
                  <div className="row gutters">
                    <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                      <h6 className="mb-2 text-primary">Personal Details</h6>
                    </div>
                    <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                      <div className="form-group">
                        <label htmlFor="FirstName">First Name</label>
                        <input type="text" className="form-control" id="firstName" placeholder="Jenna" />
                      </div>
                    </div>
                    <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                      <div className="form-group">
                        <label htmlFor="LastName">Last Name</label>
                        <input type="text" className="form-control" id="lastName" placeholder="Jones" />
                      </div>
                    </div>
                    <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                      <div className="form-group">
                        <label htmlFor="eMail">Email</label>
                        <input type="email" className="form-control" id="eMail" placeholder="jennajones@gmail.com" />
                      </div>
                    </div>
                    <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                      <div className="form-group">
                        <label htmlFor="phone">Phone</label>
                        <input type="text" className="form-control" id="phone" placeholder="074 876 2938" />
                      </div>
                    </div>
                  </div>
                  <div className="row gutters">
                    <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                      <h6 className="mt-3 mb-2 text-primary">Address</h6>
                    </div>
                    <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                      <div className="form-group">
                        <label htmlFor="Street">Street</label>
                        <input type="name" className="form-control" id="Street" placeholder="1 Univeristy Road" />
                      </div>
                    </div>
                    <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                      <div className="form-group">
                        <label htmlFor="ciTy">City</label>
                        <input type="name" className="form-control" id="ciTy" placeholder="Cape Town" />
                      </div>
                    </div>
                    <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                      <div className="form-group">
                        <label htmlFor="Province">Province</label>
                        <input type="text" className="form-control" id="province" placeholder="Western cape" />
                      </div>
                    </div>
                    <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                      <div className="form-group">
                        <label htmlFor="zIp">Zip Code</label>
                        <input type="text" className="form-control" id="zIp" placeholder="7700" />
                      </div>
                    </div>
                  </div>
                  <div className="row gutters">
                    <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                      <div className="text-right">
                        <button type="button" id="submit" name="submit" className="btn btn-secondary">Cancel</button>
                        <button type="button" id="submit" name="submit" className="btn btn-primary">Update</button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container pt-3 border">

        <div class="card ">
          <div class="card-body text-center">       
          <h6 className="mb-2 text-primary">Number of bottles recycled</h6>
          <p>100</p>
          </div>
        </div>
        <div class="card ">        
          <div class="card-body text-center">
          <h6 className="mb-2 text-primary">Lorax Tokens</h6>
          <p>10</p>
          </div>
        </div>

      </div>


    </AppLayout>
  )
}

export default UserProfile;


