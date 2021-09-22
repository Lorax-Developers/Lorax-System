pragma solidity ^0.5.0;

contract Plasticbottle{

    //Creating the reference data for bottle upload
    struct Bottle {
        string qrcode;
        string title;
        uint bottleSize;
        string sizeUnit;
    }
   
   //Bottle event indexed by ID
    event registeredBottleEvent (
        uint indexed _bottleID
    );

    //Array of all bottles produced by manufacturers
    Bottle[] public BottleArray;

    //Registering a bottle instance
    function registerBottle(string memory _qrcode, string memory _title,  uint _bottleSize, string memory _sizeUnit) public {
        uint index = BottleArray.push(Bottle(_qrcode, _title,_bottleSize, _sizeUnit));

        // trigger registeredBottle event
        emit registeredBottleEvent(index);
    }


    //Checks the number of bottles in the BottleArray
    function numberofBottles() public view returns (uint){
        return BottleArray.length;
    }
}