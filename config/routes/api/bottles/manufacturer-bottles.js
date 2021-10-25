const router = require("express").Router();
const { check, validationResult} = require("express-validator");
const BottleModel = require("../../models/bottles/BottleModel");

router.get("/", [
    check("manufacturerId", "Please provide the manufacturer Id").exists()
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

        // bottleStatus == "all" && bottleStatus == "all"
        //Define request variables
        const {manufacturerId, bottleStatus, startDate, endDate, pageSize, pageNumber,} = req.query;

        //Define the type of search to conduct (in case of a filter)
        let findQuery;

        //If specific bottle status is provided (and date not provided), the user is trying to filter based on a specific status
        if(bottleStatus !== "All" && startDate === "")
        {
            findQuery = {"manufacturer.id": manufacturerId, bottleStatus};
            console.log("by status only")
        }
        //If the filter date is provided (and status not provided), the user is trying to filter based on date 
        else if(startDate !== "" && bottleStatus === "All"){
            console.log("by date only")
            findQuery = {
                "manufacturer.id": manufacturerId, 
                dateAdded: {
                    $gte: new Date(startDate), 
                    //If end date is not provided, use today as the end date
                    $lt: (endDate === "") ? new Date() : new Date(endDate)
                }
            }
        }
        //If the filter date and status are provided, the users wants to filter by date and status
        else if(startDate !== "" && bottleStatus !== "All"){
            console.log("by specific status and date")
            findQuery = {
                "manufacturer.id": manufacturerId, 
                bottleStatus,
                dateAdded: {
                    $gte: new Date(startDate), 
                    //If end date is not provided, use today as the end date
                    $lt: (endDate === "") ? new Date() : new Date(endDate)
                }
            }
        }

        //They just want all the bottles
        else{
            console.log("They just want all")

            findQuery = {"manufacturer.id": manufacturerId};
        }
        //Search the collection
        const bottles = await BottleModel.find(findQuery)
        .limit(parseInt(pageSize))
        .skip(pageNumber == 1 ? 0 : (parseInt(pageNumber) - 1) * pageSize);

        const bottleCount = await BottleModel.count();

        res.status(200).json({
            status:200,
            count: bottleCount,
            startDate:new Date(startDate),
            endDate:(endDate === "") ? new Date() : new Date(endDate),
            bottleStatus,
            bottles
        })
    }

})
module.exports = router;