const router = require("express").Router();
const BottleModel = require("../../models/bottles/BottleModel");


//Custom function to count based on bottle status
const returnCount = async (bottleStatus, manufacturerId) => {
    let count;
    if(manufacturerId === undefined){
        count = await BottleModel.countDocuments({bottleStatus});
    }
    else{
        console.log(manufacturerId);

        count = await BottleModel.countDocuments({bottleStatus, "manufacturer.id":manufacturerId});
    }
    return count;
}
router.get("/", async (req, res) => {
    //Define request variables
    const {manufacturerId} = req.query;


        //check if the manufacturer id is provided, if not show the status of all the bottles in the db
        if(manufacturerId === undefined || manufacturerId === null)
        {
            //Count the number of manufactured bottles
            let TotalNumberAtManufactured = await returnCount("Manufactured")
            
            //Count the number of outgoing bottles
            let TotalNumberAtOutgoing = await returnCount("Outgoing")

            //Count the number of delivered bottles
            let TotalNumberAtDelivered = await returnCount("Delivered")

            //Count the number of purchased bottles
            let TotalNumberAtPurchased = await returnCount("Purchased")

            //Count the number of deposited bottles
            let TotalNumberAtDeposited = await returnCount("Deposited")

            //Count the number of recycled bottles
            let TotalNumberAtRecycled = await returnCount("Recycled")
            
            //Count all the bottles in the entire collection
            let TotalNumberOfBottles = await BottleModel.countDocuments();

            res.status(200).json({
                statusType:"All bottles on lorax",
                TotalNumberAtManufactured,
                TotalNumberAtOutgoing,
                TotalNumberAtDelivered,
                TotalNumberAtPurchased,
                TotalNumberAtDeposited,
                TotalNumberAtRecycled,
                TotalNumberOfBottles,
                status: 200
            })
        }
        else{
            //If manufacturerid is provided, show all counts related to the specific manufacturer

            //Count the number of manufactured bottles
            let TotalNumberAtManufactured = await returnCount("Manufactured", manufacturerId)
            
            //Count the number of outgoing bottles
            let TotalNumberAtOutgoing = await returnCount("Outgoing", manufacturerId)

            //Count the number of delivered bottles
            let TotalNumberAtDelivered = await returnCount("Delivered", manufacturerId)

            //Count the number of purchased bottles
            let TotalNumberAtPurchased = await returnCount("Purchased", manufacturerId)

            //Count the number of deposited bottles
            let TotalNumberAtDeposited = await returnCount("Deposited", manufacturerId)

            //Count the number of recycled bottles
            let TotalNumberAtRecycled = await returnCount("Recycled", manufacturerId)
            
            //Count all the bottles added by this manufacturer in the entire collection
            let TotalNumberOfBottles = await BottleModel.countDocuments({"manufacturer.id":manufacturerId});

            res.status(200).json({
                statusType:"Only bottles for this manufacturer",
                TotalNumberAtManufactured,
                TotalNumberAtOutgoing,
                TotalNumberAtDelivered,
                TotalNumberAtPurchased,
                TotalNumberAtDeposited,
                TotalNumberAtRecycled,
                TotalNumberOfBottles,
                status: 200
            })
            
        }
})
module.exports = router;