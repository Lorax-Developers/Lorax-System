const router = require("express").Router();
const { check, validationResult} = require("express-validator");
const BottleHistoryModel = require("../../models/bottles/BottleHistoryModel");

router.get("/", [
    check("qrCode", "Please provide the qr code").exists()
], async (req, res) => {
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

        //Define request variables
        const {qrCode} = req.query;

        //Search the bottle history collection for this qr code
        const bottleEntry = await BottleHistoryModel.find({bottleQr: qrCode})

        const history = bottleEntry[0].history

        res.status(200).json({
            status:200,
            message:`The bottle has moved through ${history.length} status(es)`,
            history
        })
    }

})
module.exports = router;