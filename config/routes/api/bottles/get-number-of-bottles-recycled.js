const router = require("express").Router();
const TransactionsRecycledModel = require("../../models/bottles/TransactionsRecycledModel");

const returnCount = async (recyclingDepotId) => {
  let count;
  count = await TransactionsRecycledModel.countDocuments({
    userId: recyclingDepotId,
  });
  return count;
};
router.get("/", async (req, res) => {
  const { recyclingDepotId } = req.query;

  //Count the number of recycled bottles
  let TotalNumberAtRecycled = await returnCount(recyclingDepotId);

  res.status(200).json({
    statusType: "Only bottles for this recyclingDepot",
    TotalNumberAtRecycled,
    status: 200,
  });
});
module.exports = router;
