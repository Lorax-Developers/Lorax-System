const router = require("express").Router();
const { check, validationResult } = require("express-validator");
const BottleModel = require("../../models/bottles/BottleModel");

let getMonthsList = (start) => {
    const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    months.length = 12;
    return months;
}
router.get("/", [
    check("startMonth", "Please provide a start month").exists(),
    check("statusTwo", "Please provide the next status").exists(),
    check("manufacturerId", "Please provide the manufacturerId").exists(),
    check("year", "Please provide the year").exists(),
], async (req, res) => {
    //Define user request variables
    const { startMonth, statusTwo, manufacturerId, year } = req.query;

    //Check if any of the error tests mentioned above were failed
    const expressNotedErrors = validationResult(req);

    //IF so, send a list of errors
    if (!expressNotedErrors.isEmpty()) {
        res.status(400).json({
            status: 400,
            errors: expressNotedErrors.array()
        })
    }
    if (manufacturerId === "1234") {

        //Count for the first status
        const countArray1 = [];
        for (let i = 1; i <= parseInt(0) + 11; i++) {
            let count1 = await BottleModel.find({
                dateAdded: {
                    $gte: new Date(year, i - 1),
                    $lt: new Date(year, i)
                }
            }).countDocuments()
            countArray1.push(count1);
        }

        //Count for the second status
        const countArray2 = [];
        for (let i = 1; i <= parseInt(0) + 11; i++) {
            let count2 = await BottleModel.find({
                bottleStatus: statusTwo,
                dateUpdated: {
                    $gte: new Date(year, i - 1),
                    $lt: new Date(year, i)
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
                        label: "Manufactured",
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
    else {

        //Count for the first status
        const countArray1 = [];
        for (let i = 1; i <= parseInt(0) + 11; i++) {
            let count1 = await BottleModel.find({
                "manufacturer.id": manufacturerId,
                dateAdded: {
                    $gte: new Date(year, i - 1),
                    $lt: new Date(year, i)
                }
            }).countDocuments()
            countArray1.push(count1);
        }

        //Count for the second status
        const countArray2 = [];
        for (let i = 1; i <= parseInt(0) + 11; i++) {
            let count2 = await BottleModel.find({
                "manufacturer.id": manufacturerId,
                bottleStatus: statusTwo,
                dateUpdated: {
                    $gte: new Date(year, i - 1),
                    $lt: new Date(year, i)
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
                        label: "Manufactured",
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