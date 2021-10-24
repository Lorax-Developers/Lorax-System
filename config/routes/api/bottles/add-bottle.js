var router = require("express").Router();
const { check, validationResult } = require("express-validator");
const batchBottles = require("./batches");
const BottleModel = require("../../models/bottles/BottleModel");
const TransactionsManufacturedModel = require("../../models/bottles/TransactionsManufacturedModel");
const BottleHistoryModel = require("../../models/bottles/BottleHistoryModel");

router.post(
  "/",
  [
    check("manufacturer", "Please provide the manufacturer info").exists(),
    check("title", "Please provide a title for this scan").exists(),
    check("bottleType", "Please provide a bottle type for this scan").exists(),
    check("bottleSize", "Please provide a bottle size for this scan").exists(),
    check(
      "sizeUnit",
      "Please provide a bottle size unit for this scan"
    ).exists(),
    check("userId", "Please provide valid userId").exists(),
    check("qrCode", "Please provide the qr code").exists(),
  ],
  async (req, res) => {
    //Define user request variables
    const {
      qrCode,
      isBatch,
      title,
      manufacturer,
      bottleType,
      userId,
      bottleSize,
      sizeUnit,
    } = req.body;

    //Assign the bottle qr variable and batch qr variable to the qr code parameter
    const bottleQr = qrCode;
    const batchQr = qrCode;

    const bottleStatus = "Manufactured";

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
        //The length is more than 16 meaning it's not a batch

        //This is not a batch request, make sure the qr code is 19 characters
        if (qrCode.length !== 19) {
          res.status(400).json({
            status: 400,
            errors: [
              "Please ensure the bottle QR code is exactly 19 characters, what you have scanned is " +
              qrCode.length +
              " characters. Did you mean to scan a batch?",
            ],
          });
        } else {
          //If it was 19 carry on

          //check if the bottle QR has been scanned before and return error if so
          let checkExist = await BottleModel.findOne({ bottleQr });
          if (checkExist) {
            res.status(400).json({
              status: 400,
              errors: [`Bottle with QR code ${bottleQr} scanned already`],
            });
          } else {
            //If it hasn't been scanned before, insert and send a success message
            BottleModel.create({
              bottleQr,
              bottleTitle: title,
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
                bottleStatus,
              }).then(async () => {
                //Create the history array and add in 'Manufactured'
                let array = [];
                array.push({
                  status: "Manufactured",
                  updated: new Date(),
                  userId,
                });

                //Insert into history db
                BottleHistoryModel.create({
                  bottleQr,
                  history: array,
                }).then(() => {
                  res.status(200).json({
                    message: `Successfully added a new bottle with QR Code '${bottleQr}'`,
                    status: 200,
                    bottleDetails: {
                      bottleQr,
                      bottleTitle: title,
                      manufacturer,
                      bottleStatus,
                      batchQr,
                      bottleSize,
                      sizeUnit,
                      bottleType,
                    },
                  });
                });
              });
            });
          }
        }
      }
      //If the qrcode is 16 characters, it's a batch
      else if (qrCode.length === 16) {
        //check if the batch QR has been scanned before and return error if so
        let checkExist = await BottleModel.findOne({ batchQr });
        if (checkExist) {
          res.status(400).json({
            status: 400,
            errors: [`Batch with QR code ${batchQr} scanned already`],
          });
        } else {
          //Get total number of bottles in batch included in the QR (second two characters after the 'B')
          const batchTotal = parseInt(batchQr.slice(1, -13));
          let x;
          //Loop through the batch and insert bottles based on the total number of items in the batch
          for (x = 1; x <= batchTotal; x++) {
            //Ternary to generate a bottle
            let bottleQR = `${qrCode}-${x < 10 ? "0" + x : x}`;
            BottleModel.create({
              bottleQr: bottleQR,
              bottleTitle: title,
              manufacturer,
              bottleStatus,
              bottleSize,
              sizeUnit,
              batchQr,
              bottleType,
            }).then(async () => {
              //Use this id to insert into the relevant status tracking db (in this case Transactions-Manufactured)
              TransactionsManufacturedModel.create({
                bottleQr: bottleQR,
                userId,
                batchQr,
                bottleStatus,
              });
              let array = [];
              array.push({
                status: "Manufactured",
                updated: new Date(),
                userId,
              });

              //Insert into history db
              BottleHistoryModel.create({
                bottleQr: bottleQR,
                batchQr,
                history: array,
              });
            });
          }
          //Send a success message
          res.status(200).json({
            message: `Successfully scanned a batch containing ${batchTotal} bottles with Batch QR Code '${batchQr}`,
            bottleDetails: {
              bottleQr: batchQr,
              bottleTitle: title,
              manufacturer,
              bottleStatus,
              batchQr,
              bottleSize,
              sizeUnit,
              bottleType,
            },
          });
        }
      } else {
        //If the QR code is less than 16 characters, throw an error
        res.status(400).json({
          status: 400,
          errors: [
            "Please ensure the QR code is either 16 characters for a batch or 19 characters for a bottle. Your QR code is " +
            qrCode.length +
            " characters.",
          ],
        });
      }
    }
  }
);

module.exports = router;