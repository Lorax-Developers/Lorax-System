import React, { useEffect, useState } from "react";
import AppLayout from '../../layout/AppLayout';
import axios from "axios";
import { Row } from "reactstrap";
import { Colxx, Separator } from "../../components/common/CustomBootstrap";
import './scan.scss';
import { useSelector } from "react-redux";

const Scan = (props) => {
    const [activeScan, setActiveScan2] = useState("single");

    let retrievedUserDetails = useSelector(state => state.auth.user);

    const [currentUser] = useState(retrievedUserDetails);
    const [isLoading, setIsLoading] = useState(false);
    const [roleOptions, setroleOptions] = useState([]);
    const [data, setData] = useState({
        "manufacturer":{
            id: retrievedUserDetails._id,
            name: retrievedUserDetails.name
        },
        "isBatch": false,
        "sizeUnit":"ml",
        "bottleType": "PET",
        "isNewScan":retrievedUserDetails.role === "Manufacturer" ? "true" : "false",
        "userId": retrievedUserDetails._id
    });

   
    
    useEffect(() => {
         //Declare the available status to each user role in arrays
        const ManufacturerOptions = ["Manufactured", "Outgoing"];
        const RetailerOptions = ["Delivered", "Purchased"];
        const ConsumerOptions = ["Deposited"];
        const WastePickerOptions = ["Deposited"];
        const RecyclingDepotOptions = ["Recycled"]

        if(currentUser.role === "Manufacturer"){
            setroleOptions(ManufacturerOptions);
            setData({...data,"bottleStatus":ManufacturerOptions[0]});
        }
        else if(currentUser.role === "Retailer"){
            setroleOptions(RetailerOptions);
            setData({...data,"bottleStatus":RetailerOptions[0]});
        }
        else if(currentUser.role === "Consumer"){
            setroleOptions(ConsumerOptions);
            setData({...data,"bottleStatus":ConsumerOptions[0]});
        }
        else if(currentUser.role === "Waste Picker"){
            setroleOptions(WastePickerOptions);
            setData({...data,"bottleStatus":WastePickerOptions[0]});
        }
        else if(currentUser.role === "Recycling Depot"){
            setroleOptions(RecyclingDepotOptions);
            setData({...data,"bottleStatus":RecyclingDepotOptions[0]});
        }
       
    }, [currentUser])

    //Add the user's input into the data sent to the backend
    const setDataValue = e => {
        setData({...data, [e.target.name]:e.target.value});
    }

    const setActiveScan = type => {
        setData({...data, "isBatch": type === "single" ? false : true})
        setActiveScan2(type);
    }

    //Function to begin the scan after form is submitted
    const BeginScan = (e) => {
        setIsLoading(true);
        e.preventDefault();

        let correctEndpoint = "addbottle";
        if(data.isNewScan === "true")
        {
            correctEndpoint = "addbottle"
        }
        else{
            correctEndpoint = "updatebottle"
        }
        var config = {
        method: 'post',
        url: 'http://localhost:5000/api/'+correctEndpoint,
        headers: { 
            'Content-Type': 'application/json'
        },
        data : data
        };

        axios(config)
        .then(function (response) {
            alert(response.data.message);
            console.log(response.data);
            setIsLoading(false);
        })
        .catch(function (error) {
            let errorList = error.response.data.errors;
            for(let i = 0; i < errorList.length; i++){
                alert(errorList[i])
            }
            setIsLoading(false);
        });

    }
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
                            <form onSubmit={(e) => BeginScan(e)}>
                                
                                {
                                    //Only a manufacturer should see this option
                                    currentUser.role === "Manufacturer" &&
                                    <div className="form-group row">
                                        <label className="col-sm-2 col-form-label">Scan Action</label>
                                        <div className="col-sm-10">
                                        <select required  name="isNewScan" onChange={(e) => setDataValue(e)} className="form-control">
                                            <option value={true}>New Scan</option>
                                            <option value={false}>Update Previous Scan</option>                                           
                                        </select>
                                        </div>
                                    </div>
                                }

                                {
                                data.isNewScan === "true" &&
                                <div className="form-group row">
                                    <label className="col-sm-2 col-form-label">Bottle Title</label>
                                    <div className="col-sm-10">
                                        <input required name="title" onChange={(e) => setDataValue(e)} type="text" className="form-control" />
                                    </div>
                                </div>
                                }



                                <div className="form-group row">
                                    <label className="col-sm-2 col-form-label">Status</label>
                                    <div className="col-sm-10">
                                        <select required  className="form-control" name="bottleStatus" onChange={(e) => setDataValue(e)}>
                                           {
                                               roleOptions.map((item, i) => {
                                                   return <option key={i}>{item}</option>
                                               })
                                           }
                                        </select>
                                    </div>
                                </div>
                                
                                {
                                activeScan === "single" ?
                                <div className="form-group row">
                                    <label className="col-sm-2 col-form-label">Bottle QR</label>
                                    <div className="col-sm-10">
                                        <input required name="bottleQr" onChange={(e) => setDataValue(e)} type="text" className="form-control" />
                                    </div>
                                </div>
                                :
                                <div className="form-group row">
                                    <label className="col-sm-2 col-form-label">Batch QR</label>
                                    <div className="col-sm-10">
                                        <input required name="batchQr" onChange={(e) => setDataValue(e)} type="text" className="form-control" />
                                    </div>
                                </div>
                                }
                                {
                                   data.isNewScan === "true" &&
                                    <>
                                    <div className="form-group row">
                                        <label className="col-sm-2 col-form-label">Bottle Size</label>
                                        <div className="col-sm-10">
                                            <input type="number" required name="bottleSize" onChange={(e) => setDataValue(e)}  className="form-control" />
                                        </div>
                                    </div>
                                    <div className="form-group row">
                                        <label className="col-sm-2 col-form-label">Bottle Size Unit</label>
                                        <div className="col-sm-10">
                                        <select required  className="form-control" name="sizeUnit" onChange={(e) => setDataValue(e)}>
                                                <option value="ml">ML (Millilitre)</option>
                                                <option value="l">L (Litre)</option>
                                            </select>
                                        </div>
                                    </div>
                               
                                    </>
                                }
                                
                            
                                <div className="form-group row mb-0">
                                    <div className="col-sm-10">
                                        <button  disabled={isLoading} className="btn btn-primary mb-0"><i className="iconsminds-qr-code"></i> { isLoading ? "Please wait.." : "Submit"} </button>
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