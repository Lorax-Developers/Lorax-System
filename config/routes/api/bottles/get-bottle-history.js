const router = require("express").Router();
const { check, validationResult } = require("express-validator");
const BottleHistoryModel = require("../../models/bottles/BottleHistoryModel");

router.get("/", [
    check("qrCode", "Please provide the qr code").exists()], async (req, res) => {
        //Check if any of the error tests mentioned above were failed
        const expressNotedErrors = validationResult(req);

        //IF so, send a list of errors
        if (!expressNotedErrors.isEmpty()) {
            res.status(400).json({
                status: 400,
                errors: expressNotedErrors.array()
            })
        }
        else {

            //Define request variables
            const { qrCode } = req.query;

            //Search the bottle history collection for this qr code
            const bottleEntry = await BottleHistoryModel.find({ bottleQr: qrCode })

            const history = bottleEntry[0].history

            res.status(200).json({
                status: 200,
                message: `The bottle has moved through ${history.length} status(es)`,
                history
            })
        }
    })


///// JENNA ADDEDD ///////////////////// 

// Get the total number of bottles delivered to a retailer
router.get("/delivered", async (req, res) => {
    const { userID } = req.query;

    if (userID === undefined || userID === null || userID === "") {
        await BottleHistoryModel.countDocuments({ history: { $elemMatch: { status: "Delivered" } } }, (err, result) => {

            if (err) {
                res.send(err)
            }
            else {
                res.json(result)
            }
        })
    }
    else {
        await BottleHistoryModel.countDocuments({ history: { $elemMatch: { status: "Delivered", userId: userID } } }, (err, result) => {

            if (err) {
                res.send(err)
            }
            else {
                res.json(result)
            }
        })
    }
})
// Get the total number of bottles sold by a specific retailer 
router.get("/purchased", async (req, res) => {
    const { userID } = req.query;
    await BottleHistoryModel.countDocuments({ history: { $elemMatch: { status: "Purchased", userId: userID } } }, (err, result) => {

        if (err) {
            res.send(err)
        }
        else {
            res.json(result)
        }
    })
})
// An example of a  waste picker who has deposited bottles "61148f31a63d3550d4350e46 coca cola " or"6114767dedb1895114dd8c8e john doe"
// Get the total number of bottles deposited by a waste picker 
router.get("/deposited", async (req, res) => {
    const { userID } = req.query;
    await BottleHistoryModel.countDocuments({ history: { $elemMatch: { status: "Deposited", userId: userID } } }, (err, result) => {

        if (err) {
            res.send(err)
        }
        else {
            res.json(result)
        }
    })
})

// get no. bottles in stock 
router.get("/instock", async (req, res) => {
    const { userID } = req.query;
    let delivered = await BottleHistoryModel.countDocuments({ history: { $elemMatch: { status: "Delivered", userId: userID } } });
    let purchased = await BottleHistoryModel.countDocuments({ history: { $elemMatch: { status: "Purchased", userId: userID } } });
    let instock = delivered - purchased;


    res.status(200).json({
        statusType: "Number of bottles in stock",
        delivered,
        purchased,
        instock,
        status: 200
    })

})

// An example of a recycler Plastcis SA : 611476cbedb1895114dd8ca5 
// Get the total number of bottles deposited by a waste picker 
router.get("/recycled", async (req, res) => {
    const { userID } = req.query;
    await BottleHistoryModel.countDocuments({ history: { $elemMatch: { status: "Recycled", userId: userID } } }, (err, result) => {

        if (err) {
            res.send(err)
        }
        else {
            res.json(result)
        }
    })
})


// Get the total number of bottles manufactured / delivered / purchased / deposited / recycled per month for a specific user 

let getMonthsList = (start) => {
    const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    let newMonth = months
    newMonth.length = 12;
    return newMonth;
}
router.get("/monthlyOneVariable", [
    check("startMonth", "Please provide a start month").exists(),
    check("statusOne", "Please provide statusOne").exists(),
    check("userID", "Please provide the userID").exists(),
], async (req, res) => {
    //Define user request variables
    const { startMonth, statusOne, userID, year } = req.query;

    //Check if any of the error tests mentioned above were failed
    const expressNotedErrors = validationResult(req);

    //IF so, send a list of errors
    if (!expressNotedErrors.isEmpty()) {
        res.status(400).json({
            status: 400,
            errors: expressNotedErrors.array()
        })
    }
    else {

        // Count for Status One
        const countArray1 = [];
        for (let i = 1; i <= parseInt(0) + 11; i++) {
            let count1 = await BottleHistoryModel.find({
                history: {
                    $elemMatch: {
                        status: statusOne,
                        updated: {
                            $gte: new Date(year, i - 1),
                            $lt: new Date(year, i)
                        },
                        userId: userID
                    }
                }
            }).countDocuments()
            countArray1.push(count1);
        }

        res.status(200).json({
            status: 200,
            data: {
                labels: getMonthsList(startMonth),
                datasets: [
                    {
                        label: statusOne,
                        borderColor: "#51c878",
                        backgroundColor: "#eef9f1",
                        data: countArray1,
                        borderWidth: 2
                    }
                ]
            }
        })
    }
})

// Get monthly bottles count for two variables 


router.get("/monthlyTwoVariables", [
    check("startMonth", "Please provide a start month").exists(),
    check("statusOne", "Please provide statusOne").exists(),
    check("statusTwo", "Please provide the next status").exists(),
    check("userID", "Please provide the userID").exists(),
], async (req, res) => {
    //Define user request variables
    const { startMonth, statusOne, statusTwo, userID, year } = req.query;

    //Check if any of the error tests mentioned above were failed
    const expressNotedErrors = validationResult(req);

    //IF so, send a list of errors
    if (!expressNotedErrors.isEmpty()) {
        res.status(400).json({
            status: 400,
            errors: expressNotedErrors.array()
        })
    }
    else {

        // Count for Status One
        const countArray1 = [];
        for (let i = 1; i <= parseInt(0) + 11; i++) {
            let count1 = await BottleHistoryModel.find({
                history: {
                    $elemMatch: {
                        status: statusOne,
                        updated: {
                            $gte: new Date(year, i - 1),
                            $lt: new Date(year, i)
                        },
                        userId: userID
                    }
                }
            }).countDocuments()
            countArray1.push(count1);
        }
        const countArray2 = [];
        for (let i = 1; i <= parseInt(0) + 11; i++) {
            let count2 = await BottleHistoryModel.find({
                history: {
                    $elemMatch: {
                        status: statusTwo,
                        updated: {
                            $gte: new Date(year, i - 1),
                            $lt: new Date(year, i)
                        },
                        userId: userID
                    }
                }
            }).countDocuments()
            countArray2.push(count2);
        }

        res.status(200).json({
            status: 200,
            data: {
                labels: getMonthsList(startMonth),
                datasets: [
                    {
                        label: statusOne,
                        borderColor: "#51c878",
                        backgroundColor: "#eef9f1",
                        data: countArray1,
                        borderWidth: 2
                    },
                    {
                        label: statusTwo,
                        borderColor: "#6fb427",
                        backgroundColor: "#f1f7eb",
                        data: countArray2,
                        borderWidth: 2
                    }
                ]
            }
        })
    }
})

module.exports = router;

