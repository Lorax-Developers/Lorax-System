const router = require("express").Router();
const TransactionsDepositedModel = require("../../models/bottles/TransactionsDepositedModel");

const returnCount = async (wastepickerId) => {
    let count;
    console.log(wastepickerId);
    count = await TransactionsDepositedModel.countDocuments({ "userId": wastepickerId });
    return count;
}
router.get("/", async (req, res) => {

    const { wastepickerId } = req.query;

    //Count the number of deposited bottles
    let TotalNumberAtDeposited = await returnCount(wastepickerId)

    res.status(200).json({
        statusType: "Only bottles for this wastepicker",
        TotalNumberAtDeposited,
        status: 200
    })
})
module.exports = router;