const router = require("express").Router();
const { check, validationResult} = require("express-validator");
const BottleModel = require("../../models/bottles/BottleModel");

getMonthsList = (start) => {
    const months = ["January","February","March","April","May","June","July", "August","September","October","November","December"];
    let removeFirst = months.splice(0,start - 1);
    let newMonth = months.filter(item => !removeFirst.includes(item))
    newMonth.length = 6;
    return newMonth;
}
router.get("/", [
    check("startMonth", "Please provide a start month").exists(),
    check("statusTwo", "Please provide the next status").exists(),
    check("manufacturerId", "Please provide the manufacturerId").exists(),
], async (req, res) => {
     //Define user request variables
     const {startMonth, statusTwo, manufacturerId} = req.query;

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
        

        //Count for the first status
        const countArray1 = [];
        for(let i = startMonth; i <= parseInt(startMonth) + 5; i++){
            let count1 = await BottleModel.find({
                "manufacturer.id":manufacturerId,
                dateUpdated: {
                    $gte: new Date(2021, i - 1), 
                    $lt: new Date(2021, i)
                }
            }).countDocuments()
            countArray1.push(count1);
        }

        //Count for the second status
        const countArray2 = [];
        for(let i = startMonth; i <= parseInt(startMonth) + 5; i++){
            let count2 = await BottleModel.find({
                "manufacturer.id":manufacturerId,
                bottleStatus: statusTwo,
                dateUpdated: {
                    $gte: new Date(2021, i - 1), 
                    $lt: new Date(2021, i)
                }
            }).countDocuments()
            countArray2.push(count2);
        }

        res.status(200).json({
            status:200,
            data: {
                labels:getMonthsList(startMonth),
                datasets:[
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