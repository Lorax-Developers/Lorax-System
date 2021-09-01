var router = require("express").Router();
const {check, validationResult} = require("express-validator");
const batchBottles = require("./batches")
const BottleModel = require("../../models/bottles/BottleModel");

//Models for all transactions types
const TransactionsManufacturedModel = require("../../models/bottles/TransactionsManufacturedModel");
const TransactionsOutgoingModel = require("../../models/bottles/TransactionsOutgoingModel");
const TransactionsPurchasedModel = require("../../models/bottles/TransactionsPurchasedModel");
const TransactionsDeliveredModel = require("../../models/bottles/TransactionsDeliveredModel");
const TransactionsDepositedModel = require("../../models/bottles/TransactionsDepositedModel");
const TransactionsRecycledModel = require("../../models/bottles/TransactionsRecycledModel");

const deleteFromOldTransactionsDb = async (currentDb, bottleQr) => {
    let deleteFromOldTransactionDb; 
    
    if(currentDb === "transactions-manufactured"){
        deleteFromOldTransactionDb = await TransactionsManufacturedModel.deleteOne({bottleQr})
    }
    else if(currentDb === "transactions-outgoing"){
        deleteFromOldTransactionDb = await TransactionsOutgoingModel.deleteOne({bottleQr})
    }
    else if(currentDb === "transactions-purchased"){
        deleteFromOldTransactionDb = await TransactionsPurchasedModel.deleteOne({bottleQr})
    }
    else if(currentDb === "transactions-delivered"){
        deleteFromOldTransactionDb = await TransactionsDeliveredModel.deleteOne({bottleQr})
    }
    else if(currentDb === "transactions-deposited"){
        deleteFromOldTransactionDb = await TransactionsDepositedModel.deleteOne({bottleQr})
    }
    else if(currentDb === "transactions-recycled"){
        deleteFromOldTransactionDb = await TransactionsRecycledModel.deleteOne({bottleQr})
    }

    return console.log("deleted "+bottleQr+" from "+currentDb);

}

const addToNewTransactionsDb = async (nextDb, bottleQr, checkExist, bottleStatus, userId) => {
    
    //Find and Insert into the appropriate next transaction status collection
    let addToNewTransactionDb; 
    if(nextDb === "transactions-manufactured"){
        addToNewTransactionDb = await TransactionsManufacturedModel.create({bottleQr, userId,batchQr: checkExist.batchQr,bottleStatus})
    }
    else if(nextDb === "transactions-outgoing"){
        addToNewTransactionDb = await TransactionsOutgoingModel.create({bottleQr, userId,batchQr: checkExist.batchQr,bottleStatus})
    }
    else if(nextDb === "transactions-purchased"){
        addToNewTransactionDb = await TransactionsPurchasedModel.create({bottleQr, userId,batchQr: checkExist.batchQr,bottleStatus})
    }
    else if(nextDb === "transactions-delivered"){
        addToNewTransactionDb = await TransactionsDeliveredModel.create({bottleQr, userId,batchQr: checkExist.batchQr,bottleStatus})
    }
    else if(nextDb === "transactions-deposited"){
        addToNewTransactionDb = await TransactionsDepositedModel.create({bottleQr, userId,batchQr: checkExist.batchQr,bottleStatus})
    }
    else if(nextDb === "transactions-recycled"){
        addToNewTransactionDb = await TransactionsRecycledModel.create({bottleQr, userId,batchQr: checkExist.batchQr,bottleStatus})
    }
    console.log("added "+bottleQr+" to "+nextDb);

}

const deleteFromOldTransactionsDbBatch = async (currentDb, batchQr) => {
    let deleteFromOldTransactionDb; 
    if(currentDb === "transactions-manufactured"){
        deleteFromOldTransactionDb = await TransactionsManufacturedModel.deleteMany({batchQr})
    }
    else if(currentDb === "transactions-outgoing"){
        deleteFromOldTransactionDb = await TransactionsOutgoingModel.deleteMany({batchQr})
    }
    else if(currentDb === "transactions-purchased"){
        deleteFromOldTransactionDb = await TransactionsPurchasedModel.deleteMany({batchQr})
    }
    else if(currentDb === "transactions-delivered"){
        deleteFromOldTransactionDb = await TransactionsDeliveredModel.deleteMany({batchQr})
    }
    else if(currentDb === "transactions-deposited"){
        deleteFromOldTransactionDb = await TransactionsDepositedModel.deleteMany({batchQr})
    }
    else if(currentDb === "transactions-recycled"){
        deleteFromOldTransactionDb = await TransactionsRecycledModel.deleteMany({batchQr})
    }

    return console.log("deleted batch "+batchQr+" from "+currentDb);

}

const addToNewTransactionsDbBatch = async (nextDb, bottleQr, checkExist, bottleStatus, userId) => {
    
    //Find and Insert into the appropriate next transaction status collection
    let addToNewTransactionDb; 
    if(nextDb === "transactions-manufactured"){
        addToNewTransactionDb = await TransactionsManufacturedModel.create({bottleQr, userId,batchQr: checkExist.batchQr,bottleStatus})
    }
    else if(nextDb === "transactions-outgoing"){
        addToNewTransactionDb = await TransactionsOutgoingModel.create({bottleQr, userId,batchQr: checkExist.batchQr,bottleStatus})
    }
    else if(nextDb === "transactions-purchased"){
        addToNewTransactionDb = await TransactionsPurchasedModel.create({bottleQr, userId,batchQr: checkExist.batchQr,bottleStatus})
    }
    else if(nextDb === "transactions-delivered"){
        addToNewTransactionDb = await TransactionsDeliveredModel.create({bottleQr, userId,batchQr: checkExist.batchQr,bottleStatus})
    }
    else if(nextDb === "transactions-deposited"){
        addToNewTransactionDb = await TransactionsDepositedModel.create({bottleQr, userId,batchQr: checkExist.batchQr,bottleStatus})
    }
    else if(nextDb === "transactions-recycled"){
        addToNewTransactionDb = await TransactionsRecycledModel.create({bottleQr, userId,batchQr: checkExist.batchQr,bottleStatus})
    }
    console.log("added "+bottleQr+" to "+nextDb+" under batch "+checkExist.batchQr);

}



router.post("/", [
    check("isBatch", "Please specify if you are scanning a batch or not").exists(),
    check("userId", "Please provide scanner user ID").exists(),
    check("qrCode", "Please provide the qrCode").exists(),
    check("bottleStatus", "Please provide a bottle status for this scan").exists(),
], async (req, res) => {
     //Define user request variables
     const {qrCode, userId, isBatch, bottleStatus} = req.body;

    //Assign the bottle qr variable and batch qr variable to the qr code parameter
    const bottleQr = qrCode;
    const batchQr = qrCode;

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
        if(!isBatch){
            //Make sure the bottle QR code was provided
            if(bottleQr === undefined || bottleQr === null){
                res.status(400).json({
                    status:400,
                    errors:["Please provide the bottle QR"]
                })
            }
            else{
                //If it was supplied, carry on

                //Check if this bottle has been scanned before
                let checkExist = await BottleModel.findOne({bottleQr});
                if(!checkExist)
                {
                    //If it hasn't been scanned by manufacturer, return an error
                    res.status(400).json({
                        status: 400,
                        errors: [`Bottle with QR code '${bottleQr}' not yet scanned by manufacturer and can't be updated`]
                    }) 
                }
                else{
                    //If it has been scanned, update the status in the db and the date modified
                    var myquery = { bottleQr};
                    let date = Date.now();
                    var newvalues = { $set: {bottleStatus, dateUpdated: date} };
                    try {
                        await BottleModel.updateOne(myquery, newvalues);

                        //Get the current transaction status collection holding this bottle
                        let currentDb = "transactions-"+checkExist.bottleStatus.toLowerCase();

                        //Set the next transaction status collection db based on the status provided by user
                        let nextDb = "transactions-"+bottleStatus.toLowerCase();
                        
                        //check if the current status of the bottle is the same as the new status
                        if(checkExist.bottleStatus.toLowerCase() === bottleStatus.toLowerCase())
                        {
                            res.status(400).json({
                                "errors":[`Bottle with QR Code '${bottleQr}' is already at status '${bottleStatus}'`],
                                "status":400
                            });  
                        }
                        else{
                            //Find and Delete from the appropriate intial transaction status collection
                            deleteFromOldTransactionsDb(currentDb, bottleQr).then(() => 
                            //Find and Insert into the appropriate next transaction status collection
                            addToNewTransactionsDb(nextDb, bottleQr, checkExist, bottleStatus, userId).then(() => {
                                res.status(200).json({
                                    "message":`Successfully updated single bottle status for bottle with QR Code '${bottleQr}' to '${bottleStatus}'`,
                                    "status":200
                                });  
                            })
                            )
                        }
                    }
                    catch(err){
                        console.log(err);
                    }   
                }
            }
        }
        else{
            //If it's a batch, check if the batch qr was supplied
            if(batchQr === undefined || batchQr === null)
            {
                res.status(400).json({
                    status:400,
                    errors: [`Please provide the batchQr for this batch scan`]
                })
            }
            else{
                //Check if the batch code exists in the db
                let checkExist = await BottleModel.findOne({batchQr});
                if(!checkExist){
                    //If it hasn't been inserted by manufacturer, return an error
                    res.status(400).json({
                    status: 400,
                    errors: [`Batch code '${batchQr}' not yet scanned by manufacturer and can't be updated`]
                    }) 
                }
                else{
                    //If it exists, update all the bottles tied to this batch code
                    var myquery = { batchQr};
                    let date = Date.now();
                    var newvalues = { $set: {bottleStatus, dateUpdated: date} };
                    try{
                        await BottleModel.updateMany(myquery, newvalues);
                        
                        //Get all the bottles in the batch
                        batch = batchBottles.filter((item) => item.batchQr === batchQr)

                        console.log(batch[0].bottles.length);
                        //Get the current transaction status collection holding this batch
                        let currentDb = "transactions-"+checkExist.bottleStatus.toLowerCase();

                        //Set the next transaction status collection db based on the status provided by user
                        let nextDb = "transactions-"+bottleStatus.toLowerCase();

                        //Find and Delete from the appropriate intial transaction status collection
                        deleteFromOldTransactionsDbBatch(currentDb, batchQr).then(() =>  
                            //Lopp through the bottles in the batch and insert into the appropriate transaction status collection
                            batch[0].bottles.map(item => {
                                addToNewTransactionsDbBatch(nextDb, item.bottleQr, checkExist, bottleStatus, userId)
                            }),
                            //Success
                            res.status(200).json({
                                "message":`Successfully updated all bottles in batch with QR Code '${batchQr}'`,
                                "status":200
                            })
                        )
                    }
                    catch(err){
                        console.log(err);
                    }
                }
            }
            
        }
          
     }
    
})

module.exports = router;