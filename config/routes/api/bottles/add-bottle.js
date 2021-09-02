var router = require("express").Router();
const {check, validationResult} = require("express-validator");
const batchBottles = require("./batches")
const BottleModel = require("../../models/bottles/BottleModel");
const TransactionsManufacturedModel = require("../../models/bottles/TransactionsManufacturedModel");

router.post("/", [
    check("manufacturer", "Please provide the manufacturer info").exists(),
    check("isBatch", "Please specify if you are scanning a batch or not").exists(),
    check("title", "Please provide a title for this scan").exists(),
    check("bottleType", "Please provide a bottle type for this scan").exists(),
    check("bottleStatus", "Please provide a bottle status for this scan").exists(),
    check("bottleSize", "Please provide a bottle size for this scan").exists(),
    check("sizeUnit", "Please provide a bottle size unit for this scan").exists(),
    check("userId", "Please provide valid userId").exists(),
], async (req, res) => {

    //Define user request variables
    const {bottleQr, isBatch, batchQr, title, manufacturer, bottleType, bottleStatus, userId, bottleSize, sizeUnit} = req.body;

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
        //Check if the request is a batch or single request
        if(!isBatch)
        {
            //This is not a batch request, make sure the single bottle qr code was provided and is more than 10 digits
            if(bottleQr === undefined || bottleQr === null || bottleQr.length < 10){
                res.status(400).json({
                    status: 400,
                    errors: ["Please provide the bottle QR code and ensure it is above 10 digits"]
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
                    }).then(async () => {


                        //Insert into the relevant status tracking db (in this Transactions-Manufactured)
                        TransactionsManufacturedModel.create({
                            bottleQr,
                            userId,
                            batchQr,
                            bottleStatus
                        }).then(() => {
                            res.status(200).json({
                                "message":`Successfully added a new bottle with QR Code '${bottleQr}'`,
                                "status":200
                            });  
                        })

                       
                    })
                    
                }  
            }
            
            
        }
        else{
            //Since it's a batch request, we can now check if the batchQr was supplied by the user
            if(batchQr === null || batchQr === undefined)
            {
                res.status(400).json({
                    status: 400,
                    errors: [`Please provide the batchQr for this batch scan`]
                }) 
            }
            else{
                //If it was supplied, carry on
                const batch = batchBottles.filter((item) => item.batchQr === batchQr);
            
                //Then we check to make sure the supplied batch code can be identified
                if(batch.length < 1){
                    //Can't be verified? show error
                    res.status(404).json({
                        status: 404,
                        errors: [`Batch with QR Code ${batchQr} not found`]
                    }) 
                }
                else{
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
                        }).then(async () => {

    
                            //Use this id to insert into the relevant status tracking db (in this Transactions-Manufactured)
                            TransactionsManufacturedModel.create({
                                bottleQr:item.bottleQr,
                                userId,
                                batchQr,
                                bottleStatus
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
    }

})

module.exports = router;