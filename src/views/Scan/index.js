import React, { useEffect, useState } from "react";
import AppLayout from '../../layout/AppLayout';
import axios from "axios";
import { Row } from "reactstrap";
import { Colxx, Separator } from "../../components/common/CustomBootstrap";
import './scan.scss';
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import Swal from 'sweetalert2';
import web3 from "web3";

const Scan = (props) => {
    const [activeScan, setActiveScan2] = useState("single");

    let retrievedUserDetails = useSelector(state => state.auth.user);
    const [currentUser] = useState(retrievedUserDetails);
    const [isLoading, setIsLoading] = useState(false);
    
    const [data, setData] = useState({
        "manufacturer":{
            id: retrievedUserDetails._id,
            name: retrievedUserDetails.name
        },
        "userRole": retrievedUserDetails.role,
        "sizeUnit":"ml",
        "bottleSize":"300",
        "qrCode":"",
        "bottleType": "PET",
        "isNewScan":retrievedUserDetails.role === "Manufacturer" ? "true" : "false",
        "userId": retrievedUserDetails._id
    });

    const beginUpload = () => {
        document.getElementById("dummy_file").click();
    }

    const ShowScanMsg = (type) => {
        if(type === "error"){
            setDataValue2("qrCode", " ")
            document.getElementById("qr_val").value = " "
            toast.error("QR code can not be decoded, please try another image");
        }
        else if(type === "success"){
            let val = document.getElementById("qr_val").value;
            setDataValue2("qrCode", val);
            toast.info(`QR code decoded successfully with value '${val}'`);
        }
    }

    const setDataValue = e => {
        setData({...data, [e.target.name]:e.target.value});
        if(e.target.name == "bottleSize"){
          if(parseInt(e.target.value) < 300){
            document.getElementById("sizeUnit").selectedIndex="1";
          }
          else{
            document.getElementById("sizeUnit").selectedIndex="0";
          }
        }
    }

    const setDataValue2 = (state, value) => {
        setData({...data, [state]:value});
    }

    //Function to begin the scan after form is submitted
    const BeginScan = (e) => {
        //makes it inform user that it is loading
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
        //success
        .then(function (response) {
          
            Swal.fire({
                title: 'Scan Successful', 
                text: response.data.message, 
                icon: 'success',
                confirmButtonColor: '#6fb327',
                confirmButtonText: 'Alright!'
            })
            setIsLoading(false);
            // calling addtoBlockchain function and ensuring that bottledetails is not empty
            if(response.data.bottleDetails !== undefined && response.data.bottleDetails !== null){
              addBottleToBlockchain(response.data.bottleDetails);
            }
          
        })
        //error
        .catch(function (error) {
            let errorList = error.response.data.errors;
            for(let i = 0; i < errorList.length; i++){
                if(errorList[i].msg !== undefined && errorList[i].msg !== null){
                  toast.error(errorList[i].msg)
                }
                else{
                  toast.error(errorList[i])
                }
            }
            setIsLoading(false);
        });

    }
    
  const showAccount = document.querySelector(".showAccount");
    
  let accounts;
  let PlasticbottleContract;

  //Checking if user is connected to Metamask
  const isMetaMaskConnected = () => accounts && accounts.length > 0;

 //request access to the user's MetaMask account
    async function getAccount() {
        if (typeof window.ethereum !== "undefined") {
        try {
        /* Ask user permission to access his accounts, this will open the MetaMask UI*/
            const {ethereum} = window;
            accounts = await ethereum.request({
              method: "eth_requestAccounts",
            });
            showAccount.innerHTML = accounts;
            console.log(accounts || "Not able to get accounts");
            console.log(isMetaMaskConnected());
            if (isMetaMaskConnected()) {
              console.log("Metamask is connected :)");
            }
          } catch (err) {
            var message_description = "Access to your Ethereum account rejected.";
    
            return console.log(message_description);
          }
        } else {
          console.log("Please install MetaMask");
        }
       }

      let PlasticbottleContractAddress = "0xcCd9716739B8430AEA337714056FBcd220e582F0";
      let PlasticbottleContractABI= 
      [
        {
          "anonymous": false,
          "inputs": [
            {
              "indexed": true,
              "internalType": "uint256",
              "name": "_bottleID",
              "type": "uint256"
            }
          ],
          "name": "registeredBottleEvent",
          "type": "event"
        },
        {
          "constant": true,
          "inputs": [
            {
              "internalType": "uint256",
              "name": "",
              "type": "uint256"
            }
          ],
          "name": "BottleArray",
          "outputs": [
            {
              "internalType": "string",
              "name": "qrCode",
              "type": "string"
            },
            {
              "internalType": "string",
              "name": "title",
              "type": "string"
            },
            {
              "internalType": "string",
              "name": "status",
              "type": "string"
            },
            {
              "internalType": "uint256",
              "name": "bottleSize",
              "type": "uint256"
            },
            {
              "internalType": "string",
              "name": "sizeUnit",
              "type": "string"
            },
            {
              "internalType": "address",
              "name": "user",
              "type": "address"
            }
          ],
          "payable": false,
          "stateMutability": "view",
          "type": "function"
        },
        {
          "constant": false,
          "inputs": [
            {
              "internalType": "string",
              "name": "_qrCode",
              "type": "string"
            },
            {
              "internalType": "string",
              "name": "_title",
              "type": "string"
            },
            {
              "internalType": "string",
              "name": "_status",
              "type": "string"
            },
            {
              "internalType": "uint256",
              "name": "_bottleSize",
              "type": "uint256"
            },
            {
              "internalType": "string",
              "name": "_sizeUnit",
              "type": "string"
            }
          ],
          "name": "registerBottle",
          "outputs": [
            {
              "internalType": "uint256",
              "name": "",
              "type": "uint256"
            }
          ],
          "payable": false,
          "stateMutability": "nonpayable",
          "type": "function"
        },
        {
          "constant": true,
          "inputs": [],
          "name": "numberofBottles",
          "outputs": [
            {
              "internalType": "uint256",
              "name": "",
              "type": "uint256"
            }
          ],
          "payable": false,
          "stateMutability": "view",
          "type": "function"
        }
      ];

      function handle_error(err) {
        console.log("function handle_error(err).");
        var error_data = err.data;
        var message_description = "Bottle Smart contract call failed: " + err;
        if (typeof error_data !== "undefined") {
          var error_message = error_data.message;
          if (typeof error_message !== "undefined") {
            message_description =
              "Bottle smart contract call failed: " + error_message;
          }
        }
    
        // TODO - trigger  notification
        return console.log(message_description);
      }
      function handle_web3_undefined_error() {
        console.log("function handle_web3_undefined_error(err).");
        // var message_type = CONSTANTS.ERROR; //error or success
        var message_description =
          "Please install MetaMask to access the Ethereum Web3 injected API from your Web browser.";
    
        //TODO - trigger notification
        return console.log(message_description);
      }

    async function addBottleToBlockchain(bottleDetails){
        //bottle data pulled from the database to blockchain (REACT)
        var qrCode = bottleDetails.bottleQr;
        var title =  bottleDetails.bottleTitle;
        var status =  bottleDetails.bottleStatus;
        var bottleSize = bottleDetails.bottleSize;
        var sizeUnit= bottleDetails.sizeUnit;
    
             
        console.log("data.QrCode to add to blockchain - " + qrCode);
        console.log("bottleTitle to add to blockchain - " + title);
        console.log("bottleStatus to add to blockchain - " + status);
        console.log("bottleSize to add to blockchain - " + bottleSize);
        console.log("sizeUnit to add to blockchain - " + sizeUnit);

       await getAccount();
        const ethers = require("ethers");
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        console.log({provider});
        const signer = provider.getSigner();  // Your current metamask account;
        const contractUser = await signer.getAddress();
        console.log("contractUser:", contractUser );
        
        
        let PlasticbottleContract = new ethers.Contract(PlasticbottleContractAddress,PlasticbottleContractABI,signer);
        console.log("PlasticbottleContract:", PlasticbottleContract );

        try {
          //invoking the smart contract
          const index = await PlasticbottleContract.registerBottle(qrCode, title, status, parseInt(bottleSize), sizeUnit);

          const data = await index.wait();
          console.log("data: ", data);
       } catch (err) {
          console.log("Error: ", err);
        
        }
        var message_description = `Transaction submitted to Blockchain for processing. Check your Metamask for transaction update.`;
    
        //TODO - trigger notification
        console.log(message_description);
      }
    
      // function to get count of bottle entries that have been previously added to the blockchain
      function numberofBottles() {
        if (typeof web3 === "undefined") {
          return handle_web3_undefined_error();
        }
    
        PlasticbottleContract.numberofBottles(function (err, result) {
          if (err) {
            return handle_error(err);
          }
    
          let BottleSubmissionsCount = result.toNumber(); // Output from the contract function call
    
          console.log("numberofBottlesCount: " + BottleSubmissionsCount);
          var message_description = `Number of Bottle Uploads in Lorax System: + ${BottleSubmissionsCount}`;
    
          // TODO - trigger notification
          return console.log(message_description);
        });
      }
    const SizesArray = ["300","330","440","500","750","1","1.5","2","2.25"];
    return(
        <AppLayout>
            <Row>
              <Colxx xxs="12">
                <h1>Scan a product</h1>
                <Separator className="mb-5" />
              </Colxx>
            </Row>
            <div className="row scan_row">
                <div className="glide__track" data-glide-el="track">
                    <h5 className="mb-4">&nbsp;&nbsp;&nbsp;Select Scan Type</h5>
                    <ul className="glide__slides scan_options" style={{minWidth:320,flexDirection: "column"}}>
                        {
                         //Only a manufacturer should see this option
                         currentUser.role === "Manufacturer" &&
                         <li className="glide__slide" onClick={() => setDataValue2("isNewScan", "true")}>
                            <div className={`card ${data.isNewScan === "true" && "active"}`}>
                                <div className="card-body text-center">
                                    <i className="iconsminds-basket-coins"></i>
                                    <p className="card-text mb-0">Upload New Bottle(s)</p>
                                </div>
                            </div>
                        </li>
                        }
                        <li className="glide__slide" onClick={() => setDataValue2("isNewScan", "false")}>
                        <div className={`card ${data.isNewScan === "false" && "active"}`}>
                                <div className="card-body text-center">
                                    <div style={{textAlign:"center",justifyContent:"center",display: "flex"}}>
                                        <i className="iconsminds-basket-coins"></i>
                                    </div>
                                    <p className="card-text mb-0">Update Existing  Bottle</p>
                                </div>
                            </div>
                        </li>
                    </ul>
                </div>


                <div className="col-12 col-xl-8 mb-4">
                    <div className="card mb-4">
                        <div className="card-body">
                            <h5 className="mb-4">Product Details</h5>
                            {/* <button class="enableEthereumButton btn btn-success" onClick={getAccount}>Enable Ethereum & Connect to Wallet</button> */}
                            <p>Connected Account: <span class="showAccount"></span></p>
                            <form onSubmit={(e) => BeginScan(e)}>
                            
                                    {/* <div className="form-group row">
                                        <label className="col-sm-2 col-form-label">Scan Type</label>
                                        <div className="col-sm-10">
                                        <select required  name="isNewScan" onChange={(e) => setActiveScan(e)} className="form-control">
                                            <option value="single">Single bottle</option>
                                            <option value="multiple">Multiple bottles (Batch)</option>                                           
                                        </select>
                                        </div>
                                    </div> */}
                                
                                <div className="form-group row">
                                    <label className="col-sm-2 col-form-label">QR Code</label>
                                    <div className="col-sm-10">
                                    <div onClick={beginUpload}  className="scan_div">
                                            {
                                                data.qrCode === "" ?
                                                <>
                                                    <i class="iconsminds-qr-code"></i>
                                                    <p>Click to scan</p>
                                                </>
                                                :
                                                <>
                                                    <i class="simple-icon-reload"></i><br></br>
                                                    <p>Change QR</p>
                                                </>
                                            }
                                        </div> 

                                        <button type="button" class="lorax_hidden" id="scan_error_btn" onClick={() => ShowScanMsg('error')}></button>


                                        <button type="button" class="lorax_hidden" id="scan_success_btn" onClick={() => ShowScanMsg('success')}></button>                                   
                                    </div>
                                </div>


                                <div  className={`form-group row ${data.qrCode === "" && 'lorax_hidden'}`}>
                                    <label className="col-sm-2 col-form-label">QR Value</label>
                                    <div className="col-sm-10">
                                        <input name="qrCode" value={data.qrCode} onChange={(e) => setDataValue2("qrCode", e.target.value)} id="qr_val" disabled  className="form-control" />
                                    </div>
                                </div>

                                {
                                data.isNewScan === "true" &&
                                <div className="form-group row">
                                    <label className="col-sm-2 col-form-label">Bottle Title</label>
                                    <div className="col-sm-10">
                                        <input required name="title" onChange={(e) => setDataValue(e)} type="text" className="form-control" />
                                    </div>
                                </div>
                                }



                                {/* <div className="form-group row">
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
                                </div> */}

                              
                                
                                

                                {/*
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
                                */}

                                {
                                   data.isNewScan === "true" &&
                                    <>
                                    <div className="form-group row">
                                        <label className="col-sm-2 col-form-label">Bottle Size</label>
                                        <div className="col-sm-10">
                                            <select required  className="form-control" name="bottleSize" onChange={(e) => setDataValue(e)}>
                                                {
                                                  SizesArray.map(size =>
                                                    <option>{size}</option>
                                                    )
                                                }
                                                <option>Other</option>
                                            </select>
                                            <br></br>
                                            {
                                              !SizesArray.includes(data.bottleSize) && 
                                              <input value={data.bottleSize != "Other" ? data.bottleSize:""} required className="form-control" name="bottleSize" onChange={(e) => setDataValue(e)}></input>
                                            }
                                        </div>
                                    </div>
                                    <div className="form-group row">
                                        <label className="col-sm-2 col-form-label">Bottle Size Unit</label>
                                        <div className="col-sm-10">
                                        <select required  className="form-control" name="sizeUnit" id="sizeUnit" onChange={(e) => setDataValue(e)}>
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