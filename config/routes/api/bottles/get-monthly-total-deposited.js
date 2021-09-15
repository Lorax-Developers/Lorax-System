const router = require("express").Router();
const { check, validationResult } = require("express-validator");
const TransactionsDepositedModel = require("../../models/bottles/TransactionsDepositedModel");

let getMonthsList = (start) => {
    const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    // let removeFirst = months.splice(0, start - 1);
    //let newMonth = months.filter(item => !removeFirst.includes(item))
    let newMonth = months
    newMonth.length = 12;
    return newMonth;
}
router.get("/", [
    check("startMonth", "Please provide a start month").exists(),
    check("wastepickerId", "Please provide the wastepickerId").exists(),
], async (req, res) => {
    //Define user request variables
    const { startMonth, wastepickerId } = req.query;

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

        //Count for the first status
        const countArray1 = [];
        for (let i = 0; i <= parseInt(0) + 11; i++) {
            let count1 = await TransactionsDepositedModel.find({
                "userId": wastepickerId,
                dateUpdated: {
                    $gte: new Date(2021, i - 1),
                    $lt: new Date(2021, i)
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
                        label: "Deposited",
                        borderColor: "#51c878",
                        backgroundColor: "#eef9f1",
                        data: countArray1,
                        borderWidth: 2
                    },
                ]
            }
        })
    }
})

module.exports = router;