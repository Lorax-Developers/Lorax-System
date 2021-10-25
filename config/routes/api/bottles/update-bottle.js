var router = require("express").Router();
const { check, validationResult } = require("express-validator");
const batchBottles = require("./batches");
const BottleModel = require("../../models/bottles/BottleModel");
const BottleHistoryModel = require("../../models/bottles/BottleHistoryModel");

//Models for all transactions types
const TransactionsManufacturedModel = require("../../models/bottles/TransactionsManufacturedModel");
const TransactionsOutgoingModel = require("../../models/bottles/TransactionsOutgoingModel");
const TransactionsPurchasedModel = require("../../models/bottles/TransactionsPurchasedModel");
const TransactionsDeliveredModel = require("../../models/bottles/TransactionsDeliveredModel");
const TransactionsDepositedModel = require("../../models/bottles/TransactionsDepositedModel");
const TransactionsRecycledModel = require("../../models/bottles/TransactionsRecycledModel");

//Define roles and statuses they can access
let ManufacturerArray = ["Manufactured", "Outgoing"];
let RetailerArray = ["Purchased", "Delivered"];
let WastePickerArray = ["Deposited"];
let RecyclerArray = ["Recycled"];

const deleteFromOldTransactionsDb = async (currentDb, bottleQr) => {
  let deleteFromOldTransactionDb;

  if (currentDb === "transactions-manufactured") {
    deleteFromOldTransactionDb = await TransactionsManufacturedModel.deleteOne({
      bottleQr,
    });
  } else if (currentDb === "transactions-outgoing") {
    deleteFromOldTransactionDb = await TransactionsOutgoingModel.deleteOne({
      bottleQr,
    });
  } else if (currentDb === "transactions-purchased") {
    deleteFromOldTransactionDb = await TransactionsPurchasedModel.deleteOne({
      bottleQr,
    });
  } else if (currentDb === "transactions-delivered") {
    deleteFromOldTransactionDb = await TransactionsDeliveredModel.deleteOne({
      bottleQr,
    });
  } else if (currentDb === "transactions-deposited") {
    deleteFromOldTransactionDb = await TransactionsDepositedModel.deleteOne({
      bottleQr,
    });
  } else if (currentDb === "transactions-recycled") {
    deleteFromOldTransactionDb = await TransactionsRecycledModel.deleteOne({
      bottleQr,
    });
  }

  return console.log("deleted " + bottleQr + " from " + currentDb);
};

const addToNewTransactionsDb = async (
  nextDb,
  bottleQr,
  checkExist,
  bottleStatus,
  userId
) => {
  //Find and Insert into the appropriate next transaction status collection
  let addToNewTransactionDb;
  if (nextDb === "transactions-manufactured") {
    addToNewTransactionDb = await TransactionsManufacturedModel.create({
      bottleQr,
      userId,
      batchQr: checkExist.batchQr,
      bottleStatus,
    });
  } else if (nextDb === "transactions-outgoing") {
    addToNewTransactionDb = await TransactionsOutgoingModel.create({
      bottleQr,
      userId,
      batchQr: checkExist.batchQr,
      bottleStatus,
    });
  } else if (nextDb === "transactions-purchased") {
    addToNewTransactionDb = await TransactionsPurchasedModel.create({
      bottleQr,
      userId,
      batchQr: checkExist.batchQr,
      bottleStatus,
    });
  } else if (nextDb === "transactions-delivered") {
    addToNewTransactionDb = await TransactionsDeliveredModel.create({
      bottleQr,
      userId,
      batchQr: checkExist.batchQr,
      bottleStatus,
    });
  } else if (nextDb === "transactions-deposited") {
    addToNewTransactionDb = await TransactionsDepositedModel.create({
      bottleQr,
      userId,
      batchQr: checkExist.batchQr,
      bottleStatus,
    });
  } else if (nextDb === "transactions-recycled") {
    addToNewTransactionDb = await TransactionsRecycledModel.create({
      bottleQr,
      userId,
      batchQr: checkExist.batchQr,
      bottleStatus,
    });
  }
  console.log("added " + bottleQr + " to " + nextDb);
};

const deleteFromOldTransactionsDbBatch = async (currentDb, batchQr) => {
  let deleteFromOldTransactionDb;
  if (currentDb === "transactions-manufactured") {
    deleteFromOldTransactionDb = await TransactionsManufacturedModel.deleteMany(
      { batchQr }
    );
  } else if (currentDb === "transactions-outgoing") {
    deleteFromOldTransactionDb = await TransactionsOutgoingModel.deleteMany({
      batchQr,
    });
  } else if (currentDb === "transactions-purchased") {
    deleteFromOldTransactionDb = await TransactionsPurchasedModel.deleteMany({
      batchQr,
    });
  } else if (currentDb === "transactions-delivered") {
    deleteFromOldTransactionDb = await TransactionsDeliveredModel.deleteMany({
      batchQr,
    });
  } else if (currentDb === "transactions-deposited") {
    deleteFromOldTransactionDb = await TransactionsDepositedModel.deleteMany({
      batchQr,
    });
  } else if (currentDb === "transactions-recycled") {
    deleteFromOldTransactionDb = await TransactionsRecycledModel.deleteMany({
      batchQr,
    });
  }

  return console.log("deleted batch " + batchQr + " from " + currentDb);
};

const addToNewTransactionsDbBatch = async (
  nextDb,
  bottleQr,
  checkExist,
  bottleStatus,
  userId
) => {
  //Find and Insert into the appropriate next transaction status collection
  let addToNewTransactionDb;
  //Step 1 - Add dateUpdated after every bottleStatus
  if (nextDb === "transactions-manufactured") {
    addToNewTransactionDb = await TransactionsManufacturedModel.create({
      bottleQr,
      userId,
      batchQr: checkExist.batchQr,
      bottleStatus,
    });
  } else if (nextDb === "transactions-outgoing") {
    addToNewTransactionDb = await TransactionsOutgoingModel.create({
      bottleQr,
      userId,
      batchQr: checkExist.batchQr,
      bottleStatus,
    });
  } else if (nextDb === "transactions-purchased") {
    addToNewTransactionDb = await TransactionsPurchasedModel.create({
      bottleQr,
      userId,
      batchQr: checkExist.batchQr,
      bottleStatus,
    });
  } else if (nextDb === "transactions-delivered") {
    addToNewTransactionDb = await TransactionsDeliveredModel.create({
      bottleQr,
      userId,
      batchQr: checkExist.batchQr,
      bottleStatus,
    });
  } else if (nextDb === "transactions-deposited") {
    addToNewTransactionDb = await TransactionsDepositedModel.create({
      bottleQr,
      userId,
      batchQr: checkExist.batchQr,
      bottleStatus,
    });
  } else if (nextDb === "transactions-recycled") {
    addToNewTransactionDb = await TransactionsRecycledModel.create({
      bottleQr,
      userId,
      batchQr: checkExist.batchQr,
      bottleStatus,
    });
  }
  console.log(
    "added " + bottleQr + " to " + nextDb + " under batch " + checkExist.batchQr
  );
};

router.post(
  "/",
  [
    check("userId", "Please provide scanner user ID").exists(),
    check("userRole", "Please provide scanner role").exists(),
    check("qrCode", "Please provide the qrCode").exists(),
  ],
  async (req, res) => {
    //Define user request variables
    const { qrCode, userId, userRole } = req.body;

    //Assign the bottle qr variable and batch qr variable to the qr code parameter
    const bottleQr = qrCode;
    const batchQr = qrCode;

    //Check if any of the error tests mentioned above were failed
    const expressNotedErrors = validationResult(req);

    //IF so, send a list of errors
    if (!expressNotedErrors.isEmpty()) {
      res.status(400).json({
        status: 400,
        errors: expressNotedErrors.array(),
      });
    } else {
      //Check if the request is a batch or single request by checking the QR CODE LENGTH
      if (qrCode.length > 16) {
        //This is not a batch request, make sure the qr code is 19 characters
        if (qrCode.length !== 19) {
          res.status(400).json({
            status: 400,
            errors: [
              "Please ensure the bottle QR code is exactly 19 characters, what you have scanned is " +
              qrCode.length +
              " characters. Did you mean to scan a batch",
            ],
          });
        } else {
          //If it was 19 carry on

          //Check if this bottle has been scanned before
          let checkExist = await BottleModel.findOne({ bottleQr });
          if (!checkExist) {
            //If it hasn't been scanned by manufacturer, return an error
            res.status(400).json({
              status: 400,
              errors: [
                `Bottle with QR code '${bottleQr}' not yet scanned by manufacturer and can't be updated`,
              ],
            });
          } else {
            //If it has been scanned, update the status in the db and the date modified

            //Get the current status of the bottle/batch
            const currentStatus = checkExist.bottleStatus;

            let bottleStatus;
            //Find the next status based on the current status
            if (currentStatus === "Manufactured") {
              bottleStatus = "Outgoing";
            } else if (currentStatus === "Outgoing") {
              bottleStatus = "Delivered";
            } else if (currentStatus === "Delivered") {
              bottleStatus = "Purchased";
            } else if (currentStatus === "Purchased") {
              bottleStatus = "Deposited";
            } else if (currentStatus === "Deposited") {
              bottleStatus = "Recycled";
            }

            //Make sure the user has access to update a bottle to the next step
            if (
              userRole === "Manufacturer" &&
              !ManufacturerArray.includes(bottleStatus)
            ) {
              res.status(400).json({
                status: 400,
                errors: [
                  `You are a ${userRole.toLowerCase()} and can't update a bottle to ${bottleStatus.toLowerCase()}`,
                ],
              });
            } else if (
              userRole === "Retailer" &&
              !RetailerArray.includes(bottleStatus)
            ) {
              res.status(400).json({
                status: 400,
                errors: [
                  `You are a ${userRole.toLowerCase()} and can't update a bottle to ${bottleStatus.toLowerCase()}`,
                ],
              });
            } else if (
              userRole === "Waste Picker" &&
              !WastePickerArray.includes(bottleStatus)
            ) {
              res.status(400).json({
                status: 400,
                errors: [
                  `You are a ${userRole.toLowerCase()} and can't update a bottle to ${bottleStatus.toLowerCase()}`,
                ],
              });
            } else if (
              userRole === "Recycler" &&
              !RecyclerArray.includes(bottleStatus)
            ) {
              res.status(400).json({
                status: 400,
                errors: [
                  `You are a ${userRole.toLowerCase()} and can't update a bottle to ${bottleStatus.toLowerCase()}`,
                ],
              });
            } else {
              var myquery = { bottleQr };
              let date = Date.now();
              var newvalues = { $set: { bottleStatus, dateUpdated: date } };
              try {
                await BottleModel.updateOne(myquery, newvalues);

                //Get the current transaction status collection holding this bottle
                let currentDb =
                  "transactions-" + checkExist.bottleStatus.toLowerCase();

                //Set the next transaction status collection db based on the next status
                let nextDb = "transactions-" + bottleStatus.toLowerCase();

                //Find and Delete from the appropriate intial transaction status collection
                deleteFromOldTransactionsDb(currentDb, bottleQr).then(() =>
                  //Find and Insert into the appropriate next transaction status collection
                  addToNewTransactionsDb(
                    nextDb,
                    bottleQr,
                    checkExist,
                    bottleStatus,
                    userId
                  ).then(async () => {
                    //Add new status to the history
                    let newHistoryValue = {
                      status: bottleStatus,
                      updated: new Date(),
                      userId,
                    };

                    var newvalues2 = { $push: { history: newHistoryValue } };

                    await BottleHistoryModel.updateOne(myquery, newvalues2);

                    res.status(200).json({
                      message: `Successfully updated single bottle status for bottle with QR Code '${bottleQr}' to '${bottleStatus}'. Was previously at '${checkExist.bottleStatus}'`,
                      status: 200,
                      bottleDetails: {
                        bottleQr: checkExist.bottleQr,
                        bottleTitle: checkExist.bottleTitle,
                        manufacturer: checkExist.manufacturer,
                        bottleStatus,
                        batchQr: checkExist.batchQr,
                        bottleSize: checkExist.bottleSize,
                        sizeUnit: checkExist.sizeUnit,
                        bottleType: checkExist.bottleType,
                      },
                    });
                  })
                );
              } catch (err) {
                console.log(err);
              }
            }
          }
        }
      } else {
        //it's a batch

        let checkExist = await BottleModel.findOne({ batchQr });

        //Check if the batch has been scanned before
        if (!checkExist) {
          //If batch hasn't been scanned by manufacturer, return an error
          res.status(400).json({
            status: 400,
            errors: [
              `Batch with QR code '${bottleQr}' not yet scanned by manufacturer and can't be updated`,
            ],
          });
        } else {
          //Get the current status of the bottle/batch
          const currentStatus = checkExist.bottleStatus;

          let bottleStatus;

          //Find the next status based on the current status
          if (currentStatus === "Recycled") {
            //If batch hasn't been scanned by manufacturer, return an error
            res.status(400).json({
              status: 400,
              errors: [`Batch with QR code '${batchQr}' is at 'Recycled'`],
            });
          } else {
            //Find the next status based on the current status
            if (currentStatus === "Manufactured") {
              bottleStatus = "Outgoing";
            } else if (currentStatus === "Outgoing") {
              bottleStatus = "Delivered";
            } else if (currentStatus === "Delivered") {
              bottleStatus = "Purchased";
            } else if (currentStatus === "Purchased") {
              bottleStatus = "Deposited";
            } else if (currentStatus === "Deposited") {
              bottleStatus = "Recycled";
            }

            //Make sure the user has access to update a batch to the next step
            if (
              userRole === "Manufacturer" &&
              !ManufacturerArray.includes(bottleStatus)
            ) {
              res.status(400).json({
                status: 400,
                errors: [
                  `You are a ${userRole.toLowerCase()} and can't update a batch to ${bottleStatus.toLowerCase()}`,
                  `Your batch scan failed because of user role restrictions. It's also possible that a bottle in this batch has been scanned independently to a status you do not control.`,
                ],
              });
            } else if (
              userRole === "Retailer" &&
              !RetailerArray.includes(bottleStatus)
            ) {
              res.status(400).json({
                status: 400,
                errors: [
                  `You are a ${userRole.toLowerCase()} and can't update a batch to ${bottleStatus.toLowerCase()}`,
                  `Your batch scan failed because of user role restrictions. It's also possible that a bottle in this batch has been scanned independently to a status you do not control.`,
                ],
              });
            } else if (
              userRole === "Waste Picker" &&
              !WastePickerArray.includes(bottleStatus)
            ) {
              res.status(400).json({
                status: 400,
                errors: [
                  `You are a ${userRole.toLowerCase()} and can't update a batch to ${bottleStatus.toLowerCase()}`,
                  `Your batch scan failed because of user role restrictions. It's also possible that a bottle in this batch has been scanned independently to a status you do not control.`,
                ],
              });
            } else if (
              userRole === "Recycler" &&
              !RecyclerArray.includes(bottleStatus)
            ) {
              res.status(400).json({
                status: 400,
                errors: [
                  `You are a ${userRole.toLowerCase()} and can't update a batch to ${bottleStatus.toLowerCase()}`,
                  `Your batch scan failed because of user role restrictions. It's also possible that a bottle in this batch has been scanned independently to a status you do not control.`,
                ],
              });
            } else {
              //Check if this batch has been broken up

              //Get the number of bottles in the batch
              const batchTotal = parseInt(batchQr.slice(1, -13));

              //Count the number of bottles in the database belonging to this batch that have a uniform status
              const checkBottlesWithMatchingStatus = await BottleModel.find({
                batchQr,
                bottleStatus: currentStatus,
              });

              //If the count doesn't match the total number of bottles in the batch, it has been broken up
              if (checkBottlesWithMatchingStatus.length !== batchTotal) {
                res.status(400).json({
                  status: 400,
                  errors: [
                    "This batch has been broken up and can not be scanned as a batch anymore.",
                  ],
                });
              } else {
                var myquery = { batchQr };
                let date = Date.now();
                //Step 2
                //let date = new Date("2021-05-28");

                var newvalues = { $set: { bottleStatus, dateUpdated: date } };

                console.log("from " + currentStatus + " to " + bottleStatus);
                try {
                  await BottleModel.updateMany(myquery, newvalues);

                  //Add new status to the history
                  let newHistoryValue = {
                    status: bottleStatus,
                    //Step 3
                    //updated: new Date("2021-05-28"),
                    updated: new Date(),
                    userId,
                  };

                  var newvalues2 = { $push: { history: newHistoryValue } };
                  await BottleHistoryModel.updateMany(myquery, newvalues2);

                  console.log(batchTotal);
                  //Get the current transaction status collection holding this batch
                  let currentDb =
                    "transactions-" + checkExist.bottleStatus.toLowerCase();

                  //Set the next transaction status collection db based on the status provided by user
                  let nextDb = "transactions-" + bottleStatus.toLowerCase();

                  //Find and Delete from the appropriate intial transaction status collection
                  deleteFromOldTransactionsDbBatch(currentDb, batchQr);

                  //Loop through the bottles in the batch and insert into the appropriate transaction status collection
                  let x;
                  for (x = 1; x <= batchTotal; x++) {
                    //Generate a bottle
                    let bottleQR = `${qrCode}-${x < 10 ? "0" + x : x}`;
                    console.log(bottleQR);
                    addToNewTransactionsDbBatch(
                      nextDb,
                      bottleQR,
                      checkExist,
                      bottleStatus,
                      userId
                    );
                  }

                  //Success
                  res.status(200).json({
                    message: `Successfully updated status of all ${batchTotal} bottles in batch with QR Code '${batchQr}' to '${bottleStatus}'. All bottles were previously at '${currentStatus}'`,
                    status: 200,
                    bottleDetails: {
                      bottleQr: batchQr,
                      bottleTitle: checkExist.bottleTitle,
                      manufacturer: checkExist.manufacturer,
                      bottleStatus,
                      batchQr: batchQr,
                      bottleSize: checkExist.bottleSize,
                      sizeUnit: checkExist.sizeUnit,
                      bottleType: checkExist.bottleType,
                    },
                  });
                } catch (err) {
                  console.log(err);
                }
              }
            }
          }
        }
      }
    }
  }
);

module.exports = router;