var router = require("express").Router();
const {check, validationResult} = require("express-validator");
const batchBottles = require("./batches")
const BottleModel = require("../../models/bottles/BottleModel");
const TransactionsManufacturedModel = require("../../models/bottles/TransactionsManufacturedModel");
const BottleHistoryModel = require("../../models/bottles/BottleHistoryModel")

router.post("/", [
    check("manufacturer", "Please provide the manufacturer info").exists(),
    check("title", "Please provide a title for this scan").exists(),
    check("bottleType", "Please provide a bottle type for this scan").exists(),
    check("bottleSize", "Please provide a bottle size for this scan").exists(),
    check("sizeUnit", "Please provide a bottle size unit for this scan").exists(),
    check("userId", "Please provide valid userId").exists(),
    check("qrCode", "Please provide the qr code").exists(),
], async (req, res) => {

    //Define user request variables
    const {qrCode, isBatch, title, manufacturer, bottleType, userId, bottleSize, sizeUnit} = req.body;

    //Assign the bottle qr variable and batch qr variable to the qr code parameter
    const bottleQr = qrCode;
    const batchQr = qrCode;
    
    const bottleStatus = "Manufactured";

    //Check if any of the error tests mentioned above were failed
    const expressNotedErrors = validationResult(req);

    //IF so, send a list of errors
    if(!expressNotedErrors.isEmpty()){
        res.status(400).json({
            status: 400,
            errors: expressNotedErrors.array() 
        })
    }
    else{
        //Check if the request is a batch or single request by checking the batch repository
        const batch = batchBottles.filter((item) => item.batchQr === batchQr);

        if(batch.length < 1)
        {
            //The search returned empty array meaning the batch qr was not found.
            
            //This is not a batch request, make sure the qr code is more than 10 digits
            if(qrCode.length < 10){
                res.status(400).json({
                    status: 400,
                    errors: ["Please ensure the QR code is above 10 digits"]
                })
            }
            else{
                //If it was supplied, carry on

                //check if the bottle QR has been scanned before and return error if so
                let checkExist = await BottleModel.findOne({bottleQr});
                if(checkExist)
                {
                    res.status(400).json({
                        status: 400,
                        errors: [`Bottle with QR code ${bottleQr} scanned already`]
                    }) 
                }
                else{
                    //If it hasn't been scanned before, insert and send a success message
                    BottleModel.create({
                        bottleQr,
                        bottleTitle:title,
                        manufacturer,
                        bottleStatus,
                        batchQr,
                        bottleSize,
                        sizeUnit,
                        bottleType,
                        //dateAdded:new Date("2021-06-13"),
                    }).then(async () => {

                        //Insert into the relevant status tracking db (in this Transactions-Manufactured)
                        TransactionsManufacturedModel.create({
                            bottleQr,
                            userId,
                            batchQr,
                            bottleStatus
                        }).then(async () => {
                                //Create the history array and add in 'Manufactured'
                                let array = [];
                                array.push({
                                    status:"Manufactured",
                                    updated:new Date(),
                                    userId
                                })

                                //Insert into history db
                                BottleHistoryModel.create({
                                    bottleQr,
                                    history:array
                                }).then(() => {
                                    res.status(200).json({
                                        "message":`Successfully added a new bottle with QR Code '${bottleQr}'`,
                                        "status":200
                                    });  
                                })

                        })

                       
                    })
                    
                }  
            }
            
            
        }
        else{
            //check if the batch QR has been scanned before and return error if so
            let checkExist = await BottleModel.findOne({batchQr});
            if(checkExist)
            {
                res.status(400).json({
                    status: 400,
                    errors: [`Batch with QR code ${batchQr} scanned already`]
                }) 
            }
            else{

                //Get the batch from the batch repository to view bottles in it
                const batch = batchBottles.filter((item) => item.batchQr === batchQr);
            

                    //Can be verified? insert each bottle in the batch into the collection
                    batch[0].bottles.map(item => {
                        BottleModel.create({
                            bottleQr:item.bottleQr,
                            bottleTitle:title,
                            manufacturer,
                            bottleStatus,
                            bottleSize,
                            sizeUnit,
                            batchQr,
                            bottleType,
                            //dateAdded:new Date("2021-06-13"),
                        }).then(async () => {

    
                            //Use this id to insert into the relevant status tracking db (in this Transactions-Manufactured)
                            TransactionsManufacturedModel.create({
                                bottleQr:item.bottleQr,
                                userId,
                                batchQr,
                                bottleStatus
                            })

                            let array = [];
                            array.push({
                                status:"Manufactured",
                                updated:new Date(),
                                userId
                            })

                            //Insert into history db
                            BottleHistoryModel.create({
                                bottleQr:item.bottleQr,
                                batchQr,
                                history:array
                            })

                        })
                    })
                    //Send a success message
                    res.status(200).json({
                        "message":`Successfully scanned a batch containing ${batch[0].bottles.length} bottles with QR Code '${batchQr}`,
                    })
                }
        }    
    }

})

module.exports = router;